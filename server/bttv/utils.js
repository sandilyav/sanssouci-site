export var pickValue = function (value) {
    if (!value)
        return null;
    if (typeof value.noaa === 'number')
        return value.noaa;
    if (typeof value.sg === 'number')
        return value.sg;
    return null;
};
export var average = function (values) {
    var filtered = values.filter(function (value) { return typeof value === 'number' && !Number.isNaN(value); });
    if (!filtered.length)
        return null;
    var sum = filtered.reduce(function (acc, value) { return acc + value; }, 0);
    return sum / filtered.length;
};
export var clamp = function (value, min, max) {
    if (min === void 0) { min = 0; }
    if (max === void 0) { max = 100; }
    return Math.min(Math.max(value, min), max);
};
export var round = function (value, precision) {
    if (precision === void 0) { precision = 0; }
    if (value === null)
        return null;
    var factor = Math.pow(10, precision);
    return Math.round(value * factor) / factor;
};
export var ratingFromScore = function (score) {
    if (score >= 80)
        return 'perfect';
    if (score >= 55)
        return 'good';
    return 'not_ideal';
};
export var formatActivitiesList = function (activities) {
    var high = activities.filter(function (activity) { return activity.score >= 75; });
    if (!high.length)
        return null;
    if (high.length === 1)
        return high[0].label;
    if (high.length === 2)
        return "".concat(high[0].label, " and ").concat(high[1].label);
    return "".concat(high[0].label, ", ").concat(high[1].label, ", and others");
};
