# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import importlib
import json

from radio import app


def get_plugins():
    return [importlib.import_module("radio.plugins.{plugin}".format(plugin=plugin)) for plugin in app.config['PLUGINS']]


def success_response(success):
    return json.dumps({'success': success}), 200, {'ContentType': 'application/json'}
