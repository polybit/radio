var React = require('react');
var $ = require('jquery');


module.exports = React.createClass({
    getDefaultProps: function () {
        return {
            currentTime: 0,
            duration: 1,
            color: [0, 0, 0],
        };
    },
    render: function() {
        var percentage = this.props.currentTime / this.props.duration * 100;
        var style = {
            width: percentage + '%',
            backgroundColor: 'rgb(' + this.props.color.join(',') + ')'
        };
        return (
            <div className="progress">
                <div className="progress-bar" role="progressbar" aria-valuenow={percentage} aria-valuemin="0" aria-valuemax="100" style={style}>
                    <span className="sr-only">{percentage}% Complete</span>
                </div>
            </div>
        );
    }
});
