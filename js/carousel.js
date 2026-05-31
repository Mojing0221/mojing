// 取得輪播相關元素
const carousel = document.querySelector('.carousel');
const track = document.getElementById('carouselTrack');
const groups = track.children.length;
let index = 0;
let timer;

// 1. 動態建立下方的導覽指示點 (Dots)
const dotsContainer = document.createElement('div');
dotsContainer.className = 'carousel-indicators';
carousel.appendChild(dotsContainer);

for (let i = 0; i < groups; i++) {
  const dot = document.createElement('div');
  dot.className = `dot ${i === 0 ? 'active' : ''}`;
  // 點擊圓點時，跳到對應的頁面
  dot.addEventListener('click', () => goToSlide(i));
  dotsContainer.appendChild(dot);
}

const dots = document.querySelectorAll('.dot');

// 2. 切換輪播頁面的主要邏輯
function goToSlide(i) {
  index = i;
  // 確實移動 100% 的寬度
  track.style.transform = `translateX(-${index * 100}%)`;
  
  // 更新圓點的亮起狀態
  dots.forEach(d => d.classList.remove('active'));
  dots[index].classList.add('active');
  
  // 每次手動點擊後，重新計算自動播放時間
  resetTimer(); 
}

function nextSlide() {
  index = (index + 1) % groups;
  goToSlide(index);
}

// 3. 自動播放與暫停控制
function startTimer() {
  timer = setInterval(nextSlide, 4000);
}

function resetTimer() {
  clearInterval(timer);
  startTimer();
}

// 滑鼠移入時暫停，讓使用者可以仔細看圖；移出時繼續播放
carousel.addEventListener('mouseenter', () => clearInterval(timer));
carousel.addEventListener('mouseleave', startTimer);

// 啟動輪播
startTimer();