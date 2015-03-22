#!/bin/bash
set -ev
if [ "$1" == "frontend" ]
then
    echo "Running frontend tests..."
    npm install -g jsxhint
    jsxhint src/js/**/*.js
    npm install
    npm test
else
    echo "Running tox..."
    tox -e $1
fi
