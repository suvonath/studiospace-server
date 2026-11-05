"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_js_1 = require("../middleware/auth.middleware.js");
const router = (0, express_1.Router)();
router.get("/", auth_middleware_js_1.requireAuth, (req, res) => {
    res.json({
        success: true,
        message: "You accessed a protected route!",
        user: res.locals.user,
    });
});
exports.default = router;
