import 'dotenv/config';
import mongoose from 'mongoose';
import request from "supertest";
import app from "../app";

afterEach(async () => {
    await mongoose.connection.close();
});

describe("GET /companies - ", () => {
    it("Returns non-empty body, database has contents", async () => {
        const res = await request(app).get("/api/companies");
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Success");
    });
});