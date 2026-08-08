/**
 * Mobile navigation panel toggle.
 *
 * Keyboard and screen-reader considerations:
 * - Toggle button exposes aria-expanded, kept in sync with panel state.
 * - Escape closes the panel and returns focus to the toggle button.
 * - Opening the panel moves focus to the first focusable link inside it.
 *
 * The persistent Call/WhatsApp contact affordance lives outside this
 * panel entirely (see Header.astro) — contact access must never depend
 * on the menu being open.
 */

function initMobileNav() {
	// Multiple toggle buttons share this attribute (open button in the
	// header, close button inside the panel itself).
	const toggles = document.querySelectorAll('[data-nav-toggle]');
	const panel = document.querySelector('[data-nav-panel]');
	const backdrop = document.querySelector('[data-nav-backdrop]');

	if (!toggles.length || !panel) return;

	const openPanel = () => {
		panel.setAttribute('data-open', 'true');
		backdrop?.classList.remove('hidden');
		toggles.forEach((t) => t.setAttribute('aria-expanded', 'true'));
		const firstLink = panel.querySelector('a');
		if (firstLink instanceof HTMLElement) firstLink.focus();
		document.body.style.overflow = 'hidden';
	};

	const closePanel = ({ returnFocus = true } = {}) => {
		panel.setAttribute('data-open', 'false');
		backdrop?.classList.add('hidden');
		toggles.forEach((t) => t.setAttribute('aria-expanded', 'false'));
		document.body.style.overflow = '';
		if (returnFocus) {
			const openToggle = document.querySelector('[data-nav-toggle][aria-label="Open menu"]');
			if (openToggle instanceof HTMLElement) openToggle.focus();
		}
	};

	toggles.forEach((toggle) => {
		toggle.addEventListener('click', () => {
			const isOpen = panel.getAttribute('data-open') === 'true';
			isOpen ? closePanel() : openPanel();
		});
	});

	backdrop?.addEventListener('click', () => closePanel());

	document.addEventListener('keydown', (event) => {
		if (event.key !== 'Escape') return;
		if (panel.getAttribute('data-open') === 'true') closePanel();
	});

	panel.querySelectorAll('a').forEach((link) => {
		link.addEventListener('click', () => closePanel({ returnFocus: false }));
	});
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', initMobileNav);
} else {
	initMobileNav();
}
