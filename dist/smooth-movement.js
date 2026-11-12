// Keep input and simulation responsive without repainting DOM status on every frame.
function movementBlend(dt,rate){return 1-Math.exp(-Math.min(.1,Math.max(0,dt??1/60))*rate)}
function movementHUDDue(g){const now=performance.now(),key=[g.hp,g.maxHp,g.ammo,g.wave,g.kills,g.charge,g.boss?.hp].join(':');if(key!==g.movementHUDKey||now-(g.movementHUDAt??-Infinity)>=100){g.movementHUDKey=key;g.movementHUDAt=now;return true}return false}
// Small simulation steps preserve collisions on a slow frame; render once per display refresh.
// Discard long background-tab gaps instead of teleporting the player on return.
frame=function(t){const g=game;if(!g)return;const elapsed=Math.max(0,(t-last)/1000);last=t;g.frameDelta=Math.min(elapsed,.1);if(!document.hidden){if(!g.paused){let remaining=Math.min(elapsed,.1);while(remaining>1e-7){const step=Math.min(remaining,1/60);if(!updateArena(step)||game!==g)return;remaining-=step}}if(!g.paused||!g.movementPausedPainted){renderArena(g);g.movementPausedPainted=g.paused}}raf=requestAnimationFrame(frame)};
// Read joystick geometry once per gesture, not twice per pointer event.
let movementStickBox=null,movementStickPointer=null;
function clearMovementGeometry(){movementStickBox=null;movementStickPointer=null}
window.addEventListener('resize',clearMovementGeometry);
window.visualViewport?.addEventListener('resize',clearMovementGeometry);
moveStick=function(e){if(e.pointerId!==stick.pointerId)return;const el=$('#joystick');if(!el)return;if(!movementStickBox||movementStickPointer!==e.pointerId){movementStickBox=el.getBoundingClientRect();movementStickPointer=e.pointerId}const box=movementStickBox,radius=box.width*.32;let x=(e.clientX-box.left-box.width/2)/radius,y=(e.clientY-box.top-box.height/2)/radius;const distance=Math.hypot(x,y);if(distance<.12){x=y=0}else if(distance>1){x/=distance;y/=distance}stick.x=x;stick.y=y;renderStick()};
renderStick=function(){const el=$('#joystick');if(!el)return;const active=stick.pointerId!==null;if(!active){clearMovementGeometry();el.style.setProperty('--stick-x','0px');el.style.setProperty('--stick-y','0px')}else{const radius=(movementStickBox||el.getBoundingClientRect()).width*.32;el.style.setProperty('--stick-x',stick.x*radius+'px');el.style.setProperty('--stick-y',stick.y*radius+'px')}el.classList.toggle('engaged',active)};
// Rasterise a decoded SVG pose once, then reuse its small bitmap during movement.
const movementPoseSource=operatorFrame;
const movementPoseBitmaps=new WeakMap();
operatorFrame=function(h,index=0,firing=false){const source=movementPoseSource(h,index,firing);if(!source?.complete||!source.naturalWidth)return source;let bitmap=movementPoseBitmaps.get(source);if(!bitmap){bitmap=document.createElement('canvas');bitmap.width=220;bitmap.height=250;bitmap.getContext('2d').drawImage(source,0,0,220,250);bitmap.complete=true;bitmap.naturalWidth=220;movementPoseBitmaps.set(source,bitmap)}return bitmap};

document.addEventListener('visibilitychange',()=>{last=performance.now();resetControls()});
