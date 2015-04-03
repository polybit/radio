var StreamItem = require('./stream-item');
var ProgressBar = require('./progress-bar');
var React = require('react');
var $ = require('jquery');
var ColorThief = require('../lib/color-thief');


module.exports = React.createClass({
    getInitialState: function () {
        return {
            track: null,
        };
    },
    updateLocalTime: function () {
        this.setState({currentLocalTime: this.state.currentLocalTime + 1});
    },
    setStream: function (plugin, url) {
        $.ajax({
            url: '/api/plugins/' + plugin + '/stream?url=' + url,
            dataType: 'json',
            success: function (data) {
                this.setState({
                    stream: data.stream,
                });
            }.bind(this)
        });
    },
    load: function () {
        $.ajax({
            url: '/api/player',
            dataType: 'json',
            success: function (data) {
                if (data.version != this.state.version) {
                    if (data.track && (!this.state.stream || (this.state.track && data.track.id != this.state.track.id))) {
                        this.setStream(data.track.plugin, data.track.url);
                    }

                    this.setState({
                        track: data.track,
                        version: data.version,
                        currentTime: Math.round(data.position / 1000.0),
                        currentLocalTime: Math.round(data.position / 1000.0),
                        duration: (data.track) ? Math.round(data.track.duration / 1000.0) : 0,
                        volume: data.volume / 100.0
                    });

                    if (this.refs.audio) {
                        var audio = React.findDOMNode(this.refs.audio);
                        audio.currentTime = this.state.currentTime;
                        audio.volume = this.state.volume;
                        audio.play();
                    }

                    // TODO: sort out all the colour stuff and duplication...
                    $('#player img').on('load', function (e) {
                        var colorThief = new ColorThief();
                        var color = colorThief.getColor(e.target);
                        this.setState({color: color});
                    }.bind(this));
                }
            }.bind(this)
        });
    },
    componentDidMount: function () {
        this.load();
        setInterval(this.load, this.props.pollInterval);
        setInterval(this.updateLocalTime, 1000);
    },
    handleUrlSubmit: function () {
        this.load();
    },
    render: function () {
        if (this.state.track) {
            return (
                <StreamItem track={this.state.track} ref="playerWrapper">
                    <audio src={this.state.stream} autoPlay controls ref="audio">
                        <source src={this.state.stream} type={this.state.track.type} />
                        Your browser does not support the audio element.
                    </audio>

                    <ProgressBar currentTime={this.state.currentLocalTime} duration={this.state.duration} color={this.state.color} />
                </StreamItem>
            );
        } else {
            return null;
        }
    }
});
