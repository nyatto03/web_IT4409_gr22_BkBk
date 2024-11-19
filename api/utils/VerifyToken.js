import jwt, { verify } from "jsonwebtoken";
import createError from "api\\utils\\err.js"

export const VerifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(createError(401, "You are not authenticated"))
    }

    jwt.verify(token, process.env.jwt, (err, user) =>{
        if (err) {
            return next(createError(403, "Token is not valid"))
            req.user = user;
            next()
        }
    })
}

export const VerifyUser = (req, res, next) =>{
    VerifyToken(req, res, next, ()=> {
        if (req.user.id === req.params.id|| req.user.isAdmin) {
            next()
        }
        else{
            return next(createError(403, "You are not authorized!"))
        }
    })
}

export const VerifyAdmin = (req, res, next) =>{
    VerifyToken(req, res, next, ()=> {
        if (req.user.isAdmin) {
            next()
        }
        else{
            return next(createError(403, "You are not authorized!"))
        }
    })
}