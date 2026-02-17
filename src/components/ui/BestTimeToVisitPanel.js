import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import clsx from 'clsx';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ACTIVITY_META, RATING_COPY, WINDOW_BLOCKS } from '../../config/bttv';
import { useBestTimesData } from '../../hooks/useBestTimesData';
import Icon from './Icon';
const ratingClassMap = {
    perfect: 'bttv-circle--perfect',
    good: 'bttv-circle--good',
    not_ideal: 'bttv-circle--neutral'
};
const timeFormatter = new Intl.DateTimeFormat('en-IN', {
    hour: 'numeric',
    minute: '2-digit'
});
const formatRange = (startIso, endIso) => {
    const start = new Date(startIso);
    const end = new Date(endIso);
    return `${timeFormatter.format(start)} – ${timeFormatter.format(end)}`;
};
const summarizeWindowBody = (window) => {
    const prefix = `${window.label}: `;
    return window.summary.startsWith(prefix) ? window.summary.slice(prefix.length) : window.summary;
};
const blockLabelMap = WINDOW_BLOCKS.reduce((acc, block) => ({ ...acc, [block.id]: block.label }), {});
const getActivityMeta = (key) => ACTIVITY_META[key] ?? null;
const normalizeActivities = (activities) => {
    const known = activities.filter((activity) => Boolean(getActivityMeta(activity.key)));
    return known.length ? known : activities;
};
const getPrimaryActivity = (activities) => normalizeActivities(activities)[0];
const getSecondaryActivities = (activities) => normalizeActivities(activities)
    .slice(1)
    .filter((activity) => activity.score >= 60);
const metricItems = (window) => [
    {
        icon: 'wind',
        label: `${Math.round(window.metrics.windSpeed)} km/h wind`
    },
    {
        icon: 'tide',
        label: `${window.metrics.tideState === 'high' ? 'High' : window.metrics.tideState} tide`
    },
    {
        icon: 'thermo',
        label: `${Math.round(window.metrics.temperature)}°C`
    },
    window.metrics.sunrise
        ? { icon: 'sunrise', label: 'Sunrise within window' }
        : window.metrics.sunset
            ? { icon: 'sunset', label: 'Sunset glow' }
            : null
].filter(Boolean);
const ActivityChips = ({ window }) => {
    const primaryActivity = getPrimaryActivity(window.activities);
    const secondaries = getSecondaryActivities(window.activities);
    const primaryMeta = getActivityMeta(primaryActivity.key);
    const primaryCopy = window.rating === 'perfect' ? 'Perfect for' : 'Good for';
    return (_jsxs(_Fragment, { children: [_jsxs("span", { className: clsx('bttv-chip', 'bttv-chip--primary', primaryMeta && `bttv-chip--activity-${primaryActivity.key}`), children: [_jsx(Icon, { name: (primaryMeta?.icon ?? 'leaf'), size: 16, "aria-hidden": true }), primaryCopy, " ", primaryMeta?.label ?? primaryActivity.label] }), secondaries.map((activity) => {
                const meta = getActivityMeta(activity.key);
                return (_jsxs("span", { className: clsx('bttv-chip', 'bttv-chip--secondary', meta && `bttv-chip--activity-${activity.key}`), children: [_jsx(Icon, { name: (meta?.icon ?? 'leaf'), size: 16, "aria-hidden": true }), "Good for ", meta?.label ?? activity.label] }, activity.key));
            })] }));
};
const DetailSheet = ({ window, onClose }) => {
    const primaryActivity = getPrimaryActivity(window.activities);
    const eyebrowMeta = getActivityMeta(primaryActivity.key);
    return (_jsxs("div", { className: "bttv-sheet", role: "dialog", "aria-modal": "true", "aria-label": "Best time window details", children: [_jsxs("div", { className: "bttv-sheet__body", children: [_jsx("button", { className: "bttv-sheet__close", type: "button", onClick: onClose, children: "Close" }), _jsx("p", { className: "bttv-sheet__eyebrow", children: eyebrowMeta?.label ?? primaryActivity.label }), _jsx("h4", { children: window.label }), _jsx("p", { children: summarizeWindowBody(window) }), _jsx("div", { className: "bttv-sheet__chips", children: _jsx(ActivityChips, { window: window }) }), _jsx("dl", { children: metricItems(window).map((metric) => (_jsxs(Fragment, { children: [_jsx("dt", { children: _jsx(Icon, { name: metric.icon, size: 16, "aria-hidden": true }) }), _jsx("dd", { children: metric.label })] }, metric.label))) }), _jsx("button", { className: "button button-primary bttv-sheet__cta", type: "button", children: "Plan for this window" })] }), _jsx("div", { className: "bttv-sheet__scrim", onClick: onClose })] }));
};
const bestWindowForDay = (day) => {
    if (!day || !day.windows.length)
        return null;
    return [...day.windows].sort((a, b) => b.primaryScore - a.primaryScore)[0];
};
const VISIBLE_COLUMNS = 5;
const BestTimeToVisitPanel = () => {
    const { data, loading, error } = useBestTimesData();
    const [sheetWindow, setSheetWindow] = useState(null);
    const [selectedWindow, setSelectedWindow] = useState(null);
    const [windowStart, setWindowStart] = useState(0);
    const days = data?.days ?? [];
    const maxStart = Math.max(0, days.length - VISIBLE_COLUMNS);
    const clampedStart = Math.min(windowStart, maxStart);
    const visibleDays = days.slice(clampedStart, clampedStart + VISIBLE_COLUMNS);
    const monthLabel = useMemo(() => {
        if (!visibleDays.length)
            return '';
        const firstDate = new Date(visibleDays[0].date);
        return firstDate.toLocaleDateString('en-IN', { month: 'long' });
    }, [visibleDays]);
    const windowLookup = useMemo(() => {
        const map = {};
        days.forEach((day) => {
            map[day.id] = day.windows.reduce((acc, window) => {
                acc[window.blockId] = window;
                return acc;
            }, {});
        });
        return map;
    }, [days]);
    useEffect(() => {
        if (windowStart > maxStart) {
            setWindowStart(maxStart);
        }
    }, [windowStart, maxStart]);
    useEffect(() => {
        const currentDay = visibleDays[0] ?? days[0];
        if (!selectedWindow && currentDay) {
            setSelectedWindow(bestWindowForDay(currentDay));
        }
    }, [visibleDays, days, selectedWindow]);
    useEffect(() => {
        if (!sheetWindow)
            return;
        const onKeyDown = (event) => {
            if (event.key === 'Escape') {
                setSheetWindow(null);
            }
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [sheetWindow]);
    const handleSelectWindow = (timeWindow) => {
        if (typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches) {
            setSheetWindow(timeWindow);
        }
        setSelectedWindow(timeWindow);
    };
    const detailWindow = selectedWindow;
    return (_jsxs("div", { className: "bttv-panel", children: [_jsxs("div", { className: "bttv-panel__header", children: [_jsxs("div", { children: [_jsx("p", { className: "bttv-panel__eyebrow", children: "Intelligent tide + light guide" }), _jsx("h3", { children: "Best time to visit" })] }), _jsx("div", { className: "bttv-panel__legend", children: ['kayaking', 'photography', 'leisure'].map((key) => (_jsxs("span", { children: [_jsx("i", { className: clsx('bttv-dot', `bttv-dot--activity-${key}`), "aria-hidden": true }), ACTIVITY_META[key].label] }, key))) })] }), loading && (_jsxs("div", { className: "bttv-skeleton", "aria-live": "polite", children: [_jsx("div", { className: "bttv-skeleton__row" }), _jsx("div", { className: "bttv-skeleton__row" }), _jsx("div", { className: "bttv-skeleton__row" })] })), error && !loading && (_jsxs("div", { className: "bttv-fallback", children: [_jsx("p", { children: "Conditions are taking a moment to load." }), _jsx("p", { className: "bttv-fallback__sub", children: error })] })), !loading && !error && days.length === 0 && (_jsx("div", { className: "bttv-fallback", children: _jsx("p", { children: "Conditions moderate this week. Morning visits recommended." }) })), !loading && !error && days.length > 0 && (_jsx("div", { className: "bttv-grid", "aria-label": "Best time windows", children: visibleDays.length > 0 && (_jsxs("div", { className: "bttv-grid-track", children: [_jsxs("table", { className: "bttv-grid-table", "aria-live": "polite", children: [_jsxs("thead", { children: [monthLabel && (_jsxs("tr", { className: "bttv-grid-row--month", children: [_jsx("th", { scope: "col", "aria-hidden": true }), _jsx("th", { scope: "col", colSpan: visibleDays.length, "aria-label": "Month", children: monthLabel })] })), _jsxs("tr", { className: "bttv-grid-row--dates", children: [_jsx("th", { scope: "col", "aria-hidden": true }), visibleDays.map((day) => {
                                                    const date = new Date(day.date);
                                                    const dayOfMonth = date.toLocaleDateString('en-IN', { day: 'numeric' });
                                                    return (_jsx("th", { scope: "col", "aria-label": `Date ${dayOfMonth}`, children: dayOfMonth }, `${day.id}-date`));
                                                })] }), _jsxs("tr", { className: "bttv-grid-row--days", children: [_jsx("th", { scope: "col", "aria-hidden": true }), visibleDays.map((day) => {
                                                    const date = new Date(day.date);
                                                    const weekday = date
                                                        .toLocaleDateString('en-IN', { weekday: 'short' })
                                                        .charAt(0)
                                                        .toUpperCase();
                                                    return (_jsx("th", { scope: "col", "aria-label": date.toLocaleDateString('en-IN', {
                                                            weekday: 'long'
                                                        }), children: weekday }, `${day.id}-day`));
                                                })] })] }), _jsx("tbody", { children: WINDOW_BLOCKS.map((block) => (_jsxs("tr", { children: [_jsx("th", { scope: "row", children: block.label }), visibleDays.map((day) => {
                                                const window = windowLookup[day.id]?.[block.id];
                                                if (!window) {
                                                    return (_jsx("td", { children: _jsx("span", { className: "bttv-circle bttv-circle--empty", "aria-hidden": true }) }, `${day.id}-${block.id}`));
                                                }
                                                const primaryActivity = getPrimaryActivity(window.activities);
                                                const primaryMeta = getActivityMeta(primaryActivity.key);
                                                const isSelected = detailWindow?.id === window.id;
                                                return (_jsx("td", { children: _jsx("button", { type: "button", className: clsx('bttv-circle', ratingClassMap[window.rating], primaryMeta && `bttv-circle--activity-${primaryActivity.key}`, isSelected && 'bttv-circle--selected'), "aria-label": `${day.label} ${block.label} is ${RATING_COPY[window.rating].title}`, onClick: () => handleSelectWindow(window) }) }, window.id));
                                            })] }, block.id))) })] }), days.length > VISIBLE_COLUMNS && (_jsxs("div", { className: "bttv-grid-scroll", children: [_jsx("input", { type: "range", min: 0, max: maxStart, step: 1, value: clampedStart, onChange: (event) => setWindowStart(Number(event.target.value)), "aria-label": "Scroll best time calendar" }), _jsxs("span", { children: ["Showing days ", clampedStart + 1, "\u2013", Math.min(days.length, clampedStart + VISIBLE_COLUMNS), " of ", days.length] })] }))] })) })), detailWindow && (_jsxs("div", { className: "bttv-detail", "aria-live": "polite", children: [_jsxs("div", { children: [_jsx("p", { className: "bttv-detail__eyebrow", children: RATING_COPY[detailWindow.rating].title }), _jsx("h4", { children: detailWindow.label }), _jsx("p", { className: "bttv-detail__summary", children: summarizeWindowBody(detailWindow) }), _jsx("div", { className: "bttv-detail__chips", children: _jsx(ActivityChips, { window: detailWindow }) })] }), _jsx("ul", { className: "bttv-detail__metrics", children: metricItems(detailWindow).map((metric) => (_jsxs("li", { children: [_jsx(Icon, { name: metric.icon, size: 16, "aria-hidden": true }), _jsx("span", { children: metric.label })] }, metric.label))) }), _jsx(Link, { to: "/plan", className: "button button-primary bttv-detail__cta", children: "Plan for this window" }), _jsx("button", { type: "button", className: "button button-secondary bttv-detail__mobile", onClick: () => handleSelectWindow(detailWindow), children: "View mobile details" })] })), sheetWindow && _jsx(DetailSheet, { window: sheetWindow, onClose: () => setSheetWindow(null) })] }));
};
export default BestTimeToVisitPanel;
