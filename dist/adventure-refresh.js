// Original, authored route profiles: switchbacks, S bends, sweeps, forest bends, chicanes.
const RALLY_ROUTES=[
 [0,0,-.8,-.8,.8,.8,-.65,0,.6,0],
 [0,-.7,.7,-.7,.7,0,0,.85,-.85,0],
 [0,0,0,.7,1,.7,0,0,-.7,0],
 [0,-.5,-.9,-.4,.2,.8,.4,-.5,.5,0],
 [0,0,0,-.75,.75,0,0,0,.75,-.75,0]
];
roadCentre=function(g,d){const i=g.map.baseIndex||0,stage=g.mission?.stage||missionStage('rally'),points=RALLY_ROUTES[i],segment=640-Math.min(14,stage-1)*11,lap=Math.floor((stage-1)/5),v=d/segment+lap*2,k=Math.floor(v),f=v-k,s=f*f*(3-2*f),a=points[((k%points.length)+points.length)%points.length],b=points[((k+1)%points.length+points.length)%points.length];return 500+(a+(b-a)*s)*(145+Math.min(14,stage-1)*2)*(lap%2?-1:1)};
const refreshedCourseMap=courseMap;
courseMap=function(mode=courseMode(),id=selectedCourse(mode)){
 const m=refreshedCourseMap(mode,id),i=m.baseIndex;
 // Keep geometry and hazards for each saved slot; give each location its own materials.
 const palettes=[
  ['#294c49','#527965','#273f32','#a4be88','#80cbad'],
  ['#634632','#ac7951','#50352c','#dec298','#e9ad72'],
  ['#172c4c','#526b87','#172638','#a6ccdf','#78dcf2'],
  ['#14475c','#278a99','#103949','#8cd5d4','#63edd8'],
  ['#322b47','#686073','#282433','#bcaaa3','#f5bd71']
 ];
 const [floor,light,edge,top,accent]=palettes[i];Object.assign(m,{floor,light,edge,top,accent,stone:light,path:light,leaf:top,bush:edge});
 if(mode==='rally'){m.routeWidth=[180,175,200,178,190][i]-Math.min(14,missionStage('rally')-1);m.courseNote+=' · Stage '+missionStage('rally')+' / 15 · '+['Mountain hairpins','Linked S bends','Wide speed sweeps','Woodland switchbacks','Long straights & chicanes'][i]}
 m.tourKey+=':distinct-v1';return m;
};
// Structural scenery is cached once per map, rather than redrawn every animation frame.
const originalTourSurface=tourSurface;
tourSurface=function(g,space){const m=g.map,key=m.tourKey+':'+space+':landscape';if(tourCache.has(key))return tourCache.get(key);const base=originalTourSurface(g,space),cv=document.createElement('canvas');cv.width=1000;cv.height=650;const c=cv.getContext('2d');c.drawImage(base,0,0);const i=m.baseIndex,mode=m.courseMode;
 c.save();
 if(mode==='rally'){
  // Each roadside is recognisable: cliff ledges, cherry trees, grandstands, forest, park walls.
  for(const side of [0,1])for(let n=0;n<5;n++){const x=side?945:55,y=65+n*135;
   if(i===0){artPoly(c,[[x-70,y+60],[x-35,y-40],[x+25,y-75],[x+70,y+60]],m.stone,m.edge,3);artLine(c,[[x-50,y+20],[x+40,y-15]],m.top,7)}
   else if(i===1){artLine(c,[[x,y+55],[x,y-15]],'#553c46',9);for(const[dx,dy]of [[-24,0],[20,-12],[0,-32]])ellipse(c,x+dx,y+dy,30,22,'#f0b6d0');roundRect(c,x-38,y+60,76,8,2,'#c95f6b')}
   else if(i===2){artBlock(c,x-52,y-20,104,75,m,12);for(let row=0;row<4;row++)for(let col=0;col<6;col++)roundRect(c,x-43+col*16,y-9+row*16,10,8,1,row%2?'#e7b657':'#689fcc')}
   else if(i===3){for(let j=-1;j<=1;j++){artLine(c,[[x+j*25,y+55],[x+j*25,y-45]],'#493d35',7);artPoly(c,[[x+j*25-29,y+15],[x+j*25,y-65],[x+j*25+29,y+15]],j%2?'#426b53':'#264a40')}}
   else{artBlock(c,x-60,y+10,120,30,m,8);for(let j=-1;j<=1;j++){ellipse(c,x+j*35,y-5,20,25,'#60855c');ellipse(c,x+j*35,y-19,17,18,'#85a86d')}}
  }
 }else if(space){
  if(i===0){ellipse(c,170,140,100,100,'#2d787e');ellipse(c,145,115,50,65,'#85a8a0')}
  if(i===1)for(let n=0;n<18;n++)artRock(c,(n*173)%1000,(n*97)%650,15+n%4*8,m,n);
  if(i===2){c.strokeStyle='#b5ddeb55';c.lineWidth=24;c.beginPath();c.ellipse(810,180,190,65,-.4,0,7);c.stroke();ellipse(c,810,180,80,80,'#7c849e')}
  if(i===3)for(let n=0;n<4;n++){c.globalAlpha=.12;ellipse(c,190+n*230,160+n%2*280,230,160,['#42d7c8','#c478df'][n%2])}
  if(i===4)for(const x of [60,940])for(let y=50;y<650;y+=130){artBlock(c,x-30,y,60,70,m,12);artLine(c,[[x-50,y+25],[x+50,y+25]],m.accent,6)}
 }else{
  // Edge scenery leaves combat lanes, maze paths and tower placement readable.
  for(const x of [45,955])for(let n=0;n<4;n++){const y=80+n*165;
   if(i===0){artPlant(c,x,y,40,m,n);ellipse(c,x,y+30,45,14,m.bush)}
   if(i===1){artRock(c,x,y,42,m,n);for(let j=-2;j<=2;j++){c.strokeStyle='#e5d6a3';c.lineWidth=4;c.beginPath();c.ellipse(x+j*12,y-14,10,23,0,Math.PI,Math.PI*2);c.stroke()}}
   if(i===2){artBlock(c,x-27,y-40,54,80,m,12);for(let j=0;j<4;j++)roundRect(c,x-20,y-30+j*18,40,5,1,m.accent)}
   if(i===3){artReef(c,x,y,40,m);c.strokeStyle='#9be3e9';c.lineWidth=2;c.beginPath();c.arc(x+18,y-45,8,0,7);c.stroke()}
   if(i===4){artBlock(c,x-36,y-60,72,100,m,15);for(let j=0;j<3;j++)roundRect(c,x-21,y-45+j*28,18,12,1,j===1?'#e7b46e':'#1b2634')}
  }
 }
 c.restore();if(tourCache.size>=80)tourCache.delete(tourCache.keys().next().value);tourCache.set(key,cv);return cv;
};
function rallyRouteDiagram(i){const p=RALLY_ROUTES[i],points=p.map((x,n)=>(70+x*42)+','+(12+n*90/(p.length-1))).join(' ');return `<svg viewBox="0 0 140 115" role="img" aria-label="${['Hairpins','S bends','Sweeping turns','Woodland bends','Straights and chicanes'][i]} track layout" style="width:100%;height:110px;background:#102534;border-radius:10px"><polyline points="${points}" fill="none" stroke="#95abb8" stroke-width="15" stroke-linejoin="round"/><polyline points="${points}" fill="none" stroke="#f1e3b0" stroke-width="2" stroke-dasharray="4 4"/><circle cx="${70+p[0]*42}" cy="12" r="5" fill="#bdf55b"/></svg>`}
const refreshedCards=battlefieldCards;battlefieldCards=function(){let html=refreshedCards();if(selectedGame().id==='rally')MAPS.forEach((m,i)=>{const name=courseMap('rally',m.id).name;html=html.replace('<h3>'+name,rallyRouteDiagram(i)+'<h3>'+name)});return html};
const refreshedRecord=recordMission;recordMission=function(g){const before=profile.gameProgress?.[g.mission?.type]?.clears||0,result=refreshedRecord(g);if(g.mission?.type==='rally'&&g.mission.complete&&g.mission.stage>before&&g.mission.stage<15){profile.courseChoices??={};profile.courseChoices.rally=MAPS[((g.map.baseIndex||0)+1)%5].id;save()}return result};
// Keep the cosmetic studio prominent above account details and control settings.
const refreshedSetup=personalHub;personalHub=function(){refreshedSetup();document.querySelector('.setup-preview')?.insertAdjacentHTML('afterend','<section class="info-panel"><h3>Make your avatar yours</h3><p>Change fur / skin colour, hair style, hair colour, eyes and accessories.</p><button class="primary" data-custom="studio">Customise fur, hair & eyes →</button></section>')};
const refreshedHeroes=heroes;heroes=function(){return refreshedHeroes().replace('<div class="pet-tabs"','<div class="info-panel"><button class="primary" data-custom="studio">Customise selected avatar · fur, hair & eyes →</button></div><div class="pet-tabs"')};
// The visible companion and its movement footprint must fit the arena corridors.
const openArenaLayout=arenaLayout;
arenaLayout=function(g){return openArenaLayout(g).map(w=>{const inset=Math.min(8,w.w/5,w.h/5);return {...w,x:w.x+inset,y:w.y+inset,w:w.w-inset*2,h:w.h-inset*2}})};
blocked=function(g,x,y,r=0){if(x<28+r||x>g.w-28-r||y<30+r||y>g.h-30-r)return true;return g.walls.some(b=>{const dx=x-Math.max(b.x,Math.min(x,b.x+b.w)),dy=y-Math.max(b.y,Math.min(y,b.y+b.h));return r>0?dx*dx+dy*dy<r*r:x>b.x&&x<b.x+b.w&&y>b.y&&y<b.y+b.h})};
moveBody=function(g,e,dx,dy,r=23){if(e===g&&!g.alt)r=18;const steps=Math.max(1,Math.ceil(Math.max(Math.abs(dx),Math.abs(dy))/8));for(let i=0;i<steps;i++){if(!blocked(g,e.x+dx/steps,e.y,r))e.x+=dx/steps;if(!blocked(g,e.x,e.y+dy/steps,r))e.y+=dy/steps}};
if(!game&&!live&&!quiz)navigate('home');
