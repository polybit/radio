#!/bin/bash
set -ev
if [ "$1" == "frontend" ]
then
    echo "Running frontend tests..."
    npm install -g jsxhint
    jsxhint src/js/**/*.js
    ./install_and_run.sh
    npm test
else
    echo "Running tox..."
    pip install tox
    tox -e $1
fi
