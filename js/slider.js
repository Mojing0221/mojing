document.addEventListener("DOMContentLoaded", () => {
  // 抓取頁面上所有的輪播外框 (這樣你以後想放幾個輪播都可以)
  const sliders = document.querySelectorAll('.auto-slider');

  sliders.forEach(slider => {
    const slides = slider.querySelectorAll('.slide');
    const dots = slider.querySelectorAll('.dot');
    let currentIndex = 0;
    let slideInterval;

    // 切換圖片的函數
    function showSlide(index) {
      // 移除所有圖片與圓點的 active
      slides.forEach(s => s.classList.remove('active'));
      dots.forEach(d => d.classList.remove('active'));

      // 幫現在這張加上 active
      slides[index].classList.add('active');
      dots[index].classList.add('active');
    }

    // 換下一張的邏輯
    function nextSlide() {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    }

    // 啟動自動輪播 (設定每 3.5 秒切換一次)
    function startSlide() {
      slideInterval = setInterval(nextSlide, 3500); 
    }

    // 停止自動輪播
    function stopSlide() {
      clearInterval(slideInterval);
    }

    // 讓使用者可以自己點擊下面的小圓點來切換
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentIndex = index;
        showSlide(currentIndex);
        // 點擊後重新計算時間，才不會馬上又跳下一張
        stopSlide();
        startSlide(); 
      });
    });

    // 貼心設計：當滑鼠移到圖片上方時暫停輪播，離開時繼續
    slider.addEventListener('mouseenter', stopSlide);
    slider.addEventListener('mouseleave', startSlide);

    // 如果圖片超過1張，就啟動輪播
    if (slides.length > 1) {
      startSlide();
    }
  });
});