// 輪播功能
const track = document.getElementById('carouselTrack');
const groups = track.children.length;
let index = 0;

setInterval(() => {
  index = (index + 1) % groups;
  track.style.transform = `translateX(-${index * 100}%)`;
}, 4000);
