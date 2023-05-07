import { Request, Response, Router } from "express";
import { companyMiddleware } from "../middlewares/company.middleware";
import { employeeMiddleware } from "../middlewares/employee.middleware";
import { CompanyService } from "../services/company.service";

export class CompanyController {
    public router: Router = Router();
    private companyService: CompanyService;

    constructor(companyService: CompanyService) {
        this.companyService = companyService;
        this.setRoutes();
    }

    private setRoutes() {
        this.router.get("/", this.getAll);
        this.router.post("/", [companyMiddleware], this.addCompany);
        this.router.put("/:id/set_active", this.setActive);

        this.router.post("/:company_id/employees", [employeeMiddleware], this.addEmployee);
        this.router.get("/:company_id/employees", this.getEmployeesByCompany);
        this.router.put("/:company_id/employees/:employee_id", this.updateEmployee);
    }

    private getAll = async(_: Request, res: Response) => {
        try {
            const result = await this.companyService.getAll();
            res.send({
                "status": 200,
                "code": "200",
                "data": {
                    "count": result.length,
                    "rows": result
                },
                "message": "Success"
            });
        } catch (err) {
            res.status(500).send({
                "status": 500,
                "code": "500",
                "message": "Failed retrieving company!"
            });
        }
    }

    private addCompany = async(req: Request, res: Response) => {
        try {
            const result = await this.companyService.addCompany(req.body);
            res.send({
                "status": 201,
                "code": "201",
                "data": {
                    "id": result._id
                },
                "message": "Success"
            });
        } catch (err) {
            res.status(500).send({
                "status": 500,
                "code": "500",
                "message": "Failed adding new company!"
            });
        }
    }

    private setActive = async(req: Request, res: Response) => {
        try {
            const result = await this.companyService.setActive(req.params.id);
            res.send({
                "status": 200,
                "code": "200",
                "data": {
                    "id": result._id,
                    "is_active": result.is_active
                },
                "message": "Success"
            });
        } catch (err) {
            res.status(500).send({
                "status": 500,
                "code": "500",
                "message": "Failed setting company status!"
            });
        }
    }

    private addEmployee = async(req: Request, res: Response) => {
        try {
            const result = await this.companyService.addEmployee(req.params.company_id, req.body);
            res.send({
                "status": 201,
                "code": "201",
                "data": {
                    "id": result._id,
                    "company_id": result.company_id
                },
                "message": "Success"
            });
        } catch (err) {
            res.status(500).send({
                "status": 500,
                "code": "500",
                "message": "Failed adding new employee!"
            });
        }
    }

    private updateEmployee = async(req: Request, res: Response) => {
        try {
            const result = await this.companyService.updateEmployee(
                req.params.company_id,
                req.params.employee_id,
                req.body
            );
            res.send({
                "status": 201,
                "code": "201",
                "data": {
                    "id": result._id,
                    "company_id": result.company_id
                },
                "message": "Success"
            });
        } catch (err) {
            res.status(500).send({
                "status": 500,
                "code": "500",
                "message": "Failed updating employee!"
            });
        }
    }

    private getEmployeesByCompany = async(req: Request, res: Response) => {
        try {
            const result = await this.companyService.getEmployeesByCompany(req.params.company_id);
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
                "message": err instanceof Error ? err.message : "Failed retrieving company's employees!"
            });
        }
    }
}