var StreamItem = require('./stream-item.jsx'),
    React = require('react'),
    $ = require('jquery');


module.exports = React.createClass({
    getInitialState() {
        return {queue: []};
    },

    load() {
        $.ajax({
            url: '/api/player/queue',
            dataType: 'json',
            success: (data) => {
                this.setState({
                    queue: data.queue
                });
            }
        });
    },

    componentDidMount() {
        this.load();
        setInterval(this.load, this.props.pollInterval);
    },

    handleUrlSubmit() {
        this.load();
    },

    render() {
        if (this.state.queue.length > 0) {
            var streamItems = this.state.queue.map(function (track) {
                return <StreamItem key={track.id} track={track} />;
            });
            return (
                <ul className="list-group">
                    {streamItems}
                </ul>
            );
        } else {
            return <h4>No items in the queue.</h4>;
        }
    }
});
