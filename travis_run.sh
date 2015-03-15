#!/bin/bash
set -ev
if [ "$1" == "frontend" ]
then
    echo "Running frontend tests..."
    # None for now.
else
    echo "Running tox..."
    tox -e $1
fi
