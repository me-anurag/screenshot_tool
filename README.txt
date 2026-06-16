SCREENSHOT TOOL
===============
A global hotkey and floating button screenshot tool with a React UI and Python backend.


FOLDER STRUCTURE
----------------
screenshot_tool/
  backend/
    app.py                  Main Python backend (Flask server + hotkey listener)
    floating_button.py      Always-on-top floating capture button (tkinter)
    requirements.txt        Python dependencies
    settings.json           Auto-created on first run, stores your config
    log.json                Auto-created on first run, stores screenshot history
  frontend/
    src/
      App.js                Main React UI
      index.js              React entry point
    public/
      index.html            HTML template
    package.json            Node dependencies


REQUIREMENTS
------------
- Python 3.8 or higher       python.org/downloads
- Node.js 16 or higher       nodejs.org


ONE-TIME SETUP
--------------
1. Install Python dependencies

   Open cmd or terminal as Administrator:
   cd D:\screenshot_tool
   pip install -r backend\requirements.txt

2. Install Node dependencies

   cd D:\screenshot_tool\frontend
   npm install


RUNNING THE TOOL
----------------
Every time you want to use the tool, open two terminals:

Terminal 1 - must be run as Administrator (for global hotkey to work):
   cd D:\screenshot_tool
   python backend\app.py

   You should see:
   Screenshot Tool running at http://localhost:5050
   Hotkey active: ctrl+F9

Terminal 2 - normal terminal, no admin needed:
   cd D:\screenshot_tool
   python backend\floating_button.py

   The floating button appears in the bottom-right corner of your screen.

Terminal 3 - normal terminal, no admin needed:
   cd D:\screenshot_tool\frontend
   npm start

   Browser opens at http://localhost:3000 with the config UI.

Note: npm install only needs to be run once. After that just npm start.


HOW TO USE
----------
1. Open the browser UI at http://localhost:3000
2. Click Browse to select a main folder (e.g. D:\Screenshots)
3. Type a session subfolder name (e.g. math1)
4. Set a filename prefix (e.g. percentage)
5. Set start number and step value
6. Click Save Settings

Now take screenshots in one of two ways:
   - Press Ctrl+F9 anywhere on your system
   - Click the floating button on your screen

Each screenshot is saved as prefix+number.png in your selected folder.
The counter increments automatically after every capture.
You will hear a short beep on every successful capture.


FLOATING BUTTON
---------------
- Appears in the bottom-right corner of the screen
- Always stays on top of all windows
- Click to capture a screenshot
- Drag to move it anywhere on screen
- Turns green on successful capture
- Turns red if backend is not running


CHANGING SETTINGS MID-SESSION
------------------------------
You can change the prefix or counter at any time without restarting.
Just update the values in the UI and click Save Settings.
The next screenshot will use the new settings immediately.

Example:
  You saved percentage1 to percentage5.
  Change prefix to ratio_proportion, set start number to 1, click Save Settings.
  Next screenshot saves as ratio_proportion1.png in the same folder.


COUNTER RESET
-------------
Type a number in the Reset Counter field and click Reset.
The next screenshot will start from that number.


HOTKEY
------
Default hotkey is Ctrl+F9.
To change it, type a new hotkey in the UI (e.g. ctrl+alt+p) and click Save Settings.
The backend registers the new hotkey immediately.

If the hotkey does not work, make sure Terminal 1 is running as Administrator.


FILES SAVED BY THE TOOL
------------------------
settings.json    Stores all your current settings. Located in backend\ folder.
log.json         Stores the last 50 screenshot records. Located in backend\ folder.

To reset all settings, delete settings.json and restart the backend.


TROUBLESHOOTING
---------------
Hotkey not working:
   Make sure Terminal 1 (python backend\app.py) is running as Administrator.
   Close and reopen the terminal with Run as Administrator, then run again.

Floating button not appearing:
   Make sure Terminal 2 (python backend\floating_button.py) is running.
   Also make sure pip install requests was run.

Browser not opening / UI not loading:
   Make sure Terminal 3 (npm start) is running.
   Open http://localhost:3000 manually in your browser.

Settings not saving:
   Click Save Settings after making any change.
   Check that the backend terminal is still running.

Screenshot not saving:
   Make sure main folder and session subfolder are both set in the UI.
   Make sure you clicked Save Settings after setting them.