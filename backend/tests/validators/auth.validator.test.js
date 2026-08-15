import { describe, expect, it } from "vitest";

import {
  signupSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  updateProfileSchema,
  changePasswordSchema,
} from "../../src/validators/auth.validator.js";

describe("signupSchema", () => {
  it("accepts valid signup data", () => {
    const result = signupSchema.safeParse({
      name: "Khushi",
      email: "khushi@example.com",
      password: "password123",
    });

    expect(result.success).toBe(true);
  });

  it("trims the name and lowercases the email", () => {
    const result = signupSchema.safeParse({
      name: "  Khushi  ",
      email: "  KHUSHI@EXAMPLE.COM  ",
      password: "password123",
    });

    expect(result.success).toBe(true);

    expect(result.data).toEqual({
      name: "Khushi",
      email: "khushi@example.com",
      password: "password123",
    });
  });

  it("rejects an invalid email", () => {
    const result = signupSchema.safeParse({
      name: "Khushi",
      email: "not-an-email",
      password: "password123",
    });

    expect(result.success).toBe(false);
  });

  it("rejects passwords shorter than 6 characters", () => {
    const result = signupSchema.safeParse({
      name: "Khushi",
      email: "khushi@example.com",
      password: "12345",
    });

    expect(result.success).toBe(false);
  });

  it("rejects an empty name", () => {
    const result = signupSchema.safeParse({
      name: "",
      email: "khushi@example.com",
      password: "password123",
    });

    expect(result.success).toBe(false);
  });
});

describe("loginSchema", () => {
  it("accepts valid login data", () => {
    const result = loginSchema.safeParse({
      email: "khushi@example.com",
      password: "password123",
    });

    expect(result.success).toBe(true);
  });

  it("rejects an invalid email", () => {
    const result = loginSchema.safeParse({
      email: "invalid",
      password: "password123",
    });

    expect(result.success).toBe(false);
  });

  it("rejects an empty password", () => {
    const result = loginSchema.safeParse({
      email: "khushi@example.com",
      password: "",
    });

    expect(result.success).toBe(false);
  });
});

describe("forgotPasswordSchema", () => {
  it("accepts a valid email", () => {
    expect(
      forgotPasswordSchema.safeParse({
        email: "khushi@example.com",
      }).success,
    ).toBe(true);
  });

  it("rejects an invalid email", () => {
    expect(
      forgotPasswordSchema.safeParse({
        email: "invalid",
      }).success,
    ).toBe(false);
  });
});

describe("resetPasswordSchema", () => {
  it("accepts valid reset data", () => {
    expect(
      resetPasswordSchema.safeParse({
        token: "abc123",
        password: "password123",
      }).success,
    ).toBe(true);
  });

  it("rejects a missing token", () => {
    expect(
      resetPasswordSchema.safeParse({
        token: "",
        password: "password123",
      }).success,
    ).toBe(false);
  });
});

describe("updateProfileSchema", () => {
  it("allows a valid name", () => {
    expect(
      updateProfileSchema.safeParse({
        name: "Khushi",
      }).success,
    ).toBe(true);
  });

  it("allows an omitted name", () => {
    expect(updateProfileSchema.safeParse({}).success).toBe(true);
  });
});

describe("changePasswordSchema", () => {
  it("accepts valid passwords", () => {
    expect(
      changePasswordSchema.safeParse({
        currentPassword: "oldpassword",
        newPassword: "newpassword",
      }).success,
    ).toBe(true);
  });

  it("rejects a short new password", () => {
    expect(
      changePasswordSchema.safeParse({
        currentPassword: "oldpassword",
        newPassword: "12345",
      }).success,
    ).toBe(false);
  });
});
