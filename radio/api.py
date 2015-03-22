# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import json

from flask import jsonify, request

from radio import app
from radio.helpers import success_response


def query(query):
    for plugin in app.plugins:
        if plugin.match(query):
            track = plugin.get_track(query)
            return track
    return None


@app.route('/api/player')
def player():
    status = {
        'paused': app.player.paused,
        'position': app.player.position,
        'track': app.player.track,
        'version': app.player.version,
        'volume': app.player.volume,
    }
    return jsonify(status)


@app.route('/api/player/track', methods=['GET', 'POST', 'PUT'])
def player_track():
    if request.method == 'GET':
        # Get current track
        if app.player.track:
            return jsonify(app.player.track)
        else:
            return jsonify({})
    elif request.method == 'POST':
        # Skip track
        app.player.skip_track()
        return success_response(True)
    elif request.method == 'PUT':
        # Change track immediately
        track = query(request.form['query'])
        if track:
            app.player.track = track
            return success_response(True)
        else:
            return success_response(False)


@app.route('/api/player/position', methods=['GET', 'POST'])
def player_position():
    if request.method == 'GET':
        return jsonify(position=app.player.position)
    elif request.method == 'POST':
        app.player.position = int(request.form['position'])
        return success_response(True)


@app.route('/api/player/paused', methods=['GET', 'POST'])
def player_paused():
    if request.method == 'GET':
        return jsonify(paused=app.player.paused)
    elif request.method == 'POST':
        app.player.paused = bool(request.form['paused'])
        return success_response(True)


@app.route('/api/player/volume', methods=['GET', 'POST'])
def player_volume():
    if request.method == 'GET':
        return jsonify(volume=app.player.volume)
    elif request.method == 'POST':
        app.player.volume = int(request.form['volume'])
        return success_response(True)


@app.route('/api/player/queue', methods=['GET', 'POST', 'PUT'])
def player_queue():
    if request.method == 'GET':
        # Get queue
        return jsonify(queue=app.player.queue)
    elif request.method == 'POST':
        # Append to queue
        track = query(request.form['query'])
        if track:
            app.player.queue_track(track)
            return success_response(True)
        else:
            return success_response(False)
    elif request.method == 'PUT':
        # Modify queue
        try:
            app.player.queue = json.loads(request.data)['queue']
            return success_response(True)
        except:
            return success_response(False)
