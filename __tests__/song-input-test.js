jest.dontMock('../src/js/modules/song-input');
describe('song-input', function() {
    it('should init correctly', function(){
        var React = require('react/addons');
        var SongInput = require('../src/js/modules/song-input');
        var TestUtils = React.addons.TestUtils;

        var songInput = TestUtils.renderIntoDocument(
            <SongInput />
        );
    });
});
