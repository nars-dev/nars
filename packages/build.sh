#!/bin/sh


set -e

CURRENT_DIR=$(pwd)
cd nars-common
yarn
./generate_proto.sh
yarn build
cd ../nars
yarn
yarn build
cd ../nars-client
yarn build
cd "$CURRENT_DIR" 
