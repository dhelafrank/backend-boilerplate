//Middleware Attaches a Unique ID to each Request
import { randomUUID } from "crypto"
import { NextFunction, Request, Response } from "express"

declare module "express-serve-static-core" {
    interface Request {
        id?: string;
    }
}

export function reqTracker(req: Request, _: Response, next: NextFunction) {
    req.id = `req_${randomUUID()}`
    next()
}