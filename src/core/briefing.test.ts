import { describe, expect, it } from "vitest";
import { buildMockBriefing, computeTaskProgress, nextTimelineEntry } from "./briefing";

describe("computeTaskProgress", () => {
  it("counts done vs total", () => {
    const tasks = [
      { id: "a", label: "a", done: true },
      { id: "b", label: "b", done: true },
      { id: "c", label: "c", done: false },
    ];
    expect(computeTaskProgress(tasks)).toEqual({ done: 2, total: 3 });
  });

  it("handles an empty list", () => {
    expect(computeTaskProgress([])).toEqual({ done: 0, total: 0 });
  });
});

describe("nextTimelineEntry", () => {
  const timeline = [
    { time: "09:00", label: "Focus block" },
    { time: "10:30", label: "Standup" },
    { time: "13:00", label: "1:1" },
  ];

  it("picks the first entry at or after now", () => {
    const now = new Date(2026, 0, 1, 9, 30);
    expect(nextTimelineEntry(timeline, now)).toEqual(timeline[1]);
  });

  it("returns the current entry when now matches it exactly", () => {
    const now = new Date(2026, 0, 1, 13, 0);
    expect(nextTimelineEntry(timeline, now)).toEqual(timeline[2]);
  });

  it("returns undefined once the day's entries are past", () => {
    const now = new Date(2026, 0, 1, 23, 0);
    expect(nextTimelineEntry(timeline, now)).toBeUndefined();
  });
});

describe("buildMockBriefing", () => {
  it("returns an internally consistent briefing", () => {
    const briefing = buildMockBriefing();
    const progress = computeTaskProgress(briefing.tasks);
    expect(progress.total).toBe(briefing.tasks.length);
    expect(progress.done).toBeGreaterThan(0);
    expect(briefing.timeline.length).toBeGreaterThan(0);
    expect(briefing.jiraOpen).toBeGreaterThanOrEqual(0);
    expect(new Date(briefing.generatedAt).toString()).not.toBe("Invalid Date");
  });
});
