import { Request, Response, Router } from "express";
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
        this.router.post("/", this.addCompany);
        this.router.put("/:id/set_active", this.setActive);
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
}