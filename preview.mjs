import http from 'node:http';
import fs from 'node:fs';
import {DatabaseSync} from 'node:sqlite';
import worker from './dist/server/index.js';
const sql=new DatabaseSync(':memory:');sql.exec(fs.readFileSync(new URL('./drizzle/0000_live_rooms.sql',import.meta.url),'utf8'));
sql.exec(fs.readFileSync(new URL('./drizzle/0001_player_progress.sql',import.meta.url),'utf8'));
function prepare(query,args=[]){return{sql:query,bind(...values){return prepare(query,values)},async first(){return sql.prepare(query).get(...args)||null},async all(){return{results:sql.prepare(query).all(...args)}},async run(){const r=sql.prepare(query).run(...args);return{meta:{changes:r.changes}}}}}
const DB={prepare,async batch(statements){const results=[];for(const statement of statements)results.push(/^SELECT/i.test(statement.sql)?await statement.all():await statement.run());return results}};
const server=http.createServer(async(req,res)=>{try{const parts=[];for await(const part of req)parts.push(part);const body=Buffer.concat(parts),request=new Request('http://127.0.0.1:4177'+req.url,{method:req.method,headers:req.headers,...body.length?{body}: {}});const response=await worker.fetch(request,{DB});res.writeHead(response.status,Object.fromEntries(response.headers));res.end(Buffer.from(await response.arrayBuffer()))}catch(e){console.error(e);res.writeHead(500);res.end('Local preview error')}});
server.listen(4177,'127.0.0.1',()=>console.log('http://127.0.0.1:4177 · shared-room preview'));
