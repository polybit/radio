var SongInput = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault();
        var url = React.findDOMNode(this.refs.url).value.trim();
        $.post('/api/queue', {query: url});
        this.props.onUrlSubmit()
        React.findDOMNode(this.refs.url).value = '';
        return;
    },
    render: function() {
        return (
            <form className="songForm" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Soundcloud url" ref="url" />
            </form>
        );
    }
});
