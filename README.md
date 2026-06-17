<div align="center">
  <img src="banner.svg" alt="Screenshot Tool Banner" width="100%" />
</div>

<br/>

<div align="center">

![Python](https://img.shields.io/badge/Python-3.8+-3776AB?style=flat-square&logo=python&logoColor=white)
![React](https://img.shields.io/badge/React-16+-61DAFB?style=flat-square&logo=react&logoColor=black)
![Flask](https://img.shields.io/badge/Flask-2.x-000000?style=flat-square&logo=flask&logoColor=white)
![Platform](https://img.shields.io/badge/Platform-Windows-0078D4?style=flat-square&logo=windows&logoColor=white)

**A global hotkey and floating button screenshot tool with a React UI and Python backend.**

</div>

---

## Folder Structure

```
screenshot_tool/
├── backend/
│   ├── app.py                  # Main Python backend (Flask server + hotkey listener)
│   ├── floating_button.py      # Always-on-top floating capture button (tkinter)
│   ├── requirements.txt        # Python dependencies
│   ├── settings.json           # Auto-created on first run — stores your config
│   └── log.json                # Auto-created on first run — stores screenshot history
└── frontend/
    ├── src/
    │   ├── App.js              # Main React UI
    │   └── index.js            # React entry point
    ├── public/
    │   └── index.html          # HTML template
    └── package.json            # Node dependencies
```

---

## Requirements

| Dependency | Version | Download |
|------------|---------|----------|
| Python | 3.8 or higher | [python.org/downloads](https://python.org/downloads) |
| Node.js | 16 or higher | [nodejs.org](https://nodejs.org) |

---

## One-Time Setup

**1. Install Python dependencies**

Open cmd or terminal **as Administrator**:

```bash
cd D:\screenshot_tool
pip install -r backend\requirements.txt
```

**2. Install Node dependencies**

```bash
cd D:\screenshot_tool\frontend
npm install
```

---

## Running the Tool

Open **three terminals** every time you want to use the tool:

**Terminal 1 — run as Administrator** *(required for global hotkey)*

```bash
cd D:\screenshot_tool
python backend\app.py
```

Expected output:
```
Screenshot Tool running at http://localhost:5050
Hotkey active: ctrl+F9
```

**Terminal 2 — normal terminal**

```bash
cd D:\screenshot_tool
python backend\floating_button.py
```

The floating button appears in the bottom-right corner of your screen.

**Terminal 3 — normal terminal**

```bash
cd D:\screenshot_tool\frontend
npm start
```

Browser opens at `http://localhost:3000` with the config UI.

> `npm install` only needs to be run once. After that, just use `npm start`.

---

## How to Use

1. Open the browser UI at `http://localhost:3000`
2. Click **Browse** to select a main folder *(e.g. `D:\Screenshots`)*
3. Type a **session subfolder** name *(e.g. `math1`)*
4. Set a **filename prefix** *(e.g. `percentage`)*
5. Set **start number** and **step value**
6. Click **Save Settings**

Then take screenshots using either method:

| Method | Action |
|--------|--------|
| Keyboard | Press `Ctrl+F9` anywhere on your system |
| Mouse | Click the floating button on your screen |

Each screenshot saves as `prefix+number.png` in your selected folder. The counter increments automatically, and you'll hear a short beep on every successful capture.

---

## Floating Button

- Appears in the **bottom-right corner** of the screen
- Always stays **on top** of all windows
- **Click** to capture a screenshot
- **Drag** to move it anywhere on screen
- Turns **green** on successful capture
- Turns **red** if the backend is not running

---

## Changing Settings Mid-Session

You can change the prefix or counter at any time without restarting — just update the values in the UI and click **Save Settings**. The next screenshot will use the new settings immediately.

**Example:**
You saved `percentage1` through `percentage5`. Change prefix to `ratio_proportion`, set start number to `1`, click **Save Settings**. The next screenshot saves as `ratio_proportion1.png` in the same folder.

---

## Counter Reset

Type a number in the **Reset Counter** field and click **Reset**. The next screenshot will start from that number.

---

## Hotkey

Default hotkey is `Ctrl+F9`. To change it, type a new hotkey in the UI *(e.g. `ctrl+alt+p`)* and click **Save Settings** — the backend registers it immediately.

> If the hotkey does not work, make sure Terminal 1 is running as Administrator.

---

## Saved Files

| File | Location | Contents |
|------|----------|----------|
| `settings.json` | `backend\` | All your current settings |
| `log.json` | `backend\` | Last 50 screenshot records |

To reset all settings, delete `settings.json` and restart the backend.

---

## Troubleshooting

<details>
<summary><strong>Hotkey not working</strong></summary>

Make sure Terminal 1 (`python backend\app.py`) is running as Administrator. Close and reopen the terminal with **Run as Administrator**, then run again.
</details>

<details>
<summary><strong>Floating button not appearing</strong></summary>

Make sure Terminal 2 (`python backend\floating_button.py`) is running. Also make sure `pip install requests` was run.
</details>

<details>
<summary><strong>Browser not opening / UI not loading</strong></summary>

Make sure Terminal 3 (`npm start`) is running. Open `http://localhost:3000` manually in your browser.
</details>

<details>
<summary><strong>Settings not saving</strong></summary>

Click **Save Settings** after making any change. Check that the backend terminal is still running.
</details>

<details>
<summary><strong>Screenshot not saving</strong></summary>

Make sure both the main folder and session subfolder are set in the UI, and that you clicked **Save Settings** after setting them.
</details>
