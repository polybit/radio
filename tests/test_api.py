# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from flask import jsonify

from tests.base import BaseTestCase
from radio import api, app


class ApiTest(BaseTestCase):

    def setUp(self):
        self.app.player.clear()

    def test_default_state(self):
        state = self.client.get("/api/player")
        self.assertIsNone(state.json['track'])

    def test_invalid_query(self):
        track = api.query("https://example.com")
        self.assertIsNone(track)

    def test_get_queue(self):
        response = self.client.get("/api/queue")
        self.assertEquals(response.json, {'queue': []})

        response = self.client.post(
            "/api/queue",
            data={'query': 'https://soundcloud.com/alt-j/something-good-alt-j'},
        )

        response = self.client.post(
            "/api/queue",
            data={'query': 'https://soundcloud.com/alt-j/something-good-alt-j'},
        )

        response = self.client.get("/api/queue")
        self.assertIsNotNone(response.json['queue'])

    def test_invalid_query_request(self):
        response = self.client.post(
            "/api/queue",
            data={'query': 'example.com'},
        )
        self.assertEquals(response.json, {'success': False})

        state = self.client.get("/api/player")
        self.assertIsNone(state.json['track'])

    def test_success_query(self):
        response = self.client.post(
            "/api/queue",
            data={'query': 'https://soundcloud.com/alt-j/something-good-alt-j'},
        )
        self.assertEquals(response.json, {'success': True})

        # Status should be playing track
        state = self.client.get("/api/player")
        self.assertIsNotNone(state.json['track']['url'])
        self.assertGreaterEqual(state.json['position'], 0)
        self.assertIsNotNone(state.json['version'])

    # def test_put_queue(self):
    #     data = {
    #         'queue': [
    #             {
    #                 'duration': 120000,
    #                 'meta': {},
    #                 'type': 'audio/mp3',
    #                 'url': 'https://example.com/music.mp3',
    #             }, {
    #                 'duration': 120000,
    #                 'meta': {},
    #                 'type': 'audio/mp3',
    #                 'url': 'https://example.com/music.mp3',
    #             }
    #         ]
    #     }
    #     response = self.client.put("/api/queue", data=data)
    #     self.assertEquals(response.json, {'success': True})

    #     response = self.client.get("/api/queue")
    #     self.assertEquals(response.json, {'queue': queue})

    def test_get_track(self):
        response = self.client.get("/api/player/track")
        self.assertEquals(response.json, {})

        response = self.client.post(
            "/api/queue",
            data={'query': 'https://soundcloud.com/alt-j/something-good-alt-j'},
        )
        self.assertEquals(response.json, {'success': True})

        response = self.client.get("/api/player/track")
        self.assertNotEquals(response.json, {})

    def test_change_track(self):
        response = self.client.put(
            "/api/player/track",
            data={'query': 'https://soundcloud.com/alt-j/something-good-alt-j'},
        )
        self.assertEquals(response.json, {'success': True})

        # Should be playing track
        state = self.client.get("/api/player")
        self.assertIsNotNone(state.json['track']['url'])
        self.assertGreaterEqual(state.json['position'], 0)
        self.assertIsNotNone(state.json['version'])

    def test_skip_track(self):
        response = self.client.post(
            "/api/player/track",
            data={'query': 'https://soundcloud.com/alt-j/something-good-alt-j'},
        )
        self.assertEquals(response.json, {'success': True})

        # Skip track
        response = self.client.post("/api/player/track")
        self.assertEquals(response.json, {'success': True})

        # State should be back to no track playing
        state = self.client.get("/api/player")
        self.assertIsNone(state.json['track'])
