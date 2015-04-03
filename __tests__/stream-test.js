jest.dontMock('../src/js/modules/stream.jsx');
describe('stream', function() {
    it('should init correctly', function(){
        var React = require('react/addons');
        var Stream = require('../src/js/modules/stream.jsx');
        var TestUtils = React.addons.TestUtils;

        var stream = TestUtils.renderIntoDocument(
            <Stream pollInterval={1000} />
        );
    });
});
