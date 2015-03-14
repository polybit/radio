# -*- coding: utf-8 -*-
from flask import Flask

from radio.player import Player

app = Flask(__name__)
app.config.from_object('config.DevelopmentConfig')
app.player = Player()

import radio.views  # noqa
import radio.api  # noqa
