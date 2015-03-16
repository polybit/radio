# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import json

from flask import jsonify, request

from radio import app
from radio.helpers import success_response


@app.route('/api/player')
def player():
    status = {
        'track': app.player.track,
        'position': app.player.position,
        'version': app.player.version,
    }
    return jsonify(status)


@app.route('/api/player/track', methods=['GET', 'POST', 'PUT'])
def player_track():
    if request.method == 'GET':
        # Get track
        return jsonify(app.player.track)
    elif request.method == 'POST':
        # Skip track (to next in queue)
        app.player.skip_track()
        return success_response(True)
    elif request.method == 'PUT':
        # Change track immediately
        query = request.form['query']
        for plugin in app.plugins:
            if plugin.match(query):
                track = plugin.get_track(query)
                app.player.track = track
                return success_response(True)
        return success_response(False)


@app.route('/api/queue', methods=['GET', 'POST', 'PUT'])
def queue():
    if request.method == 'GET':
        # Get queue with ids
        queue = app.player.queue
        for index, track in enumerate(app.player.queue):
                track.update({"id": index})
        return jsonify(queue=queue)
    elif request.method == 'POST':
        # Append to queue
        query = request.form['query']
        for plugin in app.plugins:
            if plugin.match(query):
                track = plugin.get_track(query)
                app.player.queue_track(track)
                return success_response(True)
        return success_response(False)
    elif request.method == 'PUT':
        # Modify queue
        try:
            app.player.queue = json.loads(request.data)['queue']
            return success_response(True)
        except:
            return success_response(False)
