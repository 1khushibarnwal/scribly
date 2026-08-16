import { beforeEach, describe, expect, it, vi } from "vitest";
import jwt from "jsonwebtoken";

import User from "../../src/models/User.model.js";
import { protectRoute } from "../../src/middleware/auth.middleware.js";

vi.mock("../../src/models/User.model.js", () => ({
  default: {
    findById: vi.fn(),
  },
}));

describe("protectRoute", () => {
  beforeEach(() => {
    process.env.JWT_ACCESS_SECRET = "access-secret";

    vi.clearAllMocks();
  });

  it("rejects requests without an Authorization header", async () => {
    const req = {
      headers: {},
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    const next = vi.fn();

    await protectRoute(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);

    expect(res.json).toHaveBeenCalledWith({
      message: "Not authorized, no token",
    });

    expect(next).not.toHaveBeenCalled();
  });

  it("rejects an invalid token", async () => {
    const req = {
      headers: {
        authorization: "Bearer invalid-token",
      },
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    const next = vi.fn();

    await protectRoute(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);

    expect(res.json).toHaveBeenCalledWith({
      message: "Not authorized, token invalid",
    });

    expect(next).not.toHaveBeenCalled();
  });

  it("attaches the user and calls next for a valid token", async () => {
    const user = {
      _id: "user123",
      name: "Khushi",
      email: "khushi@example.com",
    };

    User.findById.mockResolvedValue(user);

    const token = jwt.sign(
      { userId: "user123" },
      process.env.JWT_ACCESS_SECRET,
    );

    const req = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    const next = vi.fn();

    await protectRoute(req, res, next);

    expect(User.findById).toHaveBeenCalledWith("user123");
    expect(req.user).toEqual(user);
    expect(next).toHaveBeenCalledOnce();
  });

  it("rejects a valid token when the user no longer exists", async () => {
    User.findById.mockResolvedValue(null);

    const token = jwt.sign(
      { userId: "deleted-user" },
      process.env.JWT_ACCESS_SECRET,
    );

    const req = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    const next = vi.fn();

    await protectRoute(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);

    expect(res.json).toHaveBeenCalledWith({
      message: "User not found",
    });

    expect(next).not.toHaveBeenCalled();
  });
});
