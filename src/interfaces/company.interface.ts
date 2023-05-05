import { Document } from "mongoose";

export interface ICompany extends Document {
    id: string;
    company_name: string;
    telephone_number: string;
    is_active: boolean;
    address: string;
}