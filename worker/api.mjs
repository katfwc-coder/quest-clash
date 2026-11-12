const headers={'Content-Type':'application/json','Cache-Control':'no-store'};
const json=(data,status=200)=>new Response(JSON.stringify(data),{status,headers});
const nickname=v=>String(v||'').replace(/[\u0000-\u001f<>]/g,'').trim().slice(0,20);
const hero=v=>/^(dog|cat)-(20|1[0-9]|[1-9])$/.test(v)?v:'dog-1';
const cleanLook=v=>{const colours=['#dfb87b','#303744','#f0dfc6','#8b97a6','#b97743','#ffffff','#a98ce0','#f3a6bf','#7acfc4','#79b3e8'],pick=(list,x,f)=>list.includes(x)?x:f;return{pack:pick(['none','trail','neon','scholar','galaxy','legend'],v?.pack,'none'),coat:pick(['natural',...colours],v?.coat,'natural'),hair:pick(['breed','swoop','spiky','curly'],v?.hair,'breed'),hairColour:pick(colours,v?.hairColour,'#303744'),eyes:pick(['natural','#735033','#7bb8dc','#8eb48c','#d49b56','#a98ce0'],v?.eyes,'natural'),outfit:pick(['#535b78','#447f77','#8d588e','#ac624b','#436990','#bd993f'],v?.outfit,'#535b78'),accessory:pick(['none','glasses','headphones','cap'],v?.accessory,'none')}};
const cleanSignals=value=>{const output={};if(!value||typeof value!=='object')return output;for(const[id,s]of Object.entries(value).slice(0,4)){if(!/^[a-f0-9]{8}$/.test(id)||!s||!['offer','answer'].includes(s.type)||typeof s.sdp!=='string'||s.sdp.length>24000||typeof s.sid!=='string'||s.sid.length>60)continue;output[id]={sid:s.sid,type:s.type,sdp:s.sdp}}return output};
const cleanState=s=>({cosmetic:{outfit:['classic','ranger','pilot','cyber','royal','christmas'].includes(s?.cosmetic?.outfit)?s.cosmetic.outfit:'classic',accessory:['none','scarf','visor','halo','helmet','antlers'].includes(s?.cosmetic?.accessory)?s.cosmetic.accessory:'none'},signals:cleanSignals(s?.signals),seq:Math.max(0,Math.floor(Number(s?.seq)||0)),armour:['none','trail','ranger','nova','cosmic'].includes(s?.armour)?s.armour:'none',shield:['none','leaf','ranger','prism','cosmic'].includes(s?.shield)?s.shield:'none',look:cleanLook(s?.look),weapon:['spark','burst','scatter','rapid','pierce','nova'].includes(s?.weapon)?s.weapon:'spark',x:Math.min(970,Math.max(30,Number(s?.x)||500)),y:Math.min(620,Math.max(30,Number(s?.y)||325)),right:Math.min(10,Math.max(0,Math.floor(Number(s?.right)||0))),progress:Math.min(10,Math.max(0,Math.floor(Number(s?.progress)||0))),ready:!!s?.ready,shot:Math.min(1e7,Math.max(0,Math.floor(Number(s?.shot)||0))),super:Math.min(1e7,Math.max(0,Math.floor(Number(s?.super)||0))),moving:!!s?.moving});
function configOK(c){return c&&Array.isArray(c.keys)&&c.keys.length===10&&new Set(c.keys).size===10&&c.keys.every(k=>typeof k==='string'&&/^[a-z]+:\d{1,5}$/.test(k))&&typeof c.timed==='boolean'&&['scout','challenger','expert'].includes(c.mode)}

async function fastRoomSync(body,db,now){
 const code=String(body.code||'').toUpperCase();if(!/^[A-Z2-9]{8}$/.test(code))return json({error:'Enter the eight-character room code.'},400);
 const room=await db.prepare('SELECT r.* FROM qc_rooms r INNER JOIN qc_peers p ON p.room=r.code WHERE r.code=? AND p.token=? AND r.created>?').bind(code,body.token,now-7200000).first();if(!room)return json({error:'Your room or session has ended. Join a new room.'},403);
 const host=room.host===body.token,statements=[db.prepare('UPDATE qc_peers SET state=?,updated=? WHERE token=?').bind(JSON.stringify(cleanState(body.state)),now,body.token)];
 if(host){if(body.snapshot&&room.phase==='battle'){const snapshot=JSON.stringify(body.snapshot);if(snapshot.length>80000)return json({error:'Battle snapshot too large.'},413);room.snapshot=snapshot;statements.push(db.prepare('UPDATE qc_rooms SET snapshot=?,updated=? WHERE code=?').bind(snapshot,now,code))}else statements.push(db.prepare('UPDATE qc_rooms SET updated=? WHERE code=?').bind(now,code))}
 statements.push(db.prepare('SELECT token,name,hero,level,state,updated FROM qc_peers WHERE room=? AND updated>? ORDER BY token').bind(code,now-20000));const result=await db.batch(statements),players=result.at(-1).results||[];
 return json({phase:room.phase,config:JSON.parse(room.config),selfId:body.token.slice(0,8),hostId:room.host.slice(0,8),host,hostAlive:host||now-room.updated<15000,serverTime:now,players:players.map(p=>({id:p.token.slice(0,8),name:p.name,hero:p.hero,level:p.level,state:JSON.parse(p.state),connected:now-p.updated<6000})),snapshot:body.lean?{}:JSON.parse(room.snapshot)});
}

export async function api(request,env){
 try{
 if(request.method!=='POST')return json({error:'Use POST.'},405);
 const origin=request.headers.get('Origin');if(origin&&origin!==new URL(request.url).origin)return json({error:'Use this game’s own page.'},403);
 if(Number(request.headers.get('Content-Length'))>2000000)return json({error:'Request too large.'},413);
 const raw=await request.text();if(raw.length>2000000)return json({error:'Request too large.'},413);const body=JSON.parse(raw||'{}'),path=new URL(request.url).pathname,db=env.DB,now=Date.now();
 if(!db)return json({error:'Live rooms are temporarily unavailable.'},503);
 if(path.startsWith('/api/account/'))return accountAPI(body,path,db,request,now);
 if(path==='/api/live/sync')return fastRoomSync(body,db,now);
 if(path==='/api/live/create'){
  const name=nickname(body.name);if(!name||!configOK(body.config))return json({error:'Choose a nickname and ten-question loadout.'},400);
  const bytes=crypto.getRandomValues(new Uint8Array(8)),alphabet='ABCDEFGHJKLMNPQRSTUVWXYZ23456789',code=Array.from(bytes,n=>alphabet[n%alphabet.length]).join(''),token=crypto.randomUUID();
  const config={stage:Math.min(100,Math.max(1,Math.floor(Number(body.config.stage)||1))),threat:Math.min(10,Math.max(1,Math.floor(Number(body.config.threat)||1))),map:['springs','ember','moon','coral','neon'].includes(body.config.map)?body.config.map:'springs',level:Math.min(100,Math.max(1,Math.floor(Number(body.level)||1))),keys:body.config.keys,timed:body.config.timed,mode:body.config.mode,tier:Math.min(17,Math.max(1,Number(body.config.tier)||1))};
  await db.batch([db.prepare('DELETE FROM qc_peers WHERE room IN (SELECT code FROM qc_rooms WHERE created < ?)').bind(now-7200000),db.prepare('DELETE FROM qc_rooms WHERE created < ?').bind(now-7200000),db.prepare('INSERT INTO qc_rooms(code,host,config,created,updated) VALUES(?,?,?,?,?)').bind(code,token,JSON.stringify(config),now,now),db.prepare('INSERT INTO qc_peers(token,room,name,hero,level,updated) VALUES(?,?,?,?,?,?)').bind(token,code,name,hero(body.hero),Math.min(100,Math.max(1,Math.floor(Number(body.level)||1))),now)]);
  return json({code,token});
 }
 const code=String(body.code||'').toUpperCase();if(!/^[A-Z2-9]{8}$/.test(code))return json({error:'Enter the eight-character room code.'},400);
 const room=await db.prepare('SELECT * FROM qc_rooms WHERE code=? AND created>?').bind(code,now-7200000).first();if(!room)return json({error:'Room not found or expired. Ask your friend for a new code.'},404);
 if(path==='/api/live/join'){
  if(room.phase!=='lobby')return json({error:'This round has started. Join a new room for the next round.'},409);
  const name=nickname(body.name);if(!name)return json({error:'Enter a player nickname.'},400);const token=crypto.randomUUID();
  const added=await db.prepare('INSERT INTO qc_peers(token,room,name,hero,level,updated) SELECT ?,?,?,?,?,? WHERE (SELECT COUNT(*) FROM qc_peers WHERE room=? AND updated>?)<4 AND (SELECT phase FROM qc_rooms WHERE code=?)=\'lobby\'').bind(token,code,name,hero(body.hero),Math.min(100,Math.max(1,Math.floor(Number(body.level)||1))),now,code,now-20000,code).run();
  if(!added.meta.changes)return json({error:'Room is full or has just started.'},409);return json({code,token});
 }
 const me=await db.prepare('SELECT * FROM qc_peers WHERE room=? AND token=?').bind(code,body.token).first();if(!me)return json({error:'Your room session has ended. Join again.'},403);
 const isHost=room.host===body.token;
 if(path==='/api/live/leave'){await db.prepare('DELETE FROM qc_peers WHERE token=?').bind(body.token).run();if(isHost)await db.prepare("UPDATE qc_rooms SET phase='closed',updated=? WHERE code=?").bind(now,code).run();return json({left:true})}
 if(path==='/api/live/phase'){
  if(!isHost)return json({error:'Only the room host can start the round.'},403);
  const next=body.phase;if(!(room.phase==='lobby'&&next==='quiz')&&!(room.phase==='quiz'&&next==='battle')&&!(room.phase==='battle'&&next==='results'))return json({error:'Invalid round transition.'},409);
  const peers=(await db.prepare('SELECT * FROM qc_peers WHERE room=? AND updated>?').bind(code,now-20000).all()).results;
  if(next==='quiz'&&peers.length<2)return json({error:'Wait for at least one friend.'},409);
  if(next==='battle'&&peers.some(p=>!JSON.parse(p.state).ready))return json({error:'Wait until every connected player finishes all ten questions.'},409);
  await db.prepare('UPDATE qc_rooms SET phase=?,updated=? WHERE code=? AND phase=?').bind(next,now,code,room.phase).run();return json({phase:next});
 }
 if(path!=='/api/live/sync')return json({error:'Unknown live action.'},404);
 await db.prepare('UPDATE qc_peers SET state=?,updated=? WHERE token=?').bind(JSON.stringify(cleanState(body.state)),now,body.token).run();
 if(isHost){if(body.snapshot&&room.phase==='battle'){const snapshot=JSON.stringify(body.snapshot);if(snapshot.length>80000)return json({error:'Battle snapshot too large.'},413);await db.prepare('UPDATE qc_rooms SET snapshot=?,updated=? WHERE code=?').bind(snapshot,now,code).run();room.snapshot=snapshot}else await db.prepare('UPDATE qc_rooms SET updated=? WHERE code=?').bind(now,code).run()}
 const players=(await db.prepare('SELECT token,name,hero,level,state,updated FROM qc_peers WHERE room=? AND updated>? ORDER BY token').bind(code,now-20000).all()).results;
 return json({phase:room.phase,config:JSON.parse(room.config),selfId:body.token.slice(0,8),hostId:room.host.slice(0,8),host:isHost,hostAlive:isHost||now-room.updated<15000,serverTime:now,players:players.map(p=>({id:p.token.slice(0,8),name:p.name,hero:p.hero,level:p.level,state:JSON.parse(p.state),connected:now-p.updated<6000})),snapshot:JSON.parse(room.snapshot)});
 }catch(error){console.error('Live room request failed:',error.message);return json({error:'The live room could not update. Please try again.'},500)}
}

