"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const jose_1 = require("jose");
const authUrl = process.env.BETTER_AUTH_URL;
if (!authUrl) {
    throw new Error("BETTER_AUTH_URL is missing from environment variables");
}
const JWKS = (0, jose_1.createRemoteJWKSet)(new URL(`${authUrl}/api/auth/jwks`));
const requireAuth = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;
        if (!authorization?.startsWith("Bearer ")) {
            res.status(401).json({
                success: false,
                message: "Authentication required",
            });
            return;
        }
        const token = authorization.slice("Bearer ".length);
        const { payload } = await (0, jose_1.jwtVerify)(token, JWKS, {
            issuer: authUrl,
            audience: authUrl,
        });
        res.locals.user = payload;
        next();
    }
    catch {
        res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};
exports.requireAuth = requireAuth;
