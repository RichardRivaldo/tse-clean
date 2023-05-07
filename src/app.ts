import bodyParser from "body-parser";
import cors from "cors";
import 'dotenv/config';
import express, { Application, Router } from "express";
import mongoose from "mongoose";
import { CombinationController } from "./controllers/combination.controller";
import { CompanyController } from "./controllers/company.controller";
import { CountryController } from "./controllers/countries.controller";
import { EmployeeController } from "./controllers/employee.controller";
import { FibonacciController } from "./controllers/fibonacci.controller";
import { CombinationService } from "./services/combination.service";
import { CompanyService } from "./services/company.service";
import { CountryService } from "./services/countries.service";
import { EmployeeService } from "./services/employee.service";
import { FibonacciService } from "./services/fibonacci.service";

class App {
    public app: Application;

    constructor() {
        this.app = express();

        this.setConfig();
        this.setControllers();
        this.setDatabaseConfig();
    }

    private setConfig() {
        // Allows us to receive requests with data in json format
        this.app.use(bodyParser.json({ limit: "50mb" }));
        // Allows us to receive requests with data in x-www-form-urlencoded format
        this.app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
        // Enables cors
        this.app.use(cors());
    }

    private setControllers() {
        const companyController = new CompanyController(new CompanyService());
        const employeeController = new EmployeeController(new EmployeeService());
        const fibonacciController = new FibonacciController(new FibonacciService());
        const combinationController = new CombinationController(new CombinationService());
        const countryController = new CountryController(new CountryService());

        const rootRouter = Router();
        this.app.use("/api", rootRouter);

        rootRouter.use("/companies", companyController.router);
        rootRouter.use("/employees", employeeController.router);
        rootRouter.use("/fibonacci", fibonacciController.router);
        rootRouter.use("/combination", combinationController.router);
        rootRouter.use("/countries", countryController.router);
    }

    private setDatabaseConfig() {
        mongoose.Promise = global.Promise;
        mongoose.connect(process.env.MONGO_URL as string);
        mongoose.set("toJSON", {
            virtuals: true,
            transform: (_: any, converted: any) => {
                converted.id = converted._id
                delete converted._id;
                delete converted.__v;
            }
        });
    }
}

export default new App().app;