var StreamItem = React.createClass({
    render: function() {
        var itemStyle = {
            borderLeftColor: 'rgb(' + this.props.color.join(',') + ')'
        }
        return (
            <li className="stream-item list-group-item" style={itemStyle}>
                <div className="media">
                    <div className="media-left">
                        <a href={this.props.link} target="_blank">
                            <img className="media-object" src={this.props.artwork} alt="" />
                        </a>
                    </div>
                    <div className="media-body">
                        <h4 className="media-heading"><a href={this.props.link} target="_blank">{this.props.title}</a></h4>
                        {this.props.artist}
                        {this.props.children}
                    </div>
                </div>
            </li>
        );
    }
});
