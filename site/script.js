const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('[data-reveal]').forEach((el) => revealObserver.observe(el));

document.querySelectorAll('[data-cta]').forEach((el) => {
  el.addEventListener('click', () => {
    const placement = el.getAttribute('data-cta');
    console.log('booking_start', { placement, destination: el.getAttribute('href') });
  });
});