(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Route = ReactRouter.Route;
var RouteHandler = ReactRouter.RouteHandler;
var DefaultRoute = ReactRouter.DefaultRoute;
var NotFoundRoute = ReactRouter.NotFoundRoute;
var Link = ReactRouter.Link;

// components
var App = React.createClass({displayName: "App",
  render: function() {
    return (
      React.createElement("div", {id: "app"}, 
        React.createElement("h1", null, "React Router Example"), 
        React.createElement(RouteHandler, null)
      )
    );
  }
});

var Inbox = React.createClass({displayName: "Inbox",
  render: function() {
    return (
      React.createElement("div", {id: "mypage"}, 
        React.createElement("h2", null, "Inbox"), 
        React.createElement(Link, {to: "records"}, "List")
      )
    );
  }
});

var List = React.createClass({displayName: "List",
  render: function() {
    return (
      React.createElement("div", {id: "list"}, 
        React.createElement("h2", null, "List"), 
        React.createElement(Link, {to: "record", params: {id: 1}}, "Record 1"), React.createElement("br", null), 
        React.createElement(Link, {to: "record", params: {id: 2}}, "Record 2"), React.createElement("br", null), 
        React.createElement(Link, {to: "record"}, "Record anonymous"), React.createElement("br", null), 
        React.createElement(Link, {to: "app"}, "Inbox")
      )
    );
  }
});

var Record = React.createClass({displayName: "Record",
  contextTypes: {
    router: React.PropTypes.func
  },
  render: function() {
    return (
      React.createElement("div", {id: "record"}, 
        React.createElement("h2", null, "Record ", this.context.router.getCurrentParams().id), 
        React.createElement(Link, {to: "records"}, "Back to list")
      )
    );
  }
});
// components end

// routing
var routes = (
  React.createElement(Route, {name: "app", path: "/", handler: App}, 
    React.createElement(DefaultRoute, {handler: Inbox}), 
    React.createElement(Route, {name: "records", handler: List}), 
    React.createElement(Route, {name: "record", path: "/records/:id", handler: Record}), 
    React.createElement(NotFoundRoute, {handler: Inbox})
  )
);
// routing end

// initialize
window.addEventListener("load", function(){
  ReactRouter.run(routes, function(Handler){
    React.render(React.createElement(Handler, null), document.querySelector("#content"));
  });
});
// initialize end


},{}]},{},[1]);
