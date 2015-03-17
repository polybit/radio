# -*- coding: utf-8 -*-
import importlib

from flask import Flask

from radio.player import Player

app = Flask(__name__)
app.config.from_object('config.DevelopmentConfig')
app.player = Player()
app.plugins = [importlib.import_module("radio.plugins.{name}".format(name=name)) for name in app.config['PLUGINS']]

import radio.views  # noqa
import radio.api  # noqa
