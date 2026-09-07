
const lb=document.getElementById('lb');
if(lb){
 lb.setAttribute('role','dialog');lb.setAttribute('aria-modal','true');lb.setAttribute('aria-label','Project media');
 const closeButton=document.createElement('button');closeButton.className='lb-close';closeButton.textContent='Close ×';lb.prepend(closeButton);
 const v=lb.querySelector('video'),im=lb.querySelector('img');let trigger;
 function close(){lb.classList.remove('on','vid');v.pause();v.removeAttribute('src');v.load();document.body.style.overflow='';trigger?.focus();}
 document.querySelectorAll('.grid figure').forEach(f=>{f.tabIndex=0;f.setAttribute('role','button');f.setAttribute('aria-label','Open '+f.dataset.cap);f.querySelector('img').alt=f.dataset.cap;
 function open(){trigger=f;document.getElementById('lbcap').textContent=f.dataset.cap||'';im.alt=f.dataset.cap||'Project work';if(f.dataset.video){v.src=f.dataset.video;v.poster=f.querySelector('img').src;lb.classList.add('on','vid');}else{im.src=f.querySelector('img').src;lb.classList.add('on');}document.body.style.overflow='hidden';closeButton.focus();}
 f.addEventListener('click',open);f.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open();}});});
 closeButton.addEventListener('click',close);lb.addEventListener('click',e=>{if(e.target===lb)close();});document.addEventListener('keydown',e=>{if(!lb.classList.contains('on'))return;if(e.key==='Escape')close();if(e.key==='Tab'){const focusables=[closeButton,...(lb.classList.contains('vid')?[v]:[])];if(e.shiftKey&&document.activeElement===focusables[0]){e.preventDefault();focusables.at(-1).focus();}else if(!e.shiftKey&&document.activeElement===focusables.at(-1)){e.preventDefault();focusables[0].focus();}}});
}
