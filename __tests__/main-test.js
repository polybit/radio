describe('main', function() {
    it('should init correctly', function(){
        // Smoke test, leave everything unmocked and keep fingers crossed
        jest.autoMockOff();

        document.body.innerHTML =
          '<div>' +
          '  <div id="player"></div>' +
          '  <div id="songInput"></div>' +
          '  <div id="stream"></div>' +
          '</div>';

        // init is called automatically from main on require
        require('../src/js/main.jsx');

        // Turn automock back on
        jest.autoMockOn();
    });
});
