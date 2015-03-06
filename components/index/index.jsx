var React = require('react');
var Router = require('react-router');

var Route = Router.Route,
	DefaultRoute = Router.DefaultRoute,
  	NotFoundRoute = Router.NotFoundRoute,
  	RouteHandler = Router.RouteHandler,
  	Link = Router.Link;


var Home = require('../home/index.jsx');

var App = React.createClass({
	mixins: [Router.State], 
	getHandlerKey: function () {
		var childDepth = 1; // assuming App is top-level route
		var key = this.getRoutes()[childDepth].name;
		var id = this.getParams().id;
		if (id) { key += id; }
		return key;
	},
	getInitialState: function () { 
		return {  };
	},

	componentDidMount: function(){ },

	render: function () {
		var self = this;

		return (
		  <div>
		    <header id="header">
		    	<h1>Fontenelle</h1>	
		    </header>
		    <div className="main_content">
		      <RouteHandler key={this.getHandlerKey()}  />
		    </div>

		    <footer>
		        <div className="contact-info">
		          <p className="copyright">&copy;  2015, Fontelle Forest. All rights reserved.</p>
		        </div>

		    </footer>
		  </div>
		);
	}
});

var routes = (
  <Route handler={App} path="/">
    <DefaultRoute handler={Home} />
  </Route>
);


Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler/>, document.body);
});