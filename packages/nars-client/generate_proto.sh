set -e

PROTOC_GEN_TS_PATH="./node_modules/.bin/protoc-gen-ts"
OUT_DIR="./dist"

protoc \
    --plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" \
    --js_out="import_style=commonjs,binary:./dist" \
    --ts_out="./src" \
    -I ../nars-common/proto/ \
    struct.proto nars_animated.proto schema.proto

mkdir -p $OUT_DIR

cp ./src/*_pb.d.ts $OUT_DIR
