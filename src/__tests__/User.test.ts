import request from "supertest";
import { server } from "../server";
import createConnection from "../database";
import { getConnection } from "typeorm";

describe("Users", () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();

    });
    afterAll(async () => {
        const connection = getConnection();
        await connection.dropDatabase();
        await connection.close();
    });

    it("Should be able to create a New User", async () => {
        const response = await request(server).post("/users").send({
            name: "User Example2",
            email: "user2@example.com"
        });
        expect(response.status).toBe(201);
    });
    it("Should not be able to create a user with exists email", async () => {
        const response = await request(server).post("/users").send({
            name: "User Example2",
            email: "user2@example.com"
        });
        expect(response.status).toBe(400);
    });
});