/**
 * Gallery lightbox.
 *
 * - Triggered by any [data-lightbox-trigger] element; reads the full-size
 *   image src/alt from its data attributes.
 * - Fade-only transition (no slide/zoom), per the locked motion spec.
 * - Escape closes; clicking the backdrop closes; focus returns to the
 *   trigger that opened it.
 * - Respects prefers-reduced-motion implicitly — the only "motion" here
 *   is an opacity fade already covered by global.css's reduced-motion
 *   override, which collapses all transition durations to ~0.
 */

function initLightbox() {
	const overlay = document.querySelector('[data-lightbox]');
	const imageEl = overlay?.querySelector('[data-lightbox-image]');
	const captionEl = overlay?.querySelector('[data-lightbox-caption]');
	const closeBtn = overlay?.querySelector('[data-lightbox-close]');
	const triggers = document.querySelectorAll('[data-lightbox-trigger]');

	if (!overlay || !imageEl || !closeBtn || !triggers.length) return;
	if (!(imageEl instanceof HTMLImageElement)) return;

	let lastFocused = null;

	const open = (trigger) => {
		const fullSrc = trigger.getAttribute('data-full-src');
		const alt = trigger.getAttribute('data-full-alt') || '';
		if (!fullSrc) return;

		lastFocused = trigger;
		imageEl.src = fullSrc;
		imageEl.alt = alt;
		if (captionEl) captionEl.textContent = alt;

		overlay.removeAttribute('hidden');
		requestAnimationFrame(() => overlay.setAttribute('data-open', 'true'));
		document.body.style.overflow = 'hidden';
		if (closeBtn instanceof HTMLElement) closeBtn.focus();
	};

	const close = () => {
		overlay.setAttribute('data-open', 'false');
		document.body.style.overflow = '';
		const done = () => {
			overlay.setAttribute('hidden', '');
			overlay.removeEventListener('transitionend', done);
		};
		overlay.addEventListener('transitionend', done);
		if (lastFocused instanceof HTMLElement) lastFocused.focus();
	};

	triggers.forEach((trigger) => {
		trigger.addEventListener('click', () => open(trigger));
	});

	closeBtn.addEventListener('click', close);

	overlay.addEventListener('click', (event) => {
		if (event.target === overlay) close();
	});

	document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape' && overlay.getAttribute('data-open') === 'true') {
			close();
		}
	});
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', initLightbox);
} else {
	initLightbox();
}
