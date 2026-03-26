#!/bin/bash
export PATH="/Users/danielvondrachenfels/.fnm/node-versions/v24.14.0/installation/bin:$PATH"
cd "$(dirname "$0")"
npx next dev
