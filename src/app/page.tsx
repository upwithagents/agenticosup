import { buildMockBriefing, computeTaskProgress, nextTimelineEntry } from "@/core/briefing";
import { LiveClock } from "@/app/live-clock";
import { RefreshBriefing } from "@/app/refresh-briefing";
import { Sparkline } from "@/app/sparkline";

export const dynamic = "force-dynamic";

export default function Home() {
  const briefing = buildMockBriefing();
  const progress = computeTaskProgress(briefing.tasks);
  const next = nextTimelineEntry(briefing.timeline);

  return (
    <>
      <span className="data-badge">sample data · live sources coming soon</span>

      <div className="statusbar">
        <div className="brand">
          <span className="live-dot" aria-hidden="true" />
          AGENTICOS <span className="sub">— daily briefing</span>
        </div>
        <div className="date">{formatDate(new Date())}</div>
        <LiveClock />
      </div>

      <div className="briefing">
        <div className="panel">
          <div className="eyebrow">Morning Report</div>
          <div className="report-body">{briefing.reportBody}</div>
          <div className="report-note">{briefing.reportNote}</div>
        </div>

        <div className="panel">
          <div className="eyebrow">
            Plan Today{" "}
            <span className="count">
              {progress.done} / {progress.total}
            </span>
          </div>
          <div className="tasklist">
            {briefing.tasks.map((task) => (
              <div
                key={task.id}
                className={`task${task.done ? " done" : ""}${task.now ? " now" : ""}`}
              >
                <div className="box" />
                <span>{task.label}</span>
                {task.tag && <span className="tag">{task.tag}</span>}
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="eyebrow">Timeline</div>
          <div className="timeline">
            {briefing.timeline.map((entry) => (
              <div
                key={entry.time}
                className={`tl-item${entry === next ? " next" : ""}`}
              >
                <span className="t">{entry.time}</span>
                <span className="label">{entry.label}</span>
              </div>
            ))}
          </div>

          <div className="eyebrow" style={{ marginTop: 6 }}>
            Vitals
          </div>
          <div className="vitals">
            {briefing.vitals.map((vital) => (
              <div key={vital.label} className={`vital${vital.hot ? " hot" : ""}`}>
                <span className="vlabel">{vital.label}</span>
                <span className="vval">{vital.value}</span>
                <Sparkline series={vital.spark} />
              </div>
            ))}
            <div className="vital">
              <span className="vlabel">jira</span>
              <span className="vval" style={{ width: "auto" }}>
                <span className={`chip${briefing.jiraOpen > 0 ? " attn" : ""}`}>
                  <span className="dot" /> {briefing.jiraOpen} open
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <RefreshBriefing initialSyncedAt={briefing.generatedAt} />
    </>
  );
}

function formatDate(d: Date) {
  return d.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}
