import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link, NavLink, Outlet, ScrollRestoration } from 'react-router-dom';
import clsx from 'clsx';
import { contactInfo } from '../../data/content';
const primaryNavItems = [
    { label: 'Home', path: '/' },
    { label: 'Experiences', path: '/experiences' },
    { label: 'Photo Spots', path: '/photo-spots' },
    { label: 'Plan Your Visit', path: '/plan' },
    { label: 'Contact', path: '/contact' }
];
const secondaryNavItems = [
    { label: 'Events', path: '/events' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'About', path: '/about' },
    { label: 'Location', path: '/location' }
];
const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(contactInfo.address)}`;
const sanitizePhone = (phone) => phone.replace(/\s|\-/g, '');
function StickyActionBar() {
    return (_jsxs("div", { className: "sticky-action-bar", "aria-label": "Quick actions", children: [_jsx("a", { href: `tel:${sanitizePhone(contactInfo.phones[0])}`, children: "Call" }), _jsx("a", { href: directionsUrl, target: "_blank", rel: "noreferrer", children: "Directions" }), _jsx(Link, { to: "/location", children: "Today\u2019s Conditions" }), _jsx(Link, { to: "/contact", children: "Book" })] }));
}
const SiteShell = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [moreOpen, setMoreOpen] = useState(false);
    const closeMenu = () => setMenuOpen(false);
    return (_jsxs("div", { className: "page-shell", children: [_jsx("a", { href: "#main", className: "skip-link", children: "Skip to content" }), _jsx("header", { className: "site-header", children: _jsxs("div", { className: "nav-container", role: "navigation", "aria-label": "Main navigation", children: [_jsx(Link, { to: "/", className: "logo-wordmark", onClick: closeMenu, children: _jsx("img", { src: "/media/hero.png", alt: "Sans Souci", className: "logo-image" }) }), _jsxs("button", { className: "nav-toggle", "aria-expanded": menuOpen, "aria-label": "Toggle navigation", onClick: () => setMenuOpen(!menuOpen), children: [_jsx("span", {}), _jsx("span", {}), _jsx("span", {})] }), _jsxs("nav", { className: clsx('nav-links', menuOpen && 'nav-links--open'), children: [primaryNavItems.map((item) => (_jsx(NavLink, { to: item.path, className: "nav-link", children: item.label }, item.path))), _jsxs("div", { className: clsx('nav-more', moreOpen && 'nav-more--open'), children: [_jsx("button", { type: "button", className: "nav-link nav-more__button", "aria-haspopup": "true", "aria-expanded": moreOpen, onClick: () => setMoreOpen((open) => !open), children: "More" }), _jsx("div", { className: "nav-more__menu", children: secondaryNavItems.map((item) => (_jsx(NavLink, { to: item.path, className: "nav-link", onClick: () => setMoreOpen(false), children: item.label }, item.path))) })] })] }), _jsxs("div", { className: "nav-cta", children: [_jsx(Link, { to: "/plan", className: "button button-secondary", children: "Plan Visit" }), _jsx(Link, { to: "/contact", className: "button button-primary", children: "Book Sans Souci" })] })] }) }), _jsx("main", { id: "main", children: _jsx(Outlet, {}) }), _jsx("footer", { className: "footer", children: _jsxs("div", { className: "container footer-grid", children: [_jsxs("div", { children: [_jsx("p", { className: "logo-wordmark", children: "Sans Souci" }), _jsx("p", { className: "footer-muted", children: "Creekside micro-adventure campus in Ennore." }), _jsxs("div", { className: "footer-contact", children: [contactInfo.phones.map((phone) => (_jsx("a", { href: `tel:${sanitizePhone(phone)}`, children: phone }, phone))), _jsx("p", { children: contactInfo.address })] })] }), _jsxs("div", { children: [_jsx("p", { className: "section-heading", children: "Navigation" }), _jsx("ul", { className: "footer-nav", children: primaryNavItems.concat(secondaryNavItems).map((item) => (_jsx("li", { children: _jsx(Link, { to: item.path, children: item.label }) }, item.path))) })] })] }) }), _jsx(StickyActionBar, {}), _jsx(ScrollRestoration, {})] }));
};
export default SiteShell;
