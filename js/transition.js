document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll('a');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetUrl = link.href;
      const currentHost = window.location.host;

      // 1. 確保是內部連結，且不是開新分頁
      if (targetUrl.includes(currentHost) && link.target !== "_blank") {
        
        // 🌟【關鍵修復】取得連結「不包含 # 錨點」的純網址部分
        const targetBaseUrl = targetUrl.split('#')[0];
        const currentBaseUrl = window.location.href.split('#')[0];

        // 如果你要去的地方，跟現在是「同一個網頁」（例如都在 projects.html）
        if (targetBaseUrl === currentBaseUrl) {
          // 那就直接放行，不要拉起海浪過場！讓瀏覽器自己往下捲動
          return; 
        }

        // 2. 如果是「不同網頁」，就正常執行海浪覆蓋動畫
        e.preventDefault(); 
        
        document.documentElement.classList.add('is-leaving');

        // 等待海浪完全蓋滿畫面 (1.35秒) 後，再切換網址
        setTimeout(() => {
          window.location.href = targetUrl;
        }, 1350);
      }
    });
  });
});

// 修復 Safari 瀏覽器上一頁的快取卡死問題
window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    document.documentElement.classList.remove('is-leaving');
  }
});