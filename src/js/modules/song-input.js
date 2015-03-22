var React = require('react');
var $ = require('jquery');


var SongInput = React.createClass({
    getInitialState: function() {
        return {
            disabled: false,
            placeholder: 'Enter an audio url'
        };
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var input = React.findDOMNode(this.refs.url);
        this.setState({
            disabled: true,
            placeholder: 'Queuing track...'
        });
        $.post('/api/queue', {query: input.value.trim()}, function(data){
            this.setState(this.getInitialState());
        }.bind(this));
        input.value = '';
    },
    render: function() {
        return (
            <form className="songForm" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <div className="input-group">
                        <label className="sr-only" htmlFor="urlInput">Song url</label>
                        <input type="text" className="form-control input-lg" id="urlInput" placeholder={this.state.placeholder} ref="url" disabled={this.state.disabled} />
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
