const menu=document.querySelector('.menu'),links=document.querySelector('.links');
menu.addEventListener('click',()=>{const open=links.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});
links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{links.classList.remove('open');menu.setAttribute('aria-expanded','false');}));
const album=document.querySelector('.album-dialog'),lightbox=document.querySelector('.lightbox'),grid=album.querySelector('.album-grid');
const photos=window.workPhotos;let current=0;let activePhotos=photos;
function showPhoto(index){current=(index+activePhotos.length)%activePhotos.length;const photo=activePhotos[current],img=lightbox.querySelector('img');img.src=photo.src;img.alt=photo.title;lightbox.querySelector('p').textContent=photo.title;lightbox.querySelector('.image-count').textContent=`${current+1} / ${activePhotos.length}`;if(!lightbox.open)lightbox.showModal();}
const categories=[['all','📷 ทั้งหมด'],['bus','🚌 รถบัส'],['truck','🚚 รถบรรทุก'],['pickup','🛻 รถกระบะ'],['vehicle','🚐 รถดีเซลอื่นๆ'],['machine','🚜 เครื่องจักร'],['injector','⚙️ หัวฉีด'],['pump','🧰 เช็คปั๊ม'],['shop','🏠 ภาพร้าน']];
let selectedCategory='all';
const getPhotos=id=>id==='all'?photos:photos.filter(p=>(p.categories||[]).includes(id));
function renderAlbum(id){selectedCategory=id;const selected=getPhotos(id);grid.replaceChildren();album.querySelector('.album-status').textContent=`${categories.find(c=>c[0]===id)[1]} · ${selected.length} ภาพ · กดภาพเพื่อขยาย`;
document.querySelectorAll('.album-filter,.album-shortcuts button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.category===id)));
selected.forEach((photo,i)=>{const button=document.createElement('button');button.type='button';button.setAttribute('aria-label',`ขยายภาพ ${i+1}: ${photo.title}`);const img=document.createElement('img');img.src=photo.thumb||photo.src;img.alt=photo.title;img.loading='lazy';img.decoding='async';const label=document.createElement('span');label.textContent=photo.title;button.append(img,label);button.addEventListener('click',()=>{activePhotos=selected;showPhoto(i);});grid.append(button);});
if(!selected.length){const empty=document.createElement('p');empty.textContent='ยังไม่มีภาพในหมวดนี้';grid.append(empty);}
album.scrollTop=0;
}
categories.forEach(([id,title])=>{const count=getPhotos(id).length;const button=document.createElement('button');button.type='button';button.className='album-filter';button.dataset.category=id;button.textContent=`${title} (${count})`;button.setAttribute('aria-pressed',String(id==='all'));button.addEventListener('click',()=>renderAlbum(id));album.querySelector('.album-filters').append(button);
if(id!=='all'){const shortcut=document.createElement('button');shortcut.type='button';shortcut.textContent=`${title} · ${count}`;shortcut.addEventListener('click',()=>{renderAlbum(id);album.showModal();});document.querySelector('.album-shortcuts').append(shortcut);}});
document.querySelectorAll('.album-filter,.album-shortcuts button').forEach(button=>{
const original=button.textContent;const space=original.indexOf(' ');const emoji=document.createElement('span');emoji.className='category-emoji';emoji.setAttribute('aria-hidden','true');emoji.textContent=original.slice(0,space);const label=document.createElement('span');label.textContent=original.slice(space+1);button.replaceChildren(emoji,label);
if(!button.dataset.category){const entry=categories.find(c=>original.startsWith(c[1]));if(entry)button.dataset.category=entry[0];}
});
renderAlbum('all');
document.querySelector('.album-open').innerHTML=`ดูอัลบั้มผลงานทั้งหมด · ${photos.length} ภาพ <span aria-hidden="true">↗</span>`;
document.querySelector('.album-open').addEventListener('click',()=>{renderAlbum('all');album.showModal();});
album.querySelector('.album-close').addEventListener('click',()=>album.close());
album.addEventListener('click',e=>{if(e.target===album)album.close();});
const previews=[...document.querySelectorAll('.photo-open')];
previews.forEach((button,i)=>button.addEventListener('click',()=>{activePhotos=previews.map(b=>({src:b.dataset.full,title:b.dataset.alt}));showPhoto(i);}));
lightbox.querySelector('.lightbox-close').addEventListener('click',()=>lightbox.close());
lightbox.querySelector('.image-prev').addEventListener('click',()=>showPhoto(current-1));
lightbox.querySelector('.image-next').addEventListener('click',()=>showPhoto(current+1));
lightbox.addEventListener('click',e=>{if(e.target===lightbox)lightbox.close();});
lightbox.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();showPhoto(current+1);}if(e.key==='ArrowLeft'){e.preventDefault();showPhoto(current-1);}});
let touchX=null;const fullImage=lightbox.querySelector('img');
fullImage.addEventListener('touchstart',e=>{touchX=e.touches.length===1?e.touches[0].clientX:null;},{passive:true});
fullImage.addEventListener('touchend',e=>{if(touchX===null)return;const delta=e.changedTouches[0].clientX-touchX;if(Math.abs(delta)>60)showPhoto(current+(delta<0?1:-1));touchX=null;},{passive:true});
