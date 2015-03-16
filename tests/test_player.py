# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from mock import patch
import unittest

from radio.player import Player


class TestPlayer(unittest.TestCase):

    def setUp(self):
        self.player = Player()
        self.player._queue = []
        self.test_track = {
            'duration': 120000,
            'meta': {},
            'type': 'audio/mp3',
            'url': 'https://example.com/music.mp3',
        }
        self.test_track_2 = {
            'duration': 180000,
            'meta': {},
            'type': 'audio/mp3',
            'url': 'https://example.com/music2.mp3',
        }

    def test_default_state(self):
        self.assertIsNone(self.player.version)
        self.assertIsNone(self.player.track)
        self.assertIsNone(self.player.position)
        self.assertEqual(self.player.queue, [])

    @patch('time.time', lambda: 1000)
    def test_play_track(self):
        # Freeze time
        self.player.track = self.test_track

        self.assertIsNotNone(self.player.version)
        self.assertEqual(self.player.track, self.test_track)
        self.assertEqual(self.player.position, 0)
        self.assertEqual(self.player.queue, [])

    @patch('time.time', lambda: 1000)
    def test_change_track(self):
        # Freeze time
        self.player.track = self.test_track
        first_version = self.player.version

        self.player.track = self.test_track_2

        self.assertNotEqual(self.player.version, first_version)
        self.assertEqual(self.player.track, self.test_track_2)
        self.assertEqual(self.player.position, 0)
        self.assertEqual(self.player.queue, [])

    def test_position(self):
        # Start track at time 1
        with patch('time.time') as time:
            time.return_value = 1
            self.player.track = self.test_track
            self.assertEqual(self.player.position, 0)

        # Advance time by 1s
        with patch('time.time') as time:
            time.return_value = 2
            self.assertEqual(self.player.position, 1000)

    def test_change_position(self):
        # Start track at time 1
        with patch('time.time') as time:
            time.return_value = 1
            self.player.track = self.test_track
            self.assertEqual(self.player.position, 0)

        # Advance time by 1s and set position to 40s
        with patch('time.time') as time:
            time.return_value = 2
            self.assertEqual(self.player.position, 1000)
            self.player.position = 40000
            self.assertEqual(self.player.position, 40000)

        # Advance time by 6s
        with patch('time.time') as time:
            time.return_value = 8
            self.assertEqual(self.player.position, 46000)

    def test_queue_start(self):
        self.player.queue_track(self.test_track)
        self.assertEqual(self.player.track, self.test_track)

    def test_queue(self):
        # Start track at time 0
        with patch('time.time') as time:
            time.return_value = 0
            self.player.track = self.test_track
            self.assertEqual(self.player.queue, [])

        # Queue track at time 2
        with patch('time.time') as time:
            time.return_value = 2
            self.player.queue_track(self.test_track_2)
            self.assertEqual(self.player.track, self.test_track)
            self.assertEqual(self.player.queue, [self.test_track_2])

        # Still in queue at time 10
        with patch('time.time') as time:
            time.return_value = 10
            self.assertEqual(self.player.track, self.test_track)
            self.assertEqual(self.player.queue, [self.test_track_2])

        # After time 120s, next track plays
        with patch('time.time') as time:
            time.return_value = 121
            self.assertEqual(self.player.track, self.test_track_2)
            self.assertEqual(self.player.queue, [])

        # After time 300s, should be back at initial state
        with patch('time.time') as time:
            time.return_value = 301
            self.assertIsNone(self.player.track)
            self.assertEqual(self.player.queue, [])

    def test_skip_track(self):
        # Start track at time 0
        with patch('time.time') as time:
            time.return_value = 0
            self.player.track = self.test_track
            self.assertEqual(self.player.queue, [])

        # Queue track at time 2
        with patch('time.time') as time:
            time.return_value = 2
            self.player.queue_track(self.test_track_2)
            self.assertEqual(self.player.track, self.test_track)
            self.assertEqual(self.player.queue, [self.test_track_2])

        # Still in queue at time 10
        with patch('time.time') as time:
            time.return_value = 10
            self.assertEqual(self.player.track, self.test_track)
            self.assertEqual(self.player.queue, [self.test_track_2])

        # After time 20, skip track
        with patch('time.time') as time:
            time.return_value = 20
            self.player.skip_track()
            self.assertEqual(self.player.track, self.test_track_2)
            self.assertEqual(self.player.queue, [])

    def test_clear(self):
        self.player.track = self.test_track
        self.player.queue_track(self.test_track_2)
        self.player.clear()

        self.assertIsNone(self.player.track)
        self.assertEqual(self.player.queue, [])
