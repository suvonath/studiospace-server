
import type { RequestHandler } from "express";
import { createRemoteJWKSet, jwtVerify } from "jose";

const authUrl = process.env.BETTER_AUTH_URL;

if (!authUrl) {
  throw new Error("BETTER_AUTH_URL is missing from environment variables");
}

const JWKS = createRemoteJWKSet(
  new URL(`${authUrl}/api/auth/jwks`)
);

export const requireAuth: RequestHandler = async (req, res, next) => {
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

    const { payload } = await jwtVerify(token, JWKS, {
      issuer: authUrl,
      audience: authUrl,
    });

    res.locals.user = payload;
    next();
  } catch {
    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
