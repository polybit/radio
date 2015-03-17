var StreamItem = require('./stream-item');
var React = require('react');
var $ = require('jquery');


module.exports = React.createClass({
    getInitialState: function () {
        return {}
    },
    load: function() {
        $.ajax({
            url: '/api/player',
            dataType: 'json',
            success: function(data) {
                if (data.version != this.state.version){
                    this.setState({
                        track: data.track,
                        version: data.version,
                        currentTime: Math.floor(data.position / 1000.0),
                    });

                    if (this.refs.playerWrapper){
                        var domAudio = React.findDOMNode(this.refs.playerWrapper).querySelector('audio');
                        domAudio.currentTime = this.state.currentTime;
                        domAudio.play();
                    }
                }
            }.bind(this)
        });
    },
    componentDidMount: function() {
        this.load();
        setInterval(this.load, this.props.pollInterval);
    },
    handleUrlSubmit: function() {
        this.load();
    },
    render: function() {
        if (this.state.track) {
            var player = (
                <audio src={this.state.track.url} autoPlay controls>
                    <source src={this.state.track.url} type={this.state.track.type} />
                    Your browser does not support the audio element.
                </audio>
            )

            var playerWrapper = <StreamItem
                key={this.state.track.id}
                title={this.state.track.meta.title}
                artist={this.state.track.meta.artist}
                link={this.state.track.meta.link}
                artwork={this.state.track.meta.artwork}
                ref="playerWrapper"
            >
                {player}
            </StreamItem>
        } else {
            var playerWrapper = '';
        }

        return (
            <div>
                {playerWrapper}
            </div>
        );
    }
});
