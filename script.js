const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav');
const backToTop = document.querySelector('.back-to-top');

const revealElements = document.querySelectorAll('main > section:not(.hero), .footer');
revealElements.forEach(element => element.classList.add('reveal'));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    revealObserver.unobserve(entry.target);
  });
}, { threshold:0.08, rootMargin:'0px 0px -40px' });

revealElements.forEach(element => revealObserver.observe(element));

menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  document.body.classList.toggle('menu-open', isOpen);
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
});

nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  document.body.classList.remove('menu-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'メニューを開く');
}));

const updateBackToTop = () => {
  backToTop.classList.toggle('is-visible', window.scrollY > 500);
};

window.addEventListener('scroll', updateBackToTop, { passive: true });
updateBackToTop();

document.querySelector('[data-copy="email"]').addEventListener('click', async event => {
  const text = document.getElementById('email').textContent.trim();
  try {
    await navigator.clipboard.writeText(text);
    event.currentTarget.textContent = 'コピーしました';
  } catch {
    event.currentTarget.textContent = '選択してコピー';
  }
  setTimeout(() => event.currentTarget.textContent = 'コピーする', 1800);
});
