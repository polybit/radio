#!/bin/bash
set -e
if [ "$1" == "frontend" ]
then
    echo "Running frontend tests..."
    ./install_and_run.sh
    npm test
elif [ "$1" == "jscs" ]
then
    echo "Running jscs linter..."
    npm install jscs
    npm run-script jscs
else
    echo "Running tox..."
    pip install tox
    tox -e $1
fi
