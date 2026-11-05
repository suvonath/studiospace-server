
import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", requireAuth, (req, res) => {
  res.json({
    success: true,
    message: "You accessed a protected route!",
    user: res.locals.user,
  });
});

export default router;
