var React = require('react');
var Router = require('react-router');
// var TransitionGroup = require('./timeoutTransitionGroup.jsx');
var TransitionGroup = require('./VelocityTransitionGroup.jsx');

var util = require('util');
//
var ScrollMagic = require('scrollmagic');
// 		TweenMax = require('../../public/js/tweenmax.js');
//
// require('../../public/js/scrollTo.js');

var Route = Router.Route,
		DefaultRoute = Router.DefaultRoute,
  	NotFoundRoute = Router.NotFoundRoute,
  	RouteHandler = Router.RouteHandler,
  	Link = Router.Link;


var forest = require('../forest/index.jsx'),
		conservation = require('../conservation/index.jsx'),
		programs = require('../programs/index.jsx'),
		education = require('../education/index.jsx'),
		foundraptor = require('../found-raptor/index.jsx'),
		meettheraptors = require('../meet-the-raptors/index.jsx'),
		getinvolved = require('../get-involved/index.jsx');

var slide_names = [ 'forest' , 'conservation' , 'education' , 'programs'];
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
		return { currentTransition: 'default' };
	},

	componentDidMount: function(){
		var controller = new ScrollMagic.Controller();
	  var top = new ScrollMagic.Scene({
								triggerHook: 0,
	              duration: '97%',
								offset: -60
	          })
	          .setClassToggle("header.header", "scrolled")
	          .addTo(controller);
	},

	onClickRight: function(){
		var name = this.getHandlerKey();
		slide_count = slide_names.indexOf(name);

		if (slide_count ==  slide_names.length ) {
			slide_count = 0;
		} else {
			slide_count++;
		}

		this.setState({currentTransition: 'slide-forward'});
		this.transitionTo(slide_names[slide_count% slide_names.length ]);
	},

	onClickLeft: function(){
		var name = this.getHandlerKey();

		slide_count = slide_names.indexOf(name);

		if (slide_count == 0) {
			slide_count = slide_names.length - 1;
		} else {
			slide_count--;
		}

		this.setState({currentTransition: 'slide-back'});
		this.transitionTo(slide_names[slide_count% slide_names.length ]);
	},

	rightLink: function(name){

		slide_count = slide_names.indexOf(name);

		this.setState({currentTransition: 'slide-forward'});
		this.transitionTo(name);
	},

	leftLink: function(name){

		slide_count = slide_names.indexOf(name);

		this.setState({currentTransition: 'slide-back'});
		this.transitionTo(slide_names[name]);
	},


	handleKeyDown: function(e) {
		var self = this;

	  if (e.key === 'ArrowLeft') {
			self.onClickLeft();
	  } else if (e.key === 'ArrowRight') {
			self.onClickRight();
	  }
	},

	setTransition: function(i) {
		this.setState({currentTransition: i});
	},

	render: function () {
		var self = this;
		var name = this.getHandlerKey();

		var transition = self.state.currentTransition;
		return (
		  <div className={"fontenelle " + name} >
		    <header className="header">
		        <Link to="/" className="logo"><img src="/img/logo.png" alt="" /></Link>
		        <span className="global_menu">
		            <Link to="/found-raptor" className="link">Found Raptor</Link>
		            <a href="javascript.void(0)" className="link">Forest Now</a>
								<Link to="/get-involved" className="link">Get Involved</Link>
		        </span>
						<span className="menu_icon">Menu</span>
		    </header>
				<div className="slide_controls">
					<span className="left slider_button" onClick={self.onClickLeft}><img src="/img/icon_scroll-left.svg" /></span>
					<span className="right slider_button" onClick={self.onClickRight}><img src="/img/icon_scroll-right.svg" /></span>
				</div>

	    	<TransitionGroup transitionName={transition} className="main_content" id="main_content" component="div">
		    	<RouteHandler key={name} transition={self.setTransition} />
		    </TransitionGroup>
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
    <Route name="found-raptor" path="/found-raptor" handler={foundraptor} addHandlerKey={true} />
    <Route name="get-involved" path="/get-involved" handler={getinvolved} addHandlerKey={true} />
    <Route name="meet-the-raptors" path="/meet-the-raptors" handler={meettheraptors} addHandlerKey={true} />
  </Route>

);


// Router.run(routes, Router.HistoryLocation, function (Handler) {
//   React.render(<Handler/>, document.body);
// });

var router = Router.create({
  routes: routes,
  location: Router.HistoryLocation,
	scrollBehavior: Router.ScrollToTopBehavior
});

router.run(function (Handler) {
  React.render(<Handler/>, document.body);
});
