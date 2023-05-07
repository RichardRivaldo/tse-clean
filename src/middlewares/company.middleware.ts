import { NextFunction, Request, Response } from "express";
import { validate } from "../validators/company.validator";

export const companyMiddleware = async(req: Request, res: Response, next: NextFunction) => {
    const {error} = validate(req.body);

    if (error) {
        return res.status(400).send({
            "status": 400,
            "code": "400",
            "message": "Bad request body!"
        });
    }

    return next();
};