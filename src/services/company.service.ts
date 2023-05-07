import { ICompany } from "../interfaces/company.interface";
import { IEmployee } from "../interfaces/employee.interface";
import { Company } from "../models/company.model";
import { Employee } from "../models/employee.model";

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

    public async addEmployee(company_id: string, employee: IEmployee): Promise<IEmployee> {
        employee.company_id = company_id;
        const newEmployee = new Employee(employee).save();

        return newEmployee;
    }

    public async updateEmployee(
        company_id: string, 
        employee_id: string, 
        employee: IEmployee
    ): Promise<IEmployee> {

        employee.company_id = company_id;

        const updatedEmployee = await Employee.findByIdAndUpdate(
            employee_id,
            employee,
            {new: true}
        ).exec();

        if (!updatedEmployee) {
            throw new Error(`Employee with id ${employee_id} not found!`);
        }
        
        return updatedEmployee;
    }

    public async getEmployeesByCompany(company_id: string) {
        const company = await Company.findOne({_id: company_id}).exec();

        if (company) {
            const employees = await Employee.find({company_id: company_id}).exec();

            return {
                "id": company._id,
                "company_name": company.company_name,
                "is_active": company.is_active,
                "employees": employees.map((emp) => ({
                    "id": emp._id,
                    "name": emp.name,
                    "phone_number": emp.phone_number,
                    "job_title": emp.job_title
                }))
            };
        } else {
            throw new Error("Company not found!")
        }
    }
}