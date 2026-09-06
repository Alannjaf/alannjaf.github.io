
gsap.registerPlugin(ScrollTrigger);
const mobile = matchMedia('(max-width:900px)').matches;
const lenis = new Lenis({ lerp: .09 }); lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add(t => lenis.raf(t*1000)); gsap.ticker.lagSmoothing(0);
const ku = document.querySelector('.hero .ku'), en = document.querySelector('.hero .en');
if (ku) {
  gsap.from(ku, { y: 40, opacity: 0, duration: 1.1, ease: 'power3.out' });
  // The first screen is PINNED while the name changes, so the change happens in view (Alan, 2026-09-06:
  // "the name changes to English but at that time it's not visible on screen").
  gsap.timeline({ scrollTrigger: { trigger: '.hero', start: 'top top', end: '+=120%', pin: true, scrub: .6, anticipatePin: 1 } })
    .to(ku, { scaleX: 1.5, letterSpacing: '.1em', opacity: 0, ease: 'power1.in', duration: .4 }, 0)
    .to(en, { opacity: 1, ease: 'power2.out', duration: .35 }, .2)
    .fromTo(en, { fontVariationSettings: "'wdth' 62" }, { fontVariationSettings: mobile ? "'wdth' 100" : "'wdth' 125", ease: 'power2.out', duration: .45 }, .2)
    .to('.hero .dot', { scale: mobile ? 60 : 40, opacity: .9, ease: 'power3.in', duration: .25 }, .7)
    .to('.hero .dot', { opacity: 0, duration: .1 }, .92);
  document.querySelectorAll('.verbs h2').forEach(h => gsap.fromTo(h, { fontVariationSettings: "'wdth' 62" }, { fontVariationSettings: "'wdth' 125", ease: 'power2.out', scrollTrigger: { trigger: '.verbs', start: 'top 60%', end: 'top 10%', scrub: true } }));
}
const track = document.getElementById('track');
if (mobile) ScrollTrigger.normalizeScroll(true);
if (track) {
  const panels = gsap.utils.toArray('.panel'); const dist = () => track.scrollWidth - innerWidth;
  const st = gsap.to(track, { x: () => -dist(), ease: 'none', scrollTrigger: { trigger: '.work', start: 'top top', end: () => '+=' + dist()*1.2, pin: true, scrub: 1, invalidateOnRefresh: true,
    onUpdate: s => { const i = Math.min(panels.length, Math.floor(s.progress*panels.length)+1); document.getElementById('cur').textContent = String(i).padStart(2,'0'); } } });
  panels.forEach(p => specTl(p, { containerAnimation: st, start: 'left 80%', end: 'left 5%' }));
}
function specTl(p, trig) {
  const img = p.querySelector('.spec img, .spec .ph'), frame = p.querySelectorAll('.spec .l, .spec .frame, .spec .lab'), e = p.querySelector('.e, h1'), k = p.querySelector('.k'), st = p.querySelectorAll('.stage span');
  gsap.timeline({ scrollTrigger: Object.assign({ trigger: p, scrub: true, onUpdate: s => { st.forEach(x => x.classList.remove('on')); if (st.length) st[Math.min(2, Math.floor(s.progress*3))].classList.add('on'); } }, trig) })
    .fromTo(e, { fontVariationSettings: "'wdth' 62" }, { fontVariationSettings: "'wdth' 112", ease: 'none' }, 0)
    .fromTo(k, { x: 60, opacity: .2 }, { x: 0, opacity: 1, ease: 'none' }, 0)
    .to(img, { clipPath: 'inset(0 0% 0 0)', ease: 'power2.inOut' }, .3).to(frame, { opacity: .18, ease: 'none' }, .5);
}
const lb=document.getElementById('lb'); if (lb) { const v=lb.querySelector('video'), im=lb.querySelector('img');
  const close=() => { lb.classList.remove('on','vid'); v.pause(); v.removeAttribute('src'); v.load(); };
  document.querySelectorAll('.grid figure').forEach(f => f.addEventListener('click', () => { document.getElementById('lbcap').textContent=f.dataset.cap||'';
    if (f.dataset.video) { v.src=f.dataset.video; v.poster=f.querySelector('img').src; lb.classList.add('on','vid'); v.play().catch(()=>{}); }
    else { im.src=f.querySelector('img').src; lb.classList.add('on'); } }));
  lb.addEventListener('click', e => { if (e.target!==v) close(); }); addEventListener('keydown', e => { if (e.key==='Escape') close(); }); }
const casehero = document.querySelector('.casehero');
if (casehero) specTl(document.querySelector('main.casewrap'), { start: 'top 80%', end: 'top 10%' });
if (document.querySelector('.contact a.big')) gsap.fromTo('.contact a.big', { fontVariationSettings: "'wdth' 62" }, { fontVariationSettings: "'wdth' 125", ease: 'power2.out', scrollTrigger: { trigger: '.contact', start: 'top 80%', end: 'top 20%', scrub: true } });
