var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import 'dotenv/config';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { DateTime } from 'luxon';
import { SANS_SOUCI_TIMEZONE } from '../../src/config/location';
import { DAYS_TO_FETCH, REFRESH_HOURS, WINDOW_BLOCKS } from './config';
import { applyMoonPhaseBonus, buildSummary, computeActivityScores } from './scoring';
import { formatActivitiesList, ratingFromScore } from './utils';
var OUTPUT_PATH = path.resolve(process.cwd(), 'public/data/best-times.json');
var toIsoString = function (date) { var _a, _b, _c; return (_b = (_a = date.toISO()) !== null && _a !== void 0 ? _a : date.setZone('utc').toISO()) !== null && _b !== void 0 ? _b : "".concat((_c = date.toISODate()) !== null && _c !== void 0 ? _c : 'unknown', "T00:00:00"); };
var determineTideState = function (samples) {
    if (!samples.length)
        return 'low';
    var maxHeight = Math.max.apply(Math, samples.map(function (sample) { return sample.height; }));
    if (maxHeight >= 1.5)
        return 'high';
    var minHeight = Math.min.apply(Math, samples.map(function (sample) { return sample.height; }));
    if (maxHeight - minHeight < 0.1)
        return 'low';
    var start = samples[0].height;
    var end = samples[samples.length - 1].height;
    if (end > start)
        return 'rising';
    if (end < start)
        return 'falling';
    return 'low';
};
var computeWindowLabel = function (dayLabel, blockLabel) { return "".concat(dayLabel, " \u2022 ").concat(blockLabel); };
var summarisePayload = function (days) {
    var allWindows = days.flatMap(function (day) { return day.windows; });
    if (!allWindows.length)
        return 'Conditions moderate this week. Morning visits recommended.';
    var best = __spreadArray([], allWindows, true).sort(function (a, b) { return b.primaryScore - a.primaryScore; })[0];
    var activities = formatActivitiesList(best.activities);
    if (!activities) {
        return "".concat(best.label, ": Better for unhurried creek time.");
    }
    return "".concat(best.label, ": ").concat(activities, " look ideal.");
};
var run = function () { return __awaiter(void 0, void 0, void 0, function () {
    var now, endWindow, days, index, dayStart, dayLabel, sunriseTime, sunsetTime, moonPhase, day, blockIndex, block, windowStart, windowEnd, windSpeed, windGust, windDirection, temperature, precipitation, cloudCover, tideSamples, tideHeight, tideState, sunriseInside, sunsetInside, daylight, metrics, activities, primary, otherActivities, boostedPrimaryScore, rating, adjustedActivities, windowRecommendation, payload;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    return __generator(this, function (_k) {
        switch (_k.label) {
            case 0:
                now = DateTime.now().setZone(SANS_SOUCI_TIMEZONE).startOf('hour');
                endWindow = now.plus({ days: DAYS_TO_FETCH }).endOf('day');
                console.log('Generating BTTV data from synthetic weather/tide inputs for layout testing.');
                days = [];
                for (index = 0; index < DAYS_TO_FETCH; index += 1) {
                    dayStart = now.startOf('day').plus({ days: index });
                    dayLabel = dayStart.toFormat('ccc, d MMM');
                    sunriseTime = dayStart.set({ hour: 6, minute: 5 + (index % 4) * 4 });
                    sunsetTime = dayStart.set({ hour: 18, minute: 5 - (index % 3) * 3 });
                    moonPhase = (index * 9) % 100;
                    day = {
                        id: (_a = dayStart.toISODate()) !== null && _a !== void 0 ? _a : "day-".concat(index),
                        date: toIsoString(dayStart),
                        label: dayLabel,
                        isToday: index === 0,
                        isFullMoon: moonPhase >= 95,
                        windows: []
                    };
                    for (blockIndex = 0; blockIndex < WINDOW_BLOCKS.length; blockIndex += 1) {
                        block = WINDOW_BLOCKS[blockIndex];
                        windowStart = dayStart.set({ hour: block.startHour });
                        windowEnd = dayStart.set({ hour: block.endHour });
                        if (windowEnd < now || windowStart > endWindow) {
                            continue;
                        }
                        windSpeed = Math.max(4, Math.min(28, 8 + blockIndex * 2 + ((index % 5) - 2) * 1.5));
                        windGust = windSpeed + 3 + (blockIndex % 2);
                        windDirection = (65 + index * 18 + blockIndex * 22) % 360;
                        temperature = 24 + blockIndex * 1.8 + ((index + 1) % 4) * 0.6;
                        precipitation = blockIndex === 3 && index % 3 === 0 ? 1.2 : blockIndex === 4 && index % 4 === 0 ? 0.6 : 0;
                        cloudCover = Math.max(8, Math.min(85, 18 + blockIndex * 11 + (index % 6) * 4));
                        tideSamples = [
                            { time: toIsoString(windowStart), height: 0.85 + ((index + blockIndex) % 5) * 0.2 },
                            { time: toIsoString(windowStart.plus({ hour: 1 })), height: 0.95 + ((index + blockIndex + 2) % 5) * 0.2 }
                        ];
                        tideHeight = Math.max.apply(Math, tideSamples.map(function (entry) { return entry.height; }));
                        tideState = determineTideState(tideSamples);
                        sunriseInside = Boolean(sunriseTime && sunriseTime >= windowStart && sunriseTime < windowEnd);
                        sunsetInside = Boolean(sunsetTime && sunsetTime >= windowStart && sunsetTime < windowEnd);
                        daylight = Boolean(sunriseTime &&
                            sunsetTime &&
                            windowStart >= sunriseTime &&
                            windowEnd <= sunsetTime);
                        metrics = {
                            windSpeed: windSpeed,
                            windGust: windGust,
                            windDirection: windDirection,
                            temperature: temperature,
                            cloudCover: cloudCover,
                            precipitation: precipitation,
                            tideHeight: tideHeight,
                            tideState: tideState,
                            sunrise: sunriseInside,
                            sunset: sunsetInside,
                            moonPhase: moonPhase,
                            daylight: daylight
                        };
                        activities = computeActivityScores({
                            startLabel: block.label,
                            dayLabel: day.label,
                            blockId: block.id,
                            goldenWindow: ['golden-hour', 'sunset'].includes(block.id),
                            daylight: daylight,
                            metrics: metrics
                        });
                        primary = activities[0], otherActivities = activities.slice(1);
                        boostedPrimaryScore = applyMoonPhaseBonus(primary.score, metrics);
                        rating = ratingFromScore(boostedPrimaryScore);
                        adjustedActivities = __spreadArray([__assign(__assign({}, primary), { score: boostedPrimaryScore })], otherActivities, true);
                        windowRecommendation = {
                            id: "".concat(day.id, "-").concat(block.id),
                            dayIndex: index,
                            blockId: block.id,
                            start: toIsoString(windowStart),
                            end: toIsoString(windowEnd),
                            label: computeWindowLabel(day.label, block.label),
                            rating: rating,
                            primaryScore: Math.round(boostedPrimaryScore),
                            summary: '',
                            activities: adjustedActivities,
                            metrics: {
                                windSpeed: (_b = metrics.windSpeed) !== null && _b !== void 0 ? _b : 0,
                                windGust: (_c = metrics.windGust) !== null && _c !== void 0 ? _c : 0,
                                windDirection: (_d = metrics.windDirection) !== null && _d !== void 0 ? _d : 0,
                                temperature: (_e = metrics.temperature) !== null && _e !== void 0 ? _e : 0,
                                cloudCover: (_f = metrics.cloudCover) !== null && _f !== void 0 ? _f : 0,
                                precipitation: (_g = metrics.precipitation) !== null && _g !== void 0 ? _g : 0,
                                tideHeight: (_h = metrics.tideHeight) !== null && _h !== void 0 ? _h : 0,
                                tideState: metrics.tideState,
                                sunrise: sunriseInside,
                                sunset: sunsetInside,
                                moonPhase: (_j = metrics.moonPhase) !== null && _j !== void 0 ? _j : 0
                            }
                        };
                        windowRecommendation.summary = buildSummary(windowRecommendation);
                        day.windows.push(windowRecommendation);
                    }
                    days.push(day);
                }
                payload = {
                    generatedAt: toIsoString(now),
                    timezone: SANS_SOUCI_TIMEZONE,
                    refreshHours: REFRESH_HOURS,
                    days: days,
                    summary: summarisePayload(days)
                };
                return [4 /*yield*/, mkdir(path.dirname(OUTPUT_PATH), { recursive: true })];
            case 1:
                _k.sent();
                return [4 /*yield*/, writeFile(OUTPUT_PATH, JSON.stringify(payload, null, 2), 'utf8')];
            case 2:
                _k.sent();
                console.log("Best times generated at ".concat(OUTPUT_PATH));
                return [2 /*return*/];
        }
    });
}); };
run().catch(function (error) {
    console.error('Failed to generate Best Time To Visit data');
    console.error(error);
    process.exitCode = 1;
});
