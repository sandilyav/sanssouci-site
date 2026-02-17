import { jsx as _jsx } from "react/jsx-runtime";
import Section from '../components/ui/Section';
import { historyCopy } from '../data/content';
const AboutPage = () => (_jsx(Section, { eyebrow: "About", title: "Heritage + present", subtitle: "From Salt Bungalow (1906) to today\u2019s creekside creator campus.", children: _jsx("div", { className: "grid grid-2", children: historyCopy.map((copy) => (_jsx("article", { className: "card", children: _jsx("p", { children: copy }) }, copy))) }) }));
export default AboutPage;
