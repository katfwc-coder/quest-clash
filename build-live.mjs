import fs from 'node:fs';
const root=new URL('./',import.meta.url),dist=new URL('./dist/',root);
const assets={};
for(const name of fs.readdirSync(dist)){if(!/\.(html|js|css)$/.test(name))continue;assets['/'+name]={type:name.endsWith('.js')?'text/javascript; charset=utf-8':name.endsWith('.css')?'text/css; charset=utf-8':'text/html; charset=utf-8',body:fs.readFileSync(new URL(name,dist),'utf8')}}
const accounts=fs.readFileSync(new URL('./worker/accounts.mjs',root),'utf8');
const api=fs.readFileSync(new URL('./worker/api.mjs',root),'utf8').replace('export async function api','async function api');
const worker=`${accounts}\n${api}\nconst ASSETS=${JSON.stringify(assets)};\nexport default {async fetch(request,env){const url=new URL(request.url);if(url.pathname.startsWith('/api/'))return api(request,env);const asset=ASSETS[url.pathname==='/'?'/index.html':url.pathname];if(!asset)return new Response('Not found',{status:404});return new Response(request.method==='HEAD'?null:asset.body,{headers:{'Content-Type':asset.type,'Cache-Control':'no-cache','X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin'}})}};\n`;
fs.mkdirSync(new URL('./dist/server/',root),{recursive:true});fs.writeFileSync(new URL('./dist/server/index.js',root),worker);
if(fs.existsSync(new URL('./.openai/hosting.json',root))){fs.mkdirSync(new URL('./dist/.openai/',root),{recursive:true});fs.copyFileSync(new URL('./.openai/hosting.json',root),new URL('./dist/.openai/hosting.json',root));}
console.log('Built shared-room Worker with embedded game assets.');
