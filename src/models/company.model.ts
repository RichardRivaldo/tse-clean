import { Schema, model } from "mongoose";
import { ICompany } from "../interfaces/company.interface";

const companySchema = new Schema({
    id: {
        type: Schema.Types.ObjectId,
    },
    company_name: {
        type: String, 
        minlength: 3,
        maxlength: 50,
        required: [true, "Field is required"]
    },
    telephone_number: {
        type: String, 
        minlength: 8,
        maxlength: 16,
        default: null
    },
    is_active: {
        type: Boolean,
        default: false
    },
    address: {
        type: String,
        minlength: 10,
        maxlength: 50,
        default: null
    },
});

export const Company = model<ICompany>("companies", companySchema);