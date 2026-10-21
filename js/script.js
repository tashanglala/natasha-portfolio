
(function(){
var $=function(s){return document.querySelector(s)},$$=function(s){return [].slice.call(document.querySelectorAll(s))};
var z=100,mob=function(){return innerWidth<=700},T=[];
var later=function(f,ms){T.push(setTimeout(f,ms))};
// floating decor
["♡","✿","🎀","♡","✿"].forEach(function(c,n){var s=document.createElement("div");s.className="fl";s.textContent=c;s.style.left=(10+n*20)+"%";s.style.top=(20+(n*37)%60)+"%";s.style.animationDelay=n*1.3+"s";document.body.insertBefore(s,$("#menu"))});
// clock
function tick(){var d=new Date();$("#clock").textContent=d.toLocaleTimeString([],{hour:"numeric",minute:"2-digit"});$("#lt").textContent=d.toLocaleTimeString([],{hour:"numeric",minute:"2-digit",hour12:false});$("#ld").textContent=d.toLocaleDateString([],{weekday:"long",month:"long",day:"numeric"})}tick();setInterval(tick,15000);
// windows
function place(w){var W=w.offsetWidth,H=w.offsetHeight;
 w.style.left=Math.max(8,(innerWidth-W)/2)+"px";w.style.top=Math.max(44,(innerHeight-H)/2-20)+"px"}
function focusW(w){$$(".win").forEach(function(x){x.classList.remove("focus")});if(w){w.classList.add("focus");w.style.zIndex=++z;$("#app").textContent=w.dataset.t}else $("#app").textContent="Finder"}
function dockBtn(w){return $('#dock button[data-w="'+w.id+'"]')}
function run(w,on){var b=dockBtn(w);if(b)b.classList.toggle("run",on)}
function openW(id){var w=document.getElementById(id),b=dockBtn(w);$$(".win").forEach(function(x){if(x!==w){x.classList.remove("show","min","max");run(x,false)}});var was=w.classList.contains("show");if(!was)place(w);
 if(w.classList.contains("min")||!w.classList.contains("show")){
  w.classList.remove("min");void w.offsetWidth;w.classList.add("show");
  if(b&&!b.classList.contains("run")){b.classList.add("bn");setTimeout(function(){b.classList.remove("bn")},1300)}}
 run(w,true);focusW(w);if(id==="w-about"&&!was)setTimeout(intro,500);
 if(mob())w.scrollIntoView({block:"center"})}
function closeW(w){w.classList.remove("show","max");run(w,false);focusW(null)}
function minW(w){var b=dockBtn(w).getBoundingClientRect(),r=w.getBoundingClientRect();
 w.style.setProperty("--tx",(b.left+b.width/2-(r.left+r.width/2))+"px");w.style.setProperty("--ty",(b.top+b.height/2-(r.top+r.height/2))+"px");
 w.style.transformOrigin="50% 50%";w.classList.add("min");w.classList.remove("show");focusW(null)}
$$(".win").forEach(function(w){
 w.addEventListener("pointerdown",function(){focusW(w)});
 var tb=w.querySelector(".tb"),sx,sy,ox,oy,on=false;
 tb.addEventListener("pointerdown",function(e){if(e.target.closest("button")||mob()||w.classList.contains("max"))return;on=true;sx=e.clientX;sy=e.clientY;ox=w.offsetLeft;oy=w.offsetTop;tb.setPointerCapture(e.pointerId)});
 tb.addEventListener("pointermove",function(e){if(!on)return;w.style.left=Math.min(innerWidth-80,Math.max(-300,ox+e.clientX-sx))+"px";w.style.top=Math.min(innerHeight-90,Math.max(34,oy+e.clientY-sy))+"px"});
 tb.addEventListener("pointerup",function(){on=false});
 tb.addEventListener("dblclick",function(){w.classList.toggle("max")});
 w.querySelector("[data-c]").addEventListener("click",function(){closeW(w)});
 w.querySelector("[data-m]").addEventListener("click",function(){minW(w)});
 w.querySelector("[data-z]").addEventListener("click",function(){w.classList.toggle("max")});
});
$("#desk").addEventListener("click",function(e){if(e.target===this)focusW(null)});

// profile reel (video-style intro)
var reel=$("#reel"),SCN=$$("#reel .sc"),SEG=$$("#segs i"),DUR=[4000,3800,4000,4000,4300,4200,0],BG=["#ffb3d1","#ffc9a8","#ffb3d1","#c9b6ff","#ffc2dc","#ffe29a","#ffb3d1"],cs=0,tm,t0=0,rem=0,pz=false,ntm,ctm,NAME="Natasha Nicole Remoto";
function count(){var ns=$$("#reel [data-n]"),s0=Date.now()+700;ns.forEach(function(n){n.textContent="0"});clearInterval(ctm);ctm=setInterval(function(){var p=Math.max(0,Math.min(1,(Date.now()-s0)/1300));ns.forEach(function(n){n.textContent=Math.round(n.dataset.n*p)});if(p>=1)clearInterval(ctm)},40)}
function go(n){
 n=Math.max(0,Math.min(6,n));clearTimeout(tm);clearTimeout(ntm);clearInterval(ctm);pz=false;reel.classList.remove("paused");$("#rpp").textContent="⏸";
 if(n===0){reel.classList.remove("play");void reel.offsetWidth;reel.classList.add("play")}
 cs=n;reel.dataset.p=n===0?"c":"l";
 SCN.forEach(function(x,k){x.classList.toggle("on",k===n);x.classList.toggle("past",k<n)});
 SEG.forEach(function(g,k){g.classList.remove("done","cur");if(k<n)g.classList.add("done")});
 if(n<6){var g=SEG[n];g.style.setProperty("--dur",DUR[n]+"ms");void g.offsetWidth;g.classList.add("cur")}else SEG[6].classList.add("done");
 $("#blob").style.backgroundColor=BG[n];$("#blob2").style.backgroundColor=BG[(n+3)%7];$("#blob").style.transform="translate("+((n*22)%70)+"px,"+(n*-16)+"px) scale("+(1+n*.07)+")";
 var tg=$("#tag");
 if(n===0){tg.textContent="";var j=0;ntm=setTimeout(function ty(){if(j<=NAME.length){tg.textContent=NAME.slice(0,j++);ntm=setTimeout(ty,75)}},1300)}else tg.textContent=NAME;
 if(n===6){count();burst($(".pw"))}
 if(n<6){t0=Date.now();tm=setTimeout(function(){if($("#w-about").classList.contains("show"))go(cs+1)},DUR[n])}}
function intro(){go(0)}
$("#rrp").addEventListener("click",function(){go(0)});$("#rpv").addEventListener("click",function(){go(cs-1)});$("#rnx").addEventListener("click",function(){go(cs+1)});
$("#rpp").addEventListener("click",function(){if(cs>=6)return;
 if(!pz){pz=true;clearTimeout(tm);rem=DUR[cs]-(Date.now()-t0);reel.classList.add("paused");this.textContent="▶"}
 else{pz=false;reel.classList.remove("paused");t0=Date.now()-(DUR[cs]-rem);tm=setTimeout(function(){go(cs+1)},rem);this.textContent="⏸"}});
function burst(b){var r=b.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;
 for(var k=0;k<18;k++){var s=document.createElement("span"),a=Math.random()*6.28,d=70+Math.random()*130;s.className="hb";s.textContent=["♡","✿","🎀","✦"][k%4];s.style.left=cx+"px";s.style.top=cy+"px";s.style.setProperty("--dx",Math.cos(a)*d+"px");s.style.setProperty("--dy",Math.sin(a)*d-40+"px");s.style.setProperty("--r",(Math.random()*120-60)+"deg");document.body.appendChild(s);setTimeout(function(x){x.remove()},1000,s)}
 var t=$("#toast");t.textContent="Hi hi! Nice to meet you ♡";t.classList.add("in");setTimeout(function(){t.classList.remove("in")},2400)}
var ph=$("#ph");$(".av").innerHTML='<img alt="" src="'+ph.getAttribute("src")+'">';
function setPh(s){ph.src=s;ph.hidden=false;$("#phe").style.display="none"}

$("#pf").addEventListener("change",function(){var f=this.files[0];if(!f)return;var fr=new FileReader();fr.onload=function(){var im=new Image();im.onload=function(){var s=Math.min(1,640/Math.max(im.width,im.height)),c=document.createElement("canvas");c.width=im.width*s;c.height=im.height*s;c.getContext("2d").drawImage(im,0,0,c.width,c.height);var d=c.toDataURL("image/jpeg",.85);setPh(d);try{localStorage.setItem("np_photo",d)}catch(e){}};im.src=fr.result};fr.readAsDataURL(f)});
$$(".win").forEach(function(w){w.querySelectorAll(".chip,.btn").forEach(function(c,i){c.style.setProperty("--c",i)})});
// certificate filters
var cfb=$$(".cfb"),ccs=$$(".cc");
function filt(f){cfb.forEach(function(b){b.classList.toggle("on",b.dataset.f===f)});var n=0;
 ccs.forEach(function(c){var ok=f==="all"||c.dataset.k===f;c.classList.toggle("gone",!ok);if(ok){n++;c.style.animation="none";void c.offsetWidth;c.style.animation=""}});
 $("#cnt").textContent="Showing "+n+"."}
cfb.forEach(function(b){b.addEventListener("click",function(){filt(b.dataset.f)})});filt("all");
var CERT={
 "IT Customer Support Basics": "assets/certificates/it-customer-support-basics.jpg",
 "Data Analytics Essentials": "assets/certificates/data-analytics-essentials.jpg",
 "Digital Safety and Security Awareness": "assets/certificates/digital-safety-and-security-awareness.jpg",
 "JavaScript Essentials 1": "assets/certificates/javascript-essentials-1.jpg",
 "Computer Hardware Basics": "assets/certificates/computer-hardware-basics.jpg",
 "HTML Essentials": "assets/certificates/html-essentials.jpg",
 "Network Support and Security": "assets/certificates/network-support-and-security.jpg",
 "CSS Essentials": "assets/certificates/css-essentials.jpg",
 "Introduction to Cybersecurity": "assets/certificates/introduction-to-cybersecurity.jpg",
 "Ethical Hacker": "assets/certificates/ethical-hacker.jpg",
 "JavaScript Essentials 2": "assets/certificates/javascript-essentials-2.jpg",
 "Digital Awareness": "assets/certificates/digital-awareness.jpg",
 "Introduction to Modern AI": "assets/certificates/introduction-to-modern-ai.jpg",
 "Python Essentials 2": "assets/certificates/python-essentials-2.jpg",
 "Data Science Essentials with Python": "assets/certificates/data-science-essentials-with-python.jpg",
 "Python Essentials 1": "assets/certificates/python-essentials-1.jpg"
};
// lightbox
var lb=$("#lb"),lbi=$("#lbi"),cur=null;
function vis(){return ccs.filter(function(c){return !c.classList.contains("gone")})}
function showC(c){cur=c;var t=c.querySelector("b").textContent;lbi.src=CERT[t]||"";lbi.alt=t+" certificate";$("#lbc").textContent=t+" · "+c.querySelector(".dt").textContent.replace("✓ ","").replace(" · tap to view","")}
function openLb(c){showC(c);lb.classList.add("on");lb.setAttribute("aria-hidden","false")}
function closeLb(){lb.classList.remove("on");lb.setAttribute("aria-hidden","true")}
function step(d){var v=vis(),i=v.indexOf(cur);if(i<0||!v.length)return;showC(v[(i+d+v.length)%v.length])}
ccs.forEach(function(c){c.tabIndex=0;c.addEventListener("click",function(){openLb(c)});c.addEventListener("keydown",function(e){if(e.key==="Enter")openLb(c)})});
$("#lbx").addEventListener("click",closeLb);$("#lbp").addEventListener("click",function(e){e.stopPropagation();step(-1)});$("#lbn").addEventListener("click",function(e){e.stopPropagation();step(1)});
lb.addEventListener("click",function(e){if(e.target===lb)closeLb()});
document.addEventListener("keydown",function(e){if(!lb.classList.contains("on"))return;if(e.key==="Escape")closeLb();if(e.key==="ArrowLeft")step(-1);if(e.key==="ArrowRight")step(1)});
// opening: dock, desktop icons
$$("[data-w]").forEach(function(b){b.addEventListener("click",function(){openW(b.dataset.w)})});
// dock magnification
var dock=$("#dock"),bs=$$("#dock button");
dock.addEventListener("mousemove",function(e){bs.forEach(function(b){var r=b.getBoundingClientRect(),d=Math.abs(e.clientX-(r.left+r.width/2)),s=1+.75*Math.max(0,1-d/120);b.style.transform="scale("+s+")";b.style.margin="0 "+((s-1)*18)+"px"})});
dock.addEventListener("mouseleave",function(){bs.forEach(function(b){b.style.transform="";b.style.margin=""})});
// menu
var dd=$("#dd");
$("#apple").addEventListener("click",function(e){e.stopPropagation();dd.classList.toggle("on");this.classList.toggle("on")});
document.addEventListener("click",function(){dd.classList.remove("on");$("#apple").classList.remove("on")});
// résumé
var msg=$("#msg");
function dl(){
 var t=$("#toast"),a=document.createElement("a");
 a.href="assets/Natasha-Remoto-Resume.pdf";a.download="Natasha-Remoto-Resume.pdf";document.body.appendChild(a);a.click();a.remove();
 msg.textContent="Résumé downloading ♡";t.textContent="Résumé downloading ♡";t.classList.add("in");setTimeout(function(){t.classList.remove("in")},2600)}
function act(a,b){
 if(a==="hi")burst(b);else if(a==="dl")dl();
 else if(a==="all")["w-about","w-work","w-orgs","w-skills","w-contact"].forEach(function(id,n){later(function(){openW(id)},n*220)});
 else if(a==="closeall")$$(".win.show").forEach(closeW);
 else if(a==="restart")boot();
 else openW(a)}
$$("[data-a]").forEach(function(b){b.addEventListener("click",function(){act(b.dataset.a,b)})});
// intro sequence: boot -> lock screen -> unlock -> desktop
function boot(){
 T.forEach(clearTimeout);T=[];
 $$(".win").forEach(function(w){w.classList.remove("show","min","max");run(w,false)});focusW(null);
 $("#menu").classList.remove("in");dock.classList.remove("in");$$(".ic").forEach(function(i){i.classList.remove("in")});$("#toast").classList.remove("in");
 var bt=$("#boot"),lk=$("#lock"),pw=$("#pw"),hint=$("#hint");
 bt.style.display="";bt.classList.remove("off");lk.classList.remove("off");pw.innerHTML="&nbsp;";pw.style.animation="";hint.textContent="tap to skip";
 var bar=$(".bar i");bar.style.animation="none";void bar.offsetWidth;bar.style.animation="";
 later(function(){bt.classList.add("off")},2900);
 var n=0;later(function t(){if(n<8){pw.textContent="•".repeat(++n);T.push(setTimeout(t,170))}else{hint.textContent="welcome ♡"}},4000);
 later(unlock,5900)}
function unlock(){
 T.forEach(clearTimeout);T=[];$("#boot").classList.add("off");$("#lock").classList.add("off");
 later(function(){$("#menu").classList.add("in");dock.classList.add("in")},500);
 $$(".ic").forEach(function(i,n){later(function(){i.classList.add("in")},900+n*130)});
 later(function(){openW("w-about")},1300);
 later(function(){$("#toast").textContent="Welcome ♡ Open anything from the dock or desktop";$("#toast").classList.add("in")},2200);
 later(function(){$("#toast").classList.remove("in")},5600)}
$("#lock").addEventListener("click",unlock);$("#boot").addEventListener("click",unlock);
boot();
})();
