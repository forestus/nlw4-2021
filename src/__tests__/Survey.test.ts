import request from "supertest";
import { server } from "../server";
import createConnection from "../database";

describe("Surveys", ()=>{
    beforeAll( async ()=>{
        const connection = await createConnection(); 
        await connection.runMigrations();

    });
    it("Should be able to create a New Survey",async ()=>{
        const response = await request(server).post("/survey").send({
            title:"Title Example",
            description:"Description Example"
        }); 
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id")
    });
    it("Should not be able to get all surveys",async ()=>{
        await request(server).post("/survey").send({
            title:"Title Example2",
            description:"Description Example2"
        }); 
        const response = await request(server).get("/surveys")
        expect(response.body.length)
    });
});