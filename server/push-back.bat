@echo off
cd /d "C:\Users\Jorge\Desktop\marbleworldinventory\server"
git add .
git commit -m "Auto commit"
git pull origin main --rebase
git push
pause