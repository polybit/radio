# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import json


def success_response(success):
    return json.dumps({'success': success}), 200, {'ContentType': 'application/json'}
