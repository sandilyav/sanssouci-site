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
import { WEATHER_PARAMS } from './config';
var API_BASE = 'https://api.stormglass.io/v2';
var SOURCE = 'noaa';
var toUnixSeconds = function (date) { return Math.floor(date.toSeconds()); };
var ensureEnv = function (value, name) {
    if (!value) {
        throw new Error("Missing required env var ".concat(name));
    }
    return value;
};
var fetchStormglass = function (path, query, apiKey) { return __awaiter(void 0, void 0, void 0, function () {
    var url, response, body;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = new URL("".concat(API_BASE).concat(path));
                Object.entries(query).forEach(function (_a) {
                    var key = _a[0], val = _a[1];
                    return url.searchParams.set(key, val);
                });
                return [4 /*yield*/, fetch(url, {
                        headers: { Authorization: apiKey }
                    })];
            case 1:
                response = _a.sent();
                if (!!response.ok) return [3 /*break*/, 3];
                return [4 /*yield*/, response.text()];
            case 2:
                body = _a.sent();
                throw new Error("Stormglass ".concat(path, " failed: ").concat(response.status, " ").concat(response.statusText, " \u2013 ").concat(body));
            case 3: return [4 /*yield*/, response.json()];
            case 4: return [2 /*return*/, (_a.sent())];
        }
    });
}); };
export var fetchWeather = function (lat, lng, start, end) { return __awaiter(void 0, void 0, void 0, function () {
    var apiKey, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                apiKey = ensureEnv(process.env.STORMGLASS_API_KEY, 'STORMGLASS_API_KEY');
                return [4 /*yield*/, fetchStormglass('/weather/point', {
                        lat: lat.toString(),
                        lng: lng.toString(),
                        params: WEATHER_PARAMS.join(','),
                        source: SOURCE,
                        start: toUnixSeconds(start).toString(),
                        end: toUnixSeconds(end).toString()
                    }, apiKey)];
            case 1:
                data = _a.sent();
                return [2 /*return*/, data.hours];
        }
    });
}); };
export var fetchAstronomy = function (lat, lng, start, end) { return __awaiter(void 0, void 0, void 0, function () {
    var apiKey, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                apiKey = ensureEnv(process.env.STORMGLASS_API_KEY, 'STORMGLASS_API_KEY');
                return [4 /*yield*/, fetchStormglass('/astronomy/point', {
                        lat: lat.toString(),
                        lng: lng.toString(),
                        start: toUnixSeconds(start).toString(),
                        end: toUnixSeconds(end).toString()
                    }, apiKey)];
            case 1:
                data = _a.sent();
                return [2 /*return*/, data.data];
        }
    });
}); };
export var fetchTide = function (lat, lng, start, end) { return __awaiter(void 0, void 0, void 0, function () {
    var apiKey, data, tideEntries;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                apiKey = ensureEnv(process.env.STORMGLASS_API_KEY, 'STORMGLASS_API_KEY');
                return [4 /*yield*/, fetchStormglass('/tide/sea-level/point', {
                        lat: lat.toString(),
                        lng: lng.toString(),
                        start: toUnixSeconds(start).toString(),
                        end: toUnixSeconds(end).toString()
                    }, apiKey)];
            case 1:
                data = _a.sent();
                tideEntries = data.data.map(function (entry) { return ({
                    time: entry.time,
                    height: entry.height
                }); });
                return [2 /*return*/, tideEntries];
        }
    });
}); };
