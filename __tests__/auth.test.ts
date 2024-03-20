import request from "supertest";
import app from "../src/app";
import { User } from "@prisma/client";
import * as utils from "../src/utils";
import * as userService from "../src/api/user/user.service";

const user: User = {
  id: "123",
  email: "user1@example.com",
  password: "123456",
  role: "ADMIN",
};

describe("Auth", () => {
  describe("POST /api/auth/signup", () => {
    it("should create user and return token", async () => {
      jest.spyOn(userService, "create").mockResolvedValue(user);
      jest.spyOn(utils, "getToken").mockImplementation(() => "token");
      const res = await request(app).post("/api/auth/signup").send({
        email: user.email,
        password: user.password,
      });
      expect(res.statusCode).toBe(201);
      expect(res.header.authorization).toBe("token");
    });
    it("should fail user if email is missing", async () => {
      const res = await request(app).post("/api/auth/signup").send({
        email: user.email,
      });
      expect(res.statusCode).toBe(400);
      expect(res.header.authorization).toBeUndefined();
    });
    it("should fail user if email is missing", async () => {
      const res = await request(app).post("/api/auth/signup").send({
        password: user.password,
      });
      expect(res.statusCode).toBe(400);
      expect(res.header.authorization).toBeUndefined();
    });
    it("should return 500 if service fails", async () => {
      jest.spyOn(userService, "create").mockRejectedValue(user);
      const res = await request(app).post("/api/auth/signup").send({
        email: user.email,
        password: user.password,
      });
      expect(res.statusCode).toBe(500);
      expect(res.header.authorization).toBeUndefined();
    });
  });

  describe("POST /api/auth/login", () => {
    it("should login user and return token", async () => {
      jest.spyOn(userService, "find").mockResolvedValue(user);
      jest.spyOn(utils, "comparePassword").mockResolvedValue(true);
      jest.spyOn(utils, "getToken").mockImplementation(() => "token");
      const res = await request(app).post("/api/auth/login").send({
        email: user.email,
        password: user.password,
      });
      expect(res.statusCode).toBe(200);
      expect(res.header.authorization).toBe("token");
    });
    it("should not login if user doesn't exist", async () => {
      jest.spyOn(userService, "find").mockRejectedValue({});
      const res = await request(app).post("/api/auth/login").send({
        email: user.email,
        password: "123457",
      });
      expect(res.statusCode).toBe(401);
      expect(res.header.authorization).toBeUndefined();
    });
    it("should not login user with wrong credentials", async () => {
      jest.spyOn(userService, "find").mockResolvedValue(user);
      jest.spyOn(utils, "comparePassword").mockResolvedValue(false);
      const res = await request(app).post("/api/auth/login").send({
        email: user.email,
        password: "123457",
      });
      expect(res.statusCode).toBe(401);
      expect(res.header.authorization).toBeUndefined();
    });
  });
});
