#!/bin/sh

yarn pbjs -t static-module -w commonjs -I ../nars-common/proto/ -o ./dist/Schema.js ../nars-common/proto/schema.proto
yarn pbts --no-comments -o ./src/Schema.d.ts ./dist/Schema.js
cp ./src/Schema.d.ts ./dist/Schema.d.ts

if [ "$1" == "--watch" ]
then
  yarn watch ./generate_proto.sh ./src/proto
fi
