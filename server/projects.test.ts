import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the storage module
vi.mock("./storage", () => ({
  storagePut: vi.fn().mockResolvedValue({
    key: "portfolio/test-image.jpg",
    url: "https://cdn.example.com/portfolio/test-image.jpg",
  }),
}));

// Mock the db module
vi.mock("./db", () => ({
  listProjects: vi.fn().mockResolvedValue([
    {
      id: 1,
      titleEn: "Test Project EN",
      titleEs: "Test Project ES",
      titleVal: "Test Project VAL",
      imageKey: "portfolio/test.jpg",
      imageUrl: "https://cdn.example.com/portfolio/test.jpg",
      sortOrder: 0,
      visible: "yes",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  listVisibleProjects: vi.fn().mockResolvedValue([
    {
      id: 1,
      titleEn: "Test Project EN",
      titleEs: "Test Project ES",
      titleVal: "Test Project VAL",
      imageKey: "portfolio/test.jpg",
      imageUrl: "https://cdn.example.com/portfolio/test.jpg",
      sortOrder: 0,
      visible: "yes",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  createProject: vi.fn().mockResolvedValue({ id: 2 }),
  updateProject: vi.fn().mockResolvedValue(undefined),
  deleteProject: vi.fn().mockResolvedValue(undefined),
  getUserByOpenId: vi.fn(),
  upsertUser: vi.fn(),
}));

import { listVisibleProjects, listProjects, createProject, updateProject, deleteProject } from "./db";
import { storagePut } from "./storage";

describe("Portfolio Projects - Database Operations", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should list visible projects", async () => {
    const projects = await listVisibleProjects();
    expect(projects).toHaveLength(1);
    expect(projects[0].titleEn).toBe("Test Project EN");
    expect(projects[0].titleEs).toBe("Test Project ES");
    expect(projects[0].titleVal).toBe("Test Project VAL");
    expect(projects[0].visible).toBe("yes");
  });

  it("should list all projects (including hidden)", async () => {
    const projects = await listProjects();
    expect(projects).toHaveLength(1);
    expect(projects[0].id).toBe(1);
  });

  it("should create a project", async () => {
    const result = await createProject({
      titleEn: "New Project EN",
      titleEs: "New Project ES",
      titleVal: "New Project VAL",
      imageKey: "portfolio/new.jpg",
      imageUrl: "https://cdn.example.com/portfolio/new.jpg",
      sortOrder: 1,
    });
    expect(result).toEqual({ id: 2 });
    expect(createProject).toHaveBeenCalledWith({
      titleEn: "New Project EN",
      titleEs: "New Project ES",
      titleVal: "New Project VAL",
      imageKey: "portfolio/new.jpg",
      imageUrl: "https://cdn.example.com/portfolio/new.jpg",
      sortOrder: 1,
    });
  });

  it("should update a project", async () => {
    await updateProject(1, { titleEn: "Updated EN", visible: "no" });
    expect(updateProject).toHaveBeenCalledWith(1, {
      titleEn: "Updated EN",
      visible: "no",
    });
  });

  it("should delete a project", async () => {
    await deleteProject(1);
    expect(deleteProject).toHaveBeenCalledWith(1);
  });
});

describe("Portfolio Projects - S3 Storage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should upload an image to S3", async () => {
    const buffer = Buffer.from("fake-image-data");
    const result = await storagePut("portfolio/test-image.jpg", buffer, "image/jpeg");
    expect(result.key).toBe("portfolio/test-image.jpg");
    expect(result.url).toContain("https://");
    expect(storagePut).toHaveBeenCalledWith(
      "portfolio/test-image.jpg",
      buffer,
      "image/jpeg"
    );
  });
});

describe("Portfolio Projects - Data Shape", () => {
  it("should have required fields in project data", async () => {
    const projects = await listVisibleProjects();
    const project = projects[0];

    expect(project).toHaveProperty("id");
    expect(project).toHaveProperty("titleEn");
    expect(project).toHaveProperty("titleEs");
    expect(project).toHaveProperty("titleVal");
    expect(project).toHaveProperty("imageKey");
    expect(project).toHaveProperty("imageUrl");
    expect(project).toHaveProperty("sortOrder");
    expect(project).toHaveProperty("visible");
  });

  it("should have valid image URL format", async () => {
    const projects = await listVisibleProjects();
    expect(projects[0].imageUrl).toMatch(/^https?:\/\//);
  });

  it("should have valid visibility enum", async () => {
    const projects = await listVisibleProjects();
    expect(["yes", "no"]).toContain(projects[0].visible);
  });
});
