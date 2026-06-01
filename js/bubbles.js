document.addEventListener("DOMContentLoaded", () => {
  const container = document.createElement('div');
  container.id = 'bubble-container';
  document.body.insertBefore(container, document.body.firstChild);

  function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    // 1. 決定這顆粒子是「小冰晶」還是「大光斑 (景深失焦)」
    // 80% 機率是細小的微塵，20% 機率是鏡頭前失焦的大光斑
    const isBokeh = Math.random() > 0.8; 
    const size = isBokeh ? (Math.random() * 15 + 8) : (Math.random() * 3 + 1);

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`;

    // 🌟 關鍵魔法：如果是大光斑，就加上模糊效果 (Blur) 產生鏡頭景深感
    if (isBokeh) {
      const blurAmount = Math.random() * 4 + 2;
      particle.style.filter = `blur(${blurAmount}px)`;
    }

    // 2. 設定極其緩慢的上升時間 (12秒 ~ 25秒，越慢越有質感)
    const duration = Math.random() * 13 + 12;
    particle.style.animationDuration = `${duration}s`;

    // 3. 隨機生成 CSS 動畫變數 (左右飄移幅度、透明度、最終縮放)
    const driftX = (Math.random() - 0.5) * 150; // -75px 到 75px 的左右隨機搖擺
    const maxOpacity = isBokeh ? (Math.random() * 0.15 + 0.05) : (Math.random() * 0.4 + 0.1); 
    const endScale = Math.random() * 0.5 + 0.8; 

    // 將變數注入到 CSS 中
    particle.style.setProperty('--drift-x', `${driftX}px`);
    particle.style.setProperty('--max-opacity', maxOpacity);
    particle.style.setProperty('--end-scale', endScale);

    container.appendChild(particle);

    // 動畫結束後移除
    setTimeout(() => {
      particle.remove();
    }, duration * 1000);
  }

  // 初始先打底 25 顆粒子，錯開出現時間
  for (let i = 0; i < 25; i++) {
    setTimeout(createParticle, Math.random() * 10000); 
  }

  // 之後每隔 600 毫秒穩定產生新的光斑/冰晶
  setInterval(createParticle, 600);
});