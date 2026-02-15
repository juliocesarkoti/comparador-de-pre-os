// Seleções iniciais
const allItems = Array.from(document.querySelectorAll('.thumb-item'));
let filteredItems = allItems.slice();
let currentIndex = 0;
const VISIBLE_COUNT = 3;

// Utilities para mostrar/ocultar com fade
function hideItemWithFade(item) {
  return new Promise(resolve => {
    item.classList.remove('is-visible');
    item.classList.add('is-hidden');
    // aguarda transição
    setTimeout(() => {
      item.style.display = 'none';
      item.classList.remove('is-hidden');
      resolve();
    }, 320);
  });
}

function showItemWithFade(item) {
  return new Promise(resolve => {
    item.style.display = 'flex';
    // força reflow
    void item.offsetWidth;
    item.classList.add('is-visible');
    setTimeout(() => resolve(), 350);
  });
}

// Mostra grupo de itens (aplica fade entre grupos)
async function showGroup(index) {
  const toShow = filteredItems.slice(index, index + VISIBLE_COUNT);
  // itens atualmente visíveis
  const currently = allItems.filter(i => i.style.display !== 'none' && filteredItems.includes(i));
  // esconder os que não serão mostrados
  await Promise.all(currently.map(item => {
    if (!toShow.includes(item)) return hideItemWithFade(item);
    return Promise.resolve();
  }));
  // mostrar os novos
  for (const item of toShow) {
    if (item.style.display === 'none' || getComputedStyle(item).display === 'none') {
      await showItemWithFade(item);
    }
  }
}

function nextGroup() {
  currentIndex += VISIBLE_COUNT;
  if (currentIndex >= filteredItems.length) currentIndex = 0;
  showGroup(currentIndex);
}

// Inicializa: esconde todos e mostra primeiros
allItems.forEach(i => i.style.display = 'none');
showGroup(0);
const intervalId = setInterval(() => {
  if (filteredItems.length > VISIBLE_COUNT) nextGroup();
}, 4200);

// Limpa o intervalo quando a página for descarregada
window.addEventListener('beforeunload', () => {
  clearInterval(intervalId);
});
// Busca funcional local — atualiza filteredItems e reinicia carrossel
const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('input', (e) => {
  const val = e.target.value.toLowerCase().trim();
  filteredItems = allItems.filter(item => {
    const title = (item.dataset.title || '').toLowerCase();
    const price = (item.dataset.price || '').toLowerCase();
    return title.includes(val) || price.includes(val) || item.textContent.toLowerCase().includes(val);
  });
  // reset index e esconder todos
  currentIndex = 0;
  allItems.forEach(i => i.style.display = 'none');
  if (filteredItems.length === 0) return;
  showGroup(0);
});

// Abrir modal com item clicado
function openProductModalForItem(item) {
  const img = item.querySelector('.product-img');
  const title = item.dataset.title || (img && img.alt) || 'Produto';
  const price = item.dataset.price || item.querySelector('.price-text')?.textContent || '';
  const modal = document.getElementById('productModal');
  document.getElementById('productModalImg').src = img ? img.src : '';
  document.getElementById('productModalTitle').textContent = title;
  document.getElementById('productModalPrice').textContent = price;
  modal.style.display = 'flex';
}

// atachar clique em cada card
allItems.forEach(item => {
  item.addEventListener('click', () => openProductModalForItem(item));
});

function showNoProductsAvailableMessage() {
  const modal = document.getElementById('productModal');
  if (!modal) {
    console.warn('productModal element not found.');
    return;
  }
  const imgEl = document.getElementById('productModalImg');
  const titleEl = document.getElementById('productModalTitle');
  const priceEl = document.getElementById('productModalPrice');
  if (imgEl) imgEl.src = '';
  if (titleEl) titleEl.textContent = 'Nenhum produto disponível';
  if (priceEl) priceEl.textContent = '';
  modal.style.display = 'flex';
}

// Open via botão "COMPARE JÁ" — abre o primeiro item visível
function openProductModal() {
  const first = filteredItems[0] || allItems[0];
  if (!first) return alert('Nenhum produto disponível.');
  openProductModalForItem(first);
}

function closeProductModal() {
  document.getElementById('productModal').style.display = 'none';
}

function openLoginModal() {
  document.getElementById('loginModal').style.display = 'flex';
}

function closeLoginModal() {
  document.getElementById('loginModal').style.display = 'none';
}
