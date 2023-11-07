import request from "supertest";
import app from "../src/app";
import mongoose from "mongoose";
import { UserModel, User } from "../src/api/user/user.model";

afterAll(async () => {
  await UserModel.deleteMany();
  mongoose.connection.close();
});

describe("User Component", () => {
  let user1: User;

  describe("POST /api/user", () => {
    it("should add one user", async () => {
      const res = await request(app).post("/api/user").send({
        email: "user1@example.com",
        password: "123456",
        role: "admin",
      });
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("_id");
      expect(res.body.email).toBe("user1@example.com");
      user1 = res.body;
    });
  });

  describe("GET /api/user", () => {
    it("should return all user", async () => {
      const res = await request(app).get("/api/user");
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(1);
    });
  });

  describe("GET /api/user/:id", () => {
    it("should return one user", async () => {
      const res = await request(app).get(`/api/user/${user1._id}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("_id");
    });
  });

  describe("PUT /api/user/:id", () => {
    it("should update one user", async () => {
      const res = await request(app).put(`/api/user/${user1._id}`).send({
        email: "user1@example.com",
        password: "123456",
        role: "default",
      });

      expect(res.statusCode).toBe(200);
      expect(res.body.role).toBe("default");
    });
  });

  describe("DELETE /api/user/:id", () => {
    it("should delete one user", async () => {
      const res = await request(app).delete(`/api/user/${user1._id}`);
      expect(res.statusCode).toBe(200);
    });
  });
});
