const SCENES = [
  { img: '../images/intro0.png', text: '으... 머리 아파' },
  { img: '../images/intro1.png', text: '지금 몇시지?' },
  { img: '../images/intro2.png', text: '뭐야 벌써 10시가 지났네' },
  { img: '../images/intro3.png', text: '엘리베이터가 멈췄네? 다른 방법으로 학교에서 나갈 방법을 찾아봐야겠어. 먼저 강의실부터 찾아보자'},
];
 
const DURATION = 3500; // 장면당 자동 넘김 시간 (ms)
 
let idx = 0;
let timer = null;
let moving = false;
 
const bgEl       = document.getElementById('intro-bg');
const captionEl  = document.getElementById('caption');
const barEl      = document.getElementById('progress-bar');
const fadeEl     = document.getElementById('fade');
 
// 진행 도트 생성
SCENES.forEach((_, i) => {
  const dot = document.createElement('div');
  dot.className = 'progress-dot';
  dot.id = 'dot' + i;
  barEl.appendChild(dot);
});
 
function updateDots() {
  SCENES.forEach((_, i) => {
    document.getElementById('dot' + i).classList.toggle('active', i === idx);
  });
}
 
function showScene(i) {
  bgEl.style.opacity = '0';
  captionEl.style.opacity = '0';
 
  setTimeout(() => {
    bgEl.src = SCENES[i].img;
    captionEl.textContent = SCENES[i].text;
    bgEl.style.opacity = '1';
    captionEl.style.opacity = '1';
    updateDots();
  }, 600);
}
 
function next() {
  if (moving) return;
  clearTimeout(timer);
 
  if (idx < SCENES.length - 1) {
    idx++;
    showScene(idx);
    scheduleNext();
  } else {
    goToGame();
  }
}
 
function goToGame() {
  moving = true;
  fadeEl.style.opacity = '1';
  setTimeout(() => {
    location.href = 'classroom.html';
  }, 700);
}
 
function scheduleNext() {
  clearTimeout(timer);
  timer = setTimeout(next, DURATION);
}
 
// 초기화
showScene(0);
scheduleNext();
 
// 클릭으로 빨리 넘기기
document.addEventListener('click', next);

document.addEventListener('click', () => {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  
  const snd = new Audio('../sound/click.mp3');
  snd.volume = 0.5;
  snd.play().catch(()=>{});
});