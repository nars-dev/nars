#!/bin/sh

yarn pbjs -t static-module -w commonjs -o ./dist/Schema.js ./src/proto/schema.proto
yarn pbts --no-comments -o ./src/Schema.d.ts ./dist/Schema.js
cp ./src/Schema.d.ts ./dist/Schema.d.ts

if [[ $1 == "--watch" ]]; then
  yarn watch ./generate_proto.sh ./src/proto
fi
