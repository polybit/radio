var React = require('react'),
    $ = require('jquery');


module.exports = React.createClass({
    getInitialState: function () {
        return {
            color: [0, 0, 0]
        };
    },
    getDefaultProps: function () {
        return {
            duration: 1
        };
    },
    postPercentage: function (percentage) {
        this.setDisplayPercentage(percentage);
        $.post('/api/player/position', {position: Math.floor((this.state.localPercentage / 100) * this.props.duration * 1000)});
    },
    setDisplayPercentage: function (percentage) {
        if (percentage > 100) {
            percentage = 100;
        } else if (percentage < 0) {
            percentage = 0;
        }
        this.setState({localPercentage: percentage});
    },
    componentWillReceiveProps: function () {
        if (!this.state.dragging) {
            this.setState({localPercentage: null});
        }
    },
    componentDidMount: function () {
        var progressTarget = React.findDOMNode(this.refs.progress),
            width = $(progressTarget).width(),
            posX = $(progressTarget).offset().left;

        $(progressTarget).on('mousedown', function () {
            this.setState({dragging: true});
            $(document).on('mousemove', function (e) {
                this.setDisplayPercentage((e.pageX - posX) / width * 100);
            }.bind(this));

            $(document).one('mouseup', function (e) {
                this.postPercentage((e.pageX - posX) / width * 100);
                $(document).off('mousemove');
                this.setState({dragging: false});
            }.bind(this));
        }.bind(this));
    },
    render: function () {
        var percentage;
        if (this.state.localPercentage) {
            percentage = this.state.localPercentage;
        } else {
            percentage = this.props.currentTime / this.props.duration * 100;
        }

        const style = {
            width: `${percentage}%`,
            backgroundColor: `rgb(${this.state.color.join(',')})`
        };

        return (
            <div className="progress" ref="progress">
                <div className="progress-bar" role="progressbar" aria-valuenow={percentage} aria-valuemin="0" aria-valuemax="100" style={style}>
                    <span className="sr-only">{percentage}% Complete</span>
                </div>
            </div>
        );
    }
});
