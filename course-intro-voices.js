(() => {
// 架空サンプルのカルーセル。実際の声に差し替えても同じ枠を利用する。
const voiceWindow=document.getElementById('voice-window'),voiceTrack=document.getElementById('voice-track'),voiceToggle=document.getElementById('voice-toggle');
if(!voiceWindow||!voiceTrack||!voiceToggle)return;
const voiceCards=[...voiceTrack.children];voiceCards.slice(0,2).forEach(card=>{const clone=card.cloneNode(true);clone.setAttribute('aria-hidden','true');voiceTrack.append(clone)});let voiceIndex=0;let voicePaused=window.matchMedia('(prefers-reduced-motion: reduce)').matches;let voiceHover=false,voiceFocus=false;
function renderVoice(){if(!voiceWindow.getClientRects().length)return;const step=voiceCards[0].getBoundingClientRect().width+24;voiceTrack.style.transform=`translateX(${-voiceIndex*step}px)`;document.getElementById('voice-pagination').textContent=`0${voiceIndex+1} / 0${voiceCards.length}`;voiceToggle.textContent=voicePaused?'自動再生':'一時停止';voiceToggle.setAttribute('aria-pressed',String(voicePaused))}
function stepVoice(direction){voiceIndex=(voiceIndex+direction+voiceCards.length)%voiceCards.length;renderVoice()}
document.getElementById('voice-prev').addEventListener('click',()=>stepVoice(-1));document.getElementById('voice-next').addEventListener('click',()=>stepVoice(1));voiceToggle.addEventListener('click',()=>{voicePaused=!voicePaused;renderVoice()});
const voiceSection=document.getElementById('voices');voiceSection.addEventListener('mouseenter',()=>voiceHover=true);voiceSection.addEventListener('mouseleave',()=>voiceHover=false);voiceSection.addEventListener('focusin',()=>voiceFocus=true);voiceSection.addEventListener('focusout',e=>voiceFocus=voiceSection.contains(e.relatedTarget));voiceWindow.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();stepVoice(1)}else if(e.key==='ArrowLeft'){e.preventDefault();stepVoice(-1)}});window.addEventListener('resize',renderVoice);setInterval(()=>{if(!voicePaused&&!voiceHover&&!voiceFocus&&!document.hidden&&voiceWindow.getClientRects().length)stepVoice(1)},6500);renderVoice();

document.addEventListener("course:panel-change",()=>requestAnimationFrame(renderVoice));
})();
