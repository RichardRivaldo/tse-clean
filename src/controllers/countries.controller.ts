import { Request, Response, Router } from "express";
import { CountryService } from "../services/countries.service";

export class CountryController {
    public router: Router = Router();
    private countryService: CountryService;

    constructor(countryService: CountryService) {
        this.countryService = countryService;
        this.setRoutes();
    }

    private setRoutes() {
        this.router.get("/", this.getAll);
    }

    private getAll = async(_: Request, res: Response) => {
        try {
            const result = await this.countryService.getAll();
            res.send({
                "status": 200,
                "code": "200",
                "data": result,
                "message": "Success"
            });
        } catch (err) {
            res.status(400).send({
                "status": 400,
                "code": "400",
                "data": null,
                "message": err instanceof Error ? err.message : "Failed getting countries!" 
            });
        }
    }
}