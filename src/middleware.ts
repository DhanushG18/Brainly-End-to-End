import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "./config.js";

export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"];

    // ✅ Step 1: Check if header exists
    if (!header) {
        return res.status(403).json({ msg: "Authorization header missing" });
    }

    // ✅ Step 2: Extract token safely
    const token = header.split(" ")[1];
    if (!token) {
        return res.status(403).json({ msg: "Token missing" });
    }

    try {
        // ✅ Step 3: Verify token
        if (!JWT_PASSWORD) {
            return res.status(500).json({ msg: "JWT secret is not configured" });
        }
        const decoded = jwt.verify(token, JWT_PASSWORD) as unknown as { id: string };

        // @ts-ignore (we can fix this with a Request type extension)
        req.userId = decoded.id;
        next();
    } catch (err) {
        return res.status(403).json({ msg: "Invalid or expired token" });
    }
};
