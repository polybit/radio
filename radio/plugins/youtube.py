# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import re

import pafy

YOUTUBE_REGEX = (
    '^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/'
    '(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$'
)


def match(query):
    return re.match(YOUTUBE_REGEX, query) is not None


def get_track(url):
    video = pafy.new(url)
    best_audio_stream = video.getbestaudio()
    return {
        'url': best_audio_stream.url_https,
        'duration': video.length,
        'meta': {},
    }
