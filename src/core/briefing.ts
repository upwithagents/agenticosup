export interface Task {
  id: string;
  label: string;
  done: boolean;
  now?: boolean;
  tag?: string;
}

export interface TimelineEntry {
  time: string; // "HH:MM", 24h
  label: string;
}

export interface Vital {
  label: string;
  value: string;
  hot?: boolean;
  spark: number[];
}

export interface Briefing {
  generatedAt: string;
  reportBody: string;
  reportNote: string;
  tasks: Task[];
  timeline: TimelineEntry[];
  vitals: Vital[];
  jiraOpen: number;
}

export function computeTaskProgress(tasks: Task[]): { done: number; total: number } {
  return { done: tasks.filter((t) => t.done).length, total: tasks.length };
}

export function nextTimelineEntry(
  timeline: TimelineEntry[],
  now: Date = new Date(),
): TimelineEntry | undefined {
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  return timeline.find((entry) => toMinutes(entry.time) >= nowMinutes);
}

function toMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

export function buildMockBriefing(): Briefing {
  return {
    generatedAt: new Date().toISOString(),
    reportBody:
      "Three meetings today — standup moved to 10:30. Two pull requests " +
      "picked up reviews overnight; TDOG-312 is still waiting on you. " +
      "upagent's memory-engine plan merged cleanly.",
    reportNote: "Inbox: 4 threads need a reply · oldest is 2 days",
    tasks: [
      { id: "walletup-pr", label: "Review walletup PR", done: true },
      { id: "standup-prep", label: "Standup prep", done: true },
      { id: "tdog-312", label: "TDOG-312 fixes", done: false, now: true, tag: "in progress" },
      { id: "upagent-scaffold", label: "upagent scaffold pass", done: false },
      { id: "inbox-zero", label: "Inbox to zero", done: false },
    ],
    timeline: [
      { time: "09:00", label: "Focus block" },
      { time: "10:30", label: "Standup" },
      { time: "13:00", label: "1:1 w/ Sarah" },
      { time: "15:30", label: "Design review" },
    ],
    vitals: [
      { label: "claude 5h", value: "45%", hot: true, spark: [16, 14, 15, 20, 18, 25, 27] },
      { label: "gh commits", value: "12", spark: [10, 14, 8, 16, 12, 18, 14] },
    ],
    jiraOpen: 4,
  };
}
