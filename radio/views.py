# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from flask import render_template

from radio import app


@app.route('/')
def home():
    return render_template('index.html')
