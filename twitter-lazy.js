// Lazy-load Twitter embeds — only loads widgets.js when a tweet scrolls into view
(function(){
  var loaded = false;
  function loadTwitter(){
    if(loaded) return;
    loaded = true;
    var s = document.createElement('script');
    s.src = 'https://platform.twitter.com/widgets.js';
    s.charset = 'utf-8';
    s.async = true;
    document.body.appendChild(s);
  }
  if(!document.querySelectorAll('.twitter-tweet').length) return;
  if('IntersectionObserver' in window){
    var obs = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){ loadTwitter(); obs.disconnect(); }
      });
    }, {rootMargin:'400px'});
    document.querySelectorAll('.twitter-tweet').forEach(function(el){ obs.observe(el); });
  } else {
    loadTwitter();
  }
})();
