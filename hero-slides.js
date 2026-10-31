const heroSlides=[
  {src:'injector-test-bench.jpg',alt:'แท่นทดสอบหัวฉีดจากร้านแพรกษาดีเซล',title:'อุปกรณ์ทดสอบหัวฉีดของร้าน'},
  {src:'shop-front-v9.jpg',alt:'หน้าร้านแพรกษาดีเซล',title:'หน้าร้านแพรกษาดีเซล'},
  {src:'pump-and-injectors.jpg',alt:'ปั๊มและหัวฉีดดีเซลจากงานจริง',title:'งานปั๊มและหัวฉีดดีเซล'},
  {src:'diesel-injectors.jpg',alt:'ชุดหัวฉีดดีเซลจากงานจริง',title:'ชุดหัวฉีดดีเซล'},
  {src:'diesel-engine-work.jpg',alt:'งานเครื่องยนต์ดีเซลที่ร้าน',title:'งานเครื่องยนต์ดีเซล'},
  {src:'truck-engine-pump.jpg',alt:'งานเครื่องยนต์รถบรรทุก',title:'งานเครื่องยนต์รถบรรทุก'},
  {src:'diesel-pump-in-engine.jpg',alt:'ปั๊มดีเซลในห้องเครื่อง',title:'งานปั๊มดีเซลในห้องเครื่อง'}
];
const heroShow=document.querySelector('.hero-slideshow'),heroImage=heroShow.querySelector('.hero-slide-image');
let heroIndex=0,heroTimer;
function showHero(index){heroIndex=(index+heroSlides.length)%heroSlides.length;const item=heroSlides[heroIndex];heroImage.src=item.src;heroImage.alt=item.alt;heroShow.querySelector('.hero-slide-caption').textContent=item.title;heroShow.querySelector('.hero-slide-count').textContent=`${heroIndex+1} / ${heroSlides.length}`;}
function stopHero(){clearInterval(heroTimer);}
function startHero(){stopHero();if(!document.hidden)heroTimer=setInterval(()=>showHero(heroIndex+1),3500);}
heroShow.querySelector('.hero-prev').addEventListener('click',()=>{showHero(heroIndex-1);startHero();});
heroShow.querySelector('.hero-next').addEventListener('click',()=>{showHero(heroIndex+1);startHero();});
document.addEventListener('visibilitychange',()=>document.hidden?stopHero():startHero());
heroSlides.slice(1).forEach(item=>{const image=new Image();image.src=item.src;});
startHero();
