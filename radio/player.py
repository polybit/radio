# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import sched
import time
from six.moves import queue

from radio.events import Event


scheduler = sched.scheduler(time.time, time.sleep)


class EventQueue(object):
    _event_queue = None

    def __init__(self):
        self._event_queue = queue.Queue()

    def send_event(self, *args, **kwargs):
        self._event_queue.put(Event(**kwargs))

    def stream(self):
        while True:
            event = self._event_queue.get()
            yield event.repr()


class SingleTimer(object):
    _action = None
    _event = None

    def __init__(self, action):
        self._action = action

    def clear(self):
        if self._event:
            scheduler.cancel(self._event)

    def schedule(self, delay):
        self.clear()
        self._event = scheduler.enter(delay, 1, self._action, ())

    def time(self):
        return self._event.time


class Player(object):
    def __init__(self):
        self._track = None
        self._volume = 50
        self._paused_position = None
        self._queue = []

        self.event_queue = EventQueue()
        self.timer = SingleTimer(self.next_track)

    @property
    def track(self):
        return self._track

    @track.setter
    def track(self, track):
        self._track = track
        self.timer.schedule(self.track.duration)
        self.event_queue.send_event(track=self.track, position=self.position)

    @property
    def position(self):
        if self.track:
            if self._paused_position:
                return self._paused_position
            else:
                return self.timer.time() - time.time()

    @position.setter
    def position(self, position):
        self.timer.schedule(self.track.duration - position)
        self.event_queue.send_event(position=self.position)

    @property
    def queue(self):
        return self._queue

    @queue.setter
    def queue(self, queue):
        self._queue = queue
        self.event_queue.send_event(queue=self.queue)

    @property
    def paused(self):
        return self._paused_position is not None

    @paused.setter
    def toggle_pause(self):
        if self.paused:
            self.timer.schedule(self.track.duration - self._paused_position)
            self._paused_position = None
            self.event_queue.send_event(paused=False, position=self.position)
        else:
            self.timer.clear()
            self._paused_position = self.position
            self.event_queue.send_event(paused=True, position=self.position)

    @property
    def volume(self):
        return self._volume

    @volume.setter
    def volume(self, volume):
        volume = max(0, min(100, volume))
        self._volume = volume
        self.event_queue.send_event(volume=volume)

    def queue_track(self, track):
        if self.track:
            self._queue.append(track)
            self.event_queue.send_event(queue=queue)
        else:
            self.track = track

    def next_track(self):
        if self._queue:
            self.track = self.queue.pop(0)
        else:
            self.clear()

    def clear(self):
        self._queue = []
        self._track = None
        self._paused_position = None
        self.event_queue.send_event(track=None, queue=queue)
