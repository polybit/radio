#!/bin/bash
set -e
if [ "$1" == "frontend" ]
then
    echo "Running frontend tests..."
    npm install -g jsxhint
    jsxhint src/js/**/*.js
    ./install_and_run.sh
    npm test
elif [ "$1" == "jscs" ]
then
    echo "Running jscs linter..."
    npm install -g jscs
    jscs src/js/modules/ src/js/*.js*
else
    echo "Running tox..."
    pip install tox
    tox -e $1
fi
