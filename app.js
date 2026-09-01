let activeCategory="all";
const labels={all:"All picks",tech:"Tech picks",home:"Home picks",fitness:"Fitness picks",style:"Style picks"};
function stars(r){return "★".repeat(Math.round(r))+"☆".repeat(5-Math.round(r))}
function render(){
 const q=(document.getElementById("search")?.value||"").toLowerCase().trim();
 const list=PRODUCTS.filter(p=>(activeCategory==="all"||p.category===activeCategory)&&(p.name+" "+p.description+" "+p.bestFor).toLowerCase().includes(q));
 const title=document.getElementById("resultsTitle"); if(title) title.textContent=labels[activeCategory];
 const count=document.getElementById("resultCount"); if(count) count.textContent=`${list.length} result${list.length===1?"":"s"}`;
 const grid=document.getElementById("all-products");
 if(grid) grid.innerHTML=list.map(p=>`<article class="card">
 <a href="product.html?id=${p.id}"><div class="product-image"><img src="${p.image}" alt="${p.name}" loading="eager"><span class="badge">${p.badge}</span></div></a>
 <h3>${p.name}</h3><div class="stars">${stars(p.rating)} <span class="muted">${p.rating}/5</span></div>
 <p class="muted">${p.description}</p><div class="card-bottom"><span class="price">${p.price}</span><a class="deal" href="${p.affiliateUrl}" target="_blank" rel="nofollow sponsored noopener">Check price ↗</a></div></article>`).join("")||"<p>No products found. Try another search.</p>";
 const cb=document.getElementById("compareBody");
 if(cb) cb.innerHTML=PRODUCTS.slice(0,6).map(p=>`<tr><td><strong>${p.name}</strong></td><td>${p.bestFor}</td><td>${p.rating}/5</td><td>${p.price}</td><td><a class="deal" href="product.html?id=${p.id}">Review</a></td></tr>`).join("");
}
function setCat(cat,el){activeCategory=cat;document.querySelectorAll(".category-tabs button").forEach(b=>b.classList.remove("active"));el?.classList.add("active");render()}
function focusSearch(){document.getElementById("search")?.focus();document.getElementById("shop")?.scrollIntoView({behavior:"smooth"})}
function clearSearch(){const s=document.getElementById("search");if(s){s.value="";render();s.focus()}}
function toggleTheme(){document.body.classList.toggle("dark");localStorage.setItem("shaland-theme",document.body.classList.contains("dark")?"dark":"light")}
function toggleNav(){const n=document.getElementById("nav");n.style.display=n.style.display==="flex"?"none":"flex"}
function subscribe(e){e.preventDefault();document.getElementById("message").textContent="Thanks! Newsletter signup is in demo mode until you connect an email provider.";e.target.reset()}
if(localStorage.getItem("shaland-theme")==="dark")document.body.classList.add("dark");
if(document.getElementById("all-products"))render();
