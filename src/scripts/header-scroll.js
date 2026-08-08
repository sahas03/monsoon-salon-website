/**
 * Header background transition.
 *
 * Transparent while at the very top of the page (so it sits cleanly over
 * a full-bleed hero image), solid cream once the visitor scrolls past a
 * small threshold. No layout shift — only a background/border transition,
 * handled entirely in CSS via the `.is-scrolled` class toggle below.
 *
 * Pages without a full-bleed hero under the header can simply omit
 * `data-transparent-header` on the <header> element, and it will render
 * solid from the start (see Header.astro).
 */

function initHeaderScroll() {
	const header = document.querySelector('[data-site-header]');
	if (!header || !(header instanceof HTMLElement)) return;

	if (!('transparentHeader' in header.dataset)) return;

	const SCROLL_THRESHOLD = 24;

	const updateState = () => {
		const isScrolled = window.scrollY > SCROLL_THRESHOLD;
		header.classList.toggle('is-scrolled', isScrolled);
	};

	updateState();
	window.addEventListener('scroll', updateState, { passive: true });
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', initHeaderScroll);
} else {
	initHeaderScroll();
}
