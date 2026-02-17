import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Section = ({ eyebrow, title, subtitle, children, id }) => (_jsx("section", { className: "section", id: id, children: _jsxs("div", { className: "container", children: [_jsx("p", { className: "section-heading", children: eyebrow }), _jsx("h2", { className: "section-title", children: title }), subtitle && _jsx("p", { className: "section-subtitle", children: subtitle }), children] }) }));
export default Section;
