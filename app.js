// =============================================================================
// app.js — SucCentra Dashboard
// =============================================================================

// ── 1. CUSTOMER DATA ─────────────────────────────────────────────────────────
const RAW = [{"workspace_id":"27","workspace_name":"Samsung","frontend_domain":"samsung.wyze1.info","License":"110","active_users":"77","locked_users":"2","log_30_days":"75","active_objects":"3646","last_updated_article":"24/05/2026 10:47:36 PM","ReadAndSign":"828","Exams":"1","Tutorials":"31","Notifications":"310","Feedbacks":"1503"},{"workspace_id":"34","workspace_name":"AFI Hotels","frontend_domain":"afi-hotels.wyze1.info","License":"70","active_users":"62","locked_users":"1","log_30_days":"18","active_objects":"407","last_updated_article":"25/05/2026 7:18:01 AM","ReadAndSign":"1","Exams":"","Tutorials":"1","Notifications":"8","Feedbacks":""},{"workspace_id":"39","workspace_name":"Consist","frontend_domain":"consist.wyze1.info","License":"70","active_users":"64","locked_users":"1","log_30_days":"29","active_objects":"232","last_updated_article":"4/05/2026 1:07:11 PM","ReadAndSign":"","Exams":"1","Tutorials":"","Notifications":"","Feedbacks":"4"},{"workspace_id":"41","workspace_name":"019 Mobile","frontend_domain":"019mobile.wyze1.info","License":"10","active_users":"3","locked_users":"","log_30_days":"","active_objects":"22","last_updated_article":"21/07/2022 12:20:47 PM","ReadAndSign":"","Exams":"","Tutorials":"","Notifications":"","Feedbacks":""},{"workspace_id":"43","workspace_name":"Kfar Saba","frontend_domain":"kspedia.wyze1.info","License":"40","active_users":"44","locked_users":"","log_30_days":"32","active_objects":"2904","last_updated_article":"24/05/2026 2:46:42 PM","ReadAndSign":"","Exams":"","Tutorials":"1","Notifications":"","Feedbacks":"936"},{"workspace_id":"44","workspace_name":"Labor","frontend_domain":"labor.wyze1.info","License":"10","active_users":"9","locked_users":"","log_30_days":"","active_objects":"105","last_updated_article":"22/12/2025 12:08:25 PM","ReadAndSign":"","Exams":"","Tutorials":"","Notifications":"","Feedbacks":"2"},{"workspace_id":"48","workspace_name":"Rfura Veezra","frontend_domain":"refua-vezrah.wyze1.info","License":"10","active_users":"10","locked_users":"","log_30_days":"5","active_objects":"1779","last_updated_article":"18/05/2026 6:50:13 AM","ReadAndSign":"7","Exams":"","Tutorials":"","Notifications":"45","Feedbacks":"38"},{"workspace_id":"49","workspace_name":"DMC Service","frontend_domain":"servicedmc.wyze1.info","License":"6","active_users":"6","locked_users":"","log_30_days":"1","active_objects":"58","last_updated_article":"22/02/2026 2:18:01 PM","ReadAndSign":"","Exams":"","Tutorials":"","Notifications":"","Feedbacks":""},{"workspace_id":"50","workspace_name":"COMASCO","frontend_domain":"comasco.wyze1.info","License":"22","active_users":"22","locked_users":"","log_30_days":"13","active_objects":"519","last_updated_article":"27/04/2026 6:31:56 AM","ReadAndSign":"","Exams":"","Tutorials":"17","Notifications":"","Feedbacks":""},{"workspace_id":"51","workspace_name":"Morning","frontend_domain":"morning.wyze1.info","License":"50","active_users":"45","locked_users":"","log_30_days":"39","active_objects":"1321","last_updated_article":"25/05/2026 8:01:33 AM","ReadAndSign":"","Exams":"","Tutorials":"1","Notifications":"39","Feedbacks":"15"},{"workspace_id":"57","workspace_name":"Haifa Staff","frontend_domain":"ihelpcenter.haifa.ac.il","License":"70","active_users":"32","locked_users":"","log_30_days":"19","active_objects":"702","last_updated_article":"24/05/2026 3:38:45 PM","ReadAndSign":"26","Exams":"3","Tutorials":"","Notifications":"","Feedbacks":"16"},{"workspace_id":"58","workspace_name":"Haifa Students","frontend_domain":"helpcenter.haifa.ac.il","License":"70","active_users":"32","locked_users":"","log_30_days":"19","active_objects":"191","last_updated_article":"20/05/2026 10:24:18 AM","ReadAndSign":"","Exams":"","Tutorials":"","Notifications":"","Feedbacks":"50"},{"workspace_id":"60","workspace_name":"Free TV","frontend_domain":"freetv.wyze1.info","License":"32","active_users":"13","locked_users":"2","log_30_days":"4","active_objects":"45","last_updated_article":"21/05/2026 5:58:56 AM","ReadAndSign":"","Exams":"","Tutorials":"","Notifications":"","Feedbacks":""},{"workspace_id":"61","workspace_name":"Info Peres","frontend_domain":"infoperes.wyze1.info","License":"23","active_users":"18","locked_users":"","log_30_days":"17","active_objects":"80","last_updated_article":"25/05/2026 7:38:46 AM","ReadAndSign":"","Exams":"","Tutorials":"","Notifications":"29","Feedbacks":""},{"workspace_id":"65","workspace_name":"MAP","frontend_domain":"mapi-bynetos.wyze1.info","License":"50","active_users":"18","locked_users":"","log_30_days":"3","active_objects":"265","last_updated_article":"19/12/2024 7:02:36 PM","ReadAndSign":"","Exams":"","Tutorials":"","Notifications":"37","Feedbacks":"4"},{"workspace_id":"66","workspace_name":"Nitzoley Shoa","frontend_domain":"holocaust-survivors-bynetos.wyze1.info","License":"50","active_users":"18","locked_users":"","log_30_days":"3","active_objects":"147","last_updated_article":"3/04/2025 6:53:09 AM","ReadAndSign":"","Exams":"","Tutorials":"","Notifications":"10","Feedbacks":"3"},{"workspace_id":"67","workspace_name":"Shuk Hon","frontend_domain":"shukhahon-bynetos.wyze1.info","License":"50","active_users":"18","locked_users":"","log_30_days":"3","active_objects":"61","last_updated_article":"15/10/2024 8:09:58 AM","ReadAndSign":"","Exams":"","Tutorials":"","Notifications":"1","Feedbacks":""},{"workspace_id":"68","workspace_name":"Sonol","frontend_domain":"sonol.wyze1.info","License":"15","active_users":"13","locked_users":"","log_30_days":"5","active_objects":"129","last_updated_article":"9/02/2026 3:29:54 PM","ReadAndSign":"","Exams":"","Tutorials":"","Notifications":"","Feedbacks":""},{"workspace_id":"74","workspace_name":"Potain","frontend_domain":"potain.wyze1.info","License":"17","active_users":"17","locked_users":"","log_30_days":"3","active_objects":"90","last_updated_article":"24/12/2025 6:27:19 AM","ReadAndSign":"","Exams":"","Tutorials":"","Notifications":"","Feedbacks":""},{"workspace_id":"76","workspace_name":"Aspire Demo","frontend_domain":"aspire-demo.wyze1.info","License":"6","active_users":"2","locked_users":"","log_30_days":"","active_objects":"5","last_updated_article":"15/03/2023 3:24:42 PM","ReadAndSign":"","Exams":"","Tutorials":"","Notifications":"","Feedbacks":"1"},{"workspace_id":"80","workspace_name":"Union Mobility","frontend_domain":"union-mobility.wyze1.info","License":"40","active_users":"40","locked_users":"1","log_30_days":"30","active_objects":"292","last_updated_article":"24/05/2026 4:33:10 AM","ReadAndSign":"2","Exams":"","Tutorials":"","Notifications":"","Feedbacks":"9"},{"workspace_id":"81","workspace_name":"Netzivot","frontend_domain":"netzivot-bynetos.wyze1.info","License":"50","active_users":"18","locked_users":"","log_30_days":"3","active_objects":"154","last_updated_article":"24/05/2026 11:33:58 AM","ReadAndSign":"","Exams":"","Tutorials":"","Notifications":"","Feedbacks":""},{"workspace_id":"85","workspace_name":"LEGO","frontend_domain":"lego-support.wyze1.info","License":"8","active_users":"6","locked_users":"","log_30_days":"","active_objects":"23","last_updated_article":"22/07/2025 10:16:16 AM","ReadAndSign":"","Exams":"","Tutorials":"","Notifications":"2","Feedbacks":"1"},{"workspace_id":"87","workspace_name":"Grow","frontend_domain":"grow.wyze1.info","License":"50","active_users":"48","locked_users":"","log_30_days":"42","active_objects":"381","last_updated_article":"20/05/2026 6:32:44 AM","ReadAndSign":"2","Exams":"","Tutorials":"","Notifications":"33","Feedbacks":"434"},{"workspace_id":"92","workspace_name":"Safe Tec","frontend_domain":"safe-tec.wyze1.info","License":"5","active_users":"5","locked_users":"","log_30_days":"5","active_objects":"524","last_updated_article":"24/05/2026 2:23:39 PM","ReadAndSign":"","Exams":"","Tutorials":"","Notifications":"","Feedbacks":""},{"workspace_id":"97","workspace_name":"Sendix","frontend_domain":"sendix.wyze1.info","License":"70","active_users":"64","locked_users":"1","log_30_days":"29","active_objects":"14","last_updated_article":"9/11/2023 1:40:00 PM","ReadAndSign":"","Exams":"","Tutorials":"","Notifications":"","Feedbacks":""},{"workspace_id":"98","workspace_name":"Population-Immigration","frontend_domain":"population-immigration.wyze1.info","License":"115","active_users":"107","locked_users":"","log_30_days":"85","active_objects":"628","last_updated_article":"24/05/2026 10:56:34 AM","ReadAndSign":"468","Exams":"2","Tutorials":"","Notifications":"104","Feedbacks":"126"},{"workspace_id":"101","workspace_name":"SysAid","frontend_domain":"sysaid.wyze1.info","License":"20","active_users":"15","locked_users":"","log_30_days":"8","active_objects":"198","last_updated_article":"18/03/2026 11:06:44 AM","ReadAndSign":"","Exams":"","Tutorials":"","Notifications":"","Feedbacks":""},{"workspace_id":"102","workspace_name":"Internet Rimon","frontend_domain":"rimon.wyze1.info","License":"150","active_users":"136","locked_users":"1","log_30_days":"128","active_objects":"843","last_updated_article":"25/05/2026 8:16:28 AM","ReadAndSign":"36","Exams":"8","Tutorials":"3","Notifications":"","Feedbacks":"2201"},{"workspace_id":"103","workspace_name":"Yad2 Service","frontend_domain":"service.yad2.co.il","License":"2","active_users":"3","locked_users":"","log_30_days":"2","active_objects":"143","last_updated_article":"24/05/2026 8:55:17 AM","ReadAndSign":"","Exams":"","Tutorials":"","Notifications":"","Feedbacks":"2"},{"workspace_id":"104","workspace_name":"RMI","frontend_domain":"rmi.wyze1.info","License":"204","active_users":"193","locked_users":"2","log_30_days":"46","active_objects":"70","last_updated_article":"25/05/2026 7:55:58 AM","ReadAndSign":"4","Exams":"","Tutorials":"1","Notifications":"1","Feedbacks":"33"},{"workspace_id":"105","workspace_name":"Brother","frontend_domain":"brother.wyze1.info","License":"10","active_users":"10","locked_users":"","log_30_days":"8","active_objects":"3083","last_updated_article":"25/05/2026 7:54:27 AM","ReadAndSign":"","Exams":"","Tutorials":"","Notifications":"","Feedbacks":"2"},{"workspace_id":"106","workspace_name":"Pantum","frontend_domain":"pantum.wyze1.info","License":"10","active_users":"10","locked_users":"","log_30_days":"8","active_objects":"93","last_updated_article":"14/04/2026 2:25:13 PM","ReadAndSign":"","Exams":"","Tutorials":"","Notifications":"","Feedbacks":""},{"workspace_id":"107","workspace_name":"Comax","frontend_domain":"comax.wyze1.info","License":"120","active_users":"113","locked_users":"1","log_30_days":"63","active_objects":"3272","last_updated_article":"25/05/2026 6:41:49 AM","ReadAndSign":"65","Exams":"1","Tutorials":"","Notifications":"293","Feedbacks":"1799"},{"workspace_id":"108","workspace_name":"Atlas","frontend_domain":"atlas.wyze1.info","License":"10","active_users":"8","locked_users":"","log_30_days":"","active_objects":"53","last_updated_article":"18/01/2026 12:36:22 PM","ReadAndSign":"1","Exams":"","Tutorials":"","Notifications":"54","Feedbacks":""},{"workspace_id":"111","workspace_name":"Cibus","frontend_domain":"cibus.wyze1.info","License":"100","active_users":"95","locked_users":"","log_30_days":"79","active_objects":"146","last_updated_article":"25/05/2026 7:27:44 AM","ReadAndSign":"4","Exams":"","Tutorials":"","Notifications":"","Feedbacks":"37"},{"workspace_id":"112","workspace_name":"Winner","frontend_domain":"winner.wyze1.info","License":"52","active_users":"44","locked_users":"","log_30_days":"37","active_objects":"92","last_updated_article":"25/05/2026 7:47:00 AM","ReadAndSign":"6","Exams":"1","Tutorials":"","Notifications":"113","Feedbacks":"75"},{"workspace_id":"116","workspace_name":"ContigoPlus","frontend_domain":"contigo-plus.wyze1.info","License":"3","active_users":"3","locked_users":"","log_30_days":"","active_objects":"7","last_updated_article":"17/07/2024 11:17:36 PM","ReadAndSign":"","Exams":"","Tutorials":"","Notifications":"","Feedbacks":""},{"workspace_id":"118","workspace_name":"Ben Gurion","frontend_domain":"bgu.wyze1.info","License":"30","active_users":"29","locked_users":"1","log_30_days":"20","active_objects":"156","last_updated_article":"20/05/2026 10:34:21 AM","ReadAndSign":"1","Exams":"1","Tutorials":"","Notifications":"2","Feedbacks":"39"},{"workspace_id":"122","workspace_name":"Mayven","frontend_domain":"mayven.wyze1.info","License":"26","active_users":"22","locked_users":"","log_30_days":"19","active_objects":"631","last_updated_article":"24/05/2026 6:35:41 PM","ReadAndSign":"1","Exams":"","Tutorials":"","Notifications":"9","Feedbacks":"138"},{"workspace_id":"123","workspace_name":"Metaylim","frontend_domain":"travelhotels.wyze1.info","License":"10","active_users":"10","locked_users":"","log_30_days":"7","active_objects":"351","last_updated_article":"19/05/2026 7:58:56 AM","ReadAndSign":"","Exams":"","Tutorials":"","Notifications":"","Feedbacks":""},{"workspace_id":"124","workspace_name":"Aspire","frontend_domain":"aspire-new.wyze1.info","License":"14","active_users":"14","locked_users":"","log_30_days":"17","active_objects":"174","last_updated_article":"18/05/2026 9:17:10 AM","ReadAndSign":"","Exams":"","Tutorials":"1","Notifications":"","Feedbacks":""},{"workspace_id":"125","workspace_name":"R-Cure","frontend_domain":"rcure.wyze1.info","License":"35","active_users":"22","locked_users":"","log_30_days":"12","active_objects":"162","last_updated_article":"25/05/2026 8:27:11 AM","ReadAndSign":"2","Exams":"","Tutorials":"","Notifications":"10","Feedbacks":"2"},{"workspace_id":"126","workspace_name":"Super Pharm","frontend_domain":"super-pharm.wyze1.info","License":"40","active_users":"40","locked_users":"","log_30_days":"27","active_objects":"350","last_updated_article":"19/05/2026 3:44:58 PM","ReadAndSign":"1","Exams":"","Tutorials":"","Notifications":"2","Feedbacks":"63"},{"workspace_id":"127","workspace_name":"Local Elections","frontend_domain":"local-elections.wyze1.info","License":"10","active_users":"10","locked_users":"","log_30_days":"2","active_objects":"45","last_updated_article":"19/03/2026 4:47:43 PM","ReadAndSign":"","Exams":"","Tutorials":"","Notifications":"","Feedbacks":""},{"workspace_id":"128","workspace_name":"Amisragas IL New","frontend_domain":"amisragaz-info-new.wyze1.info","License":"210","active_users":"197","locked_users":"1","log_30_days":"138","active_objects":"540","last_updated_article":"25/05/2026 4:44:02 AM","ReadAndSign":"35","Exams":"6","Tutorials":"196","Notifications":"","Feedbacks":"409"},{"workspace_id":"129","workspace_name":"Movement Group","frontend_domain":"movement-group.wyze1.info","License":"25","active_users":"25","locked_users":"","log_30_days":"10","active_objects":"349","last_updated_article":"28/04/2026 12:54:55 PM","ReadAndSign":"2","Exams":"","Tutorials":"","Notifications":"","Feedbacks":""},{"workspace_id":"132","workspace_name":"Kfar Saba New","frontend_domain":"kspedia-new.wyze1.info","License":"40","active_users":"44","locked_users":"","log_30_days":"32","active_objects":"508","last_updated_article":"25/05/2026 8:27:59 AM","ReadAndSign":"","Exams":"","Tutorials":"","Notifications":"","Feedbacks":""},{"workspace_id":"133","workspace_name":"Shamir MC IT","frontend_domain":"shamirhospital-it.wyze1.info","License":"100","active_users":"100","locked_users":"1","log_30_days":"36","active_objects":"27","last_updated_article":"4/01/2026 8:25:26 AM","ReadAndSign":"","Exams":"","Tutorials":"","Notifications":"1","Feedbacks":""},{"workspace_id":"134","workspace_name":"Shamir MC Service","frontend_domain":"shamirhospital-zimun.wyze1.info","License":"100","active_users":"100","locked_users":"1","log_30_days":"36","active_objects":"372","last_updated_article":"25/05/2026 8:32:14 AM","ReadAndSign":"1","Exams":"","Tutorials":"","Notifications":"","Feedbacks":"327"},{"workspace_id":"135","workspace_name":"Caesarea Development Company","frontend_domain":"caesarea.wyze1.info","License":"20","active_users":"18","locked_users":"","log_30_days":"3","active_objects":"71","last_updated_article":"25/03/2026 6:52:43 AM","ReadAndSign":"3","Exams":"","Tutorials":"","Notifications":"","Feedbacks":"4"},{"workspace_id":"137","workspace_name":"H&M","frontend_domain":"hm.wyze1.info","License":"10","active_users":"10","locked_users":"","log_30_days":"7","active_objects":"295","last_updated_article":"24/05/2026 1:01:23 PM","ReadAndSign":"2","Exams":"5","Tutorials":"1","Notifications":"69","Feedbacks":"65"},{"workspace_id":"139","workspace_name":"Fire Department","frontend_domain":"fdept.wyze1.info","License":"52","active_users":"44","locked_users":"","log_30_days":"37","active_objects":"299","last_updated_article":"25/05/2026 8:09:23 AM","ReadAndSign":"92","Exams":"","Tutorials":"","Notifications":"1","Feedbacks":"113"},{"workspace_id":"140","workspace_name":"ERN","frontend_domain":"ern.wyze1.info","License":"130","active_users":"102","locked_users":"3","log_30_days":"51","active_objects":"390","last_updated_article":"25/05/2026 5:46:32 AM","ReadAndSign":"","Exams":"","Tutorials":"1","Notifications":"","Feedbacks":"104"},{"workspace_id":"141","workspace_name":"sherizly","frontend_domain":"sherizly.wyze1.info","License":"1","active_users":"","locked_users":"","log_30_days":"","active_objects":"9","last_updated_article":"6/02/2025 2:05:07 PM","ReadAndSign":"","Exams":"","Tutorials":"","Notifications":"","Feedbacks":""},{"workspace_id":"142","workspace_name":"Consist Test","frontend_domain":"consist-test.wyze1.info","License":"0","active_users":"","locked_users":"","log_30_days":"1","active_objects":"10","last_updated_article":"12/04/2026 7:45:37 AM","ReadAndSign":"2","Exams":"1","Tutorials":"1","Notifications":"1","Feedbacks":""},{"workspace_id":"143","workspace_name":"Pais","frontend_domain":"pais.wyze1.info","License":"80","active_users":"77","locked_users":"1","log_30_days":"66","active_objects":"161","last_updated_article":"24/05/2026 9:43:05 AM","ReadAndSign":"8","Exams":"","Tutorials":"40","Notifications":"","Feedbacks":"91"},{"workspace_id":"147","workspace_name":"Ben Security","frontend_domain":"bensecurity.wyze1.info","License":"5","active_users":"5","locked_users":"","log_30_days":"","active_objects":"487","last_updated_article":"11/08/2025 2:04:53 PM","ReadAndSign":"1","Exams":"","Tutorials":"1","Notifications":"1","Feedbacks":"1"},{"workspace_id":"148","workspace_name":"VMark","frontend_domain":"vmark.wyze1.info","License":"20","active_users":"16","locked_users":"1","log_30_days":"5","active_objects":"92","last_updated_article":"25/05/2026 8:31:19 AM","ReadAndSign":"","Exams":"","Tutorials":"","Notifications":"18","Feedbacks":""},{"workspace_id":"149","workspace_name":"Chromagen","frontend_domain":"chromagen.wyze1.info","License":"25","active_users":"22","locked_users":"","log_30_days":"17","active_objects":"169","last_updated_article":"19/05/2026 9:47:39 AM","ReadAndSign":"2","Exams":"","Tutorials":"1","Notifications":"2","Feedbacks":"80"},{"workspace_id":"150","workspace_name":"Alia Klita","frontend_domain":"aliaklita.wyze1.info","License":"30","active_users":"34","locked_users":"","log_30_days":"7","active_objects":"106","last_updated_article":"19/03/2026 8:08:21 AM","ReadAndSign":"1","Exams":"","Tutorials":"1","Notifications":"1","Feedbacks":"7"},{"workspace_id":"152","workspace_name":"TerminalX Partners","frontend_domain":"terminalx-partners.wyze1.info","License":"38","active_users":"42","locked_users":"","log_30_days":"28","active_objects":"137","last_updated_article":"30/10/2025 1:04:31 PM","ReadAndSign":"1","Exams":"","Tutorials":"1","Notifications":"1","Feedbacks":""},{"workspace_id":"153","workspace_name":"Ministry of Agriculture","frontend_domain":"moag.wyze1.info","License":"17","active_users":"17","locked_users":"","log_30_days":"15","active_objects":"628","last_updated_article":"21/05/2026 10:46:25 AM","ReadAndSign":"71","Exams":"","Tutorials":"3","Notifications":"1","Feedbacks":"33"},{"workspace_id":"154","workspace_name":"TerminalX","frontend_domain":"terminalx.wyze1.info","License":"38","active_users":"42","locked_users":"","log_30_days":"28","active_objects":"109","last_updated_article":"20/05/2026 10:46:54 AM","ReadAndSign":"","Exams":"","Tutorials":"","Notifications":"4","Feedbacks":""},{"workspace_id":"155","workspace_name":"Hadassah","frontend_domain":"hadassah.wyze1.info","License":"35","active_users":"32","locked_users":"","log_30_days":"29","active_objects":"166","last_updated_article":"10/05/2026 5:51:11 AM","ReadAndSign":"2","Exams":"","Tutorials":"4","Notifications":"","Feedbacks":"15"},{"workspace_id":"156","workspace_name":"IDFWO","frontend_domain":"idfwo.wyze1.info","License":"25","active_users":"25","locked_users":"","log_30_days":"14","active_objects":"119","last_updated_article":"25/05/2026 7:57:47 AM","ReadAndSign":"2","Exams":"1","Tutorials":"","Notifications":"20","Feedbacks":"57"},{"workspace_id":"158","workspace_name":"Pool","frontend_domain":"pool.wyze1.info","License":"42","active_users":"38","locked_users":"","log_30_days":"26","active_objects":"92","last_updated_article":"28/04/2026 12:25:36 PM","ReadAndSign":"11","Exams":"","Tutorials":"4","Notifications":"21","Feedbacks":"45"},{"workspace_id":"160","workspace_name":"Shamir MC Dimut","frontend_domain":"shamir-dimut.wyze1.info","License":"100","active_users":"100","locked_users":"1","log_30_days":"36","active_objects":"264","last_updated_article":"20/05/2026 12:13:21 PM","ReadAndSign":"10","Exams":"","Tutorials":"2","Notifications":"9","Feedbacks":"13"},{"workspace_id":"161","workspace_name":"Fandango","frontend_domain":"fandango.wyze1.info","License":"20","active_users":"20","locked_users":"","log_30_days":"19","active_objects":"65","last_updated_article":"19/05/2026 8:34:05 AM","ReadAndSign":"1","Exams":"","Tutorials":"2","Notifications":"1","Feedbacks":"14"},{"workspace_id":"163","workspace_name":"TerminalX Operations","frontend_domain":"terminalx-operations.wyze1.info","License":"38","active_users":"42","locked_users":"","log_30_days":"28","active_objects":"61","last_updated_article":"29/03/2026 10:19:21 AM","ReadAndSign":"1","Exams":"","Tutorials":"1","Notifications":"","Feedbacks":""},{"workspace_id":"164","workspace_name":"Cfir Jerusalem Railway","frontend_domain":"cfir.wyze1.info","License":"10","active_users":"8","locked_users":"","log_30_days":"5","active_objects":"45","last_updated_article":"26/04/2026 10:49:28 AM","ReadAndSign":"72","Exams":"","Tutorials":"","Notifications":"18","Feedbacks":"3"},{"workspace_id":"165","workspace_name":"Next Travel","frontend_domain":"nextravel.wyze1.info","License":"15","active_users":"13","locked_users":"","log_30_days":"13","active_objects":"63","last_updated_article":"19/05/2026 12:44:48 PM","ReadAndSign":"","Exams":"","Tutorials":"1","Notifications":"1","Feedbacks":""},{"workspace_id":"166","workspace_name":"Priority City","frontend_domain":"prioricity.wyze1.info","License":"15","active_users":"15","locked_users":"","log_30_days":"3","active_objects":"78","last_updated_article":"24/05/2026 12:45:43 PM","ReadAndSign":"","Exams":"","Tutorials":"","Notifications":"","Feedbacks":"2"},{"workspace_id":"167","workspace_name":"Israel-Canada Hotels","frontend_domain":"canada.wyze1.info","License":"50","active_users":"37","locked_users":"","log_30_days":"30","active_objects":"118","last_updated_article":"18/05/2026 5:41:24 AM","ReadAndSign":"9","Exams":"","Tutorials":"1","Notifications":"","Feedbacks":"20"},{"workspace_id":"168","workspace_name":"Syteca","frontend_domain":"syteca.wyze1.info","License":"5","active_users":"2","locked_users":"","log_30_days":"","active_objects":"7","last_updated_article":"5/02/2026 1:17:18 PM","ReadAndSign":"","Exams":"","Tutorials":"","Notifications":"","Feedbacks":""},{"workspace_id":"169","workspace_name":"IAA","frontend_domain":"iaa-hrinformation.wyze1.info","License":"60","active_users":"60","locked_users":"","log_30_days":"18","active_objects":"343","last_updated_article":"24/05/2026 8:26:57 AM","ReadAndSign":"1","Exams":"","Tutorials":"","Notifications":"2","Feedbacks":"24"},{"workspace_id":"170","workspace_name":"IBI Captial","frontend_domain":"ibicapital.wyze1.info","License":"130","active_users":"112","locked_users":"","log_30_days":"85","active_objects":"788","last_updated_article":"25/05/2026 5:44:45 AM","ReadAndSign":"1","Exams":"14","Tutorials":"1","Notifications":"","Feedbacks":"9"},{"workspace_id":"171","workspace_name":"Firearm Licensing Department","frontend_domain":"mops.wyze1.info","License":"60","active_users":"46","locked_users":"","log_30_days":"17","active_objects":"30","last_updated_article":"15/04/2026 7:18:23 AM","ReadAndSign":"6","Exams":"","Tutorials":"1","Notifications":"","Feedbacks":"11"},{"workspace_id":"172","workspace_name":"Hamei Gaash","frontend_domain":"gaash.wyze1.info","License":"15","active_users":"1","locked_users":"","log_30_days":"1","active_objects":"100","last_updated_article":"25/05/2026 8:29:26 AM","ReadAndSign":"","Exams":"","Tutorials":"","Notifications":"","Feedbacks":""},{"workspace_id":"173","workspace_name":"Alia Klita New","frontend_domain":"aliaklita-new.wyze1.info","License":"30","active_users":"34","locked_users":"","log_30_days":"7","active_objects":"50","last_updated_article":"24/05/2026 11:16:30 AM","ReadAndSign":"1","Exams":"4","Tutorials":"","Notifications":"3","Feedbacks":""},{"workspace_id":"174","workspace_name":"Pery","frontend_domain":"pery.wyze1.info","License":"50","active_users":"39","locked_users":"1","log_30_days":"41","active_objects":"63","last_updated_article":"12/05/2026 12:51:51 PM","ReadAndSign":"","Exams":"1","Tutorials":"","Notifications":"1","Feedbacks":"27"},{"workspace_id":"175","workspace_name":"Mor Medical","frontend_domain":"mor.wyze1.info","License":"40","active_users":"3","locked_users":"","log_30_days":"3","active_objects":"53","last_updated_article":"24/05/2026 7:23:22 AM","ReadAndSign":"","Exams":"","Tutorials":"","Notifications":"","Feedbacks":""},{"workspace_id":"176","workspace_name":"Rav Bariach","frontend_domain":"rb.wyze1.info","License":"30","active_users":"1","locked_users":"","log_30_days":"1","active_objects":"279","last_updated_article":"25/05/2026 7:27:26 AM","ReadAndSign":"","Exams":"","Tutorials":"","Notifications":"","Feedbacks":""}];

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

// ── 4. HEALTH SCORE ───────────────────────────────────────────────────────────
function calcBaseH(active,logs,daysOld,licPct,featCount){
  var cS=daysOld<=7?100:daysOld<=30?75:daysOld<=90?40:daysOld<=180?15:0;
  var thr=Math.max(active*0.6,1);
  var lS=logs>=thr?100:logs>0&&logs>=thr*0.5?50:logs>0?25:0;
  var liS=licPct>=80?100:licPct>=50?70:licPct>=30?40:licPct>=10?15:0;
  var fS=featCount>=4?100:featCount===3?75:featCount===2?50:featCount===1?25:0;
  return Math.round(cS*0.35+lS*0.30+liS*0.20+fS*0.15);
}
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
    var baseHealth=calcBaseH(active,logs,daysOld,licPct,featCount);
    return{id:id,name:name,domain:domain,license:license,active:active,locked:locked,logs:logs,objects:objects,rawDate:rawDate,daysOld:daysOld,licPct:licPct,ras:ras,exams:exams,tuts:tuts,notifs:notifs,fbs:fbs,featCount:featCount,baseHealth:baseHealth,ai_enabled:false};
  });
}
function applyStoredOverrides(arr){
  arr.forEach(function(r){var crm=getCRM(r.id);r.ai_enabled=crm.ai_enabled===true;});
}

// ── 7. STATE ──────────────────────────────────────────────────────────────────
var DATA=processRows(RAW,null);
applyStoredOverrides(DATA);
var loadedAt=new Date();
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
  document.getElementById('m0').textContent=DATA.length;
  var scores=DATA.map(function(r){return effectiveScore(r);});
  document.getElementById('m1').textContent=scores.filter(function(s){return liveStatus(s)==='healthy';}).length;
  document.getElementById('m2').textContent=scores.filter(function(s){return liveStatus(s)==='warning';}).length;
  document.getElementById('m3').textContent=scores.filter(function(s){return liveStatus(s)==='critical';}).length;
  var avg=DATA.length?Math.round(DATA.reduce(function(s,r){return s+r.licPct;},0)/DATA.length):0;
  document.getElementById('m4').textContent=avg+'%';
  var aiCount=DATA.filter(function(r){return r.ai_enabled===true;}).length;
  var aiPct=DATA.length?Math.round((aiCount/DATA.length)*100):0;
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
  document.getElementById('es').classList.toggle('hidden',data.length>0);
  var sl={critical:'קריטי',warning:'בינוני',healthy:'בריא'};
  var pc={healthy:'pill-ok',warning:'pill-warn',critical:'pill-crit'};
  document.getElementById('tb').innerHTML=data.map(function(r){
    var colors=avc(r.name);var abg=colors[0];var afg=colors[1];
    var score=effectiveScore(r);
    var status=liveStatus(score);
    var bc=status==='healthy'?'#2d7a4f':status==='warning'?'#8a5c00':'#9b2929';
    var aiBadge=r.ai_enabled?'<button onclick="event.stopPropagation();toggleAIRow(\''+r.id+'\')" class="text-[13px] font-semibold px-2.5 py-1 rounded-full bg-[#e8f5ee] text-[#2d7a4f] border border-[#a8d9bb] hover:bg-[#d4ecde] transition-colors cursor-pointer">✓ פעיל</button>':'<button onclick="event.stopPropagation();toggleAIRow(\''+r.id+'\')" class="text-[13px] font-medium px-2.5 py-1 rounded-full bg-[#f0efe9] text-gray-400 border border-black/[0.06] hover:bg-[#e8f0fb] hover:text-[#1a5fa8] hover:border-[#a8c4f0] transition-colors cursor-pointer">+ הוסף AI</button>';
    return '<tr class="border-b border-black/[0.04] hover:bg-[#f5f4f0] cursor-pointer transition-colors" onclick="openModal(\''+r.id+'\')">'+
      '<td class="px-3 py-2.5" style="width:20%"><div class="flex items-center gap-2.5"><div class="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-[12px] font-bold" style="background:'+abg+';color:'+afg+'">'+ini(r.name)+'</div><div><div class="font-semibold text-[16px] text-[#1a1916] leading-tight">'+r.name+'</div><div class="text-[14px] text-gray-400 leading-tight">'+r.domain+'</div></div></div></td>'+
      '<td class="px-3 py-2.5" style="width:12%"><div class="flex items-center gap-2"><div class="flex-1 h-1 bg-[#f0efe9] rounded-full overflow-hidden"><div class="h-full rounded-full" style="width:'+score+'%;background:'+bc+'"></div></div><span class="mono text-[14px] font-medium" style="color:'+bc+'">'+score+'</span></div></td>'+
      '<td class="px-3 py-2.5" style="width:10%"><span class="pill '+pc[status]+' text-[13px] font-semibold px-2 py-0.5 rounded-full">'+sl[status]+'</span></td>'+
      '<td class="px-3 py-2.5" style="width:10%">'+aiBadge+'</td>'+
      '<td class="px-3 py-2.5 text-[15px]" style="width:10%">'+(r.logs||'—')+'</td>'+
      '<td class="px-3 py-2.5 text-[15px]" style="width:10%">'+r.active+'/'+r.license+'</td>'+
      '<td class="px-3 py-2.5 text-[15px]" style="width:10%">'+r.licPct+'%</td>'+
      '<td class="px-3 py-2.5 text-[14px] text-gray-400" style="width:18%">'+fd(r.rawDate)+'</td>'+
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

  var allMetricLabels={content_stale:'עדכון תוכן דחוף',no_logins:'לקוח לא פעיל',low_lic:'ניצול רשיונות נמוך',no_exams:"הטמעת פיצ'ר מבחנים",no_tuts:'יצירת הדרכות',no_ras:'הפעלת Read & Sign',no_notifs:'הפעלת התראות',no_fbs:'הפעלת מנגנון פידבק'};
  var taskName=allMetricLabels[itemKey];
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
  if(r.daysOld>90)metricItems.push({key:'content_stale',p:'high',t:'עדכון תוכן דחוף',d:r.daysOld+' ימים ללא עדכון'});
  if(r.logs===0)metricItems.push({key:'no_logins',p:'high',t:'לקוח לא פעיל — פנייה דחופה',d:'אפס כניסות ב-30 יום'});
  if(r.licPct<30&&r.license>0)metricItems.push({key:'low_lic',p:'high',t:'ניצול רשיונות נמוך',d:r.licPct+'% — סיכון לאי-חידוש'});
  if(r.exams===0)metricItems.push({key:'no_exams',p:'med',t:"הטמעת פיצ'ר מבחנים",d:'לא נעשה שימוש עדיין'});
  if(r.tuts===0)metricItems.push({key:'no_tuts',p:'med',t:'יצירת הדרכות',d:'הדרכות לא מוגדרות'});
  if(r.ras===0)metricItems.push({key:'no_ras',p:'med',t:'הפעלת Read & Sign',d:'לא נעשה שימוש עדיין'});
  if(r.notifs===0)metricItems.push({key:'no_notifs',p:'med',t:'הפעלת התראות',d:'לא נעשה שימוש עדיין'});
  if(r.fbs===0)metricItems.push({key:'no_fbs',p:'med',t:'הפעלת מנגנון פידבק',d:'לא נעשה שימוש עדיין'});
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
    return '<div class="cl-item flex items-start gap-2.5 p-3 rounded-lg border border-black/[0.05] bg-white cursor-pointer select-none '+(isDone?'opacity-50':'')+'" onclick="toggleCheck(this,\''+item.key+'\',false)">'+mkBox(isDone)+'<div class="flex-1 min-w-0"><div class="flex items-center gap-1.5 mb-1">'+badge+'</div><div class="text-[16px] font-semibold text-[#1a1916]">'+item.t+'</div><div class="text-[14px] text-gray-400 mt-0.5">'+item.d+'</div></div></div>';
  }).join('');
  var customHTML=customItems.map(function(item){
    var isDone=checkedCustom.indexOf(item.key)!==-1;
    return '<div class="cl-item flex items-start gap-2.5 p-3 rounded-lg border border-black/[0.05] bg-white select-none '+(isDone?'opacity-50':'')+'">'+
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
  var status=liveStatus(score);
  var contact=(crm.contact||'').trim();
  var goal=(crm.goal||'').trim();
  var firstName=contact?contact.split(/[\s,\/]+/)[0]:'';
  var greeting=firstName?('\u05d4\u05d9\u05d9 '+firstName+','):'\u05e9\u05dc\u05d5\u05dd \u05e8\u05d1,';

  // Varied openers based on score band - rotated by workspace_id to avoid same text every time
  var openersLow=[
    '\u05e2\u05d1\u05e8\u05ea\u05d9 \u05e2\u05dc \u05d4\u05e0\u05ea\u05d5\u05e0\u05d9\u05dd \u05e9\u05dc '+r.name+' \u05d5\u05e8\u05e6\u05d9\u05ea\u05d9 \u05dc\u05e9\u05ea\u05e3 \u05db\u05de\u05d4 \u05ea\u05d5\u05d1\u05e0\u05d5\u05ea \u05e9\u05e2\u05dc\u05d5 \u2014 \u05d5\u05d9\u05e9 \u05d2\u05dd \u05db\u05de\u05d4 \u05d3\u05d1\u05e8\u05d9\u05dd \u05e9\u05d0\u05e4\u05e9\u05e8 \u05dc\u05e9\u05e4\u05e8 \u05d9\u05d7\u05d3.',
    '\u05e8\u05e6\u05d9\u05ea\u05d9 \u05dc\u05d1\u05d3\u05d5\u05e7 \u05d0\u05d9\u05ea\u05da \u2014 \u05e0\u05ea\u05d5\u05e0\u05d9 '+r.name+' \u05de\u05e6\u05d1\u05d9\u05e2\u05d9\u05dd \u05e9\u05d9\u05e9 \u05db\u05de\u05d4 \u05d4\u05d6\u05d3\u05de\u05e0\u05d5\u05d9\u05d5\u05ea \u05dc\u05e9\u05d9\u05e4\u05d5\u05e8 \u05e9\u05e2\u05d3\u05d9\u05d9\u05df \u05dc\u05d0 \u05e0\u05e0\u05e6\u05dc\u05d5.',
    '\u05e7\u05d9\u05d1\u05dc\u05ea\u05d9 \u05d0\u05ea \u05e0\u05ea\u05d5\u05e0\u05d9 '+r.name+' \u05dc\u05d7\u05d5\u05d3\u05e9 \u05d4\u05d0\u05d7\u05e8\u05d5\u05df \u05d5\u05e8\u05e6\u05d9\u05ea\u05d9 \u05dc\u05e9\u05d9\u05ea\u05e3 \u05de\u05d4 \u05d0\u05e0\u05d9 \u05e8\u05d5\u05d0\u05d4 \u05dc\u05e4\u05e0\u05d9 \u05e9\u05e0\u05e7\u05d1\u05e2 \u05d9\u05d7\u05d3 \u05e6\u05e2\u05d3\u05d9 \u05e4\u05e2\u05d5\u05dc\u05d4.'
  ];
  var openersGood=[
    '\u05d4\u05e0\u05ea\u05d5\u05e0\u05d9\u05dd \u05e9\u05dc '+r.name+' \u05e0\u05e8\u05d0\u05d9\u05dd \u05d8\u05d5\u05d1 \u05d1\u05d7\u05d5\u05d3\u05e9 \u05d4\u05d0\u05d7\u05e8\u05d5\u05df \u2014 \u05de\u05de\u05e9 \u05e9\u05de\u05d7 \u05dc\u05e8\u05d0\u05d5\u05ea \u05e9\u05d4\u05de\u05e2\u05e8\u05db\u05ea \u05e2\u05d5\u05d1\u05d3\u05ea \u05d1\u05e9\u05d1\u05d9\u05dc\u05db\u05dd.',
    '\u05d3\u05d5\u05e8\u05e9 \u05db\u05d1\u05d5\u05d3 \u05dc\u05e6\u05d5\u05d5\u05ea \u05d1-'+r.name+' \u05e2\u05dc \u05d4\u05ea\u05d5\u05e6\u05d0\u05d5\u05ea \u05d4\u05d8\u05d5\u05d1\u05d5\u05ea \u05e9\u05e8\u05d5\u05d0\u05d9\u05dd \u05d1\u05e0\u05ea\u05d5\u05e0\u05d9\u05dd \u2014 \u05d0\u05ea\u05dd \u05e2\u05d5\u05e9\u05d9\u05dd \u05e9\u05d9\u05de\u05d5\u05e9 \u05d0\u05de\u05d9\u05ea\u05d9 \u05d1\u05de\u05e2\u05e8\u05db\u05ea.',
    '\u05e8\u05d0\u05d9\u05ea\u05d9 \u05e9\u05d4\u05e4\u05e2\u05d9\u05dc\u05d5\u05ea \u05d1-'+r.name+' \u05d1\u05de\u05e6\u05d1 \u05d8\u05d5\u05d1 \u05d1\u05d7\u05d5\u05d3\u05e9\u05d9\u05dd \u05d4\u05d0\u05d7\u05e8\u05d5\u05e0\u05d9\u05dd. \u05d7\u05e9\u05d1\u05ea\u05d9 \u05e9\u05e9\u05d5\u05d5\u05d4 \u05dc\u05e2\u05e6\u05d5\u05e8 \u05e8\u05d2\u05e2 \u05d5\u05dc\u05e2\u05d3\u05db\u05df.'
  ];
  var idx=parseInt(r.id||'0')%3;
  var opening=(score<50)?openersLow[idx]:openersGood[idx];

  // Key risk sentence
  var riskLine='';
  if(score<50){
    if(r.logs===0)riskLine='\n\n\u05e9\u05d9\u05e0\u05d5\u05d9 \u05e7\u05e8\u05d9\u05d8\u05d9 \u05e9\u05e0\u05d9 \u05d1\u05e2\u05d9\u05e0\u05d9 \u05d4\u05d5\u05d0 \u05e9\u05d4\u05de\u05e2\u05e8\u05db\u05ea \u05dc\u05d0 \u05e0\u05d9\u05d2\u05e9\u05ea \u05db\u05dc\u05dc \u05d1-30 \u05d9\u05d5\u05dd \u05d4\u05d0\u05d7\u05e8\u05d5\u05e0\u05d9\u05dd. \u05d6\u05d4 \u05d1\u05d3\u05e8\u05da \u05db\u05dc\u05dc \u05de\u05e8\u05de\u05d6 \u05dc\u05d7\u05d9\u05db\u05d5\u05da \u05d1\u05ea\u05d4\u05dc\u05d9\u05da \u05d4\u05d0\u05d3\u05de\u05d9\u05e0\u05d9\u05e1\u05d8\u05e8\u05d8\u05d9\u05d1\u05d9, \u05d5\u05e8\u05d3\u05d9\u05ea\u05d9 \u05dc\u05d1\u05d3\u05d5\u05e7 \u05e9\u05d4\u05db\u05dc \u05d1\u05e1\u05d3\u05e8.';
    else if(r.daysOld>90)riskLine='\n\n\u05de\u05d4 \u05e9\u05de\u05e9\u05da \u05d0\u05ea \u05e2\u05d9\u05e0\u05d9 \u05d4\u05d5\u05d0 \u05e9\u05d4\u05ea\u05d5\u05db\u05df \u05dc\u05d0 \u05e2\u05d5\u05d3\u05da\u05df '+r.daysOld+' \u05d9\u05d5\u05dd. \u05ea\u05d5\u05db\u05df \u05d9\u05e9\u05df \u05de\u05d5\u05e8\u05d9\u05d3 \u05d0\u05ea \u05d4\u05de\u05e2\u05d5\u05e8\u05d1\u05d5\u05ea \u05d5\u05d0\u05ea \u05d4\u05d0\u05de\u05d5\u05df \u05e9\u05dc \u05d4\u05de\u05e9\u05ea\u05de\u05e9\u05d9\u05dd \u05d1\u05db\u05dc\u05d9 \u2014 \u05d6\u05d4 \u05de\u05e9\u05d4\u05d5 \u05e9\u05e0\u05d9\u05ea\u05df \u05dc\u05d8\u05e4\u05dc \u05d1\u05d5 \u05d1\u05d9\u05d7\u05d3.';
    else if(r.licPct<30)riskLine='\n\n'+r.licPct+'% \u05e0\u05d9\u05e6\u05d5\u05dc \u05e8\u05e9\u05d9\u05d5\u05e0\u05d5\u05ea \u05d6\u05d4 \u05d4\u05e8\u05d1\u05d4 \u05de\u05ea\u05d7\u05ea \u05de\u05d4\u05e4\u05d5\u05d8\u05e0\u05e6\u05d9\u05d0\u05dc. \u05d6\u05d4 \u05dc\u05d0 \u05e8\u05e7 \u05e2\u05e0\u05d9\u05d9\u05df \u05e9\u05dc \u05e2\u05dc\u05d5\u05ea \u05d4\u05e2\u05e8\u05da \u2014 \u05d6\u05d4 \u05d0\u05d5\u05de\u05e8 \u05e9\u05e2\u05e8\u05da \u05d7\u05d9\u05d3\u05d5\u05e9 \u05e2\u05dc\u05d5\u05dc \u05dc\u05d4\u05d9\u05d5\u05ea \u05d1\u05e1\u05db\u05e0\u05d4.';
  }

  // Goal
  var goalLine=goal?('\n\n\u05d0\u05e0\u05d9 \u05de\u05d1\u05d9\u05df \u05e9\u05d4\u05de\u05d8\u05e8\u05d4 \u05e9\u05dc\u05db\u05dd \u05e2\u05db\u05e9\u05d9\u05d5 \u05d4\u05d9\u05d0 "'+goal+'". \u05d1\u05d5\u05d0\u05d5 \u05e0\u05d1\u05d3\u05d5\u05e7 \u05d9\u05d7\u05d3 \u05d0\u05d9\u05da \u05d4\u05e2\u05d3\u05db\u05d5\u05df \u05d4\u05e0\u05db\u05d7\u05d9 \u05d9\u05db\u05d5\u05dc \u05dc\u05ea\u05de\u05d5\u05da \u05d1\u05d6\u05d4 \u05d8\u05d5\u05d1 \u05d9\u05d5\u05ea\u05e8.'):'';

  // AI
  var aiLine=r.ai_enabled?('\n\n\u05e9\u05de\u05ea\u05d9 \u05dc\u05e8\u05db\u05d9\u05d1 \u05d4-AI \u05e9\u05d0\u05ea\u05dd \u05db\u05d1\u05e8 \u05e2\u05d5\u05d1\u05d3\u05d9\u05dd \u05d0\u05d9\u05ea\u05d5 \u2014 \u05d6\u05d4 \u05de\u05e2\u05d5\u05dc\u05d4. \u05d0\u05e9\u05de\u05d7 \u05dc\u05e2\u05e9\u05d5\u05ea \u05e8\u05d0\u05d9\u05d5\u05df \u05e7\u05e6\u05e8 \u05d1\u05d9\u05d7\u05d3 \u05db\u05d3\u05d9 \u05dc\u05d5\u05d5\u05d3\u05d0 \u05e9\u05d0\u05ea\u05dd \u05de\u05e4\u05d9\u05e7\u05d9\u05dd \u05de\u05de\u05e0\u05d5 \u05d0\u05ea \u05d4\u05de\u05e7\u05e1\u05d9\u05de\u05d5\u05dd.'):'';

  // Open tasks
  var allMetricDefs=[
    {key:'content_stale',t:'\u05e2\u05d3\u05db\u05d5\u05df \u05ea\u05d5\u05db\u05df \u05d3\u05d7\u05d5\u05e3',cond:r.daysOld>90},
    {key:'no_logins',t:'\u05d4\u05d2\u05d1\u05e8\u05ea \u05e4\u05e2\u05d9\u05dc\u05d5\u05ea \u05de\u05e9\u05ea\u05de\u05e9\u05d9\u05dd',cond:r.logs===0},
    {key:'low_lic',t:'\u05d4\u05d2\u05d3\u05dc\u05ea \u05e0\u05d9\u05e6\u05d5\u05dc \u05e8\u05e9\u05d9\u05d5\u05e0\u05d5\u05ea',cond:r.licPct<30&&r.license>0},
    {key:'no_exams',t:'\u05d4\u05d8\u05de\u05e2\u05ea \u05de\u05d1\u05d7\u05e0\u05d9\u05dd',cond:r.exams===0},
    {key:'no_tuts',t:'\u05d9\u05e6\u05d9\u05e8\u05ea \u05d4\u05d3\u05e8\u05db\u05d5\u05ea',cond:r.tuts===0},
    {key:'no_ras',t:'\u05d4\u05e4\u05e2\u05dc\u05ea Read & Sign',cond:r.ras===0},
    {key:'no_notifs',t:'\u05d4\u05e4\u05e2\u05dc\u05ea \u05d4\u05ea\u05e8\u05d0\u05d5\u05ea',cond:r.notifs===0},
    {key:'no_fbs',t:'\u05d4\u05e4\u05e2\u05dc\u05ea \u05e4\u05d9\u05d3\u05d1\u05e7',cond:r.fbs===0}
  ];
  var checkedMetric=(getCRM(r.id).checkedItems||[]);
  var openTasks=allMetricDefs.filter(function(d){return d.cond&&checkedMetric.indexOf(d.key)===-1;}).map(function(d){return '\u2022 '+d.t;});

  var tasksLine=openTasks.length>0?('\n\n\u05d4\u05e0\u05e7\u05d5\u05d3\u05d5\u05ea \u05e9\u05d4\u05d9\u05d9\u05ea\u05d9 \u05e8\u05d5\u05e6\u05d4 \u05dc\u05e2\u05d1\u05d5\u05e8 \u05d0\u05d9\u05ea\u05da:\n'+openTasks.join('\n')):'';

  // Varied CTAs
  var ctas=[
    '\n\n\u05d0\u05e4\u05e9\u05e8 \u05dc\u05ea\u05d0\u05dd 15 \u05d3\u05e7\u05d5\u05ea \u05e7\u05e6\u05e8\u05d5\u05ea \u05d1\u05e9\u05d1\u05d5\u05e2 \u05d4\u05d1\u05d0?',
    '\n\n\u05d9\u05e9 \u05d6\u05de\u05df \u05dc\u05e9\u05d9\u05d7\u05d4 \u05e7\u05e6\u05e8\u05d4 \u05d1\u05e9\u05d1\u05d5\u05e2\u05d9\u05d9\u05dd \u05d4\u05e7\u05e8\u05d5\u05d1\u05d9\u05dd?',
    '\n\n\u05de\u05ea\u05d9 \u05e0\u05d5\u05d7 \u05dc\u05da \u05dc\u05e9\u05d9\u05d7\u05d4 \u05e7\u05e6\u05e8\u05d4?'
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

  var stats=[['רשיונות',r.license],['פעילים',r.active],['נעולים',r.locked||0],['כניסות/30י',r.logs||0],['מאמרים',r.objects],['ניצול',r.licPct+'%']];
  document.getElementById('stats-grid').innerHTML=stats.map(function(s){return '<div class="bg-[#f5f4f0] rounded-lg px-3 py-2.5"><div class="text-[14px] text-gray-400 font-medium mb-0.5">'+s[0]+'</div><div class="text-[16px] font-semibold mono text-[#1a1916]">'+s[1]+'</div></div>';}).join('');
  document.getElementById('last-update-row').innerHTML='עדכון אחרון: <strong class="text-gray-600">'+(r.rawDate||'—')+'</strong>'+(r.daysOld<9999?' · '+fd(r.rawDate):'');

  var feats=[['חתימה ואישור',r.ras],['מבחנים',r.exams],['הדרכות',r.tuts],['התראות',r.notifs],['פידבקים',r.fbs]];
  document.getElementById('features-row').innerHTML=feats.map(function(f){return '<span class="text-[14px] px-2.5 py-1 rounded-md border font-medium '+(f[1]>0?'bg-[#e8f5ee] text-[#2d7a4f] border-[#a8d9bb]':'bg-[#f0efe9] text-gray-400 border-black/[0.06]')+'">'+f[0]+(f[1]>0?' · '+f[1]:'')+'</span>';}).join('');

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

      loadedAt=new Date();updateMetrics();render();
      showToast('בוצע מיזוג: '+newRows.length+' לקוחות, התקדמות נשמרה ✓');
    }catch(err){showToast('שגיאה: '+err.message);}
    document.getElementById('loadbar').classList.add('hidden');
    e.target.value='';
  };
  reader.readAsArrayBuffer(file);
}

// ── 23. EXPORT ────────────────────────────────────────────────────────────────
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
