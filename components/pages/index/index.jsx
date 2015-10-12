var React = require('react');
var Router = require('react-router');
// var TransitionGroup = require('./timeoutTransitionGroup.jsx');
var TransitionGroup = require('./VelocityTransitionGroup.jsx');

var util = require('util');
//
var ScrollMagic = require('scrollmagic');
var TweenMax = require('../../../public/js/tweenmax.js');
require('../../../public/js/scrollTo.js');

var Route = Router.Route,
		DefaultRoute = Router.DefaultRoute,
  	NotFoundRoute = Router.NotFoundRoute,
  	RouteHandler = Router.RouteHandler,
  	Link = Router.Link;


var forest = require('../forest/index.jsx'),
		naturalresources = require('../conservation/index.jsx'),
		programs = require('../programs/index.jsx'),
		education = require('../education/index.jsx'),
		foundraptor = require('../found-raptor/index.jsx'),
		meettheraptors = require('../meet-the-raptors/index.jsx'),
		getinvolved = require('../get-involved/index.jsx'),
		boardofdirectors = require('../board-of-directors/index.jsx'),
		hoursandadmissions = require('../hours-and-admissions/index.jsx'),
		forestnow = require('../forest-now/index.jsx'),
		savetheoaks = require('../save-the-oaks/index.jsx'),
		contact = require('../contact/index.jsx');

var slide_names = [ 'forest', 'natural-resources', 'education', 'programs'];
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
		return {
			currentTransition: 'default',
			menu: false,
			pre_count: 0,
			percent_loaded: 0,
			load_images: [
				"/img/loop_one.jpg",
				"/img/loop_programs.jpg",
				"/img/loop_education.jpg",
				"/img/loop_conservation.jpg"
			],
		};
	},

	componentDidMount: function(){
		var self = this;

		var controller = new ScrollMagic.Controller();
	  var top = new ScrollMagic.Scene({
								triggerHook: 0,
	              duration: '97%',
								offset: -60
	          })
	          .setClassToggle("header.header", "scrolled")
	          .addTo(controller);

		var load_images = self.state.load_images;
    console.log("load_images: " + load_images);
    for (image in load_images) {
      console.log("image: " + load_images[image]);
      tmp_image = new Image();
      tmp_image.onload = self.onLoad;
      tmp_image.src = load_images[image];
    }
	},

	onLoad: function() {
		var self = this;
		var tmp_pre_count = self.state.pre_count;
		tmp_pre_count++;

		if (tmp_pre_count == self.state.load_images.length) {

			self.setState({pre_count: tmp_pre_count, percent_loaded: 100});
			setTimeout(function() { self.setState({loaded: true}); }, 150);

		} else {

			var percent_loaded = (tmp_pre_count / self.state.load_images.length ) * 100;
			self.setState({pre_count: tmp_pre_count, percent_loaded: percent_loaded});

		}

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

	closeMenu: function(){
		this.setState({menu: false});
	},

	scrollThing: function(thing){
		this.closeMenu();
		var controller = new ScrollMagic.Controller();
		controller.scrollTo(function(target) {

			TweenMax.to(window, 0.5, {
				scrollTo : {
					y : target - 60, // scroll position of the target along y axis
					autoKill : true // allows user to kill scroll action smoothly
				},
				ease : Cubic.easeInOut
			});

		});
		controller.scrollTo("#"+thing);
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
		if (self.state.loaded == true) {
			return (
			  <div className={"fontenelle " + name + menu_class + header_up} >
			    <header className="header">
			        <Link to="/" className="logo"><img src="/img/logo.png" alt="" /></Link>
			        <span className="global_menu">
			            <Link to="/found-raptor" className="link">Found Raptor</Link>
			            <a href="/forest-now" className="link">Forest Now</a>
									<Link to="/get-involved" className="link">Get Involved</Link>
			        </span>
							<span className="menu_icon" onClick={self.toggleMenu}><img src="/img/hamburger.png" className="hamburger" /> <span className="menu_label">Menu</span></span>
			    </header>
					<div className="sidebar">
						<span className="close_menu_button" onClick={self.toggleMenu}>×</span>
						<div className="sidebar_links">
							<Link to="/" className="link" onClick={self.toggleMenu}><h2 className="forest main">Forest</h2></Link>
							{ name == 'forest' ?
								<span>
									<span className="link section" onClick={self.scrollThing.bind(this, "trails")}>Trails</span>
									<span className="link section" onClick={self.scrollThing.bind(this, "fauna")}>Fauna &amp; Flora</span>
									<span className="link section" onClick={self.scrollThing.bind(this, "young")}>Little Explorers</span>
								</span>
							:
								<span>
									<a href="/#trails" className="link section" onClick={self.toggleMenu}>Trails</a>
									<a href="/#fauna" className="link section" onClick={self.toggleMenu}>Fauna &amp; Flora</a>
									<a href="/#young" className="link section" onClick={self.toggleMenu}>Little Explorers</a>
								</span>
							}
							<Link to="/natural-resources" className="link" onClick={self.toggleMenu}><h2 className="conservation main">Natural Resources</h2></Link>
							<span className="link section" onClick={self.scrollThing.bind(this, "history")}>History</span>
							<span className="link section" onClick={self.scrollThing.bind(this, "habitat")}>Habitat Management</span>
							<span className="link section" onClick={self.scrollThing.bind(this, "raptor")}>Raptor Recovery</span>
							<Link to="/education" className="link" onClick={self.toggleMenu}><h2 className="education main">Education</h2></Link>
							<Link to="/education/classes" className="link section" onClick={self.toggleMenu}>Classes</Link>
							<Link to="/programs" className="link" onClick={self.toggleMenu}><h2 className="programs main">Programs</h2></Link>
							<span className="link section" onClick={self.scrollThing.bind(this, "kids")}>Kids</span>
							<span className="link section" onClick={self.scrollThing.bind(this, "adults")}>Adults</span>
							<span className="link section" onClick={self.scrollThing.bind(this, "groups")}>Groups</span>
							<Link to="/forest-now" className="link" onClick={self.toggleMenu}><h2 className="main">Forest Now</h2></Link>
							<Link to="/get-involved" className="link" onClick={self.toggleMenu}><h2 className="main">Donate</h2></Link>
							<Link to="/get-involved" className="link" onClick={self.toggleMenu}><h2 className="main">Membership</h2></Link>
							<Link to="/get-involved" className="link" onClick={self.toggleMenu}><h2 className="main">Volunteer</h2></Link>
							<Link to="/board-of-directors" className="link" onClick={self.toggleMenu}><h2 className="main">Board</h2></Link>
							<Link to="/hours-and-admissions" className="link" onClick={self.toggleMenu}><h2 className="main">Hours and Admissions</h2></Link>
							<Link to="/contact" className="link" onClick={self.toggleMenu}><h2 className="main">Contact</h2></Link>
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
			)
		} else {
			return (
				<div className={"fontenelle loading header_up" + name + menu_class} >
					<header className="header">
							<Link to="/" className="logo"><img src="/img/logo.png" alt="" /></Link>
							<span className="global_menu">
									<Link to="/found-raptor" className="link">Found Raptor</Link>
									<a href="/forest-now" className="link">Forest Now</a>
									<Link to="/get-involved" className="link">Get Involved</Link>
							</span>
							<span className="menu_icon" onClick={self.toggleMenu}><img src="/img/hamburger.png" className="hamburger" /> <span className="menu_label">Menu</span></span>
					</header>
					<div className="sidebar">
						<span className="close_menu_button" onClick={self.toggleMenu}>×</span>
						<div className="sidebar_links">
							<Link to="/" className="link" onClick={self.toggleMenu}><h2 className="forest main">Forest</h2></Link>
							{ name == 'forest' ?
								<span>
									<span className="link section" onClick={self.scrollThing.bind(this, "trails")}>Trails</span>
									<span className="link section" onClick={self.scrollThing.bind(this, "fauna")}>Fauna &amp; Flora</span>
									<span className="link section" onClick={self.scrollThing.bind(this, "young")}>Little Explorers</span>
								</span>
							:
								<span>
									<a href="/#trails" className="link section" onClick={self.toggleMenu}>Trails</a>
									<a href="/#fauna" className="link section" onClick={self.toggleMenu}>Fauna &amp; Flora</a>
									<a href="/#young" className="link section" onClick={self.toggleMenu}>Little Explorers</a>
								</span>
							}
							<Link to="/natural-resources" className="link" onClick={self.toggleMenu}><h2 className="conservation main">Natural Resources</h2></Link>
							<span className="link section" onClick={self.scrollThing.bind(this, "history")}>History</span>
							<span className="link section" onClick={self.scrollThing.bind(this, "habitat")}>Habitat Management</span>
							<span className="link section" onClick={self.scrollThing.bind(this, "raptor")}>Raptor Recovery</span>
							<Link to="/education" className="link" onClick={self.toggleMenu}><h2 className="education main">Education</h2></Link>
							<Link to="/education/classes" className="link section">Classes</Link>
							<Link to="/programs" className="link" onClick={self.toggleMenu}><h2 className="programs main">Programs</h2></Link>
							<span className="link section" onClick={self.scrollThing.bind(this, "kids")}>Kids</span>
							<span className="link section" onClick={self.scrollThing.bind(this, "adults")}>Adults</span>
							<span className="link section" onClick={self.scrollThing.bind(this, "groups")}>Groups</span>
							<Link to="/forest-now" className="link" onClick={self.toggleMenu}><h2 className="main">Forest Now</h2></Link>
							<Link to="/get-involved" className="link" onClick={self.toggleMenu}><h2 className="main">Donate</h2></Link>
							<Link to="/get-involved" className="link" onClick={self.toggleMenu}><h2 className="main">Membership</h2></Link>
							<Link to="/get-involved" className="link" onClick={self.toggleMenu}><h2 className="main">Volunteer</h2></Link>
							<Link to="/board-of-directors" className="link" onClick={self.toggleMenu}><h2 className="main">Board</h2></Link>
							<Link to="/hours-and-admissions" className="link" onClick={self.toggleMenu}><h2 className="main">Hours and Admissions</h2></Link>
							<Link to="/contact" className="link" onClick={self.toggleMenu}><h2 className="main">Contact</h2></Link>
						</div>
					</div>
					<div className="main_content" id="main_content">
						<i className="fa fa-cog fa-spin"></i>
						<div className="load_message">Loading content for {name}.</div>
					</div>
				</div>
			)
		}
	}
});

var routes = (
  <Route handler={App}>
    <Route name="forest" path="/" handler={forest} addHandlerKey={true}/>
    <Route name="natural-resources" path="/natural-resources" handler={naturalresources} addHandlerKey={true}/>
    <Route name="programs" path="/programs" handler={programs} addHandlerKey={true} />
		<Route name="education" path="/education" handler={education} addHandlerKey={true}>
			<Route path="/education/:scroll" handler={education} addHandlerKey={true} />
		</Route>
    <Route name="found-raptor" path="/found-raptor" handler={foundraptor} addHandlerKey={true} />
    <Route name="get-involved" path="/get-involved" handler={getinvolved} addHandlerKey={true} />
    <Route name="meet-the-raptors" path="/meet-the-raptors" handler={meettheraptors} addHandlerKey={true} />
    <Route name="hours-and-admissions" path="/hours-and-admissions" handler={hoursandadmissions} addHandlerKey={true} />
    <Route name="board-of-directors" path="/board-of-directors" handler={boardofdirectors} addHandlerKey={true} />
    <Route name="forest-now" path="/forest-now" handler={forestnow} addHandlerKey={true} />
    <Route name="save-the-oaks" path="/save-the-oaks" handler={savetheoaks} addHandlerKey={true} />
		<Route name="contact" path="/contact" handler={contact} addHandlerKey={true} />
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
