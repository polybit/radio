# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from radio import app


@app.route('/')
def home():
    return app.send_static_file('index.html')
