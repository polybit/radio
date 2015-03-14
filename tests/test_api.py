# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from tests.test_base import BaseTestCase


class ApiTest(BaseTestCase):

    def test_default_state(self):
        # Status should initially be None
        status = self.client.get("/api/status")
        self.assertEquals(status.json, {})

    def test_play_invalid_query(self):
        # Invalid query string
        response = self.client.post(
            "/api/play",
            data={'query': 'example.com'},
        )
        self.assertEquals(
            response.json,
            {'success': False},
        )

        # Status should still be None
        status = self.client.get("/api/status")
        self.assertEquals(status.json, {})

    def test_play_youtube_query(self):
        # Valid YouTube query
        response = self.client.post(
            "/api/play",
            data={'query': 'https://www.youtube.com/watch?v=L0MK7qz13bU'},
        )
        self.assertEquals(
            response.json,
            {'success': True},
        )

        # Status should be playing track
        status = self.client.get("/api/status")
        assert status.json['url'] is not None
        self.assertGreaterEqual(status.json['position'], 0.0)
        assert status.json['version'] is not None

    def test_seek(self):
        # Seek position to 40s
        response = self.client.post(
            "/api/seek",
            data={'position': 40.0},
        )
        self.assertEquals(
            response.json,
            {'success': True},
        )

        # Check position has changed
        status = self.client.get("/api/status")
        self.assertGreaterEqual(status.json['position'], 40.0)
