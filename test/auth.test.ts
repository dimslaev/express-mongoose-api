import { find as findUser } from "../src/api/user/user.service";
import request from "supertest";
import app from "../src/app";
import { prisma } from "../src/prisma";
import { User } from "@prisma/client";
import { getToken } from "../src/utils";

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

describe("Auth Component", () => {
  describe("POST /api/auth/signup", () => {
    // Sunny
    it("should create user and return token", async () => {
      const res = await request(app).post("/api/auth/signup").send({
        email: fakeUser.email,
        password: fakeUser.password,
      });
      expect(res.statusCode).toBe(201);
      expect(res.header.authorization).toBeTruthy();
    });
    // Rainy
    it("should not create user if user exists", async () => {
      const res = await request(app).post("/api/auth/signup").send({
        email: fakeUser.email,
        password: fakeUser.password,
      });
      expect(res.statusCode).toBe(500);
      expect(res.header.authorization).toBeUndefined();
    });
  });

  describe("POST /api/auth/login", () => {
    // Sunny
    it("should login user and return token", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: fakeUser.email,
        password: fakeUser.password,
      });
      expect(res.statusCode).toBe(200);
      expect(res.header.authorization).toBeTruthy();
    });
    // Rainy
    it("should not login user with wrong credentials", async () => {
      const res = await request(app).post("/api/auth/signup").send({
        email: fakeUser.email,
        password: "123457",
      });
      expect(res.statusCode).toBe(500);
      expect(res.header.authorization).toBeUndefined();
    });
  });

  // describe("POST /api/auth/change-password", () => {
  //   // Sunny
  //   it("should change user password and return token if user is logged in", async () => {
  //     const user = await findUser("user1@example.com");
  //     const id = user?.id as unknown as string;
  //     const token = await getToken(id, "user1@example.com");

  //     const res = await request(app)
  //       .post("/api/auth/change-password")
  //       .set("Authorization", `Bearer ${token}`)
  //       .send({ id, password: "123457" });

  //     expect(res.statusCode).toBe(200);
  //     expect(res.header.authorization).toBeTruthy();
  //   });
  //   // Rainy
  //   it("should return error if user is not logged in", async () => {
  //     const user = await findUser("user1@example.com");
  //     const id = user?.id as unknown as string;

  //     const res = await request(app)
  //       .post("/api/auth/change-password")
  //       .set("Authorization", "")
  //       .send({ id, password: "123457" });

  //     expect(res.statusCode).toBe(401);
  //     expect(res.header.authorization).toBeUndefined();
  //   });
  // });
});
