var StreamItem = require('./stream-item.jsx');
var React = require('react');
var $ = require('jquery');


module.exports = React.createClass({
    getInitialState: function () {
        return {queue: []};
    },
    load: function () {
        $.ajax({
            url: '/api/player/queue',
            dataType: 'json',
            success: function (data) {
                this.setState({
                    queue: data.queue,
                });
            }.bind(this)
        });
    },
    componentDidMount: function () {
        this.load();
        setInterval(this.load, this.props.pollInterval);
    },
    handleUrlSubmit: function () {
        this.load();
    },
    render: function () {
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
