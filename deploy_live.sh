#!/usr/bin/env bash

echo "\e[33mBuilding /dist folder";
npm run build;
echo "\e[32mBuilt";

gcloud config set project cryptokaiju-39233;

echo "\e[33mSwitching account to cryptokaiju-live - make sure you have access!"
gcloud config configurations activate cryptokaiju-live;

echo "\e[33mBuilding img to deploy"
gcloud builds submit --tag gcr.io/cryptokaiju-39233/dapp;

echo "\e[32mImage built - you can now manually redeploy the app"
