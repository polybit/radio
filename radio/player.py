# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import hashlib
import time


class Track(object):
    url = None
    duration = None

    def __init__(self, url, duration):
        self.url = url
        self.duration = duration

    def get_url(self):
        return self.url


class Player(object):
    track = None
    start_time = None
    version = None

    def get_position(self):
        if self.start_time:
            return time.time() - self.start_time
        else:
            return None

    def get_version(self):
        return self.version

    def play(self, url, duration=None):
        self.track = Track(url, duration)
        self.start_time = time.time()
        self.version = hashlib.md5().hexdigest()

    def seek(self, position):
        self.start_time = time.time() - position
        self.version = hashlib.md5().hexdigest()
