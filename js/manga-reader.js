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

    // 取得 DOM 元素
    const mangaImg = document.getElementById('manga-img');
    const currentPageSpan = document.getElementById('current-page');
    const totalPagesSpan = document.getElementById('total-pages');
    
    const btnNext = document.getElementById('btn-next');
    const btnPrev = document.getElementById('btn-prev');
    const zoneNext = document.getElementById('btn-next-zone');
    const zonePrev = document.getElementById('btn-prev-zone');

    // 初始化總頁數
    if(totalPagesSpan) {
        totalPagesSpan.textContent = totalPages;
    }

    // 核心更新函數
    function updatePage(newIndex) {
        // 邊界防護：防止超出陣列範圍
        if (newIndex < 0 || newIndex >= totalPages) return;
        
        currentIndex = newIndex;
        
        // 替換圖片路徑與當前頁碼
        if(mangaImg) mangaImg.src = pages[currentIndex];
        if(currentPageSpan) currentPageSpan.textContent = currentIndex + 1;

        // 預載下一張圖片 (降低切換時的空白延遲)
        if (currentIndex + 1 < totalPages) {
            const preloadImg = new Image();
            preloadImg.src = pages[currentIndex + 1];
        }
    }

    // 綁定下一頁事件
    function turnNext() { updatePage(currentIndex + 1); }
    if(btnNext) btnNext.addEventListener('click', turnNext);
    if(zoneNext) zoneNext.addEventListener('click', turnNext);

    // 綁定上一頁事件
    function turnPrev() { updatePage(currentIndex - 1); }
    if(btnPrev) btnPrev.addEventListener('click', turnPrev);
    if(zonePrev) zonePrev.addEventListener('click', turnPrev);
});