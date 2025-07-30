@echo off
echo Starting TechVista Backend Server...
echo.
call venv\Scripts\activate.bat
echo Virtual environment activated.
echo Starting Flask application...
python app.py
pause 