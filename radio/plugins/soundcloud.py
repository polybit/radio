# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from __future__ import absolute_import

import hashlib
import re

import soundcloud

from radio.track import SoundcloudTrack

SOUNDCLOUD_REGEX = '^https?:\/\/(soundcloud.com|snd.sc)\/(.*)$'
SOUNDCLOUD_CLIENT_ID = 'c40a9fb5016356c467bcde0f19e38c55'
client = soundcloud.Client(client_id=SOUNDCLOUD_CLIENT_ID)
hasher = hashlib.md5()


def match(query):
    return re.match(SOUNDCLOUD_REGEX, query) is not None


def get_stream_url(url):
    track = client.get('/resolve', url=url)
    return client.get(track.stream_url, allow_redirects=False).location


def get_track(url):
    track = client.get('/resolve', url=url)
    return SoundcloudTrack(url=url, track=track)
