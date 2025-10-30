// main.js
// 다크모드 toggle + localStorage + 버튼(상단)
const root = document.documentElement, btn = document.getElementById('dark-mode-toggle');
if(localStorage.theme==='dark'||(!('theme' in localStorage)&&window.matchMedia('(prefers-color-scheme: dark)').matches)){
  root.classList.add('dark');
  btn.innerText='☀️';
  document.body.classList.add('dark');
} else {
  btn.innerText='🌙';
}
btn.addEventListener('click',()=>{
  root.classList.toggle('dark');
  document.body.classList.toggle('dark');
  if(root.classList.contains('dark')) {
    localStorage.theme='dark'; btn.innerText='☀️'; canvas.style.display='block';
  } else {
    localStorage.theme='light'; btn.innerText='🌙'; canvas.style.display='none';
  }
});
// 도트 애니메이션(다크에서만 출력)
const canvas = document.getElementById('dot-bg');
const ctx = canvas.getContext('2d');
let w = window.innerWidth, h = window.innerHeight;
function resize(){ w = window.innerWidth; h = window.innerHeight; canvas.width = w; canvas.height = h; }
window.addEventListener('resize',resize); resize();
let dotColors = ['#53d2ff','#00f2ca','#458dff'];
let dots = Array.from({length:18},()=>({
  x:Math.random()*w,
  y:Math.random()*h,
  r:8+Math.random()*8,
  dx:(Math.random()-.5)*1.2,
  dy:(Math.random()-.5)*1.2,
  o:.11+Math.random()*.19,
  c:dotColors[Math.floor(Math.random()*3)]
}));
let mx=w/2,my=h/2; window.onmousemove = e => (mx=e.clientX, my=e.clientY);
function animate(){
  if(!root.classList.contains('dark')){canvas.style.display='none';return requestAnimationFrame(animate);}
  canvas.style.display='block';
  ctx.clearRect(0,0,w,h);
  dots.forEach(d=>{
    d.x += (mx-d.x)*0.018+d.dx; d.y += (my-d.y)*0.018+d.dy;
    if(d.x<0||d.x>w) d.dx*=-1; if(d.y<0||d.y>h) d.dy*=-1;
    ctx.beginPath(); ctx.arc(d.x,d.y,d.r,0,2*Math.PI);
    ctx.fillStyle = d.c + (d.o<.14?"99":Math.floor(d.o*255).toString(16));
    ctx.shadowColor = d.c + 'cc'; ctx.shadowBlur=16; ctx.fill(); ctx.shadowBlur=0;
  });
  requestAnimationFrame(animate);
}
animate();

// FAQ(아코디언) 기존 코드 아래에 유지
// FAQ 아코디언: 하나만 펼쳐짐. + → - 변환

document.addEventListener('DOMContentLoaded', function () {
  const faqs = document.querySelectorAll('#faq-root > div');
  faqs.forEach(card => {
    const btn = card.querySelector('.faq-toggle');
    const answer = card.querySelector('.faq-answer');
    const icon = card.querySelector('.faq-icon');
    btn.addEventListener('click', () => {
      const opened = card.classList.contains('faq-open');
      faqs.forEach(d => {
        d.classList.remove('faq-open');
        d.querySelector('.faq-answer').classList.add('hidden');
        d.querySelector('.faq-icon').textContent = '+';
      });
      if (!opened) {
        card.classList.add('faq-open');
        answer.classList.remove('hidden');
        icon.textContent = '-';
      }
    });
  });
});
