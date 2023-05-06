import { Document } from "mongoose";

export interface IEmployee extends Document {
    id: string;
    name: string;
    email: string;
    phone_number: string;
    job_title: JobTitle;
    company_id: string;
}