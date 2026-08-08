/**
 * Scroll-reveal foundation.
 *
 * - No animation library. Uses the native IntersectionObserver API.
 * - Fully respects prefers-reduced-motion: if set, elements are simply
 *   marked visible immediately, no observer is created.
 * - Fails safe: global.css already shows [data-reveal] content by default
 *   until `.js-reveal-ready` is added to <html>, so a script failure never
 *   leaves content invisible.
 * - One-time reveal only: once an element has animated in, it is not
 *   re-hidden on scroll-back (matches the locked "quality, not cleverness"
 *   motion spec — no repeated/looping scroll animations).
 */

function initReveal() {
	const prefersReducedMotion = window.matchMedia(
		'(prefers-reduced-motion: reduce)'
	).matches;

	document.documentElement.classList.add('js-reveal-ready');

	const targets = document.querySelectorAll('[data-reveal]');

	if (prefersReducedMotion || !('IntersectionObserver' in window)) {
		targets.forEach((el) => el.classList.add('is-visible'));
		return;
	}

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					entry.target.classList.add('is-visible');
					observer.unobserve(entry.target);
				}
			}
		},
		{
			root: null,
			rootMargin: '0px 0px -10% 0px',
			threshold: 0.1,
		}
	);

	targets.forEach((el) => observer.observe(el));
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', initReveal);
} else {
	initReveal();
}
