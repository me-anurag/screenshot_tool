import os
import sys
import json
import threading
import webbrowser
from datetime import datetime
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import keyboard
from PIL import ImageGrab

try:
    import winsound
    SOUND_AVAILABLE = True
except ImportError:
    SOUND_AVAILABLE = False


def get_base_dir():
    if getattr(sys, "frozen", False):
        return os.path.dirname(sys.executable)
    return os.path.dirname(os.path.abspath(__file__))


def get_static_dir():
    if getattr(sys, "frozen", False):
        return os.path.join(sys._MEIPASS, "web")
    return os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "frontend", "build")


BASE_DIR = get_base_dir()
STATIC_DIR = get_static_dir()
SETTINGS_FILE = os.path.join(BASE_DIR, "settings.json")
LOG_FILE = os.path.join(BASE_DIR, "log.json")

app = Flask(__name__, static_folder=STATIC_DIR, static_url_path="")
CORS(app)

DEFAULT_SETTINGS = {
    "main_folder": "",
    "session_folder": "",
    "prefix": "screenshot",
    "start_number": 1,
    "step": 1,
    "current_number": 1,
    "hotkey": "ctrl+F9"
}

hotkey_registered = False
last_status = {"message": "", "filename": "", "timestamp": ""}


def load_settings():
    if os.path.exists(SETTINGS_FILE):
        with open(SETTINGS_FILE, "r") as f:
            data = json.load(f)
            return {**DEFAULT_SETTINGS, **data}
    return DEFAULT_SETTINGS.copy()


def save_settings(settings):
    with open(SETTINGS_FILE, "w") as f:
        json.dump(settings, f, indent=2)


def load_log():
    if os.path.exists(LOG_FILE):
        with open(LOG_FILE, "r") as f:
            return json.load(f)
    return []


def save_log(log):
    with open(LOG_FILE, "w") as f:
        json.dump(log[-50:], f, indent=2)


def get_save_path(settings):
    main = settings.get("main_folder", "")
    session = settings.get("session_folder", "")
    if not main:
        return None, "Main folder not set"
    if not session:
        return None, "Session folder not set"
    folder = os.path.join(main, session)
    os.makedirs(folder, exist_ok=True)
    num = settings.get("current_number", 1)
    prefix = settings.get("prefix", "screenshot")
    filename = f"{prefix}{num}.png"
    full_path = os.path.join(folder, filename)
    return full_path, filename


def take_screenshot():
    print(f"Hotkey fired at {datetime.now().strftime('%H:%M:%S')}", flush=True)
    global last_status
    settings = load_settings()
    full_path, result = get_save_path(settings)
    if full_path is None:
        last_status = {
            "message": f"Error: {result}",
            "filename": "",
            "timestamp": datetime.now().strftime("%H:%M:%S")
        }
        return
    try:
        img = ImageGrab.grab()
        img.save(full_path)
        filename = result
        last_status = {
            "message": f"Saved: {filename}",
            "filename": filename,
            "timestamp": datetime.now().strftime("%H:%M:%S")
        }
        log = load_log()
        log.append({
            "filename": filename,
            "path": full_path,
            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        })
        save_log(log)
        if SOUND_AVAILABLE:
            threading.Thread(target=lambda: winsound.Beep(1000, 120), daemon=True).start()
        step = settings.get("step", 1)
        settings["current_number"] = settings.get("current_number", 1) + step
        save_settings(settings)
    except Exception as e:
        last_status = {
            "message": f"Error: {str(e)}",
            "filename": "",
            "timestamp": datetime.now().strftime("%H:%M:%S")
        }


def register_hotkey(hotkey):
    global hotkey_registered
    try:
        keyboard.unhook_all_hotkeys()
        keyboard.add_hotkey(hotkey, take_screenshot)
        hotkey_registered = True
        return True
    except Exception:
        hotkey_registered = False
        return False


@app.route("/")
def serve_ui():
    return send_from_directory(STATIC_DIR, "index.html")


@app.route("/api/settings", methods=["GET"])
def get_settings():
    return jsonify(load_settings())


@app.route("/api/settings", methods=["POST"])
def update_settings():
    data = request.json
    settings = load_settings()
    settings.update(data)
    save_settings(settings)
    hotkey = settings.get("hotkey", "ctrl+F9")
    register_hotkey(hotkey)
    return jsonify({"success": True, "settings": settings})


@app.route("/api/status", methods=["GET"])
def get_status():
    return jsonify({"last": last_status, "hotkey_active": hotkey_registered})


@app.route("/api/log", methods=["GET"])
def get_log():
    log = load_log()
    return jsonify(list(reversed(log[-10:])))


@app.route("/api/screenshot", methods=["POST"])
def manual_screenshot():
    take_screenshot()
    return jsonify({"success": True, "status": last_status})


@app.route("/api/reset-counter", methods=["POST"])
def reset_counter():
    data = request.json or {}
    settings = load_settings()
    settings["current_number"] = data.get("value", settings.get("start_number", 1))
    save_settings(settings)
    return jsonify({"success": True, "current_number": settings["current_number"]})


@app.route("/api/preview", methods=["GET"])
def preview():
    settings = load_settings()
    main = settings.get("main_folder", "")
    session = settings.get("session_folder", "")
    prefix = settings.get("prefix", "screenshot")
    num = settings.get("current_number", 1)
    filename = f"{prefix}{num}.png"
    path_preview = os.path.join(main, session, filename) if main and session else filename
    return jsonify({"filename": filename, "path": path_preview})


@app.route("/api/browse", methods=["POST"])
def browse_folder():
    import tkinter as tk
    from tkinter import filedialog
    root = tk.Tk()
    root.withdraw()
    root.attributes("-topmost", True)
    folder = filedialog.askdirectory(title="Select Main Folder")
    root.destroy()
    return jsonify({"folder": folder or ""})


if __name__ == "__main__":
    settings = load_settings()
    hotkey = settings.get("hotkey", "ctrl+F9")
    register_hotkey(hotkey)
    print(f"Screenshot Tool running at http://localhost:5050", flush=True)
    print(f"Hotkey active: {hotkey}", flush=True)
    threading.Timer(1.5, lambda: webbrowser.open("http://localhost:5050")).start()
    app.run(port=5050, debug=False, threaded=True, use_reloader=False)