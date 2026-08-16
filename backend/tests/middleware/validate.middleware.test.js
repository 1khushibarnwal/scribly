import { describe, expect, it, vi } from "vitest";

import { validate } from "../../src/middleware/validate.middleware.js";

describe("validate middleware", () => {
  it("calls next when validation succeeds", () => {
    const parsedData = {
      name: "Khushi",
      email: "khushi@example.com",
    };

    const schema = {
      safeParse: vi.fn().mockReturnValue({
        success: true,
        data: parsedData,
      }),
    };

    const req = {
      body: {
        name: "  Khushi  ",
        email: "khushi@example.com",
      },
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    const next = vi.fn();

    validate(schema)(req, res, next);

    expect(schema.safeParse).toHaveBeenCalledWith(req.body);

    expect(req.body).toEqual(parsedData);

    expect(next).toHaveBeenCalledOnce();

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it("returns 400 when validation fails", () => {
    const schema = {
      safeParse: vi.fn().mockReturnValue({
        success: false,
        error: {
          issues: [
            {
              message: "Invalid email address",
            },
          ],
        },
      }),
    };

    const req = {
      body: {
        email: "invalid-email",
      },
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    const next = vi.fn();

    validate(schema)(req, res, next);

    expect(schema.safeParse).toHaveBeenCalledWith(req.body);

    expect(res.status).toHaveBeenCalledWith(400);

    expect(res.json).toHaveBeenCalledWith({
      message: "Invalid email address",
    });

    expect(next).not.toHaveBeenCalled();
  });

  it("returns the first validation error when multiple errors exist", () => {
    const schema = {
      safeParse: vi.fn().mockReturnValue({
        success: false,
        error: {
          issues: [
            {
              message: "Name is required",
            },
            {
              message: "Invalid email address",
            },
            {
              message: "Password is too short",
            },
          ],
        },
      }),
    };

    const req = {
      body: {},
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    const next = vi.fn();

    validate(schema)(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);

    expect(res.json).toHaveBeenCalledWith({
      message: "Name is required",
    });

    expect(next).not.toHaveBeenCalled();
  });

  it("replaces req.body with the sanitized data", () => {
    const originalBody = {
      name: "  Khushi  ",
      email: "  KHUSHI@EXAMPLE.COM ",
    };

    const sanitizedBody = {
      name: "Khushi",
      email: "khushi@example.com",
    };

    const schema = {
      safeParse: vi.fn().mockReturnValue({
        success: true,
        data: sanitizedBody,
      }),
    };

    const req = {
      body: originalBody,
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    const next = vi.fn();

    validate(schema)(req, res, next);

    expect(req.body).toEqual(sanitizedBody);
    expect(req.body).not.toBe(originalBody);

    expect(next).toHaveBeenCalledOnce();
  });

  it("does not modify req.body when validation fails", () => {
    const originalBody = {
      email: "invalid-email",
    };

    const schema = {
      safeParse: vi.fn().mockReturnValue({
        success: false,
        error: {
          issues: [
            {
              message: "Invalid email address",
            },
          ],
        },
      }),
    };

    const req = {
      body: originalBody,
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    const next = vi.fn();

    validate(schema)(req, res, next);

    expect(req.body).toEqual(originalBody);

    expect(next).not.toHaveBeenCalled();
  });
});
