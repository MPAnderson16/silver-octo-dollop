import { useEffect, useState } from "react";
import { applyTheme, defaultThemeName } from "./styles/theme";

const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000";
const STORAGE_KEY = "ivy_theme";

export default function App() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("echo");
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return defaultThemeName;
    return localStorage.getItem(STORAGE_KEY) ?? defaultThemeName;
  });

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const callApi = async () => {
    setLoading(true);
    setResult("");

    try {
      const endpoint = mode === "echo" ? "echo" : "chat";
      const res = await fetch(`${API_BASE}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || res.statusText);

      setResult(mode === "echo" ? data.echo : data.reply);
    } catch (err) {
      setResult(String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="app">
      <h1>Ivy</h1>
      <section className="card">
        <div className="field theme">
          <span>Theme</span>
          <button
            type="button"
            className="themeToggle"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            Switch to {theme === "dark" ? "Light" : "Dark"}
          </button>
          <button
            type="button"
            className="themeToggle"
            onClick={() => setTheme("pink")}
          >
            Switch to Pink
          </button>
        </div>

        <label className="field">
          <span>Message</span>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type something..."
          />
        </label>

        <div className="field radio">
          <label>
            <input
              type="radio"
              name="mode"
              value="echo"
              checked={mode === "echo"}
              onChange={() => setMode("echo")}
            />
            Echo
          </label>
          <label>
            <input
              type="radio"
              name="mode"
              value="chat"
              checked={mode === "chat"}
              onChange={() => setMode("chat")}
            />
            Chat
          </label>
        </div>

        <button onClick={callApi} disabled={loading || !message.trim()}>
          {loading ? "Calling…" : `Send (${mode})`}
        </button>

        <pre className="result">{result}</pre>
      </section>
    </main>
  );
}
