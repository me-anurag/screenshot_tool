import tkinter as tk
import requests
import threading
import sys
import os


API = "http://localhost:5050/api"

BUTTON_SIZE = 54
EDGE_MARGIN = 18
BG_COLOR = "#1a1a1a"
BG_HOVER = "#333333"
BG_FLASH = "#2e7d32"
TEXT_COLOR = "#ffffff"
TEXT_SIZE = 11


class FloatingButton:
    def __init__(self):
        self.root = tk.Tk()
        self.root.title("Screenshot")
        self.root.overrideredirect(True)
        self.root.attributes("-topmost", True)
        self.root.attributes("-alpha", 0.92)
        self.root.configure(bg=BG_COLOR)
        self.root.resizable(False, False)

        self.screen_w = self.root.winfo_screenwidth()
        self.screen_h = self.root.winfo_screenheight()

        start_x = self.screen_w - BUTTON_SIZE - EDGE_MARGIN
        start_y = self.screen_h - BUTTON_SIZE - EDGE_MARGIN - 48
        self.root.geometry(f"{BUTTON_SIZE}x{BUTTON_SIZE}+{start_x}+{start_y}")

        self.canvas = tk.Canvas(
            self.root,
            width=BUTTON_SIZE,
            height=BUTTON_SIZE,
            bg=BG_COLOR,
            highlightthickness=0,
            cursor="hand2",
        )
        self.canvas.pack()

        self.circle = self.canvas.create_oval(
            4, 4, BUTTON_SIZE - 4, BUTTON_SIZE - 4,
            fill=BG_COLOR,
            outline="#444444",
            width=1,
        )
        self.label = self.canvas.create_text(
            BUTTON_SIZE // 2,
            BUTTON_SIZE // 2 - 2,
            text="CAP",
            fill=TEXT_COLOR,
            font=("Arial", TEXT_SIZE, "bold"),
        )
        self.sublabel = self.canvas.create_text(
            BUTTON_SIZE // 2,
            BUTTON_SIZE // 2 + 10,
            text="TURE",
            fill=TEXT_COLOR,
            font=("Arial", 7, "normal"),
        )

        self._drag_x = 0
        self._drag_y = 0

        self.canvas.bind("<ButtonPress-1>", self.on_press)
        self.canvas.bind("<B1-Motion>", self.on_drag)
        self.canvas.bind("<ButtonRelease-1>", self.on_release)
        self.canvas.bind("<Enter>", self.on_enter)
        self.canvas.bind("<Leave>", self.on_leave)

        self._dragged = False

    def on_enter(self, event):
        self.canvas.itemconfig(self.circle, fill=BG_HOVER)

    def on_leave(self, event):
        self.canvas.itemconfig(self.circle, fill=BG_COLOR)

    def on_press(self, event):
        self._drag_x = event.x_root
        self._drag_y = event.y_root
        self._dragged = False

    def on_drag(self, event):
        dx = event.x_root - self._drag_x
        dy = event.y_root - self._drag_y
        if abs(dx) > 3 or abs(dy) > 3:
            self._dragged = True
        x = self.root.winfo_x() + dx
        y = self.root.winfo_y() + dy
        self.root.geometry(f"+{x}+{y}")
        self._drag_x = event.x_root
        self._drag_y = event.y_root

    def on_release(self, event):
        if not self._dragged:
            self.trigger_screenshot()

    def trigger_screenshot(self):
        threading.Thread(target=self._do_capture, daemon=True).start()

    def _do_capture(self):
        try:
            requests.post(f"{API}/screenshot", timeout=4)
            self.root.after(0, self.flash_success)
        except Exception:
            self.root.after(0, self.flash_error)

    def flash_success(self):
        self.canvas.itemconfig(self.circle, fill=BG_FLASH)
        self.root.after(350, lambda: self.canvas.itemconfig(self.circle, fill=BG_COLOR))

    def flash_error(self):
        self.canvas.itemconfig(self.circle, fill="#c62828")
        self.root.after(600, lambda: self.canvas.itemconfig(self.circle, fill=BG_COLOR))

    def run(self):
        self.root.mainloop()


if __name__ == "__main__":
    btn = FloatingButton()
    btn.run()