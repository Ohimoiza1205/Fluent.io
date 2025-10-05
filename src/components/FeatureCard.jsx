import React from "react";

export default function FeatureCard({ title = "Feature X", items = [] }) {
  return (
    <article style={{ padding: 18, borderRadius: 8, background: "#0b1220", color: "#e6eef8" }}>
      <header style={{ marginBottom: 8 }}>
        <h3 style={{ margin: 0 }}>{title} — (SAMPLE)</h3>
        <small style={{ color: "#94a3b8" }}>Demo stub — not production</small>
      </header>
      <ul>
        {items.length ? items.map((it, i) => <li key={i}>{it}</li>) : <li>• placeholder item</li>}
      </ul>
      <footer style={{ marginTop: 12, fontSize: 12, color: "#9ca3af" }}>
        Last updated: {new Date().toLocaleString()}
      </footer>
    </article>
  );
}
