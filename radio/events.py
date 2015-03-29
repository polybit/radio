# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import json


class Event(object):

    def __init__(self, *args, **kwargs):
        self.name = kwargs.pop('name', 'event')
        self.data = kwargs

    def repr(self):
        return 'event: {event}\ndata: {data}\n\n'.format(
            event=self.name,
            data=json.dumps(self.data),
        )
