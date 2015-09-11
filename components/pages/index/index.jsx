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
		return { currentTransition: 'default', menu: false };
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

	toggleMenu: function(){
		this.setState({menu: !this.state.menu});
	},

	render: function () {
		var self = this;
		var name = this.getHandlerKey();

		var transition = self.state.currentTransition;
		var menu = self.state.menu;
		if (menu) {
			var menu_class = " menu_open";
		} else {
			var menu_class = "";
		}
		var main_pages = slide_names.indexOf(name) > -1;
		if (main_pages){
			var header_up = "";
		} else {
			var header_up = " header_up";
		}
		return (
		  <div className={"fontenelle " + name + menu_class + header_up} >
		    <header className="header">
		        <Link to="/" className="logo"><img src="/img/logo.png" alt="" /></Link>
		        <span className="global_menu">
		            <Link to="/found-raptor" className="link">Found Raptor</Link>
		            <a href="#" className="link">Forest Now</a>
								<Link to="/get-involved" className="link">Get Involved</Link>
		        </span>
						<span className="menu_icon" onClick={self.toggleMenu}>Menu</span>
		    </header>
				<div className="sidebar">
					<span className="close_menu_button" onClick={self.toggleMenu}>×</span>
					<div className="sidebar_links">
						<Link to="/" className="link" onClick={self.toggleMenu}><h2 className="forest main">Forest</h2></Link>
						<a href="#" className="link section" onClick={self.toggleMenu}>Trails</a>
						<a href="#" className="link section" onClick={self.toggleMenu}>Fauna &amp; Flora</a>
						<a href="#" className="link section" onClick={self.toggleMenu}>Young Adventurers</a>
						<Link to="/conservation" className="link" onClick={self.toggleMenu}><h2 className="conservation main">Conservation</h2></Link>
						<a href="#" className="link section" onClick={self.toggleMenu}>History</a>
						<a href="#" className="link section" onClick={self.toggleMenu}>Habitat Management</a>
						<Link to="/conservation#raptor" className="link section" onClick={self.toggleMenu}>Raptor Recovery</Link>
						<Link to="/education" className="link" onClick={self.toggleMenu}><h2 className="education main">Education</h2></Link>
						<a href="#" className="link section" onClick={self.toggleMenu}>Classes</a>
						<Link to="/programs" className="link" onClick={self.toggleMenu}><h2 className="programs main">Programs</h2></Link>
						<a href="#" className="link section" onClick={self.toggleMenu}>Kids</a>
						<a href="#" className="link section" onClick={self.toggleMenu}>Adults</a>
						<a href="#" className="link section" onClick={self.toggleMenu}>Groups</a>
						<Link to="/" className="link" onClick={self.toggleMenu}><h2 className="main">Forest Now</h2></Link>
						<Link to="/" className="link" onClick={self.toggleMenu}><h2 className="main">Donate</h2></Link>
						<Link to="/" className="link" onClick={self.toggleMenu}><h2 className="main">Membership</h2></Link>
						<Link to="/" className="link" onClick={self.toggleMenu}><h2 className="main">Volunteer</h2></Link>
						<Link to="/" className="link" onClick={self.toggleMenu}><h2 className="main">Board</h2></Link>
						<Link to="/" className="link" onClick={self.toggleMenu}><h2 className="main">Staff</h2></Link>
						<Link to="/" className="link" onClick={self.toggleMenu}><h2 className="main">Contact</h2></Link>
					</div>
				</div>
				{ main_pages ?
				<div className="slide_controls">
					<span className="left slider_button" onClick={self.onClickLeft}><img src="/img/icon_scroll-left.svg" /></span>
					<span className="right slider_button" onClick={self.onClickRight}><img src="/img/icon_scroll-right.svg" /></span>
				</div>
				: null }
				<div className="menu_overlay" onClick={self.toggleMenu}></div>

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
