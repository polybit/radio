# -*- coding: utf-8 -*-
from flask import url_for

from tests.test_base import BaseTestCase


class ViewsTest(BaseTestCase):

    def test_home_view(self):
        assert self.client.get(url_for('home'))
