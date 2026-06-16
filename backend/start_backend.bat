@echo off
echo Installing Python dependencies...
pip install -r requirements.txt
echo.
echo Starting Screenshot Tool Backend...
python app.py
pause
