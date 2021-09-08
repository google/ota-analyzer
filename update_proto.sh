#!/bin/sh
set -e
curl -L https://android.googlesource.com/platform/system/update_engine/+/refs/heads/master/update_metadata.proto?format=TEXT | base64 -d > update_metadata.proto

npx pbjs -t static-module --es6 -w es6 -o src/services/update_metadata_pb.js update_metadata.proto
