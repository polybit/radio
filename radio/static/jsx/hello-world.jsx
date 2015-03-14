var HelloWorldBox = React.createClass({
  render: function() {
    return (
      <div className="helloWorldBox">
        <strong>Hello</strong>, world!
      </div>
    );
  }
});

React.render(
  <HelloWorldBox />,
  document.getElementById('content')
);
