jest.dontMock('../src/js/modules/player.jsx');
describe('player', function() {
    it('should init correctly', function(){
        var React = require('react/addons');
        var Player = require('../src/js/modules/player.jsx');
        var TestUtils = React.addons.TestUtils;

        var player = TestUtils.renderIntoDocument(
            <Player pollInterval={1000} />
        );
    });
});
