import { jsx as _jsx } from "react/jsx-runtime";
import Section from '../components/ui/Section';
import { galleryImages } from '../data/content';
const GalleryPage = () => (_jsx(Section, { eyebrow: "Gallery", title: "Recent frames", subtitle: "All assets captured on location using existing light.", children: _jsx("div", { className: "gallery-grid", children: galleryImages.map((src, idx) => (_jsx("figure", { className: "card", children: _jsx("img", { src: src, alt: `Sans Souci gallery item ${idx + 1}` }) }, src))) }) }));
export default GalleryPage;
