# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import hashlib


hasher = hashlib.md5()


class Track(object):

    def __init__(
        self,
        plugin,
        audio_type,
        url,
        duration,
        title,
        artist,
        link,
        artwork_url,
    ):
        self.id = hasher.update(str(url).encode('utf-8'))
        self.plugin = plugin
        self.audio_type = audio_type
        self.url = url
        self.duration = duration
        self.title = title
        self.artist = artist
        self.link = link


class SoundcloudTrack(Track):

    def __init__(self, url, track):
        super(SoundcloudTrack, self).__init__(
            plugin='soundcloud',
            audio_type='audio/mp3',
            url=url,
            duration=track.duration,
            title=track.title,
            artist=track.user['username'],
            link=track.permalink_url,
            artwork_url=track.artwork_url if track.artwork_url else track.user['avatar_url'],
        )
