#!/bin/bash

echo "Generate client"

rm -rf src/generated

../../node_modules/.bin/openapi-generator-cli generate \
  -i ../../swagger.json  \
  -g typescript-axios \
  -o src/generated \
  --config codegen.config.json \
  --type-mappings=DateTime=Date

