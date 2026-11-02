(function(){
  function track(eventName,extra){if(typeof gtag==='function'){gtag('event',eventName,extra||{});}}
  document.addEventListener('click',function(e){
    var a=e.target.closest('a');
    if(!a)return;
    var href=a.getAttribute('href')||'';
    if(href.indexOf('tel:')===0){track('phone_click',{event_category:'contact',event_label:href});}
    else if(href.indexOf('lin.ee')!==-1||href.indexOf('line.me')!==-1){track('line_click',{event_category:'contact',event_label:href});}
  },true);
  document.addEventListener('submit',function(e){
    if(e.target&&e.target.id==='callbackForm'){track('callback_form_submit',{event_category:'contact'});}
  },true);
})();
