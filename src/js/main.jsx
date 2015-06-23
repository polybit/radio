var Player = require('./modules/player.jsx'),
    SongInput = require('./modules/song-input.jsx'),
    Stream = require('./modules/stream.jsx'),
    React = require('react');


let init = function () {
    let hello = () => '%c Hello, ES2015/ES6/Harmony/... World!';
    console.log(hello(), 'background: #222; color: #bada55');

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

