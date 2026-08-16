import { initRevealEffect } from './reveal-effect.js';

initRevealEffect(document.querySelector('[data-reveal-stage]'));

const header = document.querySelector('[data-header]');
const hero = document.querySelector('[data-reveal-hero]');
const updateHeader = () => {
  const heroEnd = hero ? hero.offsetTop + hero.offsetHeight - 96 : 24;
  header?.classList.toggle('scrolled', window.scrollY > heroEnd);
};
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal-on-scroll').forEach((element) => observer.observe(element));
document.querySelector('[data-year]').textContent = new Date().getFullYear();

const timeline = document.querySelector('[data-timeline]');
const timelineSteps = [...document.querySelectorAll('[data-timeline-step]')];

const updateTimeline = () => {
  if (!timeline || !timelineSteps.length) return;

  const bounds = timeline.getBoundingClientRect();
  const viewportTrigger = window.innerHeight * 0.58;
  const traveled = viewportTrigger - bounds.top;
  const progress = Math.max(0, Math.min(1, traveled / Math.max(1, bounds.height - window.innerHeight * .25)));
  timeline.style.setProperty('--timeline-progress', `${progress * 100}%`);

  timelineSteps.forEach((step) => {
    const stepBounds = step.getBoundingClientRect();
    const active = stepBounds.top < window.innerHeight * .72 && stepBounds.bottom > window.innerHeight * .18;
    step.classList.toggle('is-active', active);
  });
};

window.addEventListener('scroll', updateTimeline, { passive: true });
window.addEventListener('resize', updateTimeline);
updateTimeline();
