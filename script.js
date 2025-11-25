const products = [
  {id:1,name:'Chocolate Hazelnut',price:450,image:'https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=800&auto=format&fit=crop',ingredients:['Flour','Cocoa','Hazelnut','Butter','Sugar'],desc:'A rich chocolate cake layered with hazelnut ganache and finished with toasted hazelnuts.'},
  {id:2,name:'Classic Vanilla',price:420,image:'https://images.unsplash.com/photo-1525755662778-989d0524087e?q=80&w=800&auto=format&fit=crop',ingredients:['Flour','Eggs','Vanilla','Butter','Sugar'],desc:'Soft vanilla sponge with velvety vanilla buttercream — timeless and elegant.'},
  {id:3,name:'Strawberry Dream',price:480,image:'https://images.unsplash.com/photo-1543872084-c7bd3822856f?q=80&w=800&auto=format&fit=crop',ingredients:['Flour','Strawberries','Cream','Sugar'],desc:'Light sponge layered with fresh strawberries and whipped cream.'},
  {id:4,name:'Red Velvet',price:500,image:'https://images.unsplash.com/photo-1505250469679-203ad9ced0cb?q=80&w=800&auto=format&fit=crop',ingredients:['Flour','Cocoa','Buttermilk','Cream Cheese'],desc:'Moist red velvet with tangy cream cheese frosting.'},
  {id:5,name:'Lemon Meringue',price:460,image:'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?q=80&w=800&auto=format&fit=crop',ingredients:['Flour','Lemon','Egg Whites','Sugar'],desc:'Zesty lemon curd inside a soft sponge topped with toasted meringue.'},
  {id:6,name:'Salted Caramel',price:520,image:'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=800&auto=format&fit=crop',ingredients:['Flour','Butter','Caramel','Sea Salt'],desc:'Caramel-soaked sponge with sea-salt caramel drizzle.'},
  {id:7,name:'Black Forest',price:540,image:'https://images.unsplash.com/photo-1526318472351-c75fcf070f85?q=80&w=800&auto=format&fit=crop',ingredients:['Chocolate','Cherries','Cream','Kirsch'],desc:'Layers of chocolate sponge with cherries and whipped cream.'},
  {id:8,name:'Oreo Indulgence',price:430,image:'https://images.unsplash.com/photo-1606312619344-5a9e9f2d6d28?q=80&w=800&auto=format&fit=crop',ingredients:['Flour','Cocoa','Oreo','Cream'],desc:'Cookies and cream heaven with Oreo crunch.'},
  {id:9,name:'Blueberry Cheesecake',price:560,image:'https://images.unsplash.com/photo-1542444459-db6a8d2f2dcb?q=80&w=800&auto=format&fit=crop',ingredients:['Cream Cheese','Blueberries','Crust','Sugar'],desc:'Creamy cheesecake topped with blueberry compote.'},
  {id:10,name:'Pistachio Delight',price:590,image:'https://images.unsplash.com/photo-1588167103605-6d3a0b5a5b6a?q=80&w=800&auto=format&fit=crop',ingredients:['Flour','Pistachio','Butter','Sugar'],desc:'Delicate pistachio sponge with pistachio buttercream.'}
];

// Build sliders (duplicate track for smooth infinite effect)
const slider1 = document.getElementById('slider1');
const slider2 = document.getElementById('slider2');

function makeSlideItem(prod){
  const div = document.createElement('div');
  div.className = 'slide-item';
  const img = document.createElement('img');
  img.src = prod.image;
  img.alt = prod.name;
  div.appendChild(img);
  return div;
}

function populateSlider(slider,items){
  // create two sets to allow seamless loop
  for(let i=0;i<2;i++){
    items.forEach(p => slider.appendChild(makeSlideItem(p)));
  }
}
populateSlider(slider1,products.slice(0,8));
populateSlider(slider2,products.slice(2,10));

// Catalog grid
const grid = document.getElementById('catalogGrid');
function makeCard(p){
  const c = document.createElement('div');
  c.className = 'card';
  c.setAttribute('data-id',p.id);

  const img = document.createElement('img');
  img.src = p.image;
  img.alt = p.name;

  const h3 = document.createElement('h3');
  h3.textContent = p.name;

  const pr = document.createElement('p');
  pr.textContent = '₹' + p.price;

  c.appendChild(img);
  c.appendChild(h3);
  c.appendChild(pr);
  c.addEventListener('click', () => openModal(p.id));

  return c;
}

// show multiple rows; repeat products to fill grid with many rows
const gridItems = [];
for(let r=0;r<4;r++){
  products.forEach(p => gridItems.push(p));
}
gridItems.forEach(p => grid.appendChild(makeCard(p)));

// Modal logic
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalPrice = document.getElementById('modalPrice');
const modalDesc = document.getElementById('modalDesc');
const ingList = document.getElementById('ingList');
const closeBtn = document.getElementById('closeModal');

function openModal(id){
  const p = products.find(x => x.id === id);
  if(!p) return;
  modalImage.src = p.image;
  modalTitle.textContent = p.name;
  modalPrice.textContent = '₹' + p.price;
  modalDesc.textContent = p.desc;
  ingList.innerHTML = '';
  p.ingredients.forEach(i => {
    const li = document.createElement('li');
    li.textContent = i;
    ingList.appendChild(li);
  });
  modal.classList.add('open');
}

closeBtn.addEventListener('click', () => modal.classList.remove('open'));
modal.addEventListener('click', (e) => {
  if(e.target === modal) modal.classList.remove('open');
});

// Accessibility: pause animation on hover
document.querySelectorAll('.slider-wrap').forEach(s => {
  const slider = s.querySelector('.slider');
  if(!slider) return;
  s.addEventListener('mouseenter', () => {
    slider.style.animationPlayState = 'paused';
  });
  s.addEventListener('mouseleave', () => {
    slider.style.animationPlayState = 'running';
  });
});
