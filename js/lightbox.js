document.addEventListener("DOMContentLoaded", () => {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const lightboxCaption = lightbox.querySelector('.lightbox-caption');
  const closeBtn = lightbox.querySelector('.lightbox-close');

  // 1. 監聽每一張照片的點擊事件
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      // 抓取點擊的圖片網址與標題
      const img = item.querySelector('img');
      const title = item.querySelector('h3').innerText;

      // 把資料塞進燈箱裡
      lightboxImg.src = img.src;
      lightboxCaption.innerText = title;
      
      // 顯示燈箱 (加入 active 類別)
      lightbox.classList.add('active');
    });
  });

  // 2. 點擊 X 按鈕關閉燈箱
  closeBtn.addEventListener('click', () => {
    lightbox.classList.remove('active');
  });

  // 3. 點擊背景也能關閉燈箱
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
    }
  });
});