// Lazy-load Twitter embeds — loads widgets.js when any tweet is near viewport
(function(){
  var loaded = false;
  function loadTwitter(){
    if(loaded) return;
    loaded = true;
    var s = document.createElement('script');
    s.src = 'https://platform.twitter.com/widgets.js';
    s.charset = 'utf-8';
    s.async = true;
    s.onload = function(){
      // Re-render any tweets that were missed during initial load
      if(window.twttr && twttr.widgets) twttr.widgets.load();
    };
    document.body.appendChild(s);
  }
  if(!document.querySelectorAll('.twitter-tweet').length) return;
  if('IntersectionObserver' in window){
    var obs = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){ loadTwitter(); obs.disconnect(); }
      });
    }, {rootMargin:'800px 800px 800px 800px'});
    document.querySelectorAll('.twitter-tweet').forEach(function(el){ obs.observe(el); });
  } else {
    loadTwitter();
  }
  // Fallback: if tweets still haven't loaded after 3s, force load
  setTimeout(function(){ loadTwitter(); }, 3000);
})();
