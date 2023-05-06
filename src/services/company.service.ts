import { ICompany } from "../interfaces/company.interface";
import { Company } from "../models/company.model";

export class CompanyService {
    public async getAll(): Promise<ICompany[]> {
        return Company.find({}).exec();
    }

    public async addCompany(company: ICompany): Promise<ICompany> {
        const newCompany = new Company(company);
        return newCompany.save();
    }

    public async setActive(id: String) {
        const updatedCompany = await Company.findByIdAndUpdate(id, {"is_active": true}, {new: true}).exec();

        if (!updatedCompany) {
            throw new Error(`Company with id ${id} not found!`);
        }
        
        return updatedCompany;
    }
}