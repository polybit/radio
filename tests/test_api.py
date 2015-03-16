# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from tests.base import BaseTestCase


class ApiTest(BaseTestCase):

    def test_default_state(self):
        # Status should initially be None
        status = self.client.get("/api/player")
        self.assertEquals(
            status.json,
            {
                "position": None,
                "track": None,
                "version": None,
            }
        )

    def test_queue_invalid_query(self):
        # Invalid query string
        response = self.client.post(
            "/api/queue",
            data={'query': 'example.com'},
        )
        self.assertEquals(
            response.json,
            {'success': False},
        )

        # Status should still be None
        status = self.client.get("/api/player")
        self.assertEquals(
            status.json,
            {
                "position": None,
                "track": None,
                "version": None,
            }
        )

    def test_queue_youtube_query(self):
        # Valid YouTube query
        response = self.client.post(
            "/api/queue",
            data={'query': 'https://soundcloud.com/alt-j/something-good-alt-j'},
        )
        self.assertEquals(
            response.json,
            {'success': True},
        )

        # Status should be playing track
        status = self.client.get("/api/player")
        assert status.json['track']['url'] is not None
        self.assertGreaterEqual(status.json['position'], 0)
        assert status.json['version'] is not None
