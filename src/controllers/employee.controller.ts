import { Request, Response, Router } from "express";
import { EmployeeService } from "../services/employee.service";

export class EmployeeController {
    public router: Router = Router();
    private employeeService: EmployeeService;

    constructor(employeeService: EmployeeService) {
        this.employeeService = employeeService;
        this.setRoutes();
    }

    private setRoutes() {
        this.router.get("/:id", this.getById);
        this.router.delete("/:id", this.deleteEmployee);
    }

    private getById = async(req: Request, res: Response) => {
        try {
            const result = await this.employeeService.getById(req.params.id);
            res.send({
                "status": 200,
                "code": "200",
                "data": result,
                "message": "Success"
            });
        } catch (err) {
            res.status(500).send({
                "status": 500,
                "code": "500",
                "message": "Failed retrieving employee!"
            });
        }
    }

    private deleteEmployee = async(req: Request, res: Response) => {
        try {
            await this.employeeService.deleteEmployee(req.params.id);
            res.status(204);
        } catch (err) {
            res.status(500).send({
                "status": 500,
                "code": "500",
                "message": "Failed deleting employee!"
            });
        }
    }
}