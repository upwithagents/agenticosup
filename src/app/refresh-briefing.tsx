"use client";

import { useState } from "react";

export function RefreshBriefing({ initialSyncedAt }: { initialSyncedAt: string }) {
  const [syncedAt, setSyncedAt] = useState(initialSyncedAt);
  const [loading, setLoading] = useState(false);

  async function refresh() {
    setLoading(true);
    try {
      const res = await fetch("/agenticosup/api/briefing", { cache: "no-store" });
      const data = (await res.json()) as { generatedAt: string };
      setSyncedAt(data.generatedAt);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="footer">
      <div className="status">synced {formatTime(syncedAt)}</div>
      <div className="actions">
        <button className="btn primary" onClick={refresh} disabled={loading}>
          {loading ? "Syncing…" : "Refresh briefing"}
        </button>
      </div>
    </div>
  );
}

function formatTime(iso: string): string {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}
