var HelloWorldBox = React.createClass({displayName: "HelloWorldBox",
  render: function() {
    return (
      React.createElement("div", {className: "helloWorldBox"}, 
        React.createElement("strong", null, "Hello"), ", world!"
      )
    );
  }
});

React.render(
  React.createElement(HelloWorldBox, null),
  document.getElementById('content')
);
