import request from "supertest";
import app from "../src/app";
import * as userService from "../src/api/user/user.service";
import { User } from "@prisma/client";
import { omitPassword } from "../src/utils";

const user: User = {
  id: "1",
  email: "hello@prisma.io",
  role: "USER",
  password: "123",
};

const userWithoutPassword = omitPassword(user);

describe("User", () => {
  describe("POST /api/user", () => {
    it("should create user", async () => {
      jest.spyOn(userService, "create").mockResolvedValue(user);
      const res = await request(app)
        .post("/api/user")
        .send({ ...user, id: undefined });
      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual(userWithoutPassword);
    });

    it("should return 500 if service fails", async () => {
      jest.spyOn(userService, "create").mockRejectedValue({});
      const res = await request(app)
        .post("/api/user")
        .send({ ...user, id: undefined });
      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({});
    });
  });

  describe("GET /api/user", () => {
    it("should return all users", async () => {
      jest.spyOn(userService, "getAll").mockResolvedValue([user]);
      const res = await request(app).get("/api/user");
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([userWithoutPassword]);
    });

    it("should return 500 if service fails", async () => {
      jest.spyOn(userService, "getAll").mockRejectedValue({});
      const res = await request(app).get("/api/user");
      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({});
    });
  });

  describe("GET /api/user/:id", () => {
    it("should return user", async () => {
      jest.spyOn(userService, "get").mockResolvedValue(user);
      const res = await request(app).get(`/api/user/${user.id}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(userWithoutPassword);
    });

    it("should return 500 if service fails", async () => {
      jest.spyOn(userService, "get").mockRejectedValue({});
      const res = await request(app).get(`/api/user/${user.id}`);
      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({});
    });
  });

  describe("PUT /api/user/:id", () => {
    it("should update user", async () => {
      const payload: User = { ...user, role: "USER" };
      jest.spyOn(userService, "update").mockResolvedValue(payload);
      const res = await request(app).put(`/api/user/${user.id}`).send(payload);
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(omitPassword(payload));
    });

    it("should return 500 if service fails", async () => {
      const payload: User = { ...user, role: "USER" };
      jest.spyOn(userService, "update").mockRejectedValue({});
      const res = await request(app).put(`/api/user/${user.id}`).send(payload);
      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({});
    });
  });

  describe("DELETE /api/user/:id", () => {
    it("should delete user", async () => {
      jest.spyOn(userService, "remove").mockResolvedValue(user);
      const res = await request(app).delete(`/api/user/${user.id}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({});
    });

    it("should return 500 if service fails", async () => {
      jest.spyOn(userService, "remove").mockRejectedValue({});
      const res = await request(app).delete(`/api/user/${user.id}`);
      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({});
    });
  });
});
