import request from "supertest";
import app from "../src/app";
import { prisma } from "../src/prisma";
import { User } from "@prisma/client";

const fakeUser: User = {
  id: "123",
  email: "user1@example.com",
  password: "123456",
  role: "ADMIN",
};

afterAll(async () => {
  try {
    await prisma.user.delete({ where: { email: fakeUser.email } });
  } catch (e) {
    //
  }
});

describe("User Component", () => {
  describe("POST /api/user", () => {
    it("should add one user", async () => {
      const res = await request(app)
        .post("/api/user")
        .send({ ...fakeUser, id: undefined });
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("id");
      expect(res.body.email).toBe("user1@example.com");
      fakeUser.id = res.body.id;
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
      const res = await request(app).get(`/api/user/${fakeUser.id}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("id");
    });
  });

  describe("PUT /api/user/:id", () => {
    it("should update one user", async () => {
      const res = await request(app)
        .put(`/api/user/${fakeUser.id}`)
        .send({
          ...fakeUser,
          role: "USER",
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.role).toBe("USER");
    });
  });

  describe("DELETE /api/user/:id", () => {
    it("should delete one user", async () => {
      const res = await request(app).delete(`/api/user/${fakeUser.id}`);
      expect(res.statusCode).toBe(200);
    });
  });
});
