# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from flask.ext.testing import TestCase

from radio import app


class BaseTestCase(TestCase):
    """A base test case for flask-tracking."""

    def create_app(self):
        app.config.from_object('config.TestingConfig')
        return app
