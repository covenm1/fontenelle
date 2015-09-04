var React = require('react');
var Router = require('react-router');
// var TransitionGroup = require('./timeoutTransitionGroup.jsx');
var TransitionGroup = require('./VelocityTransitionGroup.jsx');

var util = require('util');

var Route = Router.Route,
		DefaultRoute = Router.DefaultRoute,
  	NotFoundRoute = Router.NotFoundRoute,
  	RouteHandler = Router.RouteHandler,
  	Link = Router.Link;


var forest = require('../forest/index.jsx'),
		conservation = require('../conservation/index.jsx'),
		programs = require('../programs/index.jsx'),
		education = require('../education/index.jsx'),
		raptorRecovery = require('../raptor-recovery/index.jsx');

var slide_names = [ 'forest' , 'conservation' , 'programs', 'education', 'raptor-recovery'];
var slide_count = 0;

var hotkey = require('react-hotkey');
 hotkey.activate();

var App = React.createClass({
	mixins: [Router.State, Router.Navigation, hotkey.Mixin('handleKeyDown')],

	getHandlerKey: function () {
		var childDepth = 1; // assuming App is top-level route
		var key = this.getRoutes()[childDepth].name;
		var id = this.getParams().id;
		if (id) { key += id; }
		return key;
	},

	getInitialState: function () {
		return { currentTransition: '' };
	},

	componentDidMount: function () {
	    // hotkey.activate();
	},

	componentDidMount: function(){
	},

	onClickRight: function(){
		if (slide_count ==  slide_names.length ) {
			slide_count = 0;
		} else {
			slide_count++;
		}

		this.setState({currentTransition: 'slide-forward'});
		this.transitionTo(slide_names[slide_count% slide_names.length ]);
	},

	onClickLeft: function(){

		if (slide_count == 0) {
			slide_count = slide_names.length - 1;
		} else {
			slide_count--;
		}

		this.setState({currentTransition: 'slide-back'});
		this.transitionTo(slide_names[slide_count% slide_names.length ]);
	},

	handleKeyDown: function(e) {
		var self = this;

	  if (e.key === 'ArrowLeft') {
			self.onClickLeft();
	  } else if (e.key === 'ArrowRight') {
			self.onClickRight();
	  }
	},

	render: function () {
		var self = this;
		var name = this.getHandlerKey();

		var transition = self.state.currentTransition;

		return (
		  <div className="fontenelle">
		    <header>
		        <a href="/" className="logo"><img src="/img/logo.png" alt="" /></a>
		        <span className="menu">
		            <a href="javascript.void(0)" className="link">Found Bird</a>
		            <a href="javascript.void(0)" className="link">Donate</a>
		        </span>
		    </header>
		    <div className="main_content">
		    	<TransitionGroup transitionName={transition} className="router" component="div">
			    	<RouteHandler key={name} transition_to={self.openSocial} />
			    </TransitionGroup>
		     	<div className="slide_controls">
		     		<span className="left slider_button" onClick={self.onClickLeft}>Left</span>
		     		<span className="right slider_button" onClick={self.onClickRight}>Right</span>
		     	</div>
		    </div>
		  </div>
		);
	}
});

var routes = (
  <Route handler={App}>
    <Route name="forest" path="/" handler={forest} addHandlerKey={true}/>
    <Route name="conservation" path="/conservation" handler={conservation} addHandlerKey={true}/>
    <Route name="programs" path="/programs" handler={programs} addHandlerKey={true} />
    <Route name="education" path="/education" handler={education} addHandlerKey={true} />
    <Route name="raptor-recovery" path="/raptor-recovery" handler={raptorRecovery} addHandlerKey={true} />
  </Route>
);


Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler/>, document.body);
});
