import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

import Note from "../../src/models/Note.model.js";

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();

  await mongoose.connect(mongoServer.getUri());
});

afterEach(async () => {
  await Note.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Note model", () => {
  it("creates a valid note", async () => {
    const userId = new mongoose.Types.ObjectId();

    const note = await Note.create({
      title: "My first note",
      content: "This is my first note.",
      user: userId,
    });

    expect(note.title).toBe("My first note");
    expect(note.content).toBe("This is my first note.");
    expect(note.user.toString()).toBe(userId.toString());
  });

  it("requires a title", async () => {
    const userId = new mongoose.Types.ObjectId();

    const note = new Note({
      content: "Some content",
      user: userId,
    });

    await expect(note.validate()).rejects.toThrow(/title/i);
  });

  it("requires content", async () => {
    const userId = new mongoose.Types.ObjectId();

    const note = new Note({
      title: "My note",
      user: userId,
    });

    await expect(note.validate()).rejects.toThrow(/content/i);
  });

  it("requires a user", async () => {
    const note = new Note({
      title: "My note",
      content: "Some content",
    });

    await expect(note.validate()).rejects.toThrow(/user/i);
  });

  it("defaults tags to an empty array", async () => {
    const userId = new mongoose.Types.ObjectId();

    const note = await Note.create({
      title: "My note",
      content: "Some content",
      user: userId,
    });

    expect(note.tags).toEqual([]);
  });

  it("defaults pinned to false", async () => {
    const userId = new mongoose.Types.ObjectId();

    const note = await Note.create({
      title: "My note",
      content: "Some content",
      user: userId,
    });

    expect(note.pinned).toBe(false);
  });

  it("defaults images to an empty array", async () => {
    const userId = new mongoose.Types.ObjectId();

    const note = await Note.create({
      title: "My note",
      content: "Some content",
      user: userId,
    });

    expect(note.images).toEqual([]);
  });

  it("stores tags correctly", async () => {
    const userId = new mongoose.Types.ObjectId();

    const note = await Note.create({
      title: "JavaScript Notes",
      content: "Learning JavaScript",
      user: userId,
      tags: ["javascript", "learning"],
    });

    expect(note.tags).toEqual(["javascript", "learning"]);
  });

  it("stores pinned as true when explicitly provided", async () => {
    const userId = new mongoose.Types.ObjectId();

    const note = await Note.create({
      title: "Important note",
      content: "This note is pinned.",
      user: userId,
      pinned: true,
    });

    expect(note.pinned).toBe(true);
  });

  it("stores shareToken when provided", async () => {
    const userId = new mongoose.Types.ObjectId();

    const note = await Note.create({
      title: "Shared note",
      content: "This note is shared.",
      user: userId,
      shareToken: "unique-share-token",
    });

    expect(note.shareToken).toBe("unique-share-token");
  });

  it("allows multiple notes without a shareToken", async () => {
    const userId = new mongoose.Types.ObjectId();

    const note1 = await Note.create({
      title: "Note 1",
      content: "Content 1",
      user: userId,
    });

    const note2 = await Note.create({
      title: "Note 2",
      content: "Content 2",
      user: userId,
    });

    expect(note1.shareToken).toBeUndefined();
    expect(note2.shareToken).toBeUndefined();
  });

  it("rejects duplicate shareTokens", async () => {
    const userId = new mongoose.Types.ObjectId();

    await Note.create({
      title: "Note 1",
      content: "Content 1",
      user: userId,
      shareToken: "same-token",
    });

    await expect(
      Note.create({
        title: "Note 2",
        content: "Content 2",
        user: userId,
        shareToken: "same-token",
      }),
    ).rejects.toThrow();
  });

  it("stores image objects correctly", async () => {
    const userId = new mongoose.Types.ObjectId();

    const note = await Note.create({
      title: "Note with images",
      content: "Some content",
      user: userId,
      images: [
        {
          url: "https://example.com/image.jpg",
          publicId: "image-123",
        },
      ],
    });

    expect(note.images).toHaveLength(1);
    expect(note.images[0].url).toBe("https://example.com/image.jpg");
    expect(note.images[0].publicId).toBe("image-123");
  });

  it("automatically creates timestamps", async () => {
    const userId = new mongoose.Types.ObjectId();

    const note = await Note.create({
      title: "Timestamp test",
      content: "Testing timestamps",
      user: userId,
    });

    expect(note.createdAt).toBeInstanceOf(Date);
    expect(note.updatedAt).toBeInstanceOf(Date);
  });
});
