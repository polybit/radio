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
    _paused_time = None
    _volume = 50

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
        if self._start_time is not None:
            if self._paused_time is not None:
                return self._paused_time - self._start_time
            else:
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

    @queue.setter
    def queue(self, value):
        self._queue = value

    @property
    def paused(self):
        return self._paused_time is not None

    @paused.setter
    def paused(self, value):
        if value is True and not self.paused:
            self._paused_time = current_time()
            self._update_version()
        elif value is False and self.paused:
            self._start_time = current_time() - self.position
            self._paused_time = None
            self._update_version()

    @property
    def volume(self):
        return self._volume

    @volume.setter
    def volume(self, value):
        if value >= 0 and value <= 100:
            self._volume = value
            self._update_version()
        else:
            raise ValueError("Volume must be set between 0 and 100")

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
        self._paused_time = None
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
