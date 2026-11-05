(function(){
  var menu=document.querySelector('.menu'),links=document.querySelector('.links');
  if(!menu||!links)return;
  menu.addEventListener('click',function(){var open=links.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});
  links.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){links.classList.remove('open');menu.setAttribute('aria-expanded','false');});});
})();
