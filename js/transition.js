document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll('a');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetUrl = link.href;
      const currentHost = window.location.host;

      if (
        targetUrl.includes(currentHost) && 
        link.target !== "_blank" &&
        !link.getAttribute('href').startsWith('#')
      ) {
        e.preventDefault(); 
        
        // 觸發高質感的「優雅漲潮」動畫
        document.documentElement.classList.add('is-leaving');

        // 等待 1.35 秒，等三層海浪優雅地把畫面蓋滿後，再進行跳轉
        setTimeout(() => {
          window.location.href = targetUrl;
        }, 900);
      }
    });
  });
});

window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    document.documentElement.classList.remove('is-leaving');
  }
});