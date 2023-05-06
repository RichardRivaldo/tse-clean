import { IEmployee } from "../interfaces/employee.interface";
import { Employee } from "../models/employee.model";

export class EmployeeService {
    public async getById(id: string): Promise<IEmployee | null> {
        return Employee.findById(id);
    }

    public async deleteEmployee(id: string) {
        const deletedEmployee = await Employee.findByIdAndDelete(id, {new: true}).exec();

        if (!deletedEmployee) {
            throw new Error(`Employee with id ${id} not found!`);
        }

        return deletedEmployee;
    }
}