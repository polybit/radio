#!/bin/sh
npm install
gulp
pip install -r requirements.txt
./runserver.py &
