import 'dotenv/config';
import mongoose from 'mongoose';
import request from "supertest";
import app from "../app";

afterEach(async () => {
    await mongoose.connection.close();
});

describe("POST /fibonacci - ", () => {
    it("Returns 0 1 1 2 3 5 8 13 21, last element < n", async () => {
        const res = await request(app)
            .post("/api/fibonacci").send({"n": 22});

        expect(res.statusCode).toBe(200);
        expect(res.body.data).toBe("0 1 1 2 3 5 8 13 21");
    });
});