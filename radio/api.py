# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from flask import jsonify, request

from radio import app
from radio.helpers import get_plugins, success_response


@app.route('/api/status')
def status():
    if app.player.track is not None:
        status = {
            'track': app.player.get_track(),
            'position': app.player.get_position(),
            'version': app.player.get_version(),
        }
        return jsonify(status)
    else:
        return jsonify({})


@app.route('/api/play', methods=['POST'])
def play():
    query = request.form['query']
    for plugin in get_plugins():
        if plugin.match(query):
            track = plugin.get_track(query)
            app.player.play(track)
            return success_response(True)
    return success_response(False)


@app.route('/api/queue', methods=['POST'])
def queue():
    query = request.form['query']
    for plugin in get_plugins():
        if plugin.match(query):
            track = plugin.get_track(query)
            app.player.queue_track(track)
            return success_response(True)
    return success_response(False)


@app.route('/api/seek', methods=['POST'])
def seek():
    position = float(request.form['position'])
    app.player.seek(position)
    return success_response(True)
