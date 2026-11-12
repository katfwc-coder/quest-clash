// Stable touch gameplay with scrollable, readable menus on iPad and other tablets.
const viewportNode=document.querySelector('meta[name="viewport"]');
const normalViewport=viewportNode?.getAttribute?.('content')||'width=device-width,initial-scale=1,viewport-fit=cover';
function tabletHeight(){document.documentElement?.style?.setProperty('--play-height',(window.visualViewport?.height||window.innerHeight||800)+'px');applyBattleControls()}
function setPlayViewport(active){viewportNode?.setAttribute?.('content',active?'width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover':normalViewport);document.documentElement?.classList.toggle('play-locked',active);tabletHeight()}
const stableArenaStart=startArena;startArena=function(subject){document.body.classList.add('in-battle');setPlayViewport(true);stableArenaStart(subject);tabletHeight()};
const stableNavigate=navigate;navigate=function(page){stableNavigate(page);setPlayViewport(false)};
function stopPlayGesture(event){if(!document.body.classList.contains('in-battle')||event.target.closest?.('dialog'))return;event.preventDefault()}
for(const event of ['gesturestart','gesturechange','gestureend'])document.addEventListener(event,stopPlayGesture,{passive:false});
document.addEventListener('touchmove',stopPlayGesture,{passive:false});
window.addEventListener('resize',tabletHeight);window.addEventListener('orientationchange',()=>requestAnimationFrame(tabletHeight));window.visualViewport?.addEventListener('resize',tabletHeight);
// object-fit keeps the entire game visible in portrait; pointer coordinates follow the actual image.
function canvasGamePoint(canvas,event,g=game){const r=canvas.getBoundingClientRect(),scale=Math.min(r.width/g.w,r.height/g.h),ox=(r.width-g.w*scale)/2,oy=(r.height-g.h*scale)/2;return{x:(event.clientX-r.left-ox)/scale,y:(event.clientY-r.top-oy)/scale}}
tabletHeight();
