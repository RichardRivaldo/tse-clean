import { Document } from "mongoose";
import { JobTitle } from "../types/job_title.enum";

export interface IEmployee extends Document {
    id: string;
    name: string;
    email: string;
    phone_number: string;
    job_title: JobTitle;
    company_id: string;
}