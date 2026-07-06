document.addEventListener('DOMContentLoaded', () => {
    // 1. 在此陣列中依序填入所有漫畫圖片的路徑
    const pages = [
        "images/Comics/漫畫封面.webp",
        "images/Comics/漫畫-p1.webp",
        "images/Comics/漫畫-p2.webp",
        "images/Comics/漫畫-p3.webp",
        "images/Comics/漫畫-p4.webp",
        "images/Comics/漫畫-p5.webp",
        "images/Comics/漫畫-p6.webp",
        "images/Comics/漫畫-p7.webp",
        "images/Comics/漫畫-p8.webp",
        "images/Comics/漫畫-p9.webp",
        "images/Comics/漫畫-p10.webp",
        "images/Comics/漫畫-p11.webp",
        "images/Comics/漫畫-p12.webp",
        // 依照需求繼續新增...
    ];

   let currentIndex = 0;
    const totalPages = pages.length;
    
    // 🌟 核心魔法：記憶體快取池
    const imageCache = {};

    // 取得 DOM 元素
    const mangaImg = document.getElementById('manga-img');
    const currentPageSpan = document.getElementById('current-page');
    const totalPagesSpan = document.getElementById('total-pages');
    
    const btnNext = document.getElementById('btn-next');
    const btnPrev = document.getElementById('btn-prev');
    const zoneNext = document.getElementById('btn-next-zone');
    const zonePrev = document.getElementById('btn-prev-zone');

    // 初始化總頁數
    if(totalPagesSpan) totalPagesSpan.textContent = totalPages;

    function preloadImage(index) {
        // 若索引超出範圍，或已經在快取池中，則直接中斷
        if (index < 0 || index >= totalPages || imageCache[index]) return;
        
        const img = new Image();
        img.src = pages[index];
        // 將實例化的圖片存入快取池，強制留在記憶體中
        imageCache[index] = img;
    }

    // 核心更新函數
    function updatePage(newIndex) {
        if (newIndex < 0 || newIndex >= totalPages) return;
        
        currentIndex = newIndex;
        
        // 替換圖片路徑與當前頁碼
        if(mangaImg) mangaImg.src = pages[currentIndex];
        if(currentPageSpan) currentPageSpan.textContent = currentIndex + 1;

        preloadImage(currentIndex + 1);
        preloadImage(currentIndex + 2);
        preloadImage(currentIndex - 1);
    }

    // 首次載入時，強制先預載前三張
    preloadImage(0);
    preloadImage(1);
    preloadImage(2);

    // 綁定下一頁事件 (右翻邏輯：向左點擊為下一頁)
    function turnNext() { updatePage(currentIndex + 1); }
    if(btnNext) btnNext.addEventListener('click', turnNext);
    if(zoneNext) zoneNext.addEventListener('click', turnNext);

    // 綁定上一頁事件 (右翻邏輯：向右點擊為上一頁)
    function turnPrev() { updatePage(currentIndex - 1); }
    if(btnPrev) btnPrev.addEventListener('click', turnPrev);
    if(zonePrev) zonePrev.addEventListener('click', turnPrev);

    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') {
            turnNext(); // 日系右翻邏輯：按左鍵看下一頁
        } else if (event.key === 'ArrowRight') {
            turnPrev(); // 日系右翻邏輯：按右鍵看上一頁
        }
    });
});