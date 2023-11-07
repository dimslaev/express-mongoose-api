import request from "supertest";
import app from "../src/app";
import mongoose from "mongoose";
import { UserModel } from "../src/api/user/user.model";
import { freshToken } from "../src/utils";
import { find as findUser } from "../src/api/user/user.service";

afterAll(async () => {
  await UserModel.deleteMany();
  mongoose.connection.close();
});

describe("Auth Component", () => {
  describe("POST /api/auth/signup", () => {
    // Sunny
    it("should create user and return token", async () => {
      const res = await request(app).post("/api/auth/signup").send({
        email: "user1@example.com",
        password: "123456",
      });
      expect(res.statusCode).toBe(201);
      expect(res.header.authorization).toBeTruthy();
    });
    // Rainy
    it("should not create user if user exists", async () => {
      const res = await request(app).post("/api/auth/signup").send({
        email: "user1@example.com",
        password: "123456",
      });
      expect(res.statusCode).toBe(500);
      expect(res.header.authorization).toBeUndefined();
    });
  });

  describe("POST /api/auth/login", () => {
    // Sunny
    it("should login user and return token", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: "user1@example.com",
        password: "123456",
      });
      expect(res.statusCode).toBe(200);
      expect(res.header.authorization).toBeTruthy();
    });
    // Rainy
    it("should not login user with wrong credentials", async () => {
      const res = await request(app).post("/api/auth/signup").send({
        email: "user1@example.com",
        password: "123457",
      });
      expect(res.statusCode).toBe(500);
      expect(res.header.authorization).toBeUndefined();
    });
  });

  describe("POST /api/auth/change-password", () => {
    // Sunny
    it("should change user password and return token if user is logged in", async () => {
      const user = await findUser("user1@example.com");
      const id = user?._id as unknown as string;
      const token = await freshToken(id, "user1@example.com");

      const res = await request(app)
        .post("/api/auth/change-password")
        .set("Authorization", `Bearer ${token}`)
        .send({ id, password: "123457" });

      expect(res.statusCode).toBe(200);
      expect(res.header.authorization).toBeTruthy();
    });
    // Rainy
    it("should return error if user is not logged in", async () => {
      const user = await findUser("user1@example.com");
      const id = user?._id as unknown as string;

      const res = await request(app)
        .post("/api/auth/change-password")
        .set("Authorization", "")
        .send({ id, password: "123457" });

      expect(res.statusCode).toBe(401);
      expect(res.header.authorization).toBeUndefined();
    });
  });
});
