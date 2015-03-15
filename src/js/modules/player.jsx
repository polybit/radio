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
                if (data.track && data.version && data.version != this.state.version){
                    this.setState({
                        src: data.track.url,
                        type: data.track.type,
                        version: data.version,
                    })
                }
            }.bind(this)
        });
        React.findDOMNode(this.refs.audioPlayer).play();
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