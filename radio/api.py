# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from flask import jsonify, request

from radio import app
from radio.helpers import get_plugins, success_response


@app.route('/api/status')
def status():
    status = {
        'url': app.player.get_url(),
        'position': app.player.get_position(),
        'version': app.player.get_version(),
    }
    return jsonify(status)


@app.route('/api/play', methods=['POST'])
def play():
    query = request.form['query']
    for plugin in get_plugins():
        if plugin.match(query):
            url = plugin.get_url(query)
            app.player.play(url)
            return success_response(True)
    return success_response(False)


@app.route('/api/seek', methods=['POST'])
def seek():
    position = float(request.form['position'])
    app.player.seek(position)
    return success_response(True)
