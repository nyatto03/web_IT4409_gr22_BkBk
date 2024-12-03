import jwt from "jsonwebtoken";
import { createError } from "../utils/err.js";

export const VerifyToken = (req, res, next) => {
    const token = req.cookies.access_token; // Check token in cookies
    if (!token) {
        return next(createError(401, "You are not authenticated")); // No token found
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(createError(403, "Token is not valid")); // Invalid token
        req.user = user; // Attach user info to the request
        next();
    });
};

export const VerifyUser = (req, res, next) => {
    VerifyToken(req, res, () => { // First verify the token
        // Check if the user matches the ID in the request or is an admin
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return next(createError(403, "You are not authorized!"));
        }
    });
};

export const VerifyAdmin = (req, res, next) => {
    VerifyToken(req, res, () => { // First verify the token
        // Check if the user has admin privileges
        if (req.user.isAdmin) {
            next();
        } else {
            return next(createError(403, "You are not authorized!"));
        }
    });
};
