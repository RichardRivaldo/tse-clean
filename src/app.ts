import bodyParser from "body-parser";
import cors from "cors";
import 'dotenv/config';
import express, { Application } from "express";
import mongoose from "mongoose";
import { CompanyController } from "./controllers/company.controller";
import { CompanyService } from "./services/company.service";

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

        this.app.use("/company", companyController.router);
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