"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const health_routes_js_1 = __importDefault(require("./routes/health.routes.js"));
const protected_routes_js_1 = __importDefault(require("./routes/protected.routes.js"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use(express_1.default.json());
// Routes
app.use("/api/health", health_routes_js_1.default);
app.use("/api/protected", protected_routes_js_1.default);
exports.default = app;
