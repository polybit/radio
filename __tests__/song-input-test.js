jest.dontMock('../src/js/modules/song-input.jsx');
describe('song-input', function() {
    var React = require('react/addons');
    var $ = require('jquery');
    var SongInput = require('../src/js/modules/song-input.jsx');
    var TestUtils = React.addons.TestUtils;

    it('should fire a POST request on form submit', function(){
        var songInput = TestUtils.renderIntoDocument(
            <SongInput />
        );

        var urlToEnter = 'https://soundcloud.com/catchingfliesmusic/louis-m-ttrs-war-with-heaven';
        var urlBar = songInput.refs.url.getDOMNode();
        urlBar.value = urlToEnter;
        TestUtils.Simulate.submit(urlBar);
        expect($.post).toBeCalled();
    });
});
