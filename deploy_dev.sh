#!/usr/bin/env bash

echo "\e[33mBuilding dist folder";
npm run build;
echo "\e[32mBuilt";

gcloud config set project cryptokaiju-beta;

echo "\e[33mSwitching account to cryptokaiju-beta - make sure you have access!"
gcloud config configurations activate cryptokaiju-beta;

echo "\e[33mBuilding img to deploy"
gcloud builds submit --tag gcr.io/cryptokaiju-beta/dapp;

echo "\e[32mImage built - you can now manually redeploy the app"
