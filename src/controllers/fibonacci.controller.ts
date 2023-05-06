import { Request, Response, Router } from "express";
import { FibonacciService } from "../services/fibonacci.service";

export class FibonacciController {
    public router: Router = Router();
    private fibonacciService: FibonacciService;

    constructor(fibonacciService: FibonacciService) {
        this.fibonacciService = fibonacciService;
        this.setRoutes();
    }

    private setRoutes() {
        this.router.post("/", this.fibonacci);
    }

    private fibonacci = async(req: Request, res: Response) => {
        try {
            const result = await this.fibonacciService.generate(req.body);
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
                "message": err instanceof Error ? err.message : "Failed generating Fibonacci Sequence!" 
            });
        }
    }
}