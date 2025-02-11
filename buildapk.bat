@echo off

ionic build
ionic capacitor sync android
cd android
gradlew clean
gradlew assembleDebug