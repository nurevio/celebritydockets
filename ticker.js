/* Celebrity Dockets · Global Ticker
   Drop <script src="ticker.js" defer></script> on any page.
   Self-injects CSS + HTML + seamless-loop logic. */
(function(){
  // Don't double-inject if ticker already exists (e.g. index.html has its own)
  if(document.querySelector('.ticker-wrap'))return;

  // --- CSS ---
  var css=document.createElement('style');
  css.textContent=
    '.cd-ticker-wrap{display:flex;align-items:center;background:linear-gradient(90deg,rgba(225,16,40,.08),rgba(10,10,15,.95) 12%,rgba(10,10,15,.95) 88%,rgba(246,195,64,.08));border-bottom:1px solid var(--border,#2a2a3a);overflow:hidden;height:38px;position:sticky;top:var(--cd-hdr-h,57px);z-index:99;font-family:"IBM Plex Sans",sans-serif}'+
    ':root[data-theme="light"] .cd-ticker-wrap{background:linear-gradient(90deg,rgba(225,16,40,.06),rgba(245,242,234,.97) 12%,rgba(245,242,234,.97) 88%,rgba(246,195,64,.06))}'+
    '.cd-ticker-label{font-family:"JetBrains Mono",monospace;font-size:.62rem;font-weight:800;text-transform:uppercase;letter-spacing:2px;color:#fff;background:#E11028;padding:6px 14px;white-space:nowrap;z-index:2;display:flex;align-items:center;gap:6px;height:100%}'+
    '.cd-ticker-label::before{content:"";width:6px;height:6px;background:#fff;border-radius:50%;animation:cdPulse 2s infinite}'+
    '@keyframes cdPulse{0%,100%{opacity:1}50%{opacity:.4}}'+
    '.cd-ticker-track{flex:1;overflow:hidden;position:relative;height:100%;display:flex;align-items:center;mask-image:linear-gradient(90deg,transparent 0%,#000 3%,#000 97%,transparent 100%);-webkit-mask-image:linear-gradient(90deg,transparent 0%,#000 3%,#000 97%,transparent 100%)}'+
    '.cd-ticker-content{display:flex;align-items:center;gap:0;white-space:nowrap;animation:cdTickerScroll var(--cd-ticker-speed,90s) linear infinite}'+
    '.cd-ticker-content:hover{animation-play-state:paused}'+
    '.cd-ticker-item{display:inline-flex;align-items:center;gap:6px;padding:0 28px;font-size:.78rem;color:var(--text-secondary,#9a9a9a);text-decoration:none;transition:color .2s;white-space:nowrap;border-right:1px solid var(--border-light,#1e1e2e);height:22px}'+
    '.cd-ticker-item:last-child{border-right:none}'+
    '.cd-ticker-item:hover{color:var(--accent-gold,#F6C340)}'+
    '.cd-ticker-item .cdt-badge{font-family:"JetBrains Mono",monospace;font-size:.58rem;font-weight:700;text-transform:uppercase;letter-spacing:.8px;padding:2px 7px;border-radius:3px;white-space:nowrap}'+
    '.cdt-verdict{background:rgba(39,174,96,.15);color:#27ae60}'+
    '.cdt-trial{background:rgba(225,16,40,.12);color:#E11028}'+
    '.cdt-new{background:rgba(246,195,64,.12);color:#F6C340}'+
    '.cdt-settled{background:rgba(74,144,217,.12);color:#4a90d9}'+
    '@keyframes cdTickerScroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}';
  document.head.appendChild(css);

  // --- Ticker items (single source of truth — edit here for all pages) ---
  var items=[
    {href:'avila-v-chris-brown.html',badge:'trial',badgeText:'Jun 15',text:'Avila v. Chris Brown — $90M dog attack trial \xb7 dueling motions in limine'},
    {href:'d4vd-grand-jury.html',badge:'trial',badgeText:'Jun 29',text:'People v. d4vd — Prelim hearing \xb7 status Jun 17'},
    {href:'fat-joe-v-dixon.html',badge:'new',badgeText:'New',text:'Fat Joe v. Dixon — Blackburn responds to sanctions show-cause order'},
    {href:'kanye-west-employee-lawsuits.html',badge:'new',badgeText:'New',text:'John Doe v. Ye — Chateau Marmont battery suit filed'},
    {href:'kanye-west-employee-lawsuits.html',badge:'verdict',badgeText:'Verdict',text:'Kanye "Hurricane" — $438K copyright infringement verdict'},
    {href:'lively-v-baldoni.html',badge:'settled',badgeText:'Settled',text:'Lively v. Wayfarer — \xa7 47.1 attorneys’ fees ruling pending'},
    {href:'mondream-entertainment-lawsuits.html',badge:'new',badgeText:'New',text:'Moon Dream v. Saweetie & Derulo — concert promoter sues two artists'},
    {href:'hartbeat-v-eddings-gwam.html',badge:'new',badgeText:'New',text:'Hartbeat v. Eddings & Gwam — Kevin Hart trade-secret suit'},
    {href:'lizzo-employees-lawsuit.html',badge:'trial',badgeText:'Trial 2026',text:'Davis v. Lizzo — 9-count FEHA complaint \xb7 Lizzo refuses to settle'},
    {href:'wade-v-swift-showgirl.html',badge:'trial',badgeText:'TODAY',text:'Flagg v. Swift — Showgirl trademark injunction hearing \xb7 LA federal court'},
    {href:'latest.html',badge:'',badgeText:'',text:'See all latest updates →',gold:true}
  ];

  // --- Build HTML ---
  // Resolve relative hrefs to root if we're in a subdirectory
  var depth=(location.pathname.match(/\//g)||[]).length-1;
  var prefix='';for(var i=0;i<depth;i++)prefix+='../';

  var html='<div class="cd-ticker-wrap"><div class="cd-ticker-label">★ Latest</div><div class="cd-ticker-track"><div class="cd-ticker-content" id="cdTickerContent">';
  items.forEach(function(it){
    var badgeHtml=it.badge?'<span class="cdt-badge cdt-'+it.badge+'">'+it.badgeText+'</span>':'';
    var style=it.gold?' style="color:var(--accent-gold,#F6C340);font-weight:600"':'';
    html+='<a href="'+prefix+it.href+'" class="cd-ticker-item"'+style+'>'+badgeHtml+it.text+'</a>';
  });
  html+='</div></div></div>';

  // --- Inject after header ---
  var header=document.querySelector('.site-header')||document.querySelector('.hdr')||document.querySelector('header');
  if(header){
    var div=document.createElement('div');
    div.innerHTML=html;
    var ticker=div.firstChild;
    header.parentNode.insertBefore(ticker,header.nextSibling);
    // Pin below header
    var hdrH=header.offsetHeight;
    document.documentElement.style.setProperty('--cd-hdr-h',hdrH+'px');
  }

  // --- Seamless loop ---
  requestAnimationFrame(function(){
    var tc=document.getElementById('cdTickerContent');
    if(!tc)return;
    var orig=tc.innerHTML;
    tc.innerHTML=orig+orig;
    requestAnimationFrame(function(){
      var w=tc.scrollWidth/2;
      var speed=Math.max(40,Math.round(w/45));
      tc.style.setProperty('--cd-ticker-speed',speed+'s');
    });
  });
})();
