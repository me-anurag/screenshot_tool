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