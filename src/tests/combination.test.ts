import 'dotenv/config';
import mongoose from 'mongoose';
import request from "supertest";
import app from "../app";

afterEach(async () => {
    await mongoose.connection.close();
});

describe("POST /combination - ", () => {
    it("Returns nCr result, 9C3 = 84", async () => {
        const res = await request(app).post("/api/combination").send({
            "n": 9,
            "r": 3
        });

        expect(res.statusCode).toBe(200);
        expect(res.body.data).toBe("84");
    });
});