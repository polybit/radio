var Player = require('./modules/player.jsx');
var SongInput = require('./modules/song-input.jsx');
var Stream = require('./modules/stream.jsx');
var React = require('react');


var init = function () {
    React.render(
      <Player pollInterval={1000} />,
      document.getElementById('player')
    );

    React.render(
      <SongInput />,
      document.getElementById('songInput')
    );

    React.render(
      <Stream pollInterval={1000} />,
      document.getElementById('stream')
    );
};

init();

