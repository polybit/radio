var Player = React.createClass({
    getInitialState: function () {
        return {}
    },
    load: function() {
        $.ajax({
            url: '/api/status',
            dataType: 'json',
            success: function(data) {
                console.log(data);
                if (data.version != this.state.version){
                    data.track = data.track || {url: '', type: '', duration: 0};
                    data.position = data.position || 0;
                    this.setState({
                        src: data.track.url,
                        type: data.track.type,
                        version: data.version,
                        currentTime: Math.floor(data.position),
                        duration: Math.floor(data.track.duration),
                    })
                    React.findDOMNode(this.refs.audioPlayer).currentTime = this.state.currentTime;
                    React.findDOMNode(this.refs.audioPlayer).duration = this.state.duration;
                    React.findDOMNode(this.refs.audioPlayer).play();
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
        return (
            <div>
                <audio src={this.state.src} autoPlay controls ref="audioPlayer">
                    <source src={this.state.src} type={this.state.type} />
                    Your browser does not support the audio element.
                </audio>
                <SongInput onUrlSubmit={this.handleUrlSubmit} />
            </div>
        );
    }
});
