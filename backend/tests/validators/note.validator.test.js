import { describe, expect, it } from "vitest";

import { noteSchema } from "../../src/validators/note.validator.js";

describe("noteSchema", () => {
  it("accepts a valid note", () => {
    const result = noteSchema.safeParse({
      title: "My first note",
      content: "This is my note.",
      tags: ["javascript", "learning"],
    });

    expect(result.success).toBe(true);
  });

  it("defaults tags to an empty array", () => {
    const result = noteSchema.safeParse({
      title: "My first note",
      content: "This is my note.",
    });

    expect(result.success).toBe(true);
    expect(result.data.tags).toEqual([]);
  });

  it("trims title and content", () => {
    const result = noteSchema.safeParse({
      title: "  My note  ",
      content: "  Hello world  ",
    });

    expect(result.success).toBe(true);

    expect(result.data.title).toBe("My note");
    expect(result.data.content).toBe("Hello world");
  });

  it("rejects an empty title", () => {
    const result = noteSchema.safeParse({
      title: "",
      content: "Some content",
    });

    expect(result.success).toBe(false);
  });

  it("rejects empty content", () => {
    const result = noteSchema.safeParse({
      title: "My note",
      content: "",
    });

    expect(result.success).toBe(false);
  });

  it("rejects more than 10 tags", () => {
    const tags = Array.from({ length: 11 }, (_, i) => `tag${i}`);

    const result = noteSchema.safeParse({
      title: "My note",
      content: "Some content",
      tags,
    });

    expect(result.success).toBe(false);
  });

  it("rejects a tag longer than 30 characters", () => {
    const result = noteSchema.safeParse({
      title: "My note",
      content: "Some content",
      tags: ["a".repeat(31)],
    });

    expect(result.success).toBe(false);
  });
});
