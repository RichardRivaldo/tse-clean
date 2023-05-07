import Joi from "joi";

export const validate = (company: object) => {
    const schema = Joi.object({
        company_name: Joi.string().min(3).max(50).required(),
        telephone_number: Joi.string().pattern(/^\d+$/).min(8).max(16),
        address: Joi.string().min(10).max(50)
    });
    return schema.validate(company);
};