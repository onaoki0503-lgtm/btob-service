(() => {
  const gallery=document.getElementById('hero-gallery');
  if(!gallery)return;
  const photos=[...gallery.querySelectorAll('.hero-photo')],button=document.getElementById('hero-photo-toggle'),count=document.getElementById('hero-photo-count');
  const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
  let index=0,paused=motion.matches,busy=false;
  async function loadPhoto(photo){
    if(!photo.getAttribute('src'))photo.src=photo.dataset.src;
    if(photo.complete){if(!photo.naturalWidth)throw new Error('Image unavailable');return;}
    await new Promise((resolve,reject)=>{photo.addEventListener('load',resolve,{once:true});photo.addEventListener('error',reject,{once:true})});
  }
  function updateButton(){button.textContent=paused?'▶':'Ⅱ';button.setAttribute('aria-pressed',String(paused));button.setAttribute('aria-label',paused?'写真の自動切り替えを再生':'写真の自動切り替えを停止')}
  async function nextPhoto(){
    if(paused||document.hidden||busy)return;
    busy=true;const next=(index+1)%photos.length;
    try{await loadPhoto(photos[next]);if(paused||document.hidden)return;photos[index].classList.remove('is-current');photos[index].setAttribute('aria-hidden','true');photos[next].classList.add('is-current');photos[next].removeAttribute('aria-hidden');index=next;count.textContent=String(index+1).padStart(2,'0')+' / '+String(photos.length).padStart(2,'0');loadPhoto(photos[(index+1)%photos.length]).catch(()=>{});}catch{/* 現在の写真を維持する */}finally{busy=false;}
  }
  button.addEventListener('click',()=>{paused=!paused;updateButton();if(!paused)loadPhoto(photos[(index+1)%photos.length]).catch(()=>{})});
  motion.addEventListener('change',event=>{if(event.matches){paused=true;updateButton()}});
  updateButton();if(!paused)loadPhoto(photos[1]).catch(()=>{});
  setInterval(nextPhoto,6000);
})();
