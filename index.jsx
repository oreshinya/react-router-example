var Route = ReactRouter.Route;
var RouteHandler = ReactRouter.RouteHandler;
var DefaultRoute = ReactRouter.DefaultRoute;
var NotFoundRoute = ReactRouter.NotFoundRoute;
var Link = ReactRouter.Link;
var SimpleTabs = ReactSimpleTabs;

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
        <Link to="simple-tabs">SimpleTabs</Link>
        <Link to="tab-panels">TabPanel</Link>
      </div>
    );
  }
});

var List = React.createClass({
  getInitialState: function() {
    var records = [];
    var i = 1;
    for (;i<=500;i++) {
      records.push({id: i});
    }
    return {
      records: records
    };
  },
  _records: function() {
    var results = this.state.records.map(function(record){
      return (
        <div className="link" key={record.id}>
          <Link to="record" params={record}>Record {record.id}</Link>
        </div>
      );
    });
    return results;
  },
  render: function() {
    return (
      <div id="list">
        <h2>List</h2>
        {this._records()}
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

var SimpleTabUI = React.createClass({
  render: function() {
    return (
      <SimpleTabs>
        <SimpleTabs.Panel title='Tab #1'>
          <Hoge />
        </SimpleTabs.Panel>
        <SimpleTabs.Panel title='Tab #2'>
          <h2>Content #2 here</h2>
        </SimpleTabs.Panel>
        <SimpleTabs.Panel title='Tab #3'>
          <h2>Content #3 here</h2>
        </SimpleTabs.Panel>
      </SimpleTabs>
    );
  }
});

var TabPanel = React.createClass({
  render: function() {
    return (
      <ReactPanels.Panel theme="chemical">
        <ReactPanels.Tab title="Tab 1">
          <Hoge />
        </ReactPanels.Tab>
        <ReactPanels.Tab title="Tab 2">
          <h2>Content #2 here</h2>
        </ReactPanels.Tab>
      </ReactPanels.Panel>
    );
  }
});

var Hoge = React.createClass({
  getInitialState: function() {
    return {
      clicked: false
    };
  },
  _onClick: function() {
    this.setState({clicked: !this.state.clicked});
  },
  render: function() {
    return (
      <div id="hoge">
        <h2>Hoge</h2>
        <div onClick={this._onClick}>clicked: {this.state.clicked ? "true" : "false"}</div>
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
    <Route name="simple-tabs" handler={SimpleTabUI} />
    <Route name="tab-panels" handler={TabPanel} />
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
