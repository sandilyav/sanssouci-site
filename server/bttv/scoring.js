import { ACTIVITY_LABELS } from './config';
import { clamp } from './utils';
var activityOrder = ['kayaking', 'photography', 'leisure'];
var scoreBuckets = function (value, ranges, fallback) {
    if (fallback === void 0) { fallback = 0; }
    if (value === null)
        return fallback;
    for (var _i = 0, ranges_1 = ranges; _i < ranges_1.length; _i++) {
        var range = ranges_1[_i];
        var minPass = typeof range.min === 'number' ? value >= range.min : true;
        var maxPass = typeof range.max === 'number' ? value < range.max : true;
        if (minPass && maxPass)
            return range.score;
    }
    return fallback;
};
var kayakingScore = function (metrics) {
    var wind = scoreBuckets(metrics.windSpeed, [
        { max: 10, score: 40 },
        { min: 10, max: 15, score: 30 },
        { min: 15, max: 20, score: 15 },
        { min: 20, score: 0 }
    ], 20);
    var tide = 5;
    if (metrics.tideHeight !== null) {
        if (metrics.tideHeight >= 1.5)
            tide = 35;
        else if (metrics.tideHeight >= 1)
            tide = 20;
    }
    if (metrics.tideState === 'falling')
        tide *= 0.8;
    if (metrics.tideState === 'low')
        tide *= 0.6;
    var temperature = scoreBuckets(metrics.temperature, [
        { min: 24, max: 30, score: 10 },
        { min: 20, max: 24, score: 7 },
        { min: 30, max: 32, score: 7 },
        { min: 32, score: 3 },
        { max: 20, score: 3 }
    ], 7);
    var total = wind + tide + temperature;
    if (metrics.precipitation !== null) {
        if (metrics.precipitation > 2)
            total *= 0.6;
        else if (metrics.precipitation > 0)
            total *= 0.8;
    }
    if (!metrics.sunrise && !metrics.sunset && metrics.daylight === false) {
        total *= 0.5;
    }
    if (metrics.sunset) {
        total += 5;
    }
    return clamp(total);
};
var photographyScore = function (metrics, goldenWindow) {
    var golden = 5;
    if (metrics.sunset || metrics.sunrise)
        golden = 40;
    else if (goldenWindow)
        golden = 25;
    var clouds = scoreBuckets(metrics.cloudCover, [
        { min: 20, max: 50, score: 30 },
        { max: 20, score: 20 },
        { min: 50, max: 70, score: 15 },
        { min: 70, score: 5 }
    ], 15);
    var wind = scoreBuckets(metrics.windSpeed, [
        { max: 12, score: 20 },
        { min: 12, max: 20, score: 10 },
        { min: 20, score: 0 }
    ], 10);
    var total = golden + clouds + wind;
    if (metrics.precipitation !== null && metrics.precipitation > 0) {
        total *= 0.5;
    }
    return clamp(total);
};
var leisureScore = function (metrics) {
    var wind = scoreBuckets(metrics.windSpeed, [
        { max: 10, score: 40 },
        { min: 10, max: 18, score: 30 },
        { min: 18, max: 24, score: 15 },
        { min: 24, score: 5 }
    ], 25);
    var temperature = scoreBuckets(metrics.temperature, [
        { min: 24, max: 30, score: 30 },
        { min: 20, max: 24, score: 22 },
        { min: 30, max: 34, score: 18 },
        { max: 20, score: 12 },
        { min: 34, score: 10 }
    ], 18);
    var precipitationMultiplier = 1;
    if (metrics.precipitation !== null && metrics.precipitation > 0.5)
        precipitationMultiplier = 0.6;
    else if (metrics.precipitation !== null && metrics.precipitation > 0)
        precipitationMultiplier = 0.8;
    var tideBonus = 0;
    if (metrics.tideHeight !== null && metrics.tideHeight >= 1.5)
        tideBonus = 10;
    else if (metrics.tideHeight !== null && metrics.tideHeight >= 1)
        tideBonus = 6;
    var total = (wind + temperature) * precipitationMultiplier + tideBonus;
    return clamp(total);
};
export var computeActivityScores = function (input) {
    var metrics = input.metrics;
    var scores = {
        kayaking: kayakingScore(metrics),
        photography: photographyScore(metrics, input.goldenWindow),
        leisure: leisureScore(metrics)
    };
    // Safeguards
    if (metrics.windSpeed !== null && metrics.windSpeed > 30) {
        for (var _i = 0, _a = Object.keys(scores); _i < _a.length; _i++) {
            var key = _a[_i];
            scores[key] = Math.min(scores[key], 40);
        }
    }
    var activities = activityOrder.map(function (key) { return ({
        key: key,
        label: ACTIVITY_LABELS[key],
        score: clamp(scores[key])
    }); });
    activities.sort(function (a, b) { return b.score - a.score; });
    return activities;
};
export var applyMoonPhaseBonus = function (score, metrics) {
    if (metrics.moonPhase !== null &&
        metrics.moonPhase >= 95 &&
        metrics.sunset &&
        metrics.tideState === 'rising') {
        return clamp(score + 5);
    }
    return score;
};
export var buildSummary = function (window) {
    var bestActivities = window.activities.filter(function (activity) { return activity.score >= 75; });
    if (!bestActivities.length) {
        return "".concat(window.label, ": Calmer conditions, better for easy creek time.");
    }
    var primary = bestActivities[0].label;
    var windDescription = window.metrics.windSpeed <= 12 ? 'calm wind' : "wind ".concat(Math.round(window.metrics.windSpeed), " km/h");
    var tideDescription = window.metrics.tideState === 'high' ? 'high tide' : "".concat(window.metrics.tideState, " tide");
    return "".concat(window.label, ": ").concat(primary, " ready \u2014 ").concat(tideDescription, ", ").concat(windDescription, ".");
};
