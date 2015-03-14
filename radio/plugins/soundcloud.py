# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from __future__ import absolute_import

import re

import soundcloud

SOUNDCLOUD_REGEX = '^https?:\/\/(soundcloud.com|snd.sc)\/(.*)$'
SOUNDCLOUD_CLIENT_ID = 'c40a9fb5016356c467bcde0f19e38c55'
client = soundcloud.Client(client_id=SOUNDCLOUD_CLIENT_ID)


def match(query):
    return re.match(SOUNDCLOUD_REGEX, query) is not None


def get_url(url):
    track = client.get('/resolve', url=url)
    return client.get(track.stream_url, allow_redirects=False).location
