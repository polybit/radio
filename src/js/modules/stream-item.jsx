var ColorThief = require('../lib/color-thief'),
    React = require('react'),
    $ = require('jquery');


module.exports = React.createClass({
    getInitialState: function () {
        return {
            color: [0, 0, 0]
        };
    },
    componentDidMount: function () {
        var art = React.findDOMNode(this.refs.art);
        $(art).on('load', (function () {
            var colorThief = new ColorThief(),
                color = colorThief.getColor(art);
            this.setState({color: color});
        }).bind(this));
    },
    render: function () {
        var itemStyle = {
            borderLeftColor: `rgb(${this.state.color.join(',')})`
        };
        return (
            <li className="stream-item list-group-item" style={itemStyle}>
                <div className="media">
                    <div className="media-left">
                        <a href={this.props.track.meta.link} target="_blank">
                            <img ref="art" className="media-object" src={this.props.track.meta.artwork} alt="" crossOrigin="anonymous" width="100" height="100" />
                        </a>
                    </div>
                    <div className="media-body">
                        <h4 className="media-heading">
                            <a href={this.props.track.meta.link} target="_blank">{this.props.track.meta.title}</a>
                            <a href={this.props.track.meta.link} target="_blank" className="attribution"><img src="../static/img/soundcloud-logo-black.png" /></a>
                        </h4>
                        {this.props.track.meta.artist}

                        {this.props.children}
                    </div>
                </div>
            </li>
        );
    }
});
