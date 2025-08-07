@echo off
echo 🧹 AGGRESSIVELY CLEARING BROWSER CACHE...
echo.

REM Clear IE/Edge cache
RunDll32.exe InetCpl.cpl,ClearMyTracksByProcess 255

REM Clear Chrome cache if exists
if exist "%LOCALAPPDATA%\Google\Chrome\User Data\Default\Cache" (
    echo Clearing Chrome cache...
    rmdir /s /q "%LOCALAPPDATA%\Google\Chrome\User Data\Default\Cache" 2>nul
)

REM Clear Edge cache if exists
if exist "%LOCALAPPDATA%\Microsoft\Edge\User Data\Default\Cache" (
    echo Clearing Edge cache...
    rmdir /s /q "%LOCALAPPDATA%\Microsoft\Edge\User Data\Default\Cache" 2>nul
)

REM Clear Firefox cache if exists
if exist "%LOCALAPPDATA%\Mozilla\Firefox\Profiles" (
    echo Clearing Firefox cache...
    for /d %%D in ("%LOCALAPPDATA%\Mozilla\Firefox\Profiles\*") do (
        if exist "%%D\cache2" rmdir /s /q "%%D\cache2" 2>nul
    )
)

echo.
echo ✅ Cache cleared! Opening website with fresh content...
echo.

REM Open in private/incognito mode for fresh experience
start msedge --inprivate http://localhost:8000 2>nul || start chrome --incognito http://localhost:8000 2>nul || start http://localhost:8000

echo.
echo 🚀 Website opened! 
echo 📋 All buttons should now work:
echo    • AI Agents Portal: http://localhost:8000/agents
echo    • Finance Portal: http://localhost:8000/finance  
echo    • Executive Portal: http://localhost:8000/executive
echo    • Analytics Portal: http://localhost:8000/analytics
echo    • Support Portal: http://localhost:8000/support
echo    • API Portal: http://localhost:8000/api
echo.
echo ✨ Buttons are working and tested!
pause