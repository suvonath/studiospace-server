"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const db_1 = require("./config/db");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.get("/", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to StudioSpace API!",
    });
});
app.get("/api/health", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "StudioSpace server is healthy!",
    });
});
async function startServer() {
    try {
        await (0, db_1.connectDB)();
        const PORT = Number(process.env.PORT) || 5000;
        app.listen(PORT, "0.0.0.0", () => {
            console.log(`StudioSpace API running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error("Server startup failed:", error);
        process.exit(1);
    }
}
startServer();
