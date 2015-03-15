# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import hashlib
import time


class Player(object):
    track = None
    start_time = None
    version = None
    queue = []
    hasher = None

    def __init__(self):
        self.hasher = hashlib.md5()

    def get_track(self):
        self.check_current_track()
        return self.track

    def get_position(self):
        if self.start_time:
            return time.time() - self.start_time
        else:
            return None

    def get_version(self):
        return self.version

    def play(self, track):
        self.track = track
        self.start_time = time.time()
        self.hasher.update(str(self.start_time).encode('utf-8'))
        self.version = self.hasher.hexdigest()

    def skip(self):
        if self.queue:
            self.play(self.queue.pop(0))
        else:
            self.track = None
            self.start_time = None

    def seek(self, position):
        self.start_time = time.time() - position
        self.hasher.update(str(self.start_time).encode('utf-8'))
        self.version = self.hasher.hexdigest()

    def queue_track(self, track):
        self.check_current_track()
        if self.track:
            self.queue.append(track)
        else:
            self.play(track)

    def check_current_track(self):
        if self.track is not None and time.time() >= self.start_time + self.track['duration']:
            if self.queue:
                self.play(self.queue.pop(0))
            else:
                self.track = None
                self.start_time = None
