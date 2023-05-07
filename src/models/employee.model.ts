import { Schema, model } from "mongoose";
import { IEmployee } from "../interfaces/employee.interface";

const employeeSchema = new Schema({
    id: {
        type: Schema.Types.ObjectId,
    },
    name: {
        type: String, 
        minlength: 2,
        maxlength: 50,
        required: [true, "Field is required"]
    },
    email: {
        type: String, 
        minlength: 5,
        maxlength: 255,
        required: [true, "Field is required"]
    },
    phone_number: {
        type: String, 
        minlength: 8,
        maxlength: 16,
        default: null
    },
    job_title: {
        type: String, 
        default: "staff",
        enum: ["manager", "director", "staff"],
        required: [true, "Field is required"]
    },
    company_id: {
        type: Schema.Types.ObjectId,
        required: [true, "Field is required"]
    },
});

export const Employee = model<IEmployee>("employees", employeeSchema);