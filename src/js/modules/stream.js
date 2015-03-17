var StreamItem = require('./stream-item');


module.exports = React.createClass({
    getInitialState: function () {
        return {queue: []};
    },
    load: function() {
        $.ajax({
            url: '/api/queue',
            dataType: 'json',
            success: function(data) {
                this.setState({
                    queue: data.queue,
                });
            }.bind(this)
        });
        // var fakeQueue = [ { "duration": 275.695, "id": 0, "meta": { "artist": "alt-J", "artwork": null, "link": "http://soundcloud.com/alt-j/story-4-sleeplessly-embracing-a-remix-by-clipping", "title": "Story 4: Sleeplessly Embracing (a remix by clipping.)" }, "type": "audio/mp3", "url": "https://ec-media.sndcdn.com/JjJY7mUtpulF.128.mp3?f10880d39085a94a0418a7ef69b03d522cd6dfee9399eeb9a522039a6bfebe396aeaa926a6d601ac0ed91b8b72ecbe33cf0c7fd3bd6151b9f2dac581d81f422141c83c0a8c" }, { "duration": 275.695, "id": 1, "meta": { "artist": "alt-J", "artwork": null, "link": "http://soundcloud.com/alt-j/story-4-sleeplessly-embracing-a-remix-by-clipping", "title": "Story 4: Sleeplessly Embracing (a remix by clipping.)" }, "type": "audio/mp3", "url": "https://ec-media.sndcdn.com/JjJY7mUtpulF.128.mp3?f10880d39085a94a0418a7ef69b03d522cd6dfee9399eeb9a522039a6bfebe396aeca926a6d601ac10eb3a67708a75c7210ee67252f6b13ca671436fa371318663be9df191" } ];
        // this.setState({queue: fakeQueue});
    },
    componentDidMount: function() {
        this.load();
        setInterval(this.load, this.props.pollInterval);
    },
    handleUrlSubmit: function() {
        this.load();
    },
    render: function() {
        var streamItems;
        if (this.state.queue.length > 0){
            streamItems = this.state.queue.map(function (item) {
                return (
                    <StreamItem
                        key={item.id}
                        title={item.meta.title}
                        artist={item.meta.artist}
                        link={item.meta.link}
                        artwork={item.meta.artwork}
                    />
                );
            });
        } else {
            streamItems = <h4>No items in the queue.</h4>
        }

        return (
            <ul className="list-group">
                {streamItems}
            </ul>
        );
    }
});
