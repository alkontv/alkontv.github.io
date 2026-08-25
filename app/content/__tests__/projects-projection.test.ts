import { describe, it, expect } from "vitest";
import { PROJECTS } from "../../constants/projects";
import { FEATURED_CASES } from "../cases";

describe("проекция кейсов в 3D-карусель", () => {
  it("отдаёт ровно шесть плиток — под раскладку карусели", () => {
    expect(PROJECTS).toHaveLength(6);
  });

  it("порядок совпадает с featured-кейсами", () => {
    expect(PROJECTS.map((p) => p.title.ru)).toEqual(
      FEATURED_CASES.map((c) => c.name.ru)
    );
  });

  it("каждая плитка ведёт на якорь своего кейса", () => {
    PROJECTS.forEach((p, i) => {
      expect(p.url).toBe(`/cases#${FEATURED_CASES[i].id}`);
    });
  });

  it("не осталось выдуманных проектов", () => {
    const titles = PROJECTS.map((p) => `${p.title.ru} ${p.title.en}`).join(" ");
    ["Flutter Marketplace", "Business CRM", "Analytics Landing", "Web Platform"].forEach(
      (fake) => expect(titles).not.toContain(fake)
    );
  });
});
