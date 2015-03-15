# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from flask import url_for

from tests.base import BaseTestCase


class ViewsTest(BaseTestCase):

    def test_home_view(self):
        assert self.client.get(url_for('home'))
