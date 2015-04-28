var Route = ReactRouter.Route;
var RouteHandler = ReactRouter.RouteHandler;
var DefaultRoute = ReactRouter.DefaultRoute;
var NotFoundRoute = ReactRouter.NotFoundRoute;
var Link = ReactRouter.Link;

// components
var App = React.createClass({
  render: function() {
    return (
      <div id="app">
        <h1>React Router Example</h1>
        <RouteHandler />
      </div>
    );
  }
});

var Inbox = React.createClass({
  render: function() {
    return (
      <div id="mypage">
        <h2>Inbox</h2>
        <Link to="records">List</Link>
      </div>
    );
  }
});

var List = React.createClass({
  render: function() {
    return (
      <div id="list">
        <h2>List</h2>
        <Link to="record" params={{id: 1}}>Record 1</Link><br />
        <Link to="record" params={{id: 2}}>Record 2</Link><br />
        <Link to="app">Inbox</Link>
      </div>
    );
  }
});

var Record = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  render: function() {
    return (
      <div id="record">
        <h2>Record {this.context.router.getCurrentParams().id}</h2>
        <Link to="records">Back to list</Link>
      </div>
    );
  }
});
// components end

// routing
var routes = (
  <Route name="app" path="/" handler={App}>
    <DefaultRoute handler={Inbox} />
    <Route name="records" handler={List} />
    <Route name="record" path="/records/:id" handler={Record} />
    <NotFoundRoute handler={Inbox} />
  </Route>
);
// routing end

// initialize
window.addEventListener("load", function(){
  ReactRouter.run(routes, function(Handler){
    React.render(<Handler />, document.querySelector("#content"));
  });
});
// initialize end
