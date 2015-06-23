var StreamItem = require('./stream-item.jsx'),
    ProgressBar = require('./progress-bar.jsx'),
    React = require('react'),
    $ = require('jquery'),
    ColorThief = require('../lib/color-thief');


module.exports = React.createClass({
    getInitialState() {
        return {
            track: null
        };
    },

    updateLocalTime() {
        this.setState({currentLocalTime: this.state.currentLocalTime + 1});
    },

    setStream(plugin, url) {
        $.ajax({
            url: `/api/plugins/${plugin}/stream?url=${url}`,
            dataType: 'json',
            success: (data) => {
                this.setState({
                    stream: data.stream
                });
            }
        });
    },

    load() {
        $.ajax({
            url: '/api/player',
            dataType: 'json',
            success: (data) => {
                if (data.version !== this.state.version) {
                    if (data.track && (!this.state.stream || (this.state.track && data.track.id !== this.state.track.id))) {
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
                }
            }
        });

        // TODO: sort out all the colour stuff and duplication...
        if (this.refs.playerWrapper && this.refs.playerWrapper.refs.art) {
            const artNode = React.findDOMNode(this.refs.playerWrapper.refs.art),
                  colorThief = new ColorThief();

            this.setState({color: colorThief.getColor(artNode)});
        }
    },

    componentDidMount() {
        this.load();
        setInterval(this.load, this.props.pollInterval);
        setInterval(this.updateLocalTime, 1000);
    },

    handleUrlSubmit() {
        this.load();
    },

    render() {
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
