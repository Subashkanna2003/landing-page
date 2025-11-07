(function(){
  const slides = Array.from(document.querySelectorAll('.hero-slide'));
  const dotsContainer = document.getElementById('heroDots');
  let idx = 0, timer = null;
  // create dots
  slides.forEach((s,i)=>{
    const btn = document.createElement('button');
    btn.addEventListener('click', ()=> { goTo(i); resetTimer(); });
    dotsContainer.appendChild(btn);
  });

  const dots = Array.from(dotsContainer.querySelectorAll('button'));

  function show(i){
    slides.forEach(s=> s.classList.remove('active'));
    dots.forEach(d=> d.classList.remove('active'));
    slides[i].classList.add('active');
    dots[i].classList.add('active');
  }
  function next(){ idx = (idx+1) % slides.length; show(idx); }
  function prev(){ idx = (idx-1+slides.length) % slides.length; show(idx); }
  function goTo(i){ idx = i; show(idx); }

  // initial
  show(idx);
  timer = setInterval(next, 4500);

  // prev/next buttons
  document.getElementById('prevHero').addEventListener('click', ()=>{ prev(); resetTimer(); });
  document.getElementById('nextHero').addEventListener('click', ()=>{ next(); resetTimer(); });

  function resetTimer(){
    clearInterval(timer);
    timer = setInterval(next, 4500);
  }

  // pause on hover
  const heroEl = document.getElementById('hero') || document.querySelector('.hero');
  heroEl.addEventListener('mouseenter', ()=> clearInterval(timer));
  heroEl.addEventListener('mouseleave', ()=> timer = setInterval(next, 4500));
})();

/* ========== SCROLL REVEAL (IntersectionObserver) ========== */
(function(){
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('in-view');
      }
    });
  }, {threshold:0.18});
  document.querySelectorAll('.reveal').forEach(el=> io.observe(el));
})();

/* ========== CLICK ANIMATIONS (zoom+glow) ========== */
(function(){
  function clickAnim(node){
    node.addEventListener('click', (ev)=>{
      node.style.transform = 'scale(1.04)';
      node.style.boxShadow = '0 14px 30px rgba(0,0,0,0.18)';
      setTimeout(()=>{ node.style.transform=''; node.style.boxShadow=''; }, 300);
    });
  }
  document.querySelectorAll('.cat, .brand-item, .brand-card, .card .btn, .offer-pill').forEach(clickAnim);
})();

/* ========== DUPLICATE BRAND TRACK FOR SMOOTH MARQUEE ========== */
(function(){
  const track = document.getElementById('brandTrack');
  if(track){
    // duplicate inner content to allow continuous scroll
    track.innerHTML = track.innerHTML + track.innerHTML;
  }
})();

/* ========== OFFERS AUTO SCROLL (smooth) ========== */
(function(){
  const offers = document.getElementById('offersRow');
  if(!offers) return;
  let pos = 0;
  setInterval(()=>{
    pos += 260;
    if(pos >= offers.scrollWidth - offers.clientWidth) pos = 0;
    offers.scrollTo({left: pos, behavior: 'smooth'});
  }, 2200);
})();

/* ========== CATEGORY / CARD fallback click behaviour: show alert (demo) ========== */
(function(){
  document.querySelectorAll('.cat, .card, .brand-item').forEach(el=>{
    el.addEventListener('click', ()=>{
      const name = el.dataset.name || el.querySelector('.cat-label')?.textContent || el.querySelector('.brand-tag')?.textContent || el.querySelector('h3')?.textContent;
      // small toast without blocking alert
      showToast(name ? `Open ${name}` : `Open collection`);
    });
  });

  function showToast(txt){
    const t = document.createElement('div');
    t.className = 'mini-toast';
    t.textContent = txt;
    Object.assign(t.style,{
      position:'fixed',left:'50%',transform:'translateX(-50%)',bottom:'90px',
      background:'#111',color:'#fff',padding:'10px 16px',borderRadius:'8px',zIndex:9999,opacity:1
    });
    document.body.appendChild(t);
    setTimeout(()=> t.style.opacity='0',1300);
    setTimeout(()=> t.remove(),1800);
  }
})();