# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import hashlib
import time


class Player(object):
    uri = None
    start_time = None
    version = None

    def get_uri(self):
        return self.uri

    def get_position(self):
        if self.start_time:
            return time.time() - self.start_time
        else:
            return None

    def get_version(self):
        return self.version

    def play(self, uri):
        self.uri = uri
        self.start_time = time.time()
        self.version = hashlib.md5().hexdigest()

    def seek(self, position):
        self.start_time = time.time() - position
        self.version = hashlib.md5().hexdigest()
