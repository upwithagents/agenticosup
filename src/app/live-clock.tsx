"use client";

import { useEffect, useState } from "react";

export function LiveClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) {
    return (
      <div className="clock">
        --<span className="secs">:--</span>
      </div>
    );
  }

  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <div className="clock">
      {pad(now.getHours())}:{pad(now.getMinutes())}
      <span className="secs">:{pad(now.getSeconds())}</span>
    </div>
  );
}
