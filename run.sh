#!/bin/bash

# Uruchom dfx start w tle
dfx start &

# Zaczekaj chwilę, aby upewnić się, że dfx start zdąży się zainicjalizować
sleep 5

# Wykonaj make deploy-all
make deploy-all

# Przejdź do katalogu ./packages/frontend i uruchom npm run dev
cd ./packages/frontend || exit
npm run dev
