import request from "supertest";

import { app } from "@shared/Infra/http/app";

import createConnection from "@shared/Infra/Typeorm";
import { Connection } from "typeorm";
import { hashSync } from "bcryptjs";
import { v4 as uuidV4 } from "uuid";

let connection: Connection
describe("Create Category Controller", () => {

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidV4();
    const password = hashSync("admin", 8);

    await connection.query(
      ` INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
        values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXXX')`
    )
  })

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  })

  it("Should be able to list all categories", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin"
    })

    const { refresh_token } = responseToken.body

    const test = await request(app).post("/categories").send({
      name: "Category Supertest",
      description: "Category Supertest"
    }).set({
      Authorization: `Bearer ${refresh_token}`
    })


    const response = await request(app).get("/categories");

    expect(response.status).toBe(200);
    // expect(response.body.leng).toBe(1);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0].name).toEqual("Category Supertest");
  })
})