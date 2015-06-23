jest.dontMock('../src/js/modules/stream-item.jsx');
jest.dontMock('jquery');
describe('stream-item', function() {
    it('should init correctly', function(){
        var React = require('react/addons');
        var StreamItem = require('../src/js/modules/stream-item.jsx');
        var TestUtils = React.addons.TestUtils;

        var streamItem = TestUtils.renderIntoDocument(
            <StreamItem
                key={1}
                track={{meta: {}}}
            />
        );
    });
});
