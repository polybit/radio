var React = require('react');
var $ = require('jquery');


var SongInput = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault();
        var url = React.findDOMNode(this.refs.url).value.trim();
        $.post('/api/player/queue', {query: url});
        React.findDOMNode(this.refs.url).value = '';
        return;
    },
    render: function() {
        return (
            <form className="songForm" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <div className="input-group">
                        <label className="sr-only" htmlFor="urlInput">Song url</label>
                        <input type="text" className="form-control input-lg" id="urlInput" placeholder="Enter an audio url" ref="url" />
                        <span className="input-group-btn">
                            <button className="btn btn-primary btn-lg" type="submit">Add to queue</button>
                        </span>
                    </div>
                </div>
            </form>
        );
    }
});

module.exports = SongInput;
