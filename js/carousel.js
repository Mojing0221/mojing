document.addEventListener('DOMContentLoaded', () => {
  // 抓取頁面上所有的輪播外框
  const carousels = document.querySelectorAll('.carousel');

  carousels.forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    if (!track) return;

    const groups = Array.from(track.children);
    
    // 動態建立導覽點點的容器
    const indicatorsContainer = document.createElement('div');
    indicatorsContainer.classList.add('carousel-indicators');
    carousel.appendChild(indicatorsContainer);

    // 產生點點
    groups.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (index === 0) dot.classList.add('active'); // 預設亮起第一個
      
      // 點擊事件：切換幻燈片
      dot.addEventListener('click', () => {
        goToSlide(index);
      });
      
      indicatorsContainer.appendChild(dot);
    });

    const dots = Array.from(indicatorsContainer.children);

    // 核心切換函式
    function goToSlide(index) {
      // 每次精準往左推 100% (對應觀景窗寬度)
      track.style.transform = `translateX(-${index * 100}%)`;
      
      // 更新點點的 active 狀態
      dots.forEach(dot => dot.classList.remove('active'));
      dots[index].classList.add('active');
    }
  });
});