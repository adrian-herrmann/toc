'use strict';const cfg=require('./package').config,port=process.env.OPENSHIFT_NODEJS_PORT||cfg.webport,ipaddress=process.env.OPENSHIFT_NODEJS_IP||'*',http=require('http'),zlib=require('zlib'),fs=require('fs'),dgram=require('dgram'),router=function(p,u,w,x,y,z,A,B,C,D,F,G){const H=function(K,L,M,N,O,P,Q,R,S,U){const V={eF:(ea)=>(fa)=>(ga)=>ga[ea].toString()===fa.toString(),gF:(ea)=>(fa)=>(ga)=>ga[ea]>=fa,lF:(ea)=>(fa)=>(ga)=>ga[ea]<=fa,bF:(ea)=>(fa)=>(ga)=>ga[ea]>=fa.k&&ga[ea]<=fa.g},W=(ea,fa)=>ea.filter(V[fa.f](fa.k)(fa.v)),X=(ea)=>(fa)=>{return JSON.parse('{'+ea.reduce((ga,ha)=>ga.concat('"'+ha+'":"'+fa[ha]+'"'),[]).join(',')+'}')};let Y=null,Z=null,$=null,_=null,aa=null,ba=[],ca=null,da=null;switch(_=K.url.split('/'),Z=_[2],'_cmd'!==Z&&'undefined'==typeof O[Z]&&(O[Z]=[],O._all.push(Z),U.is_debug&&console.log('INDEX created',Z)),K.method){case'GET':switch(_.length){case 3:'_cmd'===Z?(Y=JSON.parse(P),U.is_debug&&console.log(typeof Y.cmd,typeof Y.sfunc),'object'==typeof Y.sfunc&&(U.is_debug&&console.log('sfunc',Y.sfunc),Function.apply(null,Y.sfunc)(O,20)),'string'==typeof Y.cmd&&(U.is_debug&&console.log(' cmd',Y.cmd),aa=Array.prototype.filter.call(O.commands,(ea)=>ea.cmd===Y.cmd),0<aa.length&&Function.apply(null,aa[0].sfunc)(O,20)),ba={command:'done'}):ba=O[Z];;break;case 4:if('_cmd'===Z){U.is_debug&&console.log('_CMD/commando',_[3]),aa=Array.prototype.filter.call(O.commands,(ea)=>ea.cmd===_[3]),0<aa.length&&(ba=Function.apply(null,aa[0].sfunc)(O,20)||{cmd:'no_results'});break}switch(_[3]){case'_filter':Y=JSON.parse(P),U.is_debug&&console.log('FILTER',Y),ba=Y.reduce(W,O[Z]);break;case'_structure':Y=JSON.parse(P),U.is_debug&&console.log('STRUCTURE',Y),ba=O[Z].map(X(Y));break;case'_combine':Y=JSON.parse(P),U.is_debug&&console.log('COMBINE',Y.filter,Y.structure),ba=Y.filter.reduce(W,O[Z]).map(X(Y.structure));break;default:ba=O[Z];}break;case 5:U.is_debug&&console.log('MIT FILTER',_[2],_[3],_[4]),ba=Array.prototype.filter.call(O[Z],(ea)=>new RegExp(_[4]).test(ea[_[3]]));;break;default:ba=[];}if(K.headers['accept-encoding']&&K.headers['accept-encoding'].match(/\bdeflate\b/)){let ea=new require('stream').Readable();ea.push(JSON.stringify(ba)),ea.push(null),U.is_debug&&console.time('DEFLATE'),L.writeHead(200,{'content-encoding':'deflate','content-type':'application/json'}),ea.pipe(require('zlib').createDeflate()).pipe(L),U.is_debug&&console.timeEnd('DEFLATE')}else U.is_debug&&console.time('NO ZIP'),L.writeHeader(200,{'Content-Type':'application/json'}),L.end(JSON.stringify(ba)),U.is_debug&&console.timeEnd('NO ZIP');U.is_debug&&console.log('REQUEST.URL',K.url,'ANZAHL DATENS\xC4TZE',ba.length);break;case'POST':switch(Y=JSON.parse(P),U.is_debug&&console.log('POST areq length',_.length),_.length){case 3:'_cmd'===Z?(console.log('MULTI_INDEX_POST'),Array.prototype.forEach.call(Y,(ea,fa)=>{ea._index=ea._index||'xxx',ea.bulk._id=ea.bulk._id||'MC'+fa.toString()+Date.now().toString(35),ea.bulk._ctime=ea.bulk._ctime||Date.now(),ea.bulk._utime=Date.now(),'undefined'==typeof O[ea._index]&&(env[ea._index]=[],O._all.push(ea._index)),O[ea._index].push(ea.bulk)}),L.writeHeader(200,{'Content-Type':'application/json'}),L.end(JSON.stringify({type:'multi_index_bulk_add'}))):(Y._id=Y._id||'MC'+Date.now().toString(35),Y._ctime=Y._ctime||Date.now(),Y._utime=Date.now(),O[Z].push(Y),L.writeHeader(200,{'Content-Type':'application/json'}),L.end(JSON.stringify(Y)),Array.prototype.filter.call(S,(ea)=>'add'===ea.ev)[0].cb(R,Z,Y._id,Y));break;case 4:'_bulk'===_[3]?(U.is_debug&&console.log('_bulk POST '),Array.prototype.forEach.call(Y,(ea,fa)=>{ea._id=ea._id||'MC'+fa.toString()+Date.now().toString(35),ea._ctime=ea._ctime||Date.now(),ea._utime=Date.now(),O[Z].push(ea)}),L.writeHeader(200,{'Content-Type':'application/json'}),L.end(JSON.stringify({type:'bulk_add'})),Array.prototype.filter.call(S,(ea)=>'badd'===ea.ev)[0].cb(R,Z,Y)):(U.is_debug&&console.log(_[3],' POST mit id'),Y._ctime=Date.now(),Y._utime=Date.now(),Y._id=_[3],O[Z].push(Y),L.writeHeader(200,{'Content-Type':'application/json'}),L.end(JSON.stringify(Y)),Array.prototype.filter.call(S,(ea)=>'add'===ea.ev)[0].cb(R,Z,Y._id,Y));break;case 5:'_cmd'===_[3]&&(U.is_debug&&console.log('spezielles POST Commando durch sendBeacon() aufgerufen'),'mail'===_[4]&&((ea)=>{const fa=require('net').Socket();let ha=0;fa.connect(ea.port,ea.server,()=>{console.log('mailServer connected',ea.from,ea.to,ea.subject,ea.body)}),fa.on('error',(ia)=>{console.log('mailClient error',ia)}),fa.on('close',()=>{console.log('mailClient close')}),fa.on('data',(ia)=>{console.log('<--',ha,'SMTP',Date.now(),ia.toString().slice(0,30)),/^220/.test(ia.toString())&&(ha++,fa.write('EHLO me\\r\\n'),console.log('\t\t\t\t\t\t\t\t-->SWMC',ha,'EHLO')),/^250/.test(ia.toString())&&1==ha&&(ha++,fa.write('MAIL FROM:'+ea.from+'\r\n'),console.log('\t\t\t\t\t\t\t\t-->SWMC',ha,'MAIL FROM',ea.from)),/^250 2\.1\.0/.test(ia.toString())&&2==ha&&(ha++,fa.write('RCPT TO:'+ea.to+'\r\n'),console.log('\t\t\t\t\t\t\t\t-->SWMC',ha,'RCPT TO',ea.to)),/^250 2\.1\.5/.test(ia.toString())&&3==ha&&(ha++,fa.write('DATA\r\n'),console.log('\t\t\t\t\t\t\t\t-->SWMC',ha,'DATA')),/^354 Start/.test(ia.toString())&&4==ha&&(ha++,fa.write('subject: sw '+ea.subject+'\r\n\r\nsw '+ea.body+'\r\n.\r\n'),console.log('\t\t\t\t\t\t\t\t-->SWMC',ha,'SUBJECT BODY',ea.subject,ea.body)),/^250 2\.6\.0/.test(ia.toString())&&5==ha&&(ha++,fa.write('QUIT\r\n'),console.log('\t\t\t\t\t\t\t\t-->SWMC',ha,'QUIT')),/^221 2\.0\.0/.test(ia.toString())&&6==ha&&fa.end()})})(Y),'schichtwechsel'===_[4]&&(aa=Array.prototype.filter.call(O.commands,(ea)=>'schichtwechsel'===ea.cmd),0<aa.length&&Function.apply(null,aa[0].sfunc)(O,20),Array.prototype.filter.call(S,(ea)=>'delete'===ea.ev)[0].cb(R,Z,_[4])),'monatswechsel'===_[4]&&(aa=Array.prototype.filter.call(O.commands,(ea)=>'monatswechsel'===ea.cmd),0<aa.length&&Function.apply(null,aa[0].sfunc)(O,20),Array.prototype.filter.call(S,(ea)=>'delete'===ea.ev)[0].cb(R,Z,_[4])),L.writeHeader(200,{'Content-Type':'application/json'}),L.end());}N(O);break;case'DELETE':switch(L.writeHeader(200,{'Content-Type':'application/json'}),U.is_debug&&console.log('DELETE areq length',_.length),_.length){case 3:U.is_debug&&console.log('DEL 3 alles wech'),aa=[],L.end(JSON.stringify({delete:!0,_id:'_all'}));break;case 4:U.is_debug&&console.log('DEL 4'),'_filter'===_[3]?(Y=JSON.parse(P),U.is_debug&&console.log('DEL FILTER',P),aa=Y.reduce(W,O[Z])):($=_[3],aa=Array.prototype.filter.call(O[Z],(ea)=>ea._id!==$)),L.end(JSON.stringify({delete:!0,_id:$})),Array.prototype.filter.call(S,(ea)=>'delete'===ea.ev)[0].cb(R,Z,$);break;case 5:U.is_debug&&console.log('DEL 5 key value delete'),ca=_[3],da=_[4],aa=Array.prototype.filter.call(O[Z],(ea)=>ea[ca].toString()!==da.toString()),U.is_debug&&console.log(aa.length,'Datens\xE4tze gefiltert'),L.end(JSON.stringify({delete:!0,_id:'_bulk'}));break;default:U.is_debug&&console.log('DEL default');}O[Z]=aa,N(O);break;case'PUT':switch($=_[3]||null,_.length){case 3:Y=JSON.parse(P),'_cmd'===Z?(U.is_debug&&console.log('MULTI_INDEX_PUT'),Y.forEach((ea)=>{let fa=Array.prototype.filter.call(O[ea._index],(ga)=>ga._id===ea._id);U.is_debug&&console.log(Z,O[ea._index].length,ea._id,ea.type,ea.value,fa.length),1===fa.length?(fa[0][ea.type]=ea.value,console.log(typeof fa[0].hist),fa[0].hist.push(ea.value),fa[0].hist.length>fa[0].hmax&&fa[0].hist.shift(),fa[0]._utime=Date.now(),U.is_debug&&console.log(ea._index,O[ea._index].length,' FOUND ',ea._id,ea.type,ea.value)):('kein Treffer',ea._id)})):(U.is_debug&&console.log('BULK UPDATE',Y.length),Y.forEach((ea)=>{let fa=Array.prototype.filter.call(O[Z],(ga)=>ga._id===ea._id);U.is_debug&&console.log(Z,O[Z].length,ea.id,ea.type,ea.value,fa.length),1===fa.length&&(fa[0][ea.type]=ea.value,fa[0]._utime=Date.now(),U.is_debug&&console.log(Z,O[Z].length,' FOUND ',ea.id,ea.type,ea.value))}),Array.prototype.filter.call(S,(ea)=>'bupdate'===ea.ev)[0].cb(R,Z,Y));break;case 4:Y=JSON.parse(P),'_bulk'===_[3]?(U.is_debug&&console.log('PUT bulk update'),Y.forEach((ea)=>{let fa=Array.prototype.filter.call(O[Z],(ga)=>ga._id===ea._id);console.log(Z,ea._id,ea.type,ea.value,fa.length),1===fa.length&&(fa[0][ea.type]=ea.value,fa[0]._utime=Date.now())})):(aa=Array.prototype.filter.call(O[Z],(ea)=>ea._id!==$),O[Z]=aa,O[Z].push(Y),Array.prototype.filter.call(S,(ea)=>'update'===ea.ev)[0].cb(R,Z,$,Y));break;case 5:Y=Array.prototype.filter.call(O[Z],(ea)=>ea._id===$)[0],Y[_[4]]=JSON.parse(P).value,Y._utime=Date.now(),Array.prototype.filter.call(S,(ea)=>'kvupdate'===ea.ev)[0].cb(R,Z,$,_[4],JSON.parse(P).value),U.is_debug&&console.log('KEY data VALUE Update',$,Z,_[4],JSON.parse(P).value);break;case 6:Y=Array.prototype.filter.call(O[Z],(ea)=>ea._id===$)[0],Y[_[4]]=_[5],Y._utime=Date.now(),Array.prototype.filter.call(S,(ea)=>'akvupdate'===ea.ev)[0].cb(R,Z,$,_[4],_[5]),U.is_debug&&console.log('KEY/VALUE Update',$,Z,_[4],_[5]);break;case 7:Y=Array.prototype.filter.call(O[Z],(ea)=>ea._id===$)[0],Y[_[4]].length>_[6]&&(Y[_[4]]=Y[_[4]].slice(1)),Y._utime=Date.now(),Y[_[4]].push(_[5]),Array.prototype.filter.call(S,(ea)=>'pkvupdate'===ea.ev)[0].cb(R,Z,$,_[4],_[5],_[6]),U.is_debug&&console.log('PUSH KEY Value update',$,Z,_[4],_[5],_[6]);}U.is_debug&&console.log('PUT_length',_.length,K.url),N(O),L.writeHeader(200,{'Content-Type':'application/json'}),L.end(JSON.stringify({update:!0,_id:$}));}};let I='',J=D;p.on('data',function(K){I+=K}),p.on('end',function(){if(void 0!==w){let K='';try{K=decodeURI(p.url)}catch(L){w.write('DECODEURI ERROR',L)}w.write(JSON.stringify({index:{_id:null}})+'\n'+JSON.stringify({time:new Date().toISOString(),'class':'INFO',type:'ROUTER',method:p.method,data:I,remote:p.connection.remoteAddress.split(':').pop(),path:K})+'\n')};y._log.push({time:new Date().toISOString(),'class':'INFO',type:'ROUTER',method:p.method,data:I,remote:p.connection.remoteAddress.split(':').pop(),path:p.url});switch(!0){case /rest\//.test(p.url):H(p,u,w,x,y,I,C,D,F,G);break;case /event-source/.test(p.url):console.log('EVENT-SOURCE created',p.connection.remoteAddress,p.connection.remotePort),p.on('close',()=>{J.subscribers=J.subscribers.filter((K)=>K!==u),console.log('close',J.subscribers.length),J.subscribers.length||(console.log('SUBACTIVE FALSE'),J.subactive=!1)}),u.writeHead(200,{Connection:'keep-alive','Content-Type':'text/event-stream','Cache-Control':'no-cache'}),u.write('retry:10000\nid:'+Date.now().toString(23)+'\ndata: {"type": "new","time":'+Date.now()+'}\n\n'),J.subscribers.push(u),console.log(J.subscribers.length,'NEW SUBS'),J.subactive||(J.subactive=!0,console.log('SUBACTIVE TRUE')),C(J);break;case /json/.test(p.url):u.writeHead(200,{'Content-Type':'application/json'}),u.end(JSON.stringify([{is:'me'},{you:'also'}],null,2));break;case /\/.*/.test(p.url):if(p.headers['accept-encoding']&&p.headers['accept-encoding'].match(/\bdeflate\b/)){let K=new require('stream').Readable();K.push(z[p.url.split('?')[0]]),K.push(null),cfg.is_debug&&console.time('CACHE_DEFLATE'),u.writeHead(200,{'content-encoding':'deflate','content-type':'text/html'}),K.pipe(require('zlib').createDeflate()).pipe(u),cfg.is_debug&&console.timeEnd('CACHE_DEFLATE'),G.is_debug&&console.log('CACHE FILE load',p.url)}else u.end(z[p.url.split('?')[0]]);break;default:u.writeHead(404),u.end('keine Route');}})},slog=cfg.is_log?(p)=>require('fs').createWriteStream(p,{flags:'a'})('./log/server.log'):void 0,mud=function(p,u,w,x,y,z,A,B,C){const D=require('dgram').createSocket('udp4'),F=new Buffer(12);F.writeUInt32BE(65536,0,4),F.writeUInt32BE(393475,4,4),F.writeInt16BE(w,8,2),F.writeInt16BE(x,10,2),D.send(F,0,F.length,u,p,(G)=>{if(G)throw G}),D.on('message',(G)=>{D.close(),y(G,p,z,A,B,C)})},esfm={keep:(p,u,w)=>{console.log('keepalive'),p.subactive&&(console.log('active keepalive',p.subscribers.length),p.subscribers.forEach((x,y,z)=>x.write('event: keep\nid:'+Date.now().toString(23)+'\ndata: {"type": "keep","table":"'+u+'","users":'+z.length+',"time":'+Date.now()+',"env":'+JSON.stringify(w)+'}\n\n')))},put:(p,u,w,x)=>{console.log('UPDATE CALLBACK se_update',u,w,x),p.subscribers.forEach((y,z,A)=>y.write('id:'+Date.now().toString(23)+'\nevent:update\ndata: {"tableid":"'+w+'","table":"'+u+'","type": "update","users":'+A.length+',"time":'+Date.now()+',"elem":'+JSON.stringify(x)+'}\n\n'))},bput:(p,u,w)=>{console.log('bulkKV-UPDATE CALLBACK se_bupdate',u,w),p.subscribers.forEach((x,y,z)=>x.write('id:'+Date.now().toString(23)+'\nevent:bupdate\ndata: {"table":"'+u+'","type": "update","users":'+z.length+',"time":'+Date.now()+',"value":'+JSON.stringify(w)+'}\n\n'))},kvput:(p,u,w,x,y)=>{console.log('KV-UPDATE CALLBACK se_update',u,w,x,y),p.subscribers.forEach((z,A,B)=>z.write('id:'+Date.now().toString(23)+'\nevent:kvupdate\ndata: {"tableid":"'+w+'","table":"'+u+'","type": "update","users":'+B.length+',"time":'+Date.now()+',"type":"'+x+'","value":'+y+'}\n\n'))},akvput:(p,u,w,x,y)=>{console.log('AKV-UPDATE CALLBACK se_update',u,w,x,y),p.subscribers.forEach((z,A,B)=>z.write('id:'+Date.now().toString(23)+'\nevent:akvupdate\ndata: {"tableid":"'+w+'","table":"'+u+'","type": "update","users":'+B.length+',"time":'+Date.now()+',"type":"'+x+'","value":'+y+'}\n\n'))},pkvput:(p,u,w,x,y,z)=>{console.log('PKV-UPDATE CALLBACK se_pkvupdate',u,w,x,y),p.subscribers.forEach((A,B,C)=>A.write('id:'+Date.now().toString(23)+'\nevent:pkvupdate\ndata: {"tableid":"'+w+'","table":"'+u+'","type": "update","users":'+C.length+',"time":'+Date.now()+',"type":"'+x+'","value":'+y+',"max":'+z+'}\n\n'))},delete:(p,u,w)=>{console.log('DELETE CALLBACK se_delete',u,w),p.subscribers.forEach((x,y,z)=>{x.write('id:'+Date.now().toString(23)+'\nevent:delete\ndata: {"tableid":"'+w+'","table":"'+u+'","type": "delete","users":'+z.length+',"time":'+Date.now()+'}\n\n')})},post:(p,u,w,x)=>{console.log('ADD CALLBACK se_add',u,x),p.subscribers.forEach((y,z,A)=>y.write('id:'+Date.now().toString(23)+'\nevent:add\ndata: {"tableid":"'+w+'","table":"'+u+'","type": "add","users":'+A.length+',"time":'+Date.now()+',"elem":'+JSON.stringify(x)+'}\n\n'))},bpost:(p,u,w)=>{console.log('BULK_ADD CALLBACK se_bulkadd',u,w),p.subscribers.forEach((x,y,z)=>x.write('id:'+Date.now().toString(23)+'\nevent:badd\ndata: {"table":"'+u+'","type": "add","users":'+z.length+',"time":'+Date.now()+',"elem":'+JSON.stringify(w)+'}\n\n'))}},cb=(p)=>env=p,sb=(p)=>sub=p,memcache={};let env={},sub={subscribers:[],subactive:!1},esm=[{ev:'add',cb:esfm.post},{ev:'badd',cb:esfm.bpost},{ev:'delete',cb:esfm.delete},{ev:'keep',cb:esfm.keep},{ev:'update',cb:esfm.put},{ev:'bupdate',cb:esfm.bput},{ev:'kvupdate',cb:esfm.kvput},{ev:'akvupdate',cb:esfm.akvput},{ev:'pkvupdate',cb:esfm.pkvput}],utime=Date.now();http.createServer((p,u)=>router(p,u,slog,cb,env,memcache,esfm.keep,cfg.table,sb,sub,esm,cfg)).listen(port,ipaddress,()=>{console.log(`SERVER listen on port ${cfg.host}:${cfg.webport}:${cfg.data}/${cfg.table} ...`)});const rf=(p)=>{fs.readFile('./data/'+p+'.'+cfg.flatdata,(u,w)=>{if(u)throw u;env[p]=JSON.parse(w)})},wf=(p)=>{fs.writeFile('./data/'+p+'.'+cfg.flatdata,JSON.stringify(env[p]),function(u){if(u)throw u})},rbf=(p)=>{const u=fs.createReadStream('./data/'+p+'.'+cfg.data),w=new require('stream').Writable();let x=[],y=0;cfg.is_debug&&console.log('RBF',p),w.on('error',(z)=>console.log('ERROR WRITESTREAM',p,z)),w.on('finish',()=>{cfg.is_debug&&console.log('Finish WRITESTREAM',p,x.length,y,typeof x[0]);let z=new Buffer(y);for(let B=0,C=x.length,D=0;B<C;B++)x[B].copy(z,D),D+=x[B].length;env[p]=JSON.parse(z.toString())}),w.write=(z)=>{cfg.is_debug&&console.log(p,'WRITE',z.length,y),x.push(z),y+=z.length},u.pipe(zlib.createInflate()).pipe(w)},wbf=(p)=>{let u=env[p].reduce((w,x)=>Math.max(w,x._utime),0);if(env._status.push({t:p+'|length:'+env[p].length+'|utime:'+u}),isNaN(u)||u<utime)cfg.is_debug&&console.log('WRITE NICHT N\xD6TIG',p);else{const w=fs.createWriteStream('./data/'+p+'.'+cfg.data),x=new require('stream').Readable();x.push(JSON.stringify(env[p])),x.push(null),x.pipe(zlib.createDeflate()).pipe(w),cfg.is_debug&&console.log('WBF',p,env[p].length)}};if(env._all=[],env._all=env._all.concat(cfg.tabs),env._all=env._all.concat(cfg.flatintabs),env._log=[],env._status=[],cfg.tabs.forEach((p)=>rbf(p)),cfg.flatintabs.forEach((p)=>rf(p)),setInterval(()=>{env._status=[],env._all.forEach((p)=>wbf(p)),utime=Date.now()},36000),setInterval(()=>cfg.flatouttabs.forEach((p)=>wf(p)),36000),fs.readdir('./app',(p,u)=>u.forEach((w)=>fs.readFile('./app/'+w,(x,y)=>{if(x)throw x;memcache['/'+w]=y,cfg.is_debug&&console.log(w,' loaded..',y.length)}))),cfg.is_qatool){console.log('QA_TOOL INITIALISAZION');const p=dgram.createSocket('udp4');p.bind(cfg.udpport),p.on('error',(u)=>{console.log('SERVER-ERROR',u.stack),p.close(),ERRLOG.write(Date.now()+'SERVER-ERROR '+u.stack)}),p.on('listening',()=>{var u=p.address();console.log('%s:%d module-server listening.. ',u.address,u.port)}),p.on('message',(u,w)=>{try{var x=JSON.parse(u)}catch(A){console.log('ERROR-JSON-PARSE DSOCKET MESSAGE',A)}console.log('DSOCKET MESSAGE ',Date.now(),u.length,w.address,w.port,x.device,x.unit,x.key,x.value);var y='',z=Array.prototype.filter.call(env[cfg.table],(A)=>A.station===x.device);0<z.length&&('Teilio'===x.key&&(y='teilio'),'Teilnio'===x.key&&(y='teilnio'),'Status'===x.key&&(y='lstatus'),'TaktIst'===x.key&&(y='taktist'),'Status'===x.key&&(y='lstatus'),'ENERGY'===x.key&&(y='energy'),'Posx'===x.key&&(y='x'),'Posy'===x.key&&(y='y'),monats_wechsel(z[0]),'Teilio'===x.key&&0===parseInt(x.value)&&(z[0].strigger=1),schicht_wechsel(z[0]),elem_update(z[0],{key:x.key,value:x.value,field:y},esfm,sub,cfg.table,!1),cfg.is_splunklog&&require(cfg.path+'swnode/swsendUDP')(JSON.stringify(x),cfg.splkhost,cfg.splkport))})}const monats_wechsel=(p)=>{p.mtrigger&&(p.mtrigger=0,p.hteilio=[],p.hteilnio=[],p.hteilabs=[],p.hteilabsp=[],p.hstimes=[])},schicht_wechsel=(p)=>{if(p.strigger){const u=p.teilio,w=p.teilnio,x=p.teilesoll,y=p.lstatus,z=Date.now();console.log('TRIGGER',u),p.strigger=0,p.stimes[y]=(p.stimes[y]||0)+(z-p.sdat)/6e4,p.sdat=z,p.hteilio.push(u),100<p.hteilio.length&&p.hteilio.shift(),p.hteilnio.push(w),100<p.hteilnio.length&&p.hteilnio.shift(),p.hteilabs.push(u-x),100<p.hteilabs.length&&p.hteilabs.shift(),p.hteilabsp.push((u-x)/x),100<p.hteilabsp.length&&p.hteilabsp.shift(),p.stimes.forEach((A,B)=>p.hstimes[B]=(p.hstimes[B]||0)+parseInt(A||0)),p.stimes=[],p.ehist=[],p.teilio=0,p.teilnio=0,p.schichtdat=p.sdat=Date.now()}},elem_update=(p,u,w,x,y,z)=>{cfg.is_debug&&console.log('ELEM_UPDATE:',u.key,u.field,u.value||'simulation');const A=Date.now();switch(u.key){case'Teilio':const B=p[u.field],C=z?B+1:u.value;p[u.field]=C;break;case'Posx':p[u.field]=z?parseInt(10+100*Math.random()):u.value;break;case'Posy':p[u.field]=z?parseInt(10+100*Math.random()):u.value;break;case'Teilnio':p[u.field]=z?parseInt(p[u.field])+1:u.value;break;case'TaktIst':p[u.field]=z?parseInt(p[u.field])+1:u.value;break;case'Status':const D='0123456'.charAt(parseInt(7*Math.random())),F=p[u.field];p[u.field]=z?D:u.value,p.stimes[F]=(p.stimes[F]||0)+(A-p.sdat)/6e4,p.sdat=A;break;case'ENERGY':p[u.field]=z?parseInt(1e3*Math.random()):u.value,25<p.ehist.length&&p.ehist.shift(),p.ehist.push(p[u.field]);}p.adat=p._utime=A,p.addat=new Date(A).toISOString(),w.kvput(x,y,p._id,u.field,p[u.field])},kv=[{key:'Status',field:'lstatus'},{key:'Posy',field:'y'},{key:'Posx',field:'x'},{key:'Teilio',field:'teilio'},{key:'Teilnio',field:'teilnio'},{key:'TaktIst',field:'taktist'},{key:'ENERGY',field:'energy'}],simulation=(p,u,w,x,y)=>{const z=parseInt(Math.random()*w[u].length),A=parseInt(Math.random()*y.length),B=Date.now();let C=Array.prototype.filter.call(w[u],(D,F)=>F===z);0<C.length&&(monats_wechsel(C[0]),schicht_wechsel(C[0]),elem_update(C[0],y[A],x,p,u,!0)),setTimeout(()=>simulation(sub,cfg.table,env,esfm,kv),2e3)};cfg.is_simulation&&setTimeout(()=>simulation(sub,cfg.table,env,esfm,kv),1500);
