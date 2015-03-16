var Player = React.createClass({
    getInitialState: function () {
        return {}
    },
    load: function() {
        $.ajax({
            url: '/api/player',
            dataType: 'json',
            success: function(data) {
                if (data.track && data.version != this.state.version){
                    console.log(data.track);
                    this.setState({
                        track: data.track,
                        src: data.track.url,
                        type: data.track.type,
                        version: data.version,
                        currentTime: Math.floor(data.position),
                        duration: Math.floor(data.track.duration),
                    })
                    var domAudio = React.findDOMNode(this.refs.playerWrapper).querySelector('audio');
                    domAudio.currentTime = this.state.currentTime;
                    domAudio.duration = this.state.duration;
                    domAudio.play();
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
                <audio src={this.state.src} autoPlay controls>
                    <source src={this.state.src} type={this.state.type} />
                    Your browser does not support the audio element.
                </audio>
            )

            var playerWrapper = <StreamItem
                key={this.state.track.id}
                title={this.state.track.meta.title}
                artist={this.state.track.meta.artist}
                link={this.state.track.meta.link}
                artwork={this.state.track.meta.artwork}
                color={this.state.track.meta.colors[0]['value']}
                ref="playerWrapper"
            >
                {player}
            </StreamItem>
        }

        return (
            <div>
                {playerWrapper}
            </div>
        );
    }
});
