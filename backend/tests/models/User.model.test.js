import { beforeAll, afterAll, afterEach, describe, expect, it } from "vitest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

import User from "../../src/models/User.model.js";

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();

  await mongoose.connect(mongoServer.getUri());
});

afterEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("User model", () => {
  it("hashes the password before saving", async () => {
    const user = await User.create({
      name: "Khushi",
      email: "khushi@example.com",
      password: "password123",
    });

    expect(user.password).not.toBe("password123");
    expect(user.password).toHaveLength(60);
  });

  it("correctly compares a valid password", async () => {
    const user = await User.create({
      name: "Khushi",
      email: "khushi@example.com",
      password: "password123",
    });

    const result = await user.comparePassword("password123");

    expect(result).toBe(true);
  });

  it("rejects an incorrect password", async () => {
    const user = await User.create({
      name: "Khushi",
      email: "khushi@example.com",
      password: "password123",
    });

    const result = await user.comparePassword("wrongpassword");

    expect(result).toBe(false);
  });
});
