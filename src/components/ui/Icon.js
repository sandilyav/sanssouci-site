import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
const paths = {
    kayak: (_jsxs(_Fragment, { children: [_jsx("path", { d: "M4 12c4-4.5 12-4.5 16 0" }), _jsx("path", { d: "M12 6v12" }), _jsx("path", { d: "M2 12h20" })] })),
    dune: (_jsxs(_Fragment, { children: [_jsx("path", { d: "M3 16s3-4 9-4 9 4 9 4" }), _jsx("path", { d: "M2 19h20" }), _jsx("path", { d: "M8 11l2-3 2 3" })] })),
    camera: (_jsxs(_Fragment, { children: [_jsx("rect", { x: "4", y: "6", width: "16", height: "12", rx: "3" }), _jsx("circle", { cx: "12", cy: "12", r: "3.5" }), _jsx("path", { d: "M9 4h6l1 2" })] })),
    leaf: (_jsxs(_Fragment, { children: [_jsx("path", { d: "M5 19c7.5 0 14-6.5 14-14" }), _jsx("path", { d: "M5 19c0-7.5 6.5-14 14-14" })] })),
    wind: (_jsxs(_Fragment, { children: [_jsx("path", { d: "M3 10h10a3 3 0 1 0-3-3" }), _jsx("path", { d: "M5 16h9a3 3 0 1 1-3 3" })] })),
    tide: (_jsxs(_Fragment, { children: [_jsx("path", { d: "M2 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0" }), _jsx("path", { d: "M4 16c2-2 4-2 6 0s4 2 6 0 4-2 6 0" })] })),
    thermo: (_jsxs(_Fragment, { children: [_jsx("path", { d: "M12 3a2 2 0 0 0-2 2v7.5a4 4 0 1 0 4 0V5a2 2 0 0 0-2-2z" }), _jsx("path", { d: "M12 9v6" })] })),
    sunrise: (_jsxs(_Fragment, { children: [_jsx("path", { d: "M12 5v5" }), _jsx("path", { d: "M8 10l4-4 4 4" }), _jsx("path", { d: "M4 18h16" }), _jsx("path", { d: "M6 15h1" }), _jsx("path", { d: "M17 15h1" })] })),
    sunset: (_jsxs(_Fragment, { children: [_jsx("path", { d: "M12 19v-5" }), _jsx("path", { d: "M8 14l4 4 4-4" }), _jsx("path", { d: "M4 18h16" }), _jsx("path", { d: "M6 15h1" }), _jsx("path", { d: "M17 15h1" })] })),
    clock: (_jsxs(_Fragment, { children: [_jsx("circle", { cx: "12", cy: "12", r: "7" }), _jsx("path", { d: "M12 8v4l2 2" })] })),
    check: (_jsx(_Fragment, { children: _jsx("path", { d: "M5 12.5 10 17l9-10" }) }))
};
const Icon = ({ name, size = 20, className, ...rest }) => (_jsx("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", className: className, ...rest, children: paths[name] }));
export default Icon;
