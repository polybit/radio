# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from flask import jsonify, request

from radio import app
from radio.helpers import get_plugins, success_response


@app.route('/api/player')
def player():
    status = {
        'track': app.player.get_track(),
        'position': app.player.get_position(),
        'version': app.player.get_version(),
    }
    return jsonify(status)


@app.route('/api/player/track', methods=['GET', 'POST', 'PUT'])
def player_track():
    if request.method == 'GET':
        # Get track
        return jsonify(app.player.get_track())
    elif request.method == 'POST':
        # Skip track (to next in queue)
        app.player.skip()
        return success_response(True)
    elif request.method == 'PUT':
        # Change track immediately
        query = request.form['query']
        for plugin in get_plugins():
            if plugin.match(query):
                track = plugin.get_track(query)
                app.player.play(track)
                return success_response(True)
        return success_response(False)


@app.route('/api/queue', methods=['GET', 'POST', 'PUT'])
def queue():
    if request.method == 'GET':
        # Get queue
        return jsonify(queue=app.player.queue)
    elif request.method == 'POST':
        # Append to queue
        query = request.form['query']
        for plugin in get_plugins():
            if plugin.match(query):
                track = plugin.get_track(query)
                app.player.queue_track(track)
                return success_response(True)
        return success_response(False)
    elif request.method == 'PUT':
        # Modify queue
        try:
            app.player.queue = request.get_json()
            return success_response(True)
        except:
            return success_response(False)
