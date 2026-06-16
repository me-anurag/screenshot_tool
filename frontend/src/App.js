import React, { useState, useEffect, useCallback, useRef } from "react";

const API = "http://localhost:5050/api";

const styles = {
  root: {
    fontFamily: "Arial, sans-serif",
    minHeight: "100vh",
    background: "#f5f5f5",
    color: "#1a1a1a",
    padding: "0",
    margin: "0",
  },
  header: {
    background: "#ffffff",
    borderBottom: "1px solid #e0e0e0",
    padding: "16px 32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#1a1a1a",
    margin: "0",
    letterSpacing: "-0.3px",
  },
  headerBadge: {
    fontSize: "12px",
    fontWeight: "600",
    padding: "4px 10px",
    borderRadius: "4px",
    background: "#e8f5e9",
    color: "#2e7d32",
    border: "1px solid #c8e6c9",
  },
  headerBadgeInactive: {
    background: "#fce4ec",
    color: "#c62828",
    border: "1px solid #f8bbd0",
  },
  main: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "28px 24px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  },
  card: {
    background: "#ffffff",
    borderRadius: "8px",
    border: "1px solid #e0e0e0",
    padding: "24px",
  },
  cardFull: {
    gridColumn: "1 / -1",
    background: "#ffffff",
    borderRadius: "8px",
    border: "1px solid #e0e0e0",
    padding: "24px",
  },
  cardTitle: {
    fontSize: "13px",
    fontWeight: "700",
    color: "#888",
    letterSpacing: "0.8px",
    textTransform: "uppercase",
    marginBottom: "16px",
    margin: "0 0 16px 0",
  },
  label: {
    display: "block",
    fontSize: "13px",
    fontWeight: "600",
    color: "#444",
    marginBottom: "6px",
  },
  input: {
    width: "100%",
    padding: "9px 12px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "14px",
    fontFamily: "Arial, sans-serif",
    color: "#1a1a1a",
    background: "#fff",
    boxSizing: "border-box",
    outline: "none",
    transition: "border-color 0.15s",
  },
  inputRow: {
    display: "flex",
    gap: "8px",
  },
  inputSmall: {
    width: "100%",
    padding: "9px 12px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "14px",
    fontFamily: "Arial, sans-serif",
    color: "#1a1a1a",
    background: "#fff",
    boxSizing: "border-box",
    outline: "none",
  },
  browseBtn: {
    padding: "9px 14px",
    background: "#f0f0f0",
    border: "1px solid #ddd",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "13px",
    fontFamily: "Arial, sans-serif",
    fontWeight: "600",
    color: "#444",
    whiteSpace: "nowrap",
    flexShrink: "0",
  },
  field: {
    marginBottom: "16px",
  },
  fieldLast: {
    marginBottom: "0",
  },
  btn: {
    padding: "10px 20px",
    background: "#1a1a1a",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    fontFamily: "Arial, sans-serif",
    fontWeight: "600",
    transition: "background 0.15s",
  },
  btnSecondary: {
    padding: "10px 20px",
    background: "#fff",
    color: "#1a1a1a",
    border: "1px solid #ddd",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    fontFamily: "Arial, sans-serif",
    fontWeight: "600",
  },
  btnDanger: {
    padding: "8px 14px",
    background: "#fff",
    color: "#c62828",
    border: "1px solid #f8bbd0",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "13px",
    fontFamily: "Arial, sans-serif",
    fontWeight: "600",
  },
  btnRow: {
    display: "flex",
    gap: "8px",
    marginTop: "20px",
  },
  previewBox: {
    background: "#f9f9f9",
    border: "1px solid #e8e8e8",
    borderRadius: "5px",
    padding: "12px 16px",
    marginBottom: "16px",
  },
  previewLabel: {
    fontSize: "11px",
    fontWeight: "700",
    color: "#999",
    letterSpacing: "0.6px",
    textTransform: "uppercase",
    marginBottom: "4px",
  },
  previewFilename: {
    fontSize: "15px",
    fontWeight: "700",
    color: "#1a1a1a",
    fontFamily: "Arial, sans-serif",
  },
  previewPath: {
    fontSize: "11px",
    color: "#888",
    marginTop: "3px",
    wordBreak: "break-all",
    fontFamily: "Arial, sans-serif",
  },
  hotkey: {
    display: "inline-block",
    background: "#1a1a1a",
    color: "#fff",
    padding: "6px 14px",
    borderRadius: "5px",
    fontSize: "15px",
    fontWeight: "700",
    letterSpacing: "1px",
    fontFamily: "Arial, sans-serif",
    marginTop: "8px",
  },
  hotkeyDesc: {
    fontSize: "13px",
    color: "#888",
    marginTop: "8px",
  },
  counterRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "12px",
  },
  counterNum: {
    fontSize: "36px",
    fontWeight: "700",
    color: "#1a1a1a",
    lineHeight: "1",
  },
  counterLabel: {
    fontSize: "12px",
    color: "#888",
    marginTop: "2px",
  },
  toast: {
    position: "fixed",
    bottom: "24px",
    right: "24px",
    background: "#1a1a1a",
    color: "#fff",
    padding: "12px 20px",
    borderRadius: "6px",
    fontSize: "14px",
    fontFamily: "Arial, sans-serif",
    fontWeight: "600",
    zIndex: 1000,
    transition: "opacity 0.3s",
    maxWidth: "320px",
  },
  toastError: {
    background: "#c62828",
  },
  logItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 0",
    borderBottom: "1px solid #f0f0f0",
  },
  logFilename: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#1a1a1a",
    fontFamily: "Arial, sans-serif",
  },
  logTime: {
    fontSize: "12px",
    color: "#999",
    fontFamily: "Arial, sans-serif",
  },
  divider: {
    height: "1px",
    background: "#f0f0f0",
    margin: "16px 0",
  },
  statusDot: {
    display: "inline-block",
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#2e7d32",
    marginRight: "6px",
    verticalAlign: "middle",
  },
  statusDotOff: {
    background: "#c62828",
  },
  resetInput: {
    width: "80px",
    padding: "8px 10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "14px",
    fontFamily: "Arial, sans-serif",
    color: "#1a1a1a",
    boxSizing: "border-box",
  },
  manualBtn: {
    padding: "10px 20px",
    background: "#1565c0",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    fontFamily: "Arial, sans-serif",
    fontWeight: "600",
  },
};

function Toast({ message, isError, visible }) {
  if (!visible) return null;
  return (
    <div style={{ ...styles.toast, ...(isError ? styles.toastError : {}) }}>
      {message}
    </div>
  );
}

export default function App() {
  const [settings, setSettings] = useState({
    main_folder: "",
    session_folder: "",
    prefix: "screenshot",
    start_number: 1,
    step: 1,
    current_number: 1,
    hotkey: "ctrl+F9",
  });
  const [preview, setPreview] = useState({ filename: "", path: "" });
  const [log, setLog] = useState([]);
  const [status, setStatus] = useState({ last: {}, hotkey_active: false });
  const [toast, setToast] = useState({ visible: false, message: "", isError: false });
  const [resetVal, setResetVal] = useState("1");
  const [saved, setSaved] = useState(false);
  const toastTimer = useRef(null);

  const showToast = useCallback((message, isError = false) => {
    setToast({ visible: true, message, isError });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => {
      setToast((t) => ({ ...t, visible: false }));
    }, 2800);
  }, []);

  const fetchLive = useCallback(async () => {
    try {
      const [p, l, st] = await Promise.all([
        fetch(`${API}/preview`).then((r) => r.json()),
        fetch(`${API}/log`).then((r) => r.json()),
        fetch(`${API}/status`).then((r) => r.json()),
      ]);
      setPreview(p);
      setLog(l);
      setStatus(st);
    } catch (e) {
      // backend not running
    }
  }, []);

  const fetchAll = useCallback(async () => {
    try {
      const [s, p, l, st] = await Promise.all([
        fetch(`${API}/settings`).then((r) => r.json()),
        fetch(`${API}/preview`).then((r) => r.json()),
        fetch(`${API}/log`).then((r) => r.json()),
        fetch(`${API}/status`).then((r) => r.json()),
      ]);
      setSettings(s);
      setPreview(p);
      setLog(l);
      setStatus(st);
    } catch (e) {
      // backend not running
    }
  }, []);

  useEffect(() => {
    fetchAll();
    const interval = setInterval(fetchLive, 2000);
    return () => clearInterval(interval);
  }, [fetchAll, fetchLive]);

  const handleChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`${API}/settings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (data.success) {
        setSaved(true);
        showToast("Settings saved. Hotkey is active.");
        fetchAll();
        setTimeout(() => setSaved(false), 2000);
      }
    } catch (e) {
      showToast("Could not connect to backend.", true);
    }
  };

  const handleBrowse = async () => {
    try {
      const res = await fetch(`${API}/browse`, { method: "POST" });
      const data = await res.json();
      if (data.folder) {
        handleChange("main_folder", data.folder);
      }
    } catch (e) {
      showToast("Could not open folder picker.", true);
    }
  };

  const handleManualScreenshot = async () => {
    try {
      const res = await fetch(`${API}/screenshot`, { method: "POST" });
      const data = await res.json();
      if (data.status && data.status.filename) {
        showToast(`Saved: ${data.status.filename}`);
      } else {
        showToast(data.status.message || "Screenshot taken.", false);
      }
      fetchAll();
    } catch (e) {
      showToast("Could not take screenshot.", true);
    }
  };

  const handleReset = async () => {
    const val = parseInt(resetVal, 10);
    if (isNaN(val) || val < 1) {
      showToast("Enter a valid number.", true);
      return;
    }
    try {
      await fetch(`${API}/reset-counter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: val }),
      });
      showToast(`Counter reset to ${val}.`);
      fetchAll();
    } catch (e) {
      showToast("Could not reset counter.", true);
    }
  };

  const hotkeyActive = status.hotkey_active;

  return (
    <div style={styles.root}>
      <div style={styles.header}>
        <p style={styles.headerTitle}>Screenshot Tool</p>
        <span
          style={{
            ...styles.headerBadge,
            ...(hotkeyActive ? {} : styles.headerBadgeInactive),
          }}
        >
          <span
            style={{
              ...styles.statusDot,
              ...(hotkeyActive ? {} : styles.statusDotOff),
            }}
          />
          {hotkeyActive ? "Hotkey Active" : "Hotkey Inactive"}
        </span>
      </div>

      <div style={styles.main}>
        {/* Folder Settings */}
        <div style={styles.card}>
          <p style={styles.cardTitle}>Folder Settings</p>

          <div style={styles.field}>
            <label style={styles.label}>Main Folder</label>
            <div style={styles.inputRow}>
              <input
                style={styles.input}
                value={settings.main_folder}
                onChange={(e) => handleChange("main_folder", e.target.value)}
                placeholder="D:\Screenshots"
              />
              <button style={styles.browseBtn} onClick={handleBrowse}>
                Browse
              </button>
            </div>
          </div>

          <div style={styles.fieldLast}>
            <label style={styles.label}>Session Subfolder</label>
            <input
              style={styles.input}
              value={settings.session_folder}
              onChange={(e) => handleChange("session_folder", e.target.value)}
              placeholder="math1"
            />
          </div>
        </div>

        {/* File Naming */}
        <div style={styles.card}>
          <p style={styles.cardTitle}>File Naming</p>

          <div style={styles.field}>
            <label style={styles.label}>Filename Prefix</label>
            <input
              style={styles.input}
              value={settings.prefix}
              onChange={(e) => handleChange("prefix", e.target.value)}
              placeholder="percentage"
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Start Number</label>
            <input
              style={styles.input}
              type="number"
              min="1"
              value={settings.start_number}
              onChange={(e) =>
                handleChange("start_number", parseInt(e.target.value, 10) || 1)
              }
            />
          </div>

          <div style={styles.fieldLast}>
            <label style={styles.label}>Step</label>
            <input
              style={styles.input}
              type="number"
              min="1"
              value={settings.step}
              onChange={(e) =>
                handleChange("step", parseInt(e.target.value, 10) || 1)
              }
            />
          </div>
        </div>

        {/* Preview and Counter */}
        <div style={styles.card}>
          <p style={styles.cardTitle}>Next Screenshot</p>

          <div style={styles.previewBox}>
            <div style={styles.previewLabel}>Filename</div>
            <div style={styles.previewFilename}>
              {preview.filename || `${settings.prefix}${settings.current_number}.png`}
            </div>
            <div style={styles.previewPath}>
              {preview.path || "Save settings to update path"}
            </div>
          </div>

          <div style={styles.counterRow}>
            <div>
              <div style={styles.counterNum}>{settings.current_number}</div>
              <div style={styles.counterLabel}>Current counter</div>
            </div>
          </div>

          <div style={styles.divider} />

          <label style={styles.label}>Reset Counter To</label>
          <div style={styles.inputRow}>
            <input
              style={styles.resetInput}
              type="number"
              min="1"
              value={resetVal}
              onChange={(e) => setResetVal(e.target.value)}
            />
            <button style={styles.btnDanger} onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>

        {/* Hotkey */}
        <div style={styles.card}>
          <p style={styles.cardTitle}>Hotkey</p>

          <div style={styles.field}>
            <label style={styles.label}>Keyboard Shortcut</label>
            <input
              style={styles.input}
              value={settings.hotkey}
              onChange={(e) => handleChange("hotkey", e.target.value)}
              placeholder="ctrl+F9"
            />
          </div>

          <div style={styles.hotkey}>{settings.hotkey || "ctrl+F9"}</div>
          <div style={styles.hotkeyDesc}>
            Press this anywhere on your system to capture a screenshot.
          </div>

          <div style={styles.divider} />

          <button style={styles.manualBtn} onClick={handleManualScreenshot}>
            Take Screenshot Now
          </button>
        </div>

        {/* Save Button */}
        <div style={{ ...styles.cardFull, padding: "16px 24px" }}>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <button style={styles.btn} onClick={handleSave}>
              {saved ? "Saved" : "Save Settings"}
            </button>
            <span style={{ fontSize: "13px", color: "#888" }}>
              Settings are saved to settings.json and applied immediately.
            </span>
          </div>
        </div>

        {/* Log */}
        <div style={styles.cardFull}>
          <p style={styles.cardTitle}>Recent Screenshots</p>
          {log.length === 0 ? (
            <div style={{ fontSize: "14px", color: "#aaa" }}>
              No screenshots taken yet.
            </div>
          ) : (
            log.map((item, i) => (
              <div key={i} style={styles.logItem}>
                <span style={styles.logFilename}>{item.filename}</span>
                <span style={styles.logTime}>{item.timestamp}</span>
              </div>
            ))
          )}
        </div>
      </div>

      <Toast
        message={toast.message}
        isError={toast.isError}
        visible={toast.visible}
      />
    </div>
  );
}