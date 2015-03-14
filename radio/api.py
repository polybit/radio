# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import json

from flask import jsonify, request

from radio import app, youtube


@app.route('/api/status')
def status():
    status = {
        'uri': app.player.get_uri(),
        'position': app.player.get_position(),
        'version': app.player.get_version(),
    }
    return jsonify(status)


@app.route('/api/play', methods=['POST'])
def play():
    query = request.form['query']
    if youtube.match(query):
        uri = youtube.get_uri(query)
        app.player.play(uri)
        return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}
    else:
        return json.dumps({'success': False}), 200, {'ContentType': 'application/json'}


@app.route('/api/seek', methods=['POST'])
def seek():
    position = float(request.form['position'])
    app.player.seek(position)
    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}
