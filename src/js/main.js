var Player = require('./modules/player');
var SongInput = require('./modules/song-input');
var Stream = require('./modules/stream');


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

