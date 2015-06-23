var React = require('react'),
    $ = require('jquery');


module.exports = React.createClass({
    getInitialState: function () {
        return {
            disabled: false,
            placeholder: 'Enter an audio url'
        };
    },
    handleSubmit: function (e) {
        e.preventDefault();
        var input = React.findDOMNode(this.refs.url);
        this.setState({
            disabled: true,
            placeholder: 'Queuing track...'
        });
        $.post('/api/player/queue', {query: input.value.trim()}, () => {
            this.setState(this.getInitialState());
        });
        input.value = '';
    },
    render: function () {
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
