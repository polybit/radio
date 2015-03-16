# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import hashlib
import time

hasher = hashlib.md5()
current_time = lambda: int(round(time.time() * 1000))


class Player(object):
    _version = None
    _track = None
    _start_time = None
    _queue = []

    @property
    def version(self):
        return self._version

    @property
    def track(self):
        self._check_update()
        return self._track

    @track.setter
    def track(self, value):
        self._track = value
        self._start_time = current_time()
        self._update_version()

    @property
    def position(self):
        if self._start_time:
            return current_time() - self._start_time
        else:
            return None

    @position.setter
    def position(self, value):
        self._start_time = current_time() - value
        self._update_version()

    @property
    def queue(self):
        return self._queue

    def queue_track(self, track):
        self._check_update()
        if self.track:
            self._queue.append(track)
        else:
            self.track = track

    def skip_track(self):
        if self._queue:
            self.track = self.queue.pop(0)
        else:
            self.clear()

    def clear(self):
        self._queue = []
        self._track = None
        self._start_time = None
        self._update_version()

    def _check_update(self):
        # If track has ended, play next track from queue or finish
        if self._track is not None and current_time() >= self._start_time + self._track['duration']:
            if self.queue:
                self._track = self.queue.pop(0)
            else:
                self.clear()

    def _update_version(self):
        hasher.update(str(current_time()).encode('utf-8'))
        self._version = hasher.hexdigest()
