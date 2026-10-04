import { describe, expect, it } from "vitest";
import { reflectOnThinking } from "./ai";

describe("MIRROR reflection engine", () => {
  it("identifies internship, financial, academic, and learning priorities", async () => {
    const result = await reflectOnThinking(
      "Should I accept a 6-month internship?",
      "The stipend is good, it is close to college, I want industry experience, but I am worried about exams and mentorship."
    );

    expect(result.priorities.length).toBeGreaterThanOrEqual(3);
    expect(result.blindSpots.length).toBeGreaterThan(0);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.questions.length).toBeGreaterThan(0);
  });

  it("always returns the core reflection sections", async () => {
    const result = await reflectOnThinking(
      "Should I take this opportunity?",
      "I think it could be useful."
    );

    expect(result).toHaveProperty("priorities");
    expect(result).toHaveProperty("blindSpots");
    expect(result).toHaveProperty("assumptions");
    expect(result).toHaveProperty("tradeOffs");
    expect(result).toHaveProperty("beforeYouDecide");
    expect(result).toHaveProperty("questions");
    expect(result).toHaveProperty("alternativePerspectives");
  });
});