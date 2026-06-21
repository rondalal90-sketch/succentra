// =============================================================================
// app.js — SucCentra Dashboard
// =============================================================================

// ── 1. CUSTOMER DATA ─────────────────────────────────────────────────────────
// Customer data is NOT embedded in the app. It is loaded only from the Excel
// file the user uploads, and cached in localStorage so it survives reloads.
var RAW = [];

// ── 2. HELPERS ────────────────────────────────────────────────────────────────
var AVCOLORS=[['#e8f0fb','#1a5fa8'],['#e8f5ee','#2d7a4f'],['#fef4dc','#8a5c00'],['#fdeaea','#9b2929'],['#f3eefb','#6b3fa8'],['#e8f8f8','#1a7a7a']];
function avc(s){var h=0;for(var i=0;i<(s||'').length;i++)h=((h<<5)-h)+(s||'').charCodeAt(i);return AVCOLORS[Math.abs(h)%AVCOLORS.length];}
function ini(s){return(s||'?').split(' ').map(function(w){return w[0]||'';}).join('').slice(0,2).toUpperCase();}
function nv(v){var x=parseFloat(String(v||'').replace(/,/g,''));return isNaN(x)?0:x;}
function pd(s){
  if(!s)return null;
  var m=String(s).match(/(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{2,4})/);
  if(!m)return null;
  var d=m[1],mo=m[2],y=m[3];
  if(y.length===2)y='20'+y;
  var dt=new Date(+y,+mo-1,+d);
  return isNaN(dt.getTime())?null:dt;
}
function ds(s){var d=pd(s);if(!d)return 9999;return Math.max(0,Math.floor((Date.now()-d)/86400000));}
function fd(s){
  var d=pd(s);if(!d)return'—';
  var days=Math.floor((Date.now()-d)/86400000);
  if(days===0)return'היום';if(days===1)return'אתמול';
  if(days<7)return'לפני '+days+' ימים';
  if(days<30)return'לפני '+Math.floor(days/7)+' שב\'';
  if(days<365)return'לפני '+Math.floor(days/30)+' חד\'';
  return'לפני '+Math.floor(days/365)+' שנ\'';
}
function fmtDate(iso){
  var d=new Date(iso);
  return String(d.getDate()).padStart(2,'0')+'/'+String(d.getMonth()+1).padStart(2,'0')+'/'+String(d.getFullYear()).slice(2);
}

// ── 3. LOCALSTORAGE ───────────────────────────────────────────────────────────
function getCRM(id){try{return JSON.parse(localStorage.getItem('crm_'+id)||'{}');}catch(e){return{};}}
function saveCRM(id,data){try{localStorage.setItem('crm_'+id,JSON.stringify(data));}catch(e){}}
function saveCRMField(field,value){
  if(!currentId)return;
  var crm=getCRM(currentId);crm[field]=value;saveCRM(currentId,crm);
  if(field==='contact'||field==='goal'){var r=DATA.find(function(x){return x.id===currentId;});if(r)refreshOutreach(r);}
}
function getHistory(id){try{var s=localStorage.getItem('sh_'+id);if(s)return JSON.parse(s);}catch(e){}return null;}
function saveHistory(id,h){try{localStorage.setItem('sh_'+id,JSON.stringify(h));}catch(e){}}

// ── METRIC TASK LABELS (single source of truth, clean Hebrew) ────────────────
var METRIC_LABELS={
  content_stale:'רענון התוכן במערכת',
  no_logins:'עידוד המשתמשים להיכנס למערכת',
  low_lic:'הגדלת השימוש ברישיונות',
  no_exams:'הוספת מבחנים לעובדים',
  no_tuts:'בניית הדרכות למשתמשים',
  no_ras:'הפעלת קריאה ואישור של מסמכים',
  no_notifs:'שליחת התראות למשתמשים',
  no_fbs:'איסוף משוב מהמשתמשים'
};

// ── 4. HEALTH SCORE ───────────────────────────────────────────────────────────
// Weighted model (0-100). Rewards real usage of the system:
//   Engagement (logins per active user)      → up to 30
//   Content depth (objects per license)      → up to 30
//   Advanced feature adoption                → up to 25
//   Content freshness (recency)              → up to 15
// Then penalties are subtracted:
//   Progressive recency penalty (stale content)
//   Relative blocked-users penalty
// calcBreakdown returns each component so the modal can show WHY a score is what it is.
function calcBreakdown(d){
  // d: {active,logs,objects,license,daysOld,locked,ras,exams,tuts,fbs}
  var active=d.active||0,logs=d.logs||0,objects=d.objects||0,license=d.license||0;
  var daysOld=(d.daysOld===undefined?9999:d.daysOld),locked=d.locked||0;

  // 1) Engagement — logins relative to active users. Target ~5 logins/active user/month.
  var engagement=0;
  if(active>0){
    var perUser=logs/active;
    // ~1.2 logins per active user per month = full marks (matches real usage patterns).
    engagement=Math.max(0,Math.min(30,Math.round((perUser/1.2)*30)));
  } else if(logs>0){
    engagement=5; // some activity but no active-user baseline
  }

  // 2) Content depth — objects relative to licenses (so small clients aren't penalised).
  var content=0;
  if(license>0){
    var perLic=objects/license;
    // ~3 objects per license = full marks (calibrated to real data).
    content=Math.max(0,Math.min(30,Math.round((perLic/3)*30)));
  } else if(objects>0){
    content=10;
  }

  // 3) Advanced feature adoption — ReadAndSign, Exams, Tutorials, Feedbacks.
  //    Each active feature is worth up to ~6.25; capped at 25.
  var featActive=[d.ras,d.exams,d.tuts,d.fbs].filter(function(v){return (v||0)>0;}).length;
  var features=Math.round((featActive/4)*25);

  // 4) Content freshness — fresh content earns points (up to 15).
  var fresh=0;
  if(daysOld<=30)fresh=15;
  else if(daysOld<=60)fresh=11;
  else if(daysOld<=90)fresh=7;
  else if(daysOld<=180)fresh=3;
  else fresh=0;

  // Penalty A — progressive recency penalty based on days since last update.
  var recencyPenalty=0;
  if(daysOld<=30)recencyPenalty=0;
  else if(daysOld<=60)recencyPenalty=Math.round(((daysOld-30)/30)*5);      // up to 5
  else if(daysOld<=90)recencyPenalty=5+Math.round(((daysOld-60)/30)*5);    // 5..10
  else recencyPenalty=15;                                                  // flat 15 over 90

  // Penalty B — blocked users relative to total licenses (not a flat per-user hit).
  var blockedPenalty=0;
  if(license>0&&locked>0){
    blockedPenalty=Math.min(15,Math.round((locked/license)*100*0.5)); // 0.5 pt per % blocked, cap 15
  }

  var positive=engagement+content+features+fresh;
  var total=Math.max(0,Math.min(100,positive-recencyPenalty-blockedPenalty));
  return{
    engagement:engagement,content:content,features:features,fresh:fresh,
    recencyPenalty:recencyPenalty,blockedPenalty:blockedPenalty,
    positive:positive,total:total
  };
}
function calcBaseH(d){return calcBreakdown(d).total;}
function effectiveScore(r){
  var crm=getCRM(r.id);
  var cm=(crm.checkedItems||[]).length;
  var cc=(crm.customChecked||[]).length;
  return Math.min(100,r.baseHealth+(cm+cc)*10);
}
function liveStatus(score){return score>=65?'healthy':score>=35?'warning':'critical';}

// ── 5. COLUMN MAP ─────────────────────────────────────────────────────────────
var CM={workspace_id:['workspace_id','id'],workspace_name:['workspace_name','name','customer'],frontend_domain:['frontend_domain','domain'],License:['license','licenses'],active_users:['active_users','active users'],locked_users:['locked_users','locked'],log_30_days:['log_30_days','logins','log 30'],active_objects:['active_objects','articles','objects'],last_updated_article:['last_updated_article','last update','last updated'],ReadAndSign:['readandsign','read and sign'],Exams:['exams'],Tutorials:['tutorials'],Notifications:['notifications'],Feedbacks:['feedbacks','feedback']};
function mapH(headers){
  var map={};
  var fields=Object.keys(CM);
  for(var fi=0;fi<fields.length;fi++){
    var f=fields[fi];var aliases=CM[f];
    for(var i=0;i<headers.length;i++){
      var h=String(headers[i]).trim().toLowerCase();
      var found=false;
      for(var ai=0;ai<aliases.length;ai++){if(h===aliases[ai]||h.indexOf(aliases[ai])!==-1){found=true;break;}}
      if(!map[f]&&found){map[f]=i;break;}
    }
  }
  return map;
}

// ── 6. PROCESS ROWS ───────────────────────────────────────────────────────────
function processRows(rows,hmap){
  return rows.map(function(row,i){
    function g(f){return hmap?(hmap[f]!==undefined&&row[hmap[f]]!=null?String(row[hmap[f]]).trim():''):(row[f]!=null?String(row[f]).trim():'');}
    var id=g('workspace_id')||String(i),name=g('workspace_name')||'—',domain=g('frontend_domain')||'';
    var license=nv(g('License')),active=nv(g('active_users')),locked=nv(g('locked_users')),logs=nv(g('log_30_days'));
    var objects=nv(g('active_objects'));
    var ras=nv(g('ReadAndSign')),exams=nv(g('Exams')),tuts=nv(g('Tutorials')),notifs=nv(g('Notifications')),fbs=nv(g('Feedbacks'));
    var rawDate=g('last_updated_article'),daysOld=ds(rawDate);
    var licPct=license>0?Math.round((active/license)*100):0;
    var featCount=[ras,exams,tuts,notifs,fbs].filter(function(v){return v>0;}).length;
    var baseHealth=calcBaseH({active:active,logs:logs,objects:objects,license:license,daysOld:daysOld,locked:locked,ras:ras,exams:exams,tuts:tuts,fbs:fbs});
    return{id:id,name:name,domain:domain,license:license,active:active,locked:locked,logs:logs,objects:objects,rawDate:rawDate,daysOld:daysOld,licPct:licPct,ras:ras,exams:exams,tuts:tuts,notifs:notifs,fbs:fbs,featCount:featCount,baseHealth:baseHealth,ai_enabled:false,inactive:false};
  });
}
function applyStoredOverrides(arr){
  arr.forEach(function(r){var crm=getCRM(r.id);r.ai_enabled=crm.ai_enabled===true;r.inactive=crm.inactive===true;});
}

// ── 7. STATE ──────────────────────────────────────────────────────────────────
function loadSavedDataset(){
  try{
    var s=localStorage.getItem('succentra_dataset');
    if(s){var arr=JSON.parse(s);if(arr&&arr.length)return arr;}
  }catch(e){}
  return [];
}
function saveDataset(){
  try{localStorage.setItem('succentra_dataset',JSON.stringify(DATA));}catch(e){}
}
var DATA=loadSavedDataset();
applyStoredOverrides(DATA);
var savedLoadedAt=null;
try{var _la=localStorage.getItem('succentra_loaded_at');if(_la)savedLoadedAt=new Date(_la);}catch(e){}
var loadedAt=savedLoadedAt||new Date();
var currentId=null;
var evolutionChart=null;

// ── 8. MOCK HISTORY ───────────────────────────────────────────────────────────
var MOCK_LABELS=['עדכון אקסל בסיסי','משימת שימור ידע - בוצע','ביצוע מבחן Tutorials','הדרכת Key Contact'];
var MOCK_OFFSETS=[42,28,14,3];
function buildMockHistory(r){
  // Synthetic baseline trend leading up to the current score. The LAST point is
  // dated today and holds the live score — there is no separate duplicate sentinel.
  var now=Date.now(),cur=r.baseHealth,start=Math.max(5,Math.min(90,cur-25));
  var pts=MOCK_LABELS.map(function(label,i){
    return{date:new Date(now-MOCK_OFFSETS[i]*86400000).toISOString(),score:Math.max(5,Math.min(100,Math.round(start+(cur-start)*(i/(MOCK_LABELS.length-1))))),label:label,labels:[label]};
  });
  return pts;
}

// ── 9. METRICS ────────────────────────────────────────────────────────────────
function updateMetrics(){
  // Inactive customers are shown in the table but excluded from all health stats.
  var activeSet=DATA.filter(function(r){return r.inactive!==true;});
  document.getElementById('m0').textContent=DATA.length;
  var scores=activeSet.map(function(r){return effectiveScore(r);});
  document.getElementById('m1').textContent=scores.filter(function(s){return liveStatus(s)==='healthy';}).length;
  document.getElementById('m2').textContent=scores.filter(function(s){return liveStatus(s)==='warning';}).length;
  document.getElementById('m3').textContent=scores.filter(function(s){return liveStatus(s)==='critical';}).length;
  var avg=activeSet.length?Math.round(activeSet.reduce(function(s,r){return s+r.licPct;},0)/activeSet.length):0;
  document.getElementById('m4').textContent=avg+'%';
  var aiCount=activeSet.filter(function(r){return r.ai_enabled===true;}).length;
  var aiPct=activeSet.length?Math.round((aiCount/activeSet.length)*100):0;
  var m5=document.getElementById('m5');
  if(m5)m5.textContent=aiPct+'%';
  document.getElementById('hdr-sub').textContent='עודכן: '+loadedAt.toLocaleDateString('he-IL')+' · '+DATA.length+' לקוחות';
}

// ── 10. KPI FILTER ────────────────────────────────────────────────────────────
function filterStatus(s){
  document.getElementById('fst').value=s;
  document.querySelectorAll('.kpi-cell').forEach(function(el){el.classList.remove('bg-[#1a1916]','!text-white');});
  var map={'':'kpi-all','healthy':'kpi-h','warning':'kpi-w','critical':'kpi-c'};
  if(map[s]){var el=document.getElementById(map[s]);if(el)el.classList.add('bg-[#1a1916]','!text-white');}
  render();
}

// ── 11. RENDER TABLE ──────────────────────────────────────────────────────────
function render(){
  var srch=(document.getElementById('srch').value||'').toLowerCase();
  var sf=document.getElementById('fst').value;
  var sc=document.getElementById('srt').value;
  var faiEl=document.getElementById('fai');
  var fai=faiEl?faiEl.value:'';
  var data=DATA.filter(function(r){
    if(srch&&r.name.toLowerCase().indexOf(srch)===-1&&r.domain.toLowerCase().indexOf(srch)===-1)return false;
    var s=effectiveScore(r);
    if(sf&&liveStatus(s)!==sf)return false;
    if(fai==='yes'&&r.ai_enabled!==true)return false;
    if(fai==='no'&&r.ai_enabled===true)return false;
    return true;
  });
  if(sc==='score_asc')data.sort(function(a,b){return effectiveScore(a)-effectiveScore(b);});
  else if(sc==='score_desc')data.sort(function(a,b){return effectiveScore(b)-effectiveScore(a);});
  else if(sc==='name')data.sort(function(a,b){return a.name.localeCompare(b.name,'he');});
  document.getElementById('rc').textContent=data.length+' לקוחות';
  var esEl=document.getElementById('es');
  esEl.classList.toggle('hidden',data.length>0);
  if(data.length===0){
    esEl.innerHTML=(DATA.length===0)
      ?'<div class="text-[18px] font-semibold text-[#1a1916] mb-1">אין עדיין נתונים</div><div class="text-[15px] text-gray-400">לחצו על \u201Dעדכן נתונים\u201D למעלה כדי להעלות קובץ Excel ולהתחיל.</div>'
      :'לא נמצאו לקוחות שמתאימים לסינון';
  }
  var sl={critical:'קריטי',warning:'בינוני',healthy:'בריא'};
  var pc={healthy:'pill-ok',warning:'pill-warn',critical:'pill-crit'};
  document.getElementById('tb').innerHTML=data.map(function(r){
    var inactive=r.inactive===true;
    var colors=avc(r.name);var abg=colors[0];var afg=colors[1];
    var score=effectiveScore(r);
    var status=liveStatus(score);
    var bc=status==='healthy'?'#2d7a4f':status==='warning'?'#8a5c00':'#9b2929';
    // Inactive customers render in grey regardless of their critical/healthy status.
    if(inactive){abg='#ececec';afg='#9ca3af';bc='#9ca3af';}
    var aiBadge=r.ai_enabled?'<button onclick="event.stopPropagation();toggleAIRow(\''+r.id+'\')" class="text-[13px] font-semibold px-2.5 py-1 rounded-full bg-[#e8f5ee] text-[#2d7a4f] border border-[#a8d9bb] hover:bg-[#d4ecde] transition-colors cursor-pointer">✓ פעיל</button>':'<button onclick="event.stopPropagation();toggleAIRow(\''+r.id+'\')" class="text-[13px] font-medium px-2.5 py-1 rounded-full bg-[#f0efe9] text-gray-400 border border-black/[0.10] hover:bg-[#e8f0fb] hover:text-[#1a5fa8] hover:border-[#a8c4f0] transition-colors cursor-pointer">+ הוסף AI</button>';
    // Active/inactive toggle button for the new left-most column.
    var actBtn=inactive
      ?'<button onclick="event.stopPropagation();toggleInactive(\''+r.id+'\')" class="text-[13px] font-semibold px-2.5 py-1 rounded-full bg-[#f0efe9] text-gray-500 border border-black/10 hover:bg-[#e8f5ee] hover:text-[#2d7a4f] transition-colors cursor-pointer">הפעל</button>'
      :'<button onclick="event.stopPropagation();toggleInactive(\''+r.id+'\')" class="text-[13px] font-medium px-2.5 py-1 rounded-full bg-white text-gray-400 border border-black/10 hover:bg-[#fdeaea] hover:text-[#9b2929] transition-colors cursor-pointer">השבת</button>';
    var rowCls=inactive
      ?'border-b border-black/[0.07] bg-[#fafafa] opacity-60 hover:opacity-90 hover:bg-[#f5f4f0] cursor-pointer transition-all'
      :'border-b border-black/[0.07] hover:bg-[#f5f4f0] cursor-pointer transition-colors';
    var nameColor=inactive?'#9ca3af':'#1a1916';
    var statusPill=inactive
      ?'<span class="text-[13px] font-semibold px-2 py-0.5 rounded-full bg-[#f0efe9] text-gray-400 border border-black/10">לא פעיל</span>'
      :'<span class="pill '+pc[status]+' text-[13px] font-semibold px-2 py-0.5 rounded-full">'+sl[status]+'</span>';
    return '<tr class="'+rowCls+'" onclick="openModal(\''+r.id+'\')">'+
      '<td class="px-3 py-2.5" style="width:18%"><div class="flex items-center gap-2.5"><div class="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-[12px] font-bold" style="background:'+abg+';color:'+afg+'">'+ini(r.name)+'</div><div><div class="font-semibold text-[16px] leading-tight" style="color:'+nameColor+'">'+r.name+'</div><div class="text-[14px] text-gray-400 leading-tight">'+r.domain+'</div></div></div></td>'+
      '<td class="px-3 py-2.5" style="width:11%"><div class="flex items-center gap-2"><div class="flex-1 h-1 bg-[#f0efe9] rounded-full overflow-hidden"><div class="h-full rounded-full" style="width:'+score+'%;background:'+bc+'"></div></div><span class="mono text-[14px] font-medium" style="color:'+bc+'">'+score+'</span></div></td>'+
      '<td class="px-3 py-2.5" style="width:10%">'+statusPill+'</td>'+
      '<td class="px-3 py-2.5" style="width:9%">'+aiBadge+'</td>'+
      '<td class="px-3 py-2.5 text-[15px]" style="width:9%">'+(r.logs||'—')+'</td>'+
      '<td class="px-3 py-2.5 text-[15px]" style="width:9%">'+r.active+'/'+r.license+'</td>'+
      '<td class="px-3 py-2.5 text-[15px]" style="width:9%">'+r.licPct+'%</td>'+
      '<td class="px-3 py-2.5 text-[14px] text-gray-400" style="width:14%">'+fd(r.rawDate)+'</td>'+
      '<td class="px-3 py-2.5" style="width:11%">'+actBtn+'</td>'+
      '</tr>';
  }).join('');
}

// ── 12. SCORE UPDATE HELPERS ──────────────────────────────────────────────────
function updateModalScore(r){
  var score=effectiveScore(r);
  var status=liveStatus(score);
  var bc=status==='healthy'?'#2d7a4f':status==='warning'?'#8a5c00':'#9b2929';
  var sl={critical:'קריטי',warning:'בינוני',healthy:'בריא'};
  var pc={healthy:'pill-ok',warning:'pill-warn',critical:'pill-crit'};
  var ms=document.getElementById('modal-score');
  var msb=document.getElementById('modal-score-bar');
  var mss=document.getElementById('modal-score-sub');
  if(ms){ms.textContent=score;ms.style.color=bc;}
  if(msb){msb.style.width=score+'%';msb.style.background=bc;}
  if(mss)mss.textContent='מתוך 100 · '+sl[status];
  // Update the live status pill in the modal header
  var headerPill=document.querySelector('#modal-header .status-live-pill');
  if(headerPill){
    headerPill.className='status-live-pill text-[13px] font-bold px-2.5 py-1 rounded-full flex-shrink-0 '+pc[status];
    headerPill.textContent=sl[status];
  }
}

// ── 13. AI TOGGLE ─────────────────────────────────────────────────────────────
function toggleInactive(id){
  var r=DATA.find(function(x){return x.id===id;});if(!r)return;
  var newVal=!(r.inactive===true);
  r.inactive=newVal;
  var crm=getCRM(id);crm.inactive=newVal;saveCRM(id,crm);
  saveDataset();
  render();
  updateMetrics();
  showToast(newVal?'הלקוח סומן כלא פעיל':'הלקוח חזר לפעילות');
}

function toggleAIRow(id){
  var r=DATA.find(function(x){return x.id===id;});if(!r)return;
  var newVal=!(r.ai_enabled===true);
  r.ai_enabled=newVal;
  var crm=getCRM(id);crm.ai_enabled=newVal;saveCRM(id,crm);
  // If this customer's modal is open, keep the modal buttons in sync
  if(currentId===id){
    var yesBtn=document.getElementById('ai-yes');
    var noBtn=document.getElementById('ai-no');
    if(yesBtn)yesBtn.className='ai-btn flex-1 py-1.5 text-[14px] font-semibold border rounded-lg text-center '+(newVal?'bg-[#e8f5ee] text-[#2d7a4f] border-[#a8d9bb]':'bg-[#f0efe9] text-gray-500 border-black/10');
    if(noBtn)noBtn.className='ai-btn flex-1 py-1.5 text-[14px] font-semibold border rounded-lg text-center '+(!newVal?'bg-[#fdeaea] text-[#9b2929] border-[#f5a8a8]':'bg-[#f0efe9] text-gray-500 border-black/10');
    refreshOutreach(r);
  }
  render();
  updateMetrics();
  saveDataset();
  showToast(newVal?'AI הופעל ללקוח ✓':'AI בוטל ללקוח');
}

function setAI(val){
  if(!currentId)return;
  var crm=getCRM(currentId);crm.ai_enabled=val;saveCRM(currentId,crm);
  var r=DATA.find(function(x){return x.id===currentId;});if(r)r.ai_enabled=val;
  document.getElementById('ai-yes').className='ai-btn flex-1 py-2 text-[16px] font-semibold border rounded-lg text-center '+(val?'bg-[#e8f5ee] text-[#2d7a4f] border-[#a8d9bb]':'bg-[#f0efe9] text-gray-500 border-black/10');
  document.getElementById('ai-no').className='ai-btn flex-1 py-2 text-[16px] font-semibold border rounded-lg text-center '+(!val?'bg-[#fdeaea] text-[#9b2929] border-[#f5a8a8]':'bg-[#f0efe9] text-gray-500 border-black/10');
  if(r){refreshOutreach(r);render();}
}

// ── 14. CHECKLIST TOGGLE ──────────────────────────────────────────────────────
// ── HISTORY HELPER: stack same-day events on one point (improvements 5+7) ─────
function todayKey(iso){var d=new Date(iso);return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();}
function pushHistoryEvent(r,label,newScore,removeLabel){
  var history=getHistory(r.id)||buildMockHistory(r);
  var nowIso=new Date().toISOString();
  var tk=todayKey(nowIso);
  // Find a point already dated today (single source of truth — no sentinel).
  var todayPoint=null,todayIdx=-1;
  for(var i=0;i<history.length;i++){
    if(history[i].date&&todayKey(history[i].date)===tk){todayPoint=history[i];todayIdx=i;break;}
  }
  if(todayPoint){
    // Same day — raise Y, keep one X position, manage the labels list.
    todayPoint.score=newScore;
    if(!todayPoint.labels)todayPoint.labels=todayPoint.label?[todayPoint.label]:[];
    if(removeLabel)todayPoint.labels=todayPoint.labels.filter(function(l){return l!==removeLabel;});
    if(label)todayPoint.labels.push(label);
    todayPoint.label=todayPoint.labels.join('\n');
    // If today's point is a synthetic mock baseline (not a real event) keep it;
    // only drop a point that became empty AND isn't the sole remaining point.
    if(todayPoint.labels.length===0&&history.length>1){
      history.splice(todayIdx,1);
    }
  } else {
    // First event today — append a new point at the end (most recent X).
    history.push({date:nowIso,score:newScore,label:label||'',labels:label?[label]:[]});
  }
  saveHistory(r.id,history);
  return history;
}

function toggleCheck(el,itemKey,isCustom){
  var box=el.querySelector('.check-box'),mark=el.querySelector('.check-mark');
  var wasDone=box.classList.contains('bg-[#2d7a4f]');
  var r=DATA.find(function(x){return x.id===currentId;});if(!r)return;
  var crm=getCRM(currentId);
  var field=isCustom?'customChecked':'checkedItems';
  var arr=crm[field]||[];
  if(wasDone)arr=arr.filter(function(k){return k!==itemKey;});
  else if(arr.indexOf(itemKey)===-1)arr.push(itemKey);
  crm[field]=arr;saveCRM(currentId,crm);

  var taskName=METRIC_LABELS[itemKey];
  if(!taskName){var ci=(crm.customChecklistItems||[]).find(function(i){return i.key===itemKey;});taskName=ci?ci.t:itemKey;}
  var chartLabel=wasDone?('בוטל: '+taskName):('בוצע: '+taskName);

  if(wasDone){box.classList.remove('bg-[#2d7a4f]','border-[#2d7a4f]');box.classList.add('border-gray-300');mark.classList.add('hidden');el.classList.remove('opacity-50');}
  else{box.classList.add('bg-[#2d7a4f]','border-[#2d7a4f]');box.classList.remove('border-gray-300');mark.classList.remove('hidden');el.classList.add('opacity-50');}

  var newScore=effectiveScore(r);
  // Stack the event onto today's point (improvements 5+7), then rebuild the chart.
  // On check: add 'בוצע: X'. On uncheck: remove that same label from today's point.
  if(wasDone){
    pushHistoryEvent(r,null,newScore,'בוצע: '+taskName);
  } else {
    pushHistoryEvent(r,'בוצע: '+taskName,newScore);
  }
  renderChart(r);

  updateModalScore(r);
  refreshOutreach(r);
  render();
  updateMetrics();
}

// ── 15. DELETE CUSTOM TASK ────────────────────────────────────────────────────
function deleteCustomTask(itemKey){
  if(!window.confirm('האם אתה בטוח שברצונך למחוק? פעולה זו תשפיע על המשימות להמשך ועל הגרף.'))return;
  var r=DATA.find(function(x){return x.id===currentId;});if(!r)return;
  var crm=getCRM(currentId);
  var _ci=(crm.customChecklistItems||[]).find(function(i){return i.key===itemKey;});
  var taskName=_ci?_ci.t:'';
  crm.customChecklistItems=(crm.customChecklistItems||[]).filter(function(i){return i.key!==itemKey;});
  crm.customChecked=(crm.customChecked||[]).filter(function(k){return k!==itemKey;});
  crm.archivedCustom=(crm.archivedCustom||[]).filter(function(k){return k!==itemKey;});
  saveCRM(currentId,crm);
  // Remove this task's 'בוצע: X' label from any chart point it was stacked onto.
  var taskLabel='בוצע: '+(taskName||'');
  var history=getHistory(r.id)||buildMockHistory(r);
  for(var i=history.length-1;i>=0;i--){
    var p=history[i];
    if(p.labels&&p.labels.length){
      p.labels=p.labels.filter(function(l){return l!==taskLabel;});
      p.label=p.labels.join('\n');
      // Drop a point that became empty (and isn't the only point left).
      if(p.labels.length===0&&history.length>1)history.splice(i,1);
    }
  }
  saveHistory(r.id,history);
  renderChecklist(r,crm);
  renderChart(r);
  updateModalScore(r);
  refreshOutreach(r);
  render();
  updateMetrics();
  showToast('משימה נמחקה ✓');
}

// ── 16. RENDER CHECKLIST ──────────────────────────────────────────────────────
function renderChecklist(r,crm){
  var checkedMetric=crm.checkedItems||[];
  var checkedCustom=crm.customChecked||[];
  var archivedCustom=crm.archivedCustom||[];
  var metricItems=[];
  if(r.daysOld>90)metricItems.push({key:'content_stale',p:'high',t:METRIC_LABELS.content_stale,d:r.daysOld+' ימים ללא עדכון תוכן'});
  if(r.logs===0)metricItems.push({key:'no_logins',p:'high',t:METRIC_LABELS.no_logins,d:'אין כניסות ב-30 הימים האחרונים'});
  if(r.licPct<30&&r.license>0)metricItems.push({key:'low_lic',p:'high',t:METRIC_LABELS.low_lic,d:r.licPct+'% ניצול — כדאי להרחיב'});
  if(r.exams===0)metricItems.push({key:'no_exams',p:'med',t:METRIC_LABELS.no_exams,d:'עדיין לא בשימוש'});
  if(r.tuts===0)metricItems.push({key:'no_tuts',p:'med',t:METRIC_LABELS.no_tuts,d:'עדיין לא נבנו הדרכות'});
  if(r.ras===0)metricItems.push({key:'no_ras',p:'med',t:METRIC_LABELS.no_ras,d:'עדיין לא בשימוש'});
  if(r.notifs===0)metricItems.push({key:'no_notifs',p:'med',t:METRIC_LABELS.no_notifs,d:'עדיין לא בשימוש'});
  if(r.fbs===0)metricItems.push({key:'no_fbs',p:'med',t:METRIC_LABELS.no_fbs,d:'עדיין לא בשימוש'});
  var customItems=(crm.customChecklistItems||[]).filter(function(item){return archivedCustom.indexOf(item.key)===-1;});
  if(metricItems.length===0&&customItems.length===0){
    document.getElementById('checklist-container').innerHTML='<div class="text-[16px] text-gray-400 py-2">אין משימות פתוחות 🎉</div>';
    return;
  }
  function mkBox(isDone){
    var boxCls=isDone?'bg-[#2d7a4f] border-[#2d7a4f]':'border-gray-300';
    var markCls=isDone?'':'hidden';
    return '<div class="w-4 h-4 rounded border-[1.5px] '+boxCls+' flex-shrink-0 mt-0.5 flex items-center justify-center check-box"><svg class="w-2.5 h-2.5 stroke-white '+markCls+' check-mark" viewBox="0 0 12 12" fill="none" stroke-width="3"><polyline points="1,6 4,9 11,2"/></svg></div>';
  }
  var metricHTML=metricItems.map(function(item){
    var isDone=checkedMetric.indexOf(item.key)!==-1;
    var badge=item.p==='high'?'<span class="text-[14px] font-bold px-1.5 py-0.5 rounded bg-[#fdeaea] text-[#9b2929]">דחוף</span>':'<span class="text-[14px] font-bold px-1.5 py-0.5 rounded bg-[#fef4dc] text-[#8a5c00]">מומלץ</span>';
    return '<div class="cl-item flex items-start gap-2.5 p-3 rounded-lg border border-black/[0.10] bg-white cursor-pointer select-none '+(isDone?'opacity-50':'')+'" onclick="toggleCheck(this,\''+item.key+'\',false)">'+mkBox(isDone)+'<div class="flex-1 min-w-0"><div class="flex items-center gap-1.5 mb-1">'+badge+'</div><div class="text-[16px] font-semibold text-[#1a1916]">'+item.t+'</div><div class="text-[14px] text-gray-400 mt-0.5">'+item.d+'</div></div></div>';
  }).join('');
  var customHTML=customItems.map(function(item){
    var isDone=checkedCustom.indexOf(item.key)!==-1;
    return '<div class="cl-item flex items-start gap-2.5 p-3 rounded-lg border border-black/[0.10] bg-white select-none '+(isDone?'opacity-50':'')+'">'+
      '<div class="cursor-pointer flex-shrink-0 mt-0.5" onclick="toggleCheck(this.closest(\'.cl-item\'),\''+item.key+'\',true)">'+mkBox(isDone)+'</div>'+
      '<div class="flex-1 min-w-0 cursor-pointer" onclick="toggleCheck(this.closest(\'.cl-item\'),\''+item.key+'\',true)">'+
        '<div class="flex items-center gap-1.5 mb-1"><span class="text-[14px] font-bold px-1.5 py-0.5 rounded bg-[#e8f0fb] text-[#1a5fa8]">ידני</span></div>'+
        '<div class="text-[16px] font-semibold text-[#1a1916]">'+item.t+'</div>'+
        '<div class="text-[14px] text-gray-400 mt-0.5">'+item.d+'</div>'+
      '</div>'+
      '<button onclick="event.stopPropagation();deleteCustomTask(\''+item.key+'\')" class="flex-shrink-0 p-1 mt-0.5 rounded hover:bg-red-50 transition-colors" title="מחק משימה"><i class="fa-solid fa-trash text-gray-300 hover:text-red-500 text-[14px] transition-colors"></i></button>'+
    '</div>';
  }).join('');
  document.getElementById('checklist-container').innerHTML=metricHTML+customHTML;
}

// ── 17. OUTREACH ──────────────────────────────────────────────────────────────
function buildOutreachMsg(r){
  var crm=getCRM(r.id);
  var score=effectiveScore(r);
  var contact=(crm.contact||'').trim();
  var goal=(crm.goal||'').trim();
  var firstName=contact?contact.split(/[\s,\/]+/)[0]:'';
  var greeting=firstName?('\u05d4\u05d9\u05d9 '+firstName+','):'\u05e9\u05dc\u05d5\u05dd \u05dc\u05db\u05dd,';
  var idx=parseInt(r.id||'0')%3;

  // Openers — refer to "your workspace" / "your knowledge system", never the client name.
  var openersLow=[
    '\u05e2\u05d1\u05e8\u05ea\u05d9 \u05e2\u05dc \u05d4\u05e0\u05ea\u05d5\u05e0\u05d9\u05dd \u05e9\u05dc \u05e1\u05d1\u05d9\u05d1\u05ea \u05d4\u05e2\u05d1\u05d5\u05d3\u05d4 \u05e9\u05dc\u05db\u05dd, \u05d5\u05e8\u05e6\u05d9\u05ea\u05d9 \u05dc\u05e9\u05ea\u05e3 \u05d0\u05ea\u05db\u05dd \u05d1\u05db\u05de\u05d4 \u05d3\u05d1\u05e8\u05d9\u05dd \u05e9\u05e9\u05de\u05ea\u05d9 \u05dc\u05d1 \u05d0\u05dc\u05d9\u05d4\u05dd \u2014 \u05d5\u05d2\u05dd \u05db\u05de\u05d4 \u05e0\u05e7\u05d5\u05d3\u05d5\u05ea \u05e9\u05e0\u05d5\u05db\u05dc \u05dc\u05e9\u05e4\u05e8 \u05d9\u05d7\u05d3.',
    '\u05e8\u05e6\u05d9\u05ea\u05d9 \u05dc\u05d1\u05d3\u05d5\u05e7 \u05d0\u05d9\u05ea\u05db\u05dd \u05de\u05d4 \u05e9\u05dc\u05d5\u05dd \u2014 \u05d4\u05e0\u05ea\u05d5\u05e0\u05d9\u05dd \u05e9\u05dc \u05de\u05e2\u05e8\u05db\u05ea \u05e0\u05d9\u05d4\u05d5\u05dc \u05d4\u05d9\u05d3\u05e2 \u05e9\u05dc\u05db\u05dd \u05de\u05e8\u05d0\u05d9\u05dd \u05e9\u05d9\u05e9 \u05db\u05de\u05d4 \u05d4\u05d6\u05d3\u05de\u05e0\u05d5\u05d9\u05d5\u05ea \u05d9\u05e4\u05d5\u05ea \u05dc\u05e9\u05d9\u05e4\u05d5\u05e8 \u05e9\u05e2\u05d3\u05d9\u05d9\u05df \u05dc\u05d0 \u05e0\u05d9\u05e6\u05dc\u05ea\u05dd.',
    '\u05e2\u05d1\u05e8\u05ea\u05d9 \u05e2\u05dc \u05d4\u05e0\u05ea\u05d5\u05e0\u05d9\u05dd \u05d4\u05d0\u05d7\u05e8\u05d5\u05e0\u05d9\u05dd \u05e9\u05dc \u05e1\u05d1\u05d9\u05d1\u05ea \u05d4\u05e2\u05d1\u05d5\u05d3\u05d4 \u05e9\u05dc\u05db\u05dd, \u05d5\u05e8\u05e6\u05d9\u05ea\u05d9 \u05dc\u05e9\u05ea\u05e3 \u05de\u05d4 \u05e9\u05d0\u05e0\u05d9 \u05e8\u05d5\u05d0\u05d4 \u05dc\u05e4\u05e0\u05d9 \u05e9\u05e0\u05e7\u05d1\u05e2 \u05d9\u05d7\u05d3 \u05d0\u05ea \u05d4\u05e6\u05e2\u05d3\u05d9\u05dd \u05d4\u05d1\u05d0\u05d9\u05dd.'
  ];
  var openersGood=[
    '\u05d4\u05e0\u05ea\u05d5\u05e0\u05d9\u05dd \u05e9\u05dc \u05e1\u05d1\u05d9\u05d1\u05ea \u05d4\u05e2\u05d1\u05d5\u05d3\u05d4 \u05e9\u05dc\u05db\u05dd \u05e0\u05e8\u05d0\u05d9\u05dd \u05d8\u05d5\u05d1 \u05d4\u05d7\u05d5\u05d3\u05e9 \u2014 \u05e9\u05de\u05d7\u05ea\u05d9 \u05dc\u05e8\u05d0\u05d5\u05ea \u05e9\u05d0\u05ea\u05dd \u05de\u05e9\u05ea\u05de\u05e9\u05d9\u05dd \u05d1\u05de\u05e2\u05e8\u05db\u05ea \u05d1\u05e6\u05d5\u05e8\u05d4 \u05e7\u05d1\u05d5\u05e2\u05d4.',
    '\u05e8\u05e6\u05d9\u05ea\u05d9 \u05dc\u05d5\u05de\u05e8 \u05db\u05dc \u05d4\u05db\u05d1\u05d5\u05d3 \u2014 \u05d4\u05e0\u05ea\u05d5\u05e0\u05d9\u05dd \u05e9\u05dc \u05de\u05e2\u05e8\u05db\u05ea \u05e0\u05d9\u05d4\u05d5\u05dc \u05d4\u05d9\u05d3\u05e2 \u05e9\u05dc\u05db\u05dd \u05de\u05e8\u05d0\u05d9\u05dd \u05e9\u05d0\u05ea\u05dd \u05e2\u05d5\u05e9\u05d9\u05dd \u05d1\u05d4 \u05e9\u05d9\u05de\u05d5\u05e9 \u05d0\u05de\u05d9\u05ea\u05d9 \u05d5\u05d9\u05d5\u05de\u05d9\u05d5\u05de\u05d9.',
    '\u05e9\u05de\u05ea\u05d9 \u05dc\u05d1 \u05e9\u05d4\u05e4\u05e2\u05d9\u05dc\u05d5\u05ea \u05d1\u05e1\u05d1\u05d9\u05d1\u05ea \u05d4\u05e2\u05d1\u05d5\u05d3\u05d4 \u05e9\u05dc\u05db\u05dd \u05d9\u05e4\u05d4 \u05d1\u05d7\u05d5\u05d3\u05e9\u05d9\u05dd \u05d4\u05d0\u05d7\u05e8\u05d5\u05e0\u05d9\u05dd, \u05d5\u05d7\u05e9\u05d1\u05ea\u05d9 \u05e9\u05db\u05d3\u05d0\u05d9 \u05dc\u05e2\u05e6\u05d5\u05e8 \u05dc\u05e8\u05d2\u05e2 \u05d5\u05dc\u05e2\u05d3\u05db\u05df \u05d0\u05ea\u05db\u05dd.'
  ];
  var opening=(score<50)?openersLow[idx]:openersGood[idx];

  // Risk sentence — plain, flowing Hebrew, about the workspace.
  var riskLine='';
  if(score<50){
    if(r.logs===0)riskLine='\n\n\u05d3\u05d1\u05e8 \u05e0\u05d5\u05e1\u05e3 \u05e9\u05d1\u05dc\u05d8 \u05dc\u05e2\u05d9\u05e0\u05d9\u05d9 \u05d4\u05d5\u05d0 \u05e9\u05d1\u05d7\u05d5\u05d3\u05e9 \u05d4\u05d0\u05d7\u05e8\u05d5\u05df \u05dc\u05d0 \u05d4\u05d9\u05d5 \u05db\u05e0\u05d9\u05e1\u05d5\u05ea \u05dc\u05de\u05e2\u05e8\u05db\u05ea \u05db\u05dc\u05dc. \u05d6\u05d4 \u05d1\u05d3\u05e8\u05da \u05db\u05dc\u05dc \u05e1\u05d9\u05de\u05df \u05e9\u05db\u05d3\u05d0\u05d9 \u05dc\u05d1\u05d3\u05d5\u05e7 \u05e9\u05d4\u05db\u05dc \u05ea\u05e7\u05d9\u05df, \u05d5\u05d0\u05e9\u05de\u05d7 \u05dc\u05e2\u05d6\u05d5\u05e8 \u05dc\u05e2\u05d5\u05e8\u05e8 \u05d0\u05ea \u05d4\u05de\u05e9\u05ea\u05de\u05e9\u05d9\u05dd \u05d1\u05d7\u05d6\u05e8\u05d4.';
    else if(r.daysOld>90)riskLine='\n\n\u05de\u05d4 \u05e9\u05d1\u05dc\u05d8 \u05dc\u05e2\u05d9\u05e0\u05d9\u05d9 \u05d4\u05d5\u05d0 \u05e9\u05d4\u05ea\u05d5\u05db\u05df \u05dc\u05d0 \u05e2\u05d5\u05d3\u05db\u05df \u05db\u05d1\u05e8 '+r.daysOld+' \u05d9\u05de\u05d9\u05dd. \u05db\u05e9\u05d4\u05ea\u05d5\u05db\u05df \u05d9\u05e9\u05df, \u05d4\u05de\u05e9\u05ea\u05de\u05e9\u05d9\u05dd \u05e0\u05d5\u05d8\u05d9\u05dd \u05dc\u05d4\u05e1\u05ea\u05de\u05da \u05e2\u05dc\u05d9\u05d5 \u05e4\u05d7\u05d5\u05ea, \u05d5\u05d6\u05d4 \u05de\u05e9\u05d4\u05d5 \u05e9\u05e7\u05dc \u05dc\u05e9\u05e4\u05e8 \u05d9\u05d7\u05d3.';
    else if(r.licPct<30)riskLine='\n\n'+r.licPct+'% \u05e0\u05d9\u05e6\u05d5\u05dc \u05e9\u05dc \u05d4\u05e8\u05d9\u05e9\u05d9\u05d5\u05e0\u05d5\u05ea \u05d6\u05d4 \u05d4\u05e8\u05d1\u05d4 \u05de\u05ea\u05d7\u05ea \u05dc\u05de\u05d4 \u05e9\u05d0\u05e4\u05e9\u05e8. \u05d6\u05d4 \u05d0\u05d5\u05de\u05e8 \u05e9\u05d4\u05e8\u05d1\u05d4 \u05de\u05e9\u05ea\u05de\u05e9\u05d9\u05dd \u05e2\u05d3\u05d9\u05d9\u05df \u05dc\u05d0 \u05e0\u05d4\u05e0\u05d9\u05dd \u05de\u05d4\u05de\u05e2\u05e8\u05db\u05ea, \u05d5\u05e9\u05d5\u05d5\u05d4 \u05dc\u05e8\u05d0\u05d5\u05ea \u05d0\u05d9\u05da \u05de\u05e8\u05d7\u05d9\u05d1\u05d9\u05dd \u05d0\u05ea \u05d4\u05e9\u05d9\u05de\u05d5\u05e9.';
  }

  var goalLine=goal?('\n\n\u05d0\u05e0\u05d9 \u05d6\u05d5\u05db\u05e8 \u05e9\u05d4\u05de\u05d8\u05e8\u05d4 \u05e9\u05dc\u05db\u05dd \u05d4\u05d9\u05d0 "'+goal+'", \u05d5\u05d1\u05d5\u05d0\u05d5 \u05e0\u05d1\u05d3\u05d5\u05e7 \u05d9\u05d7\u05d3 \u05d0\u05d9\u05da \u05d4\u05e6\u05e2\u05d3\u05d9\u05dd \u05d4\u05d1\u05d0\u05d9\u05dd \u05d9\u05e7\u05e8\u05d1\u05d5 \u05d0\u05ea\u05db\u05dd \u05d0\u05dc\u05d9\u05d4.'):'';

  var aiLine=r.ai_enabled?('\n\n\u05e8\u05d0\u05d9\u05ea\u05d9 \u05e9\u05d0\u05ea\u05dd \u05db\u05d1\u05e8 \u05e2\u05d5\u05d1\u05d3\u05d9\u05dd \u05e2\u05dd \u05e8\u05db\u05d9\u05d1 \u05d4-AI \u2014 \u05d6\u05d4 \u05de\u05e6\u05d5\u05d9\u05df. \u05d0\u05e9\u05de\u05d7 \u05dc\u05e2\u05d1\u05d5\u05e8 \u05d0\u05d9\u05ea\u05db\u05dd \u05e2\u05dc\u05d9\u05d5 \u05e8\u05d2\u05e2 \u05db\u05d3\u05d9 \u05dc\u05d5\u05d5\u05d3\u05d0 \u05e9\u05d0\u05ea\u05dd \u05de\u05e4\u05d9\u05e7\u05d9\u05dd \u05de\u05de\u05e0\u05d5 \u05d0\u05ea \u05d4\u05de\u05e8\u05d1.'):'';

  var allMetricDefs=[
    {key:'content_stale',t:'\u05e8\u05e2\u05e0\u05d5\u05df \u05d4\u05ea\u05d5\u05db\u05df \u05d1\u05de\u05e2\u05e8\u05db\u05ea',cond:r.daysOld>90},
    {key:'no_logins',t:'\u05e2\u05d9\u05d3\u05d5\u05d3 \u05d4\u05de\u05e9\u05ea\u05de\u05e9\u05d9\u05dd \u05dc\u05d4\u05d9\u05db\u05e0\u05e1 \u05dc\u05de\u05e2\u05e8\u05db\u05ea',cond:r.logs===0},
    {key:'low_lic',t:'\u05d4\u05d2\u05d3\u05dc\u05ea \u05d4\u05e9\u05d9\u05de\u05d5\u05e9 \u05d1\u05e8\u05d9\u05e9\u05d9\u05d5\u05e0\u05d5\u05ea',cond:r.licPct<30&&r.license>0},
    {key:'no_exams',t:'\u05d4\u05d5\u05e1\u05e4\u05ea \u05de\u05d1\u05d7\u05e0\u05d9\u05dd \u05dc\u05e2\u05d5\u05d1\u05d3\u05d9\u05dd',cond:r.exams===0},
    {key:'no_tuts',t:'\u05d1\u05e0\u05d9\u05d9\u05ea \u05d4\u05d3\u05e8\u05db\u05d5\u05ea \u05dc\u05de\u05e9\u05ea\u05de\u05e9\u05d9\u05dd',cond:r.tuts===0},
    {key:'no_ras',t:'\u05d4\u05e4\u05e2\u05dc\u05ea \u05e7\u05e8\u05d9\u05d0\u05d4 \u05d5\u05d0\u05d9\u05e9\u05d5\u05e8 \u05e9\u05dc \u05de\u05e1\u05de\u05db\u05d9\u05dd',cond:r.ras===0},
    {key:'no_notifs',t:'\u05e9\u05dc\u05d9\u05d7\u05ea \u05d4\u05ea\u05e8\u05d0\u05d5\u05ea \u05dc\u05de\u05e9\u05ea\u05de\u05e9\u05d9\u05dd',cond:r.notifs===0},
    {key:'no_fbs',t:'\u05d0\u05d9\u05e1\u05d5\u05e3 \u05de\u05e9\u05d5\u05d1 \u05de\u05d4\u05de\u05e9\u05ea\u05de\u05e9\u05d9\u05dd',cond:r.fbs===0}
  ];
  var checkedMetric=(getCRM(r.id).checkedItems||[]);
  var openTasks=allMetricDefs.filter(function(d){return d.cond&&checkedMetric.indexOf(d.key)===-1;}).map(function(d){return '\u2022 '+d.t;});
  var tasksLine=openTasks.length>0?('\n\n\u05db\u05de\u05d4 \u05e0\u05e7\u05d5\u05d3\u05d5\u05ea \u05e9\u05d0\u05e9\u05de\u05d7 \u05dc\u05e2\u05d1\u05d5\u05e8 \u05e2\u05dc\u05d9\u05d4\u05df \u05d0\u05d9\u05ea\u05db\u05dd:\n'+openTasks.join('\n')):'';

  var ctas=[
    '\n\n\u05d0\u05e4\u05e9\u05e8 \u05dc\u05e7\u05d1\u05d5\u05e2 \u05e9\u05d9\u05d7\u05d4 \u05e7\u05e6\u05e8\u05d4 \u05e9\u05dc \u05e8\u05d1\u05e2 \u05e9\u05e2\u05d4 \u05d1\u05e9\u05d1\u05d5\u05e2 \u05d4\u05d1\u05d0?',
    '\n\n\u05d9\u05e9 \u05dc\u05db\u05dd \u05d6\u05de\u05df \u05dc\u05e9\u05d9\u05d7\u05d4 \u05e7\u05e6\u05e8\u05d4 \u05d1\u05d9\u05de\u05d9\u05dd \u05d4\u05e7\u05e8\u05d5\u05d1\u05d9\u05dd?',
    '\n\n\u05de\u05ea\u05d9 \u05e0\u05d5\u05d7 \u05dc\u05db\u05dd \u05dc\u05e9\u05d5\u05d7\u05d7 \u05db\u05de\u05d4 \u05d3\u05e7\u05d5\u05ea?'
  ];
  var ctaLine=ctas[idx];

  return greeting+'\n\n'+opening+riskLine+goalLine+aiLine+tasksLine+ctaLine+'\n\n\u05d1\u05d1\u05e8\u05db\u05d4,\n\u05e6\u05d5\u05d5\u05ea WYZE';
}

function refreshOutreach(r){
  var ta=document.getElementById('outreach-text');
  if(!ta)return;
  ta.value=buildOutreachMsg(r);
}
function copyOutreachMsg(){
  var ta=document.getElementById('outreach-text');
  var btn=document.getElementById('outreach-copy-btn');
  var lbl=document.getElementById('outreach-copy-label');
  if(!ta||!ta.value)return;
  navigator.clipboard.writeText(ta.value).then(function(){
    if(lbl)lbl.textContent='✓ הועתק!';
    if(btn){btn.classList.remove('bg-[#1a1916]');btn.classList.add('bg-[#2d7a4f]');}
    setTimeout(function(){
      if(lbl)lbl.textContent='📋 העתק הודעה למייל';
      if(btn){btn.classList.remove('bg-[#2d7a4f]');btn.classList.add('bg-[#1a1916]');}
    },2000);
  });
}

// ── 18. OPEN MODAL ────────────────────────────────────────────────────────────
function openModal(id){
  var r=DATA.find(function(x){return x.id===id;});if(!r)return;
  currentId=id;
  var _cei=document.getElementById('chart-event-input');if(_cei)_cei.value='';
  var _cpp=document.getElementById('chart-points-panel');if(_cpp)_cpp.classList.add('hidden');
  var colors=avc(r.name);var abg=colors[0];var afg=colors[1];
  var score=effectiveScore(r);
  var status=liveStatus(score);
  var bc=status==='healthy'?'#2d7a4f':status==='warning'?'#8a5c00':'#9b2929';
  var pc={healthy:'pill-ok',warning:'pill-warn',critical:'pill-crit'};
  var sl={critical:'קריטי',warning:'בינוני',healthy:'בריא'};
  var crm=getCRM(id);

  document.getElementById('modal-header').innerHTML=
    '<div class="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center text-[16px] font-bold" style="background:'+abg+';color:'+afg+'">'+ini(r.name)+'</div>'+
    '<div class="flex-1 min-w-0"><div class="text-[18px] font-semibold text-[#1a1916] leading-tight">'+r.name+'</div><div class="text-[14px] text-gray-400">'+r.domain+'</div></div>'+
    '<span class="status-live-pill pill '+pc[status]+' text-[13px] font-bold px-2.5 py-1 rounded-full flex-shrink-0">'+sl[status]+'</span>'+
    '<button onclick="closeModal()" class="w-7 h-7 rounded-lg border border-black/10 bg-white hover:bg-[#f0efe9] flex items-center justify-center text-gray-500 transition-colors flex-shrink-0"><i class="fa-solid fa-xmark text-[14px]"></i></button>';

  document.getElementById('modal-score').textContent=score;
  document.getElementById('modal-score').style.color=bc;
  document.getElementById('modal-score-bar').style.width=score+'%';
  document.getElementById('modal-score-bar').style.background=bc;
  document.getElementById('modal-score-sub').textContent='מתוך 100 · '+sl[status];
  // Score breakdown (transparency) — shows how the base score is composed.
  var bd=calcBreakdown({active:r.active,logs:r.logs,objects:r.objects,license:r.license,daysOld:r.daysOld,locked:r.locked,ras:r.ras,exams:r.exams,tuts:r.tuts,fbs:r.fbs});
  var crmB=getCRM(r.id);var bonus=((crmB.checkedItems||[]).length+(crmB.customChecked||[]).length)*10;
  var bdItems=[
    ['פעילות (כניסות)',bd.engagement+'/30','#1a5fa8'],
    ['בניית תוכן',bd.content+'/30','#2d7a4f'],
    ['אימוץ פיצ\'רים',bd.features+'/25','#6b3fa8'],
    ['רעננות תוכן',bd.fresh+'/15','#8a5c00']
  ];
  if(bd.recencyPenalty>0)bdItems.push(['קנס עדכון','-'+bd.recencyPenalty,'#9b2929']);
  if(bd.blockedPenalty>0)bdItems.push(['קנס חסומים','-'+bd.blockedPenalty,'#9b2929']);
  if(bonus>0)bdItems.push(['בונוס משימות','+'+bonus,'#2d7a4f']);
  var sbEl=document.getElementById('score-breakdown');
  if(sbEl)sbEl.innerHTML=bdItems.map(function(it){
    return '<div class="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-[#f5f4f0]"><span class="text-[13px] text-gray-500">'+it[0]+'</span><span class="text-[14px] font-semibold mono" style="color:'+it[2]+'">'+it[1]+'</span></div>';
  }).join('');

  var stats=[['רשיונות',r.license],['פעילים',r.active],['נעולים',r.locked||0],['כניסות/30י',r.logs||0],['מאמרים',r.objects],['ניצול',r.licPct+'%']];
  document.getElementById('stats-grid').innerHTML=stats.map(function(s){return '<div class="bg-[#f5f4f0] rounded-lg px-3 py-2.5"><div class="text-[14px] text-gray-400 font-medium mb-0.5">'+s[0]+'</div><div class="text-[16px] font-semibold mono text-[#1a1916]">'+s[1]+'</div></div>';}).join('');
  document.getElementById('last-update-row').innerHTML='עדכון אחרון: <strong class="text-gray-600">'+(r.rawDate||'—')+'</strong>'+(r.daysOld<9999?' · '+fd(r.rawDate):'');

  var feats=[['חתימה ואישור',r.ras],['מבחנים',r.exams],['הדרכות',r.tuts],['התראות',r.notifs],['פידבקים',r.fbs]];
  document.getElementById('features-row').innerHTML=feats.map(function(f){return '<span class="text-[14px] px-2.5 py-1 rounded-md border font-medium '+(f[1]>0?'bg-[#e8f5ee] text-[#2d7a4f] border-[#a8d9bb]':'bg-[#f0efe9] text-gray-400 border-black/[0.10]')+'">'+f[0]+(f[1]>0?' · '+f[1]:'')+'</span>';}).join('');

  var thresh=Math.max(r.active*0.6,1);
  var risks=[];
  if(r.daysOld>90)risks.push({t:'bad',tx:'תוכן לא עודכן '+r.daysOld+' ימים'});
  else if(r.daysOld>30)risks.push({t:'warn',tx:'תוכן עודכן לפני '+r.daysOld+' ימים'});
  else risks.push({t:'ok',tx:'תוכן עודכן לאחרונה ('+r.daysOld+' ימים)'});
  if(r.logs===0)risks.push({t:'bad',tx:'אפס כניסות ב-30 יום'});
  else if(r.logs<thresh)risks.push({t:'warn',tx:'כניסות נמוכות ('+r.logs+'/'+r.active+')'});
  else risks.push({t:'ok',tx:'כניסות תקינות ('+r.logs+' ב-30 יום)'});
  if(r.licPct<20&&r.license>0)risks.push({t:'bad',tx:'ניצול נמוך מאוד ('+r.licPct+'%)'});
  else if(r.licPct<50&&r.license>0)risks.push({t:'warn',tx:'ניצול בינוני ('+r.licPct+'%)'});
  else if(r.license>0)risks.push({t:'ok',tx:'ניצול טוב ('+r.licPct+'%)'});
  if(r.featCount===0)risks.push({t:'bad',tx:"לא משתמש באף פיצ'ר נוסף"});
  else if(r.featCount<3)risks.push({t:'warn',tx:r.featCount+" פיצ'רים פעילים מתוך 5"});
  else risks.push({t:'ok',tx:r.featCount+" פיצ'רים פעילים"});
  var rCls={ok:'bg-[#e8f5ee] text-[#1f5e3a]',warn:'bg-[#fef4dc] text-[#6b4800]',bad:'bg-[#fdeaea] text-[#7a1f1f]'};
  document.getElementById('risk-rows').innerHTML=risks.map(function(item){return '<div class="text-[16px] px-3 py-2.5 rounded-lg '+rCls[item.t]+'">'+item.tx+'</div>';}).join('');

  document.getElementById('crm-contact').value=crm.contact||'';
  document.getElementById('crm-goal').value=crm.goal||'';

  var aiActive=r.ai_enabled===true;
  document.getElementById('ai-yes').className='ai-btn flex-1 py-1.5 text-[14px] font-semibold border rounded-lg text-center '+(aiActive?'bg-[#e8f5ee] text-[#2d7a4f] border-[#a8d9bb]':'bg-[#f0efe9] text-gray-500 border-black/10');
  document.getElementById('ai-no').className='ai-btn flex-1 py-1.5 text-[14px] font-semibold border rounded-lg text-center '+(!aiActive?'bg-[#fdeaea] text-[#9b2929] border-[#f5a8a8]':'bg-[#f0efe9] text-gray-500 border-black/10');

  renderChecklist(r,crm);
  refreshOutreach(r);
  document.getElementById('modal-site-link').href='https://'+r.domain;
  document.getElementById('modal-overlay').classList.remove('hidden');
  document.body.style.overflow='hidden';
  setTimeout(function(){renderChart(r);},60);
}

// ── 19. CLOSE MODAL ───────────────────────────────────────────────────────────
function closeModal(){
  document.getElementById('modal-overlay').classList.add('hidden');
  document.body.style.overflow='';
  currentId=null;
  if(evolutionChart){evolutionChart.destroy();evolutionChart=null;}
}
function handleOverlayClick(e){if(e.target===document.getElementById('modal-overlay'))closeModal();}
document.addEventListener('keydown',function(e){if(e.key==='Escape')closeModal();});

// ── 20. CHART ─────────────────────────────────────────────────────────────────
// ── CHART POINT MANAGEMENT (delete / revert points) ──────────────────────────
function toggleChartManage(){
  var panel=document.getElementById('chart-points-panel');
  if(!panel)return;
  panel.classList.toggle('hidden');
  if(!panel.classList.contains('hidden')){
    var r=DATA.find(function(x){return x.id===currentId;});
    if(r)renderChartPoints(r);
  }
}
function renderChartPoints(r){
  var list=document.getElementById('chart-points-list');
  if(!list)return;
  var history=getHistory(r.id)||[];
  if(!history.length){list.innerHTML='<div class="text-[13px] text-gray-400 py-1">אין נקודות בגרף.</div>';return;}
  list.innerHTML=history.map(function(p,i){
    var labels=(p.labels&&p.labels.length)?p.labels.join(' · '):(p.label||'נקודה');
    var when=fmtDate(p.date);
    return '<div class="flex items-center gap-2 p-2 rounded-lg border border-black/[0.10] bg-[#f5f4f0]">'+
      '<div class="flex-1 min-w-0"><div class="text-[14px] font-medium text-[#1a1916] truncate">'+labels+'</div><div class="text-[13px] text-gray-400">'+when+' · ציון '+p.score+'</div></div>'+
      '<button onclick="deleteChartPoint('+i+')" class="flex-shrink-0 p-1.5 rounded hover:bg-red-50 transition-colors" title="מחק נקודה"><i class="fa-solid fa-trash text-gray-300 hover:text-red-500 text-[14px] transition-colors"></i></button>'+
    '</div>';
  }).join('');
}
function deleteChartPoint(index){
  var r=DATA.find(function(x){return x.id===currentId;});if(!r)return;
  var history=getHistory(r.id)||[];
  if(index<0||index>=history.length)return;
  var point=history[index];
  if(!window.confirm('למחוק את הנקודה הזו מהגרף? משימות שסומנו בנקודה זו יחזרו לרשימת המשימות הפתוחות.'))return;
  // Any "בוצע: X" labels on this point → uncheck the matching tasks so they return to open.
  var crm=getCRM(r.id);
  var labels=(point.labels&&point.labels.length)?point.labels:(point.label?[point.label]:[]);
  // Build label→key map from the shared metric labels.
  var labelToKey={};
  Object.keys(METRIC_LABELS).forEach(function(k){labelToKey[METRIC_LABELS[k]]=k;});
  labels.forEach(function(l){
    var taskName=l.indexOf('בוצע: ')===0?l.substring(6):'';
    if(!taskName)return;
    var mk=labelToKey[taskName];
    if(mk){crm.checkedItems=(crm.checkedItems||[]).filter(function(k){return k!==mk;});}
    var ci=(crm.customChecklistItems||[]).find(function(it){return it.t===taskName;});
    if(ci){crm.customChecked=(crm.customChecked||[]).filter(function(k){return k!==ci.key;});}
  });
  saveCRM(r.id,crm);
  // Remove the point itself.
  history.splice(index,1);
  saveHistory(r.id,history);
  renderChecklist(r,crm);
  renderChart(r);
  renderChartPoints(r);
  updateModalScore(r);
  refreshOutreach(r);
  render();
  updateMetrics();
  showToast('הנקודה נמחקה מהגרף ✓');
}

function renderChart(r){
  var canvas=document.getElementById('evolution-canvas');if(!canvas)return;
  var history=getHistory(r.id);
  if(!history||history.length<2){history=buildMockHistory(r);saveHistory(r.id,history);}
  var liveH=effectiveScore(r);
  // Keep the most recent point in sync with the live score (no sentinel assumed).
  if(history.length)history[history.length-1].score=liveH;
  var status=liveStatus(liveH);
  var lineColor=status==='healthy'?'#2d7a4f':status==='warning'?'#c07800':'#9b2929';
  var fillColor=status==='healthy'?'rgba(45,122,79,0.08)':status==='warning'?'rgba(192,120,0,0.08)':'rgba(155,41,41,0.08)';
  var chartLabels=history.map(function(p){return fmtDate(p.date);});
  var chartScores=history.map(function(p){return p.score;});
  var evtLabels=history.map(function(p){return (p.labels&&p.labels.length)?p.labels:(p.label?[p.label]:['']);});
  if(evolutionChart){evolutionChart.destroy();evolutionChart=null;}
  evolutionChart=new Chart(canvas,{
    type:'line',
    data:{labels:chartLabels,datasets:[{data:chartScores,borderColor:lineColor,backgroundColor:fillColor,borderWidth:2.5,pointBackgroundColor:lineColor,pointBorderColor:'#fff',pointBorderWidth:2,pointRadius:6,pointHoverRadius:9,fill:true,tension:0.4}]},
    options:{
      responsive:true,maintainAspectRatio:false,
      interaction:{mode:'index',intersect:false},
      layout:{padding:{top:16,right:16,bottom:8,left:8}},
      scales:{
        y:{min:0,max:100,
          title:{display:true,text:'ציון בריאות',font:{family:"'DM Sans',sans-serif",size:10,weight:'600'},color:'#9ca3af'},
          ticks:{stepSize:10,font:{family:"'DM Mono',monospace",size:9},color:'#9ca3af',padding:4},
          grid:{color:'rgba(0,0,0,0.06)',drawTicks:false},
          border:{dash:[3,3],color:'rgba(0,0,0,0.1)'}},
        x:{title:{display:true,text:'ציר זמן',font:{family:"'DM Sans',sans-serif",size:10,weight:'600'},color:'#9ca3af'},
          ticks:{font:{family:"'DM Mono',monospace",size:9},color:'#9ca3af',maxRotation:30,maxTicksLimit:8},
          grid:{display:false},border:{color:'rgba(0,0,0,0.1)'}}
      },
      plugins:{
        legend:{display:false},
        tooltip:{
          backgroundColor:'#1a1916',
          titleFont:{family:"'DM Sans',sans-serif",size:12,weight:'600'},
          bodyFont:{family:"'DM Sans',sans-serif",size:11},
          padding:12,cornerRadius:10,
          displayColors:false,
          callbacks:{
            title:function(ctx){return 'תאריך: '+chartLabels[ctx[0].dataIndex]+' · ציון: '+ctx[0].parsed.y;},
            label:function(ctx){
              var arr=evtLabels[ctx.dataIndex]||[''];
              return arr;
            }
          }
        }
      },
      animation:{duration:400,easing:'easeOutQuart'}
    }
  });
}

// ── 21. ADD CHART EVENT ───────────────────────────────────────────────────────
function addChartEvent(){
  if(!currentId)return;
  var input=document.getElementById('chart-event-input');
  var label=(input.value||'').trim();if(!label)return;
  var r=DATA.find(function(x){return x.id===currentId;});if(!r)return;
  var itemKey='custom_'+Date.now();
  var crm=getCRM(currentId);
  var customItems=crm.customChecklistItems||[];
  customItems.push({key:itemKey,t:label,d:fmtDate(new Date().toISOString()),p:'custom'});
  crm.customChecklistItems=customItems;
  var customChecked=crm.customChecked||[];
  customChecked.push(itemKey);
  crm.customChecked=customChecked;
  saveCRM(currentId,crm);
  var newScore=effectiveScore(r);
  // Stack onto today's point so multiple same-day events share one X position.
  pushHistoryEvent(r,'בוצע: '+label,newScore);
  input.value='';
  renderChecklist(r,crm);
  renderChart(r);
  updateModalScore(r);
  refreshOutreach(r);
  render();
  updateMetrics();
  showToast('אירוע נוסף — ציון עודכן ✓');
}

// ── 22. FILE UPLOAD ───────────────────────────────────────────────────────────
function handleFile(e){
  var file=e.target.files[0];if(!file)return;
  document.getElementById('loadbar').classList.remove('hidden');
  var reader=new FileReader();
  reader.onload=function(ev){
    try{
      var wb=XLSX.read(ev.target.result,{type:'array',raw:true});
      var ws=wb.Sheets[wb.SheetNames[0]];
      var all=XLSX.utils.sheet_to_json(ws,{header:1,defval:''});
      var hr=-1;
      for(var i=0;i<Math.min(all.length,15);i++){
        if(all[i].some(function(c){var s=String(c||'').toLowerCase();return s.indexOf('workspace_id')!==-1||s.indexOf('workspace_name')!==-1||s.indexOf('license')!==-1||s==='workspace_id';})){hr=i;break;}
      }
      if(hr===-1){showToast('לא נמצאו כותרות');document.getElementById('loadbar').classList.add('hidden');return;}
      var hmap=mapH(all[hr]);
      var rows=[];
      for(var j=hr+1;j<all.length;j++){if(all[j].some(function(v){return v!==''&&v!=null;}))rows.push(all[j]);}
      var newRows=processRows(rows,hmap);

      // SMART MERGE: preserve all localStorage progress for existing customers.
      // Only overwrite basic Excel-sourced fields; never touch history/checklist/CRM.
      newRows.forEach(function(incoming){
        var existing=DATA.find(function(d){return d.id===incoming.id;});
        if(existing){
          // Customer exists — update only the metrics that come from the Excel file
          existing.name=incoming.name;
          existing.domain=incoming.domain;
          existing.license=incoming.license;
          existing.active=incoming.active;
          existing.locked=incoming.locked;
          existing.logs=incoming.logs;
          existing.objects=incoming.objects;
          existing.rawDate=incoming.rawDate;
          existing.daysOld=incoming.daysOld;
          existing.licPct=incoming.licPct;
          existing.ras=incoming.ras;
          existing.exams=incoming.exams;
          existing.tuts=incoming.tuts;
          existing.notifs=incoming.notifs;
          existing.fbs=incoming.fbs;
          existing.featCount=incoming.featCount;
          existing.baseHealth=incoming.baseHealth;
          // Keep: history, checklist states, CRM fields, ai_enabled — all untouched
        } else {
          // Brand-new customer — add with fresh state, restore any localStorage if exists
          var crm=getCRM(incoming.id);
          incoming.ai_enabled=crm.ai_enabled===true;
          DATA.push(incoming);
        }
      });

      // Remove customers that no longer appear in the uploaded file
      // (optional — comment out the next line to keep removed customers visible)
      DATA=DATA.filter(function(d){return newRows.some(function(n){return n.id===d.id;});});

      // Snapshot: record today's real score for every customer so the chart shows true progress
      var uploadDate=new Date().toISOString();
      var uploadLabel='עדכון נתונים — '+new Date().toLocaleDateString('he-IL');
      DATA.forEach(function(r){
        var snap=effectiveScore(r);
        // Use the same stacking helper so a same-day upload joins today's point
        // (raises Y, keeps X) instead of creating a duplicate column.
        pushHistoryEvent(r,uploadLabel,snap);
      });

      loadedAt=new Date();
      try{localStorage.setItem('succentra_loaded_at',loadedAt.toISOString());}catch(e){}
      saveDataset();
      updateMetrics();render();
      showToast('בוצע מיזוג: '+newRows.length+' לקוחות, התקדמות נשמרה ✓');
    }catch(err){showToast('שגיאה: '+err.message);}
    document.getElementById('loadbar').classList.add('hidden');
    e.target.value='';
  };
  reader.readAsArrayBuffer(file);
}

// ── 23. EXPORT ────────────────────────────────────────────────────────────────
// ── FULL BACKUP / RESTORE ─────────────────────────────────────────────────────
// Captures EVERYTHING: the dataset, the load timestamp, and every per-customer
// CRM entry (crm_<id>) and history entry (sh_<id>). This is the user's safety net
// in case localStorage is cleared, or to move data between browsers/computers.
function exportBackup(){
  var backup={
    version:1,
    exportedAt:new Date().toISOString(),
    dataset:[],
    loadedAt:null,
    crm:{},
    history:{}
  };
  try{var ds=localStorage.getItem('succentra_dataset');if(ds)backup.dataset=JSON.parse(ds);}catch(e){}
  try{backup.loadedAt=localStorage.getItem('succentra_loaded_at')||null;}catch(e){}
  // Walk all localStorage keys and grab every crm_ and sh_ entry.
  try{
    for(var i=0;i<localStorage.length;i++){
      var k=localStorage.key(i);
      if(!k)continue;
      if(k.indexOf('crm_')===0){try{backup.crm[k]=JSON.parse(localStorage.getItem(k));}catch(e){backup.crm[k]=localStorage.getItem(k);}}
      else if(k.indexOf('sh_')===0){try{backup.history[k]=JSON.parse(localStorage.getItem(k));}catch(e){backup.history[k]=localStorage.getItem(k);}}
    }
  }catch(e){}
  var blob=new Blob([JSON.stringify(backup,null,2)],{type:'application/json;charset=utf-8'});
  var a=document.createElement('a');
  a.href=URL.createObjectURL(blob);
  var d=new Date();
  var stamp=d.getFullYear()+('0'+(d.getMonth()+1)).slice(-2)+('0'+d.getDate()).slice(-2);
  a.download='succentra-backup-'+stamp+'.json';
  document.body.appendChild(a);a.click();document.body.removeChild(a);
  showToast('גיבוי מלא הורד בהצלחה ✓');
}

function handleRestore(e){
  var file=e.target.files[0];if(!file){return;}
  if(!window.confirm('שחזור מגיבוי יחליף את כל הנתונים הנוכחיים במערכת בנתונים מהקובץ. להמשיך?')){e.target.value='';return;}
  var reader=new FileReader();
  reader.onload=function(ev){
    try{
      var backup=JSON.parse(ev.target.result);
      if(!backup||!backup.version){showToast('קובץ גיבוי לא תקין');e.target.value='';return;}
      // Restore dataset + timestamp
      if(backup.dataset)localStorage.setItem('succentra_dataset',JSON.stringify(backup.dataset));
      if(backup.loadedAt)localStorage.setItem('succentra_loaded_at',backup.loadedAt);
      // Restore every CRM + history entry
      if(backup.crm){Object.keys(backup.crm).forEach(function(k){localStorage.setItem(k,JSON.stringify(backup.crm[k]));});}
      if(backup.history){Object.keys(backup.history).forEach(function(k){localStorage.setItem(k,JSON.stringify(backup.history[k]));});}
      // Reload the dataset into memory and refresh the UI.
      DATA=loadSavedDataset();
      applyStoredOverrides(DATA);
      try{var _la=localStorage.getItem('succentra_loaded_at');if(_la)loadedAt=new Date(_la);}catch(e2){}
      updateMetrics();render();
      showToast('שוחזר מגיבוי: '+DATA.length+' לקוחות ✓');
    }catch(err){showToast('שגיאה בשחזור: '+err.message);}
    e.target.value='';
  };
  reader.readAsText(file);
}

function exportCritical(){
  var crit=DATA.filter(function(r){var s=liveStatus(effectiveScore(r));return s==='critical'||s==='warning';});
  if(!crit.length){showToast('אין לקוחות לייצוא');return;}
  var rows=[['שם','דומיין','Health Score','סטטוס','כניסות','ניצול','מצב AI','עדכון אחרון']];
  crit.forEach(function(r){var s=effectiveScore(r);rows.push([r.name,r.domain,s,liveStatus(s)==='critical'?'קריטי':'בינוני',r.logs,r.licPct+'%',r.ai_enabled?'פעיל':'לא פעיל',r.rawDate]);});
  var csv=rows.map(function(r){return r.map(function(v){return '"'+String(v).replace(/"/g,'""')+'"';}).join(',');}).join('\n');
  var blob=new Blob(['\uFEFF'+csv],{type:'text/csv;charset=utf-8'});
  var a=document.createElement('a');
  a.href=URL.createObjectURL(blob);
  a.download='cs-critical-customers.csv';
  document.body.appendChild(a);a.click();document.body.removeChild(a);
}

// ── 24. TOAST ─────────────────────────────────────────────────────────────────
function showToast(msg){
  var t=document.getElementById('toast');
  t.textContent=msg;t.classList.remove('hidden');
  clearTimeout(t._timer);
  t._timer=setTimeout(function(){t.classList.add('hidden');},2500);
}

// -- 25. INIT ----------------------------------------------------------------
// Access control is handled entirely by Cloudflare Access (server-side, before
// the page loads). No login screen in the app — the dashboard loads directly.
function doLogout(){ window.location.reload(); }

document.addEventListener('DOMContentLoaded', function(){
  updateMetrics();
  render();
});
