@echo off
cd /d "C:\Users\Jorge\Desktop\marbleworldinventory"
git config --global user.name "Jorgegzze"
git config --global user.email "jge@marbleworld.com"

git add .
git commit -m "Auto commit"
git pull origin main --rebase

git push
pause