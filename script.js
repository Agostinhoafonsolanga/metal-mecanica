/* MENU MOBILE */
const btnMenu = document.getElementById('btn-menu');
const menuMobile = document.getElementById('menu-mobile');
const fecharMenu = document.getElementById('fechar-menu');

btnMenu.addEventListener('click', () => menuMobile.classList.toggle('translate-x-0'));
fecharMenu.addEventListener('click', () => menuMobile.classList.remove('translate-x-0'));
menuMobile.querySelectorAll('a').forEach(link => link.addEventListener('click', () => menuMobile.classList.remove('translate-x-0')));
window.addEventListener('scroll', () => menuMobile.classList.remove('translate-x-0'));

/* FILTROS DE PROJETOS */
const filtros = document.querySelectorAll('.filtro');
const projetos = document.querySelectorAll('.card-projeto');

filtros.forEach(filtro => {
  filtro.addEventListener('click', () => {
    filtros.forEach(f => f.classList.remove('filtro-ativo','bg-green-500','text-black'));
    filtros.forEach(f => f.classList.add('bg-gray-800','text-white'));
    filtro.classList.add('filtro-ativo','bg-green-500','text-black');
    filtro.classList.remove('bg-gray-800','text-white');

    const cat = filtro.dataset.cat;
    projetos.forEach(proj => {
      if(cat === 'todos' || proj.dataset.cat === cat){
        proj.style.display = 'block';
        setTimeout(()=> proj.classList.add('animar'),50);
      } else {
        proj.style.display = 'none';
        proj.classList.remove('animar');
      }
    });
  });
});

/* LIGHTBOX COM SLIDESHOW */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxFechar = lightbox.querySelector('.fechar');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let imagens = [];
let currentIndex = 0;
let slideInterval;

function abrirLightbox(imagensDoProjeto, titulo){
  imagens = imagensDoProjeto;
  currentIndex = 0;
  lightboxImg.src = imagens[currentIndex];
  lightboxCaption.innerText = titulo;
  lightbox.classList.add('aberto');

  clearInterval(slideInterval);
  slideInterval = setInterval(nextSlide, 10000); // Muda a cada 10 segundos
}

function fecharLightbox(){
  lightbox.classList.remove('aberto');
  clearInterval(slideInterval);
}

function nextSlide(){
  currentIndex = (currentIndex + 1) % imagens.length;
  lightboxImg.src = imagens[currentIndex];
}

function prevSlide(){
  currentIndex = (currentIndex - 1 + imagens.length) % imagens.length;
  lightboxImg.src = imagens[currentIndex];
}

/* Botões "Ver projeto" */
document.querySelectorAll('.btn-ver').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.card-projeto');
    const imagensDoProjeto = card.dataset.imagens.split(','); // pega todas as imagens do card
    const titulo = card.querySelector('h3').innerText;
    abrirLightbox(imagensDoProjeto, titulo);
  });
});

/* Botões de navegação do lightbox */
lightboxFechar.addEventListener('click', fecharLightbox);
lightbox.addEventListener('click', e => { if(e.target === lightbox) fecharLightbox(); });
nextBtn.addEventListener('click', () => { nextSlide(); clearInterval(slideInterval); slideInterval = setInterval(nextSlide,10000); });
prevBtn.addEventListener('click', () => { prevSlide(); clearInterval(slideInterval); slideInterval = setInterval(nextSlide,10000); });

/* Animar cards visíveis ao carregar */
window.addEventListener('load', () => {
  projetos.forEach((proj, i) => setTimeout(()=> proj.classList.add('animar'), i*150));
});
