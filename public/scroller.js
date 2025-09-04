// Скрыть лоадер при готовности DOM
function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) loader.remove();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hideLoader, { once: true });
  } else {
    hideLoader();
  }

  // Кнопка «Наверх» — плавный скролл
  document.getElementById('toTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });