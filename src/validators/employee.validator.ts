import Joi from "joi";
import { JobTitle } from "../types/job_title.enum";

export const validate = (employee: object) => {
    const schema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        email: Joi.string().email().min(5).max(255).required(),
        phone_number: Joi.string().pattern(/^\d+$/).min(8).max(16),
        job_title: Joi.string().valid(...Object.values(JobTitle)).required()
    });
    return schema.validate(employee);
};