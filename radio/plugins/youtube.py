# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import hashlib
import re

import pafy

YOUTUBE_REGEX = (
    '^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/'
    '(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$'
)
hasher = hashlib.md5()


def match(query):
    return re.match(YOUTUBE_REGEX, query) is not None


def get_track(url):
    video = pafy.new(url)
    best_audio_stream = video.getbestaudio()
    hasher.update(str(url).encode('utf-8'))

    return {
        'id': hashlib.hexdigest(),
        'url': best_audio_stream.url_https,
        'type': 'audio/mp4',
        'duration': video.length,
        'meta': {},
    }
