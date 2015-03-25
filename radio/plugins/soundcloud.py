# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from __future__ import absolute_import

import hashlib
import re

import soundcloud

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
    artwork_url = track.artwork_url if track.artwork_url else track.user['avatar_url']
    hasher.update(str(url).encode('utf-8'))

    return {
        'id': hasher.hexdigest(),
        'type': 'audio/mp3',
        'plugin': 'soundcloud',
        'url': url,
        'duration': track.duration,
        'meta': {
            'title': track.title,
            'artist': track.user['username'],
            'link': track.permalink_url,
            'artwork': artwork_url,
        },
    }
