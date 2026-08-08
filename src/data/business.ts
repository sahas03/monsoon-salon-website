/**
 * Monsoon Salon — confirmed business data.
 *
 * RULE: every field here is either a fact confirmed directly by the client
 * or `null`. Never fill a `null` with a plausible-looking placeholder
 * (no fake phone numbers, no invented hours, no sample addresses).
 * Components that consume this data must handle `null` gracefully
 * (hide the element, or render a clearly-marked "pending" state) —
 * never fall back to fabricated content.
 *
 * Update this file the moment the salon confirms a field. Nothing else
 * in the codebase should hardcode these values directly.
 */

export interface BusinessInfo {
	name: string;
	location: string;
	serviceCategories: string[];

	/** E.164 or local dial format once confirmed. Currently pending verification. */
	phone: string | null;
	/** WhatsApp contact number/link once confirmed. Currently pending verification. */
	whatsapp: string | null;
	email: string | null;
	address: string | null;
	/** Structured as-confirmed; do not infer from third-party listings. */
	hours: string | null;
	instagramHandle: string | null;
	instagramUrl: string | null;

	/** Confirmed in-salon product partnerships (visible signage in supplied photography). */
	productPartners: string[];
}

export const business: BusinessInfo = {
	name: 'Monsoon Salon',
	location: 'Kokapet, Hyderabad',
	serviceCategories: ['Hair', 'Skin', 'Makeup', 'Nail'],

	// --- Pending verification — do not populate with assumed/researched values ---
	phone: null,
	whatsapp: null,
	email: null,
	address: null,
	hours: null,
	instagramHandle: null,
	instagramUrl: null,

	// Confirmed via supplied interior photography (brand signage on-site).
	productPartners: ['Kérastase', 'L\u2019Oréal Professionnel', 'Redken'],
};

export const primaryNav = [
	{ label: 'Home', href: '/' },
	{ label: 'Services', href: '/services' },
	{ label: 'Gallery', href: '/gallery' },
	{ label: 'Contact', href: '/contact' },
];
