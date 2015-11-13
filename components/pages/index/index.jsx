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
		meettheraptors = require('../meet-the-birds/index.jsx'),
		urbanwildlife = require('../urban-wildlife/index.jsx'),
		getinvolved = require('../get-involved/index.jsx'),
		boardofdirectors = require('../board-of-directors/index.jsx'),
		hoursandadmissions = require('../hours-and-admissions/index.jsx'),
		forestnow = require('../forest-now/index.jsx'),
		naturenotes = require('../nature-notes/index.jsx'),
		savetheoaks = require('../save-the-oaks/index.jsx'),
		contact = require('../contact/index.jsx'),
		posts = require('../posts/index.jsx'),
		post = require('../post/index.jsx');


var Loading = require('../../common/loading_arrows.jsx');
var Footer = require('../../common/footer.jsx');

var slide_names = [ 'forest', 'natural-resources', 'education', 'programs'];
var slide_count = 0;

var ga = require('react-google-analytics');
var GAInitiailizer = ga.Initializer;

var hotkey = require('react-hotkey');
hotkey.activate();

function msieversion() {

		var ua = window.navigator.userAgent;
		var msie = ua.indexOf("MSIE ");

		if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer, return version number
				return true
		else
				return false;


}

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
				"/img/loop_conservation.jpg",
				"/img/forest/texture.svg",
				"/img/conservation/texture.svg",
				"/img/education/texture.svg",
				"/img/programs/texture.svg"
			],
			ie: false
		};
	},

	componentDidMount: function(){
		var self = this;
		!function(A,e,t){function n(A,e){return typeof A===e}function o(){var A,e,t,o,i,a,r;for(var l in w)if(w.hasOwnProperty(l)){if(A=[],e=w[l],e.name&&(A.push(e.name.toLowerCase()),e.options&&e.options.aliases&&e.options.aliases.length))for(t=0;t<e.options.aliases.length;t++)A.push(e.options.aliases[t].toLowerCase());for(o=n(e.fn,"function")?e.fn():e.fn,i=0;i<A.length;i++)a=A[i],r=a.split("."),1===r.length?Modernizr[r[0]]=o:(!Modernizr[r[0]]||Modernizr[r[0]]instanceof Boolean||(Modernizr[r[0]]=new Boolean(Modernizr[r[0]])),Modernizr[r[0]][r[1]]=o),R.push((o?"":"no-")+r.join("-"))}}function i(A){var e=B.className,t=Modernizr._config.classPrefix||"";if(T&&(e=e.baseVal),Modernizr._config.enableJSClass){var n=new RegExp("(^|\\s)"+t+"no-js(\\s|$)");e=e.replace(n,"$1"+t+"js$2")}Modernizr._config.enableClasses&&(e+=" "+t+A.join(" "+t),T?B.className.baseVal=e:B.className=e)}function a(){return"function"!=typeof e.createElement?e.createElement(arguments[0]):T?e.createElementNS.call(e,"http://www.w3.org/2000/svg",arguments[0]):e.createElement.apply(e,arguments)}function r(A,e){if("object"==typeof A)for(var t in A)F(A,t)&&r(t,A[t]);else{A=A.toLowerCase();var n=A.split("."),o=Modernizr[n[0]];if(2==n.length&&(o=o[n[1]]),"undefined"!=typeof o)return Modernizr;e="function"==typeof e?e():e,1==n.length?Modernizr[n[0]]=e:(!Modernizr[n[0]]||Modernizr[n[0]]instanceof Boolean||(Modernizr[n[0]]=new Boolean(Modernizr[n[0]])),Modernizr[n[0]][n[1]]=e),i([(e&&0!=e?"":"no-")+n.join("-")]),Modernizr._trigger(A,e)}return Modernizr}function l(A,e){return!!~(""+A).indexOf(e)}function s(A){return A.replace(/([a-z])-([a-z])/g,function(A,e,t){return e+t.toUpperCase()}).replace(/^-/,"")}function c(A,e){return function(){return A.apply(e,arguments)}}function d(A,e,t){var o;for(var i in A)if(A[i]in e)return t===!1?A[i]:(o=e[A[i]],n(o,"function")?c(o,t||e):o);return!1}function u(A){return A.replace(/([A-Z])/g,function(A,e){return"-"+e.toLowerCase()}).replace(/^ms-/,"-ms-")}function p(){var A=e.body;return A||(A=a(T?"svg":"body"),A.fake=!0),A}function f(A,t,n,o){var i,r,l,s,c="modernizr",d=a("div"),u=p();if(parseInt(n,10))for(;n--;)l=a("div"),l.id=o?o[n]:c+(n+1),d.appendChild(l);return i=a("style"),i.type="text/css",i.id="s"+c,(u.fake?u:d).appendChild(i),u.appendChild(d),i.styleSheet?i.styleSheet.cssText=A:i.appendChild(e.createTextNode(A)),d.id=c,u.fake&&(u.style.background="",u.style.overflow="hidden",s=B.style.overflow,B.style.overflow="hidden",B.appendChild(u)),r=t(d,A),u.fake?(u.parentNode.removeChild(u),B.style.overflow=s,B.offsetHeight):d.parentNode.removeChild(d),!!r}function h(e,n){var o=e.length;if("CSS"in A&&"supports"in A.CSS){for(;o--;)if(A.CSS.supports(u(e[o]),n))return!0;return!1}if("CSSSupportsRule"in A){for(var i=[];o--;)i.push("("+u(e[o])+":"+n+")");return i=i.join(" or "),f("@supports ("+i+") { #modernizr { position: absolute; } }",function(A){return"absolute"==getComputedStyle(A,null).position})}return t}function m(A,e,o,i){function r(){d&&(delete U.style,delete U.modElem)}if(i=n(i,"undefined")?!1:i,!n(o,"undefined")){var c=h(A,o);if(!n(c,"undefined"))return c}for(var d,u,p,f,m,E=["modernizr","tspan"];!U.style;)d=!0,U.modElem=a(E.shift()),U.style=U.modElem.style;for(p=A.length,u=0;p>u;u++)if(f=A[u],m=U.style[f],l(f,"-")&&(f=s(f)),U.style[f]!==t){if(i||n(o,"undefined"))return r(),"pfx"==e?f:!0;try{U.style[f]=o}catch(g){}if(U.style[f]!=m)return r(),"pfx"==e?f:!0}return r(),!1}function E(A,e,t,o,i){var a=A.charAt(0).toUpperCase()+A.slice(1),r=(A+" "+y.join(a+" ")+a).split(" ");return n(e,"string")||n(e,"undefined")?m(r,e,o,i):(r=(A+" "+G.join(a+" ")+a).split(" "),d(r,e,t))}function g(A,e,n){return E(A,t,t,e,n)}var R=[],w=[],v={_version:"3.2.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(A,e){var t=this;setTimeout(function(){e(t[A])},0)},addTest:function(A,e,t){w.push({name:A,fn:e,options:t})},addAsyncTest:function(A){w.push({name:null,fn:A})}},Modernizr=function(){};Modernizr.prototype=v,Modernizr=new Modernizr,Modernizr.addTest("ie8compat",!A.addEventListener&&!!e.documentMode&&7===e.documentMode),Modernizr.addTest("svg",!!e.createElementNS&&!!e.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect);var B=e.documentElement,T="svg"===B.nodeName.toLowerCase();Modernizr.addTest("videoloop","loop"in a("video")),Modernizr.addTest("videopreload","preload"in a("video")),Modernizr.addTest("video",function(){var A=a("video"),e=!1;try{(e=!!A.canPlayType)&&(e=new Boolean(e),e.ogg=A.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),e.h264=A.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),e.webm=A.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,""),e.vp9=A.canPlayType('video/webm; codecs="vp9"').replace(/^no$/,""),e.hls=A.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/,""))}catch(t){}return e});var F;!function(){var A={}.hasOwnProperty;F=n(A,"undefined")||n(A.call,"undefined")?function(A,e){return e in A&&n(A.constructor.prototype[e],"undefined")}:function(e,t){return A.call(e,t)}}(),v._l={},v.on=function(A,e){this._l[A]||(this._l[A]=[]),this._l[A].push(e),Modernizr.hasOwnProperty(A)&&setTimeout(function(){Modernizr._trigger(A,Modernizr[A])},0)},v._trigger=function(A,e){if(this._l[A]){var t=this._l[A];setTimeout(function(){var A,n;for(A=0;A<t.length;A++)(n=t[A])(e)},0),delete this._l[A]}},Modernizr._q.push(function(){v.addTest=r}),Modernizr.addAsyncTest(function(){function A(t){clearTimeout(e),n.removeEventListener("playing",A,!1),r("videoautoplay",t&&"playing"===t.type||0!==n.currentTime),n.parentNode.removeChild(n)}var e,t=300,n=a("video"),o=n.style;if(!(Modernizr.video&&"autoplay"in n))return void r("videoautoplay",!1);o.position="absolute",o.height=0,o.width=0;try{if(Modernizr.video.ogg)n.src="data:video/ogg;base64,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";else{if(!Modernizr.video.h264)return void r("videoautoplay",!1);n.src="data:video/mp4;base64,AAAAHGZ0eXBtcDQyAAAAAG1wNDJpc29tYXZjMQAAAz5tb292AAAAbG12aGQAAAAAzaNacc2jWnEAAV+QAAFfkAABAAABAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAGGlvZHMAAAAAEICAgAcAT////3//AAACQ3RyYWsAAABcdGtoZAAAAAHNo1pxzaNacQAAAAEAAAAAAAFfkAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAEAAAABAAAAAAAd9tZGlhAAAAIG1kaGQAAAAAzaNacc2jWnEAAV+QAAFfkFXEAAAAAAAhaGRscgAAAAAAAAAAdmlkZQAAAAAAAAAAAAAAAAAAAAGWbWluZgAAABR2bWhkAAAAAQAAAAAAAAAAAAAAJGRpbmYAAAAcZHJlZgAAAAAAAAABAAAADHVybCAAAAABAAABVnN0YmwAAACpc3RzZAAAAAAAAAABAAAAmWF2YzEAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAEAAQAEgAAABIAAAAAAAAAAEOSlZUL0FWQyBDb2RpbmcAAAAAAAAAAAAAAAAAAAAAAAAY//8AAAAxYXZjQwH0AAr/4QAZZ/QACq609NQYBBkAAAMAAQAAAwAKjxImoAEABWjOAa8gAAAAEmNvbHJuY2xjAAYAAQAGAAAAGHN0dHMAAAAAAAAAAQAAAAUAAEZQAAAAKHN0c3oAAAAAAAAAAAAAAAUAAAIqAAAACAAAAAgAAAAIAAAACAAAAChzdHNjAAAAAAAAAAIAAAABAAAABAAAAAEAAAACAAAAAQAAAAEAAAAYc3RjbwAAAAAAAAACAAADYgAABaQAAAAUc3RzcwAAAAAAAAABAAAAAQAAABFzZHRwAAAAAAREREREAAAAb3VkdGEAAABnbWV0YQAAAAAAAAAhaGRscgAAAAAAAAAAbWRpcgAAAAAAAAAAAAAAAAAAAAA6aWxzdAAAADKpdG9vAAAAKmRhdGEAAAABAAAAAEhhbmRCcmFrZSAwLjkuOCAyMDEyMDcxODAwAAACUm1kYXQAAAHkBgX/4NxF6b3m2Ui3lizYINkj7u94MjY0IC0gY29yZSAxMjAgLSBILjI2NC9NUEVHLTQgQVZDIGNvZGVjIC0gQ29weWxlZnQgMjAwMy0yMDExIC0gaHR0cDovL3d3dy52aWRlb2xhbi5vcmcveDI2NC5odG1sIC0gb3B0aW9uczogY2FiYWM9MCByZWY9MSBkZWJsb2NrPTE6MDowIGFuYWx5c2U9MHgxOjAgbWU9ZXNhIHN1Ym1lPTkgcHN5PTAgbWl4ZWRfcmVmPTAgbWVfcmFuZ2U9NCBjaHJvbWFfbWU9MSB0cmVsbGlzPTAgOHg4ZGN0PTAgY3FtPTAgZGVhZHpvbmU9MjEsMTEgZmFzdF9wc2tpcD0wIGNocm9tYV9xcF9vZmZzZXQ9MCB0aHJlYWRzPTYgc2xpY2VkX3RocmVhZHM9MCBucj0wIGRlY2ltYXRlPTEgaW50ZXJsYWNlZD0wIGJsdXJheV9jb21wYXQ9MCBjb25zdHJhaW5lZF9pbnRyYT0wIGJmcmFtZXM9MCB3ZWlnaHRwPTAga2V5aW50PTUwIGtleWludF9taW49NSBzY2VuZWN1dD00MCBpbnRyYV9yZWZyZXNoPTAgcmM9Y3FwIG1idHJlZT0wIHFwPTAAgAAAAD5liISscR8A+E4ACAACFoAAITAAAgsAAPgYCoKgoC+L4vi+KAvi+L4YfAEAACMzgABF9AAEUGUgABDJiXnf4AAAAARBmiKUAAAABEGaQpQAAAAEQZpilAAAAARBmoKU"}}catch(i){return void r("videoautoplay",!1)}n.setAttribute("autoplay",""),n.style.cssText="display:none",B.appendChild(n),setTimeout(function(){n.addEventListener("playing",A,!1),e=setTimeout(A,t)},0)});var C="Moz O ms Webkit",y=v._config.usePrefixes?C.split(" "):[];v._cssomPrefixes=y;var G=v._config.usePrefixes?C.toLowerCase().split(" "):[];v._domPrefixes=G;var Q={elem:a("modernizr")};Modernizr._q.push(function(){delete Q.elem});var U={style:Q.elem.style};Modernizr._q.unshift(function(){delete U.style}),v.testAllProps=E,v.testAllProps=g,Modernizr.addTest("flexboxtweener",g("flexAlign","end",!0)),Modernizr.addTest("flexwrap",g("flexWrap","wrap",!0)),o(),i(R),delete v.addTest,delete v.addAsyncTest;for(var V=0;V<Modernizr._q.length;V++)Modernizr._q[V]();A.Modernizr=Modernizr}(window,document);

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
	  var top = new ScrollMagic.Scene({
								triggerHook: 0,
	              duration: '97%',
								offset: -60
	          })
	          .setClassToggle("header.header", "scrolled")
	          .addTo(controller);
		self.setState({controller: controller});

		var load_images = self.state.load_images;
    for (image in load_images) {
      tmp_image = new Image();
      tmp_image.onload = self.onLoad;
      tmp_image.src = load_images[image];
    }

		var ie = msieversion();
		console.log("ie: "+ie);
		self.setState({ie: ie});
	},

	onLoad: function() {
		var self = this;
		var tmp_pre_count = self.state.pre_count;
		tmp_pre_count++;

		if (tmp_pre_count == self.state.load_images.length) {

			self.setState({pre_count: tmp_pre_count, percent_loaded: 100,});
			setTimeout(function() { self.setState({loaded: true}); }, 150);



		} else {

			var percent_loaded = (tmp_pre_count / self.state.load_images.length ) * 100;
			self.setState({pre_count: tmp_pre_count, percent_loaded: percent_loaded});

		}

	},

	onClickRight: function(){
		var self = this;

		var name = self.getHandlerKey();
		slide_count = slide_names.indexOf(name);

		if (slide_count ==  slide_names.length ) {
			slide_count = 0;
		} else {
			slide_count++;
		}

		self.setState({currentTransition: 'slide-forward'});
		self.transitionTo(slide_names[slide_count% slide_names.length ]);

		setTimeout(function() { self.setState({currentTransition: 'default'}); }, 300);
	},

	onClickLeft: function(){
		var self = this;
		var name = this.getHandlerKey();

		slide_count = slide_names.indexOf(name);

		if (slide_count == 0) {
			slide_count = slide_names.length - 1;
		} else {
			slide_count--;
		}

		self.setState({currentTransition: 'slide-back'});
		self.transitionTo(slide_names[slide_count% slide_names.length ]);
		setTimeout(function() { self.setState({currentTransition: 'default'}); }, 300);
	},

	rightLink: function(name){
		var self = this;
		slide_count = slide_names.indexOf(name);

		self.setState({currentTransition: 'slide-forward'});
		self.transitionTo(name);
		setTimeout(function() { self.setState({currentTransition: 'default'}); }, 300);
	},

	leftLink: function(name){
		var self = this;
		slide_count = slide_names.indexOf(name);

		self.setState({currentTransition: 'slide-back'});
		self.transitionTo(slide_names[name]);
		setTimeout(function() { self.setState({currentTransition: 'default'}); }, 300);
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
		var self = this;
		self.closeMenu();
		var controller = self.state.controller;
		controller.scrollTo("#"+thing);
	},


	render: function () {
		var self = this;
		var name = self.getHandlerKey();

		var transition = self.state.currentTransition;
		var menu = self.state.menu;

		var ie = self.state.ie;

		if (ie == true) {
			var ie_class = " ie";
		} else {
			var ie_class = "";
		}

		if (menu) {
			var menu_class = " menu_open";
		} else {
			var menu_class = "";
		}

		var main_pages = slide_names.indexOf(name) > -1;

		if (main_pages){
			var header_up = "";
		} else {
			var header_up = " header_up ";
		}
		if (self.state.loaded == true) {
			var controller = self.state.controller;
			document.documentElement.classList.remove('loading');
			return (
			  <div className={"fontenelle " + name + menu_class + header_up + ie_class} >
			    <header className="header">
			        <Link to="/" className="logo"><img src="/img/logo.png" alt="" /></Link>
			        <span className="global_menu">
			            <Link to="/found-raptor" className="link">Found Raptor</Link>
			            <Link to="/forest-now" className="link">Forest Now</Link>
									<Link to="/get-involved" className="link">Get Involved</Link>
			        </span>
							<span className="menu_icon" onClick={self.toggleMenu}><img src="/img/hamburger.png" className="hamburger" /> <span className="menu_label">Menu</span></span>
			    </header>
					<div className="sidebar">
						<span className="close_menu_button" onClick={self.toggleMenu}>×</span>
						<div className="sidebar_links">
							<Link to="/" className="link" onClick={self.toggleMenu}><h2 className="forest main">Forest</h2></Link>

							<Link to="/forest/trails" className="link section" onClick={self.toggleMenu}>Trails</Link>
							<Link to="/forest/fauna" className="link section" onClick={self.toggleMenu}>Fauna &amp; Flora</Link>
							<Link to="/forest/young" className="link section" onClick={self.toggleMenu}>Little Explorers</Link>

							<Link to="/natural-resources" className="link" onClick={self.toggleMenu}><h2 className="conservation main">Natural Resources</h2></Link>

							<Link to="/natural-resources/history" className="link section" onClick={self.toggleMenu}>History</Link>
							<Link to="/natural-resources/habitat" className="link section" onClick={self.toggleMenu}>Habitat Management</Link>
							<Link to="/natural-resources/raptor" className="link section" onClick={self.toggleMenu}>Raptor Recovery</Link>

							<Link to="/education" className="link" onClick={self.toggleMenu}><h2 className="education main">Education</h2></Link>
							<Link to="/education/classes" className="link section" onClick={self.toggleMenu}>Classes</Link>

							<Link to="/programs" className="link" onClick={self.toggleMenu}><h2 className="programs main">Programs</h2></Link>

							<Link to="/programs/kids" className="link section" onClick={self.toggleMenu}>Kids</Link>
							<Link to="/programs/adults" className="link section" onClick={self.toggleMenu}>Adults</Link>
							<Link to="/programs/groups" className="link section" onClick={self.toggleMenu}>Groups</Link>

							<Link to="/forest-now" className="link" onClick={self.toggleMenu}><h2 className="main">Forest Now</h2></Link>
							<Link to="/get-involved/donate" className="link" onClick={self.toggleMenu}><h2 className="main">Donate</h2></Link>
							<Link to="/get-involved/membership" className="link" onClick={self.toggleMenu}><h2 className="main">Membership</h2></Link>
							<Link to="/get-involved/volunteer" className="link" onClick={self.toggleMenu}><h2 className="main">Volunteer</h2></Link>
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
			    	<RouteHandler key={name} transition={self.setTransition} controller={controller}/>
			    </TransitionGroup>
					<Footer />
					<GAInitiailizer />
			  </div>
			)
		} else {
			document.documentElement.classList.add('loading');
			return (
				<div className={"fontenelle loading header_up " + name + menu_class + ie_class} >
					<header className="header">
							<Link to="/" className="logo"><img src="/img/logo.png" alt="" /></Link>
							<span className="global_menu">
									<Link to="/found-raptor" className="link">Found Raptor</Link>
									<Link to="/forest-now" className="link">Forest Now</Link>
									<Link to="/get-involved" className="link">Get Involved</Link>
							</span>
							<span className="menu_icon" onClick={self.toggleMenu}><img src="/img/hamburger.png" className="hamburger" /> <span className="menu_label">Menu</span></span>
					</header>
					<div className="sidebar">
						<span className="close_menu_button" onClick={self.toggleMenu}>×</span>
						<div className="sidebar_links">
							<Link to="/" className="link" onClick={self.toggleMenu}><h2 className="forest main">Forest</h2></Link>

							<Link to="/forest/trails" className="link section" onClick={self.toggleMenu}>Trails</Link>
							<Link to="/forest/fauna" className="link section" onClick={self.toggleMenu}>Fauna &amp; Flora</Link>
							<Link to="/forest/young" className="link section" onClick={self.toggleMenu}>Little Explorers</Link>

							<Link to="/natural-resources" className="link" onClick={self.toggleMenu}><h2 className="conservation main">Natural Resources</h2></Link>

							<Link to="/natural-resources/history" className="link section" onClick={self.toggleMenu}>History</Link>
							<Link to="/natural-resources/habitat" className="link section" onClick={self.toggleMenu}>Habitat Management</Link>
							<Link to="/natural-resources/raptor" className="link section" onClick={self.toggleMenu}>Raptor Recovery</Link>

							<Link to="/education" className="link" onClick={self.toggleMenu}><h2 className="education main">Education</h2></Link>
							<Link to="/education/classes" className="link section" onClick={self.toggleMenu}>Classes</Link>

							<Link to="/programs" className="link" onClick={self.toggleMenu}><h2 className="programs main">Programs</h2></Link>

							<Link to="/programs/kids" className="link section" onClick={self.toggleMenu}>Kids</Link>
							<Link to="/programs/adults" className="link section" onClick={self.toggleMenu}>Adults</Link>
							<Link to="/programs/groups" className="link section" onClick={self.toggleMenu}>Groups</Link>

							<Link to="/forest-now" className="link" onClick={self.toggleMenu}><h2 className="main">Forest Now</h2></Link>
							<Link to="/get-involved/donate" className="link" onClick={self.toggleMenu}><h2 className="main">Donate</h2></Link>
							<Link to="/get-involved/membership" className="link" onClick={self.toggleMenu}><h2 className="main">Membership</h2></Link>
							<Link to="/get-involved/volunteer" className="link" onClick={self.toggleMenu}><h2 className="main">Volunteer</h2></Link>
							<Link to="/board-of-directors" className="link" onClick={self.toggleMenu}><h2 className="main">Board</h2></Link>
							<Link to="/hours-and-admissions" className="link" onClick={self.toggleMenu}><h2 className="main">Hours and Admissions</h2></Link>
							<Link to="/contact" className="link" onClick={self.toggleMenu}><h2 className="main">Contact</h2></Link>
						</div>
					</div>
					<div className="main_content" id="main_content">
						<div className="loading-container">
							<Loading />
							<div className="load_message marker">Loading</div>
						</div>
					</div>
					<Footer />
					<GAInitiailizer />
				</div>
			)
		}
	}
});

var routes = (
  <Route handler={App}>
    <Route name="forest" path="/" handler={forest} addHandlerKey={true} ignoreScrollBehavior>
			<Route path="/forest/:scroll" handler={forest} addHandlerKey={true}/>
		</Route>
    <Route name="natural-resources" path="/natural-resources" handler={naturalresources} addHandlerKey={true} ignoreScrollBehavior>
			<Route path="/natural-resources/:scroll" handler={naturalresources} addHandlerKey={true} />
		</Route>
    <Route name="programs" path="/programs" handler={programs} addHandlerKey={true} ignoreScrollBehavior>
			<Route path="/programs/:scroll" handler={programs} addHandlerKey={true} />
		</Route>
		<Route name="education" path="/education" handler={education} addHandlerKey={true} ignoreScrollBehavior>
			<Route path="/education/:scroll" handler={education} addHandlerKey={true} />
		</Route>
    <Route name="found-raptor" path="/found-raptor" handler={foundraptor} addHandlerKey={true} />
    <Route name="get-involved" path="/get-involved" handler={getinvolved} addHandlerKey={true} ignoreScrollBehavior>
			<Route path="/get-involved/:scroll" handler={getinvolved} addHandlerKey={true} />
		</Route>
    <Route name="meet-the-raptors" path="/meet-the-raptors" handler={meettheraptors} addHandlerKey={true} />
    <Route name="hours-and-admissions" path="/hours-and-admissions" handler={hoursandadmissions} addHandlerKey={true} />
    <Route name="board-of-directors" path="/board-of-directors" handler={boardofdirectors} addHandlerKey={true} />
    <Route name="forest-now" path="/forest-now" handler={forestnow} addHandlerKey={true} />
		<Route name="nature-notes" path="/forest-now/nature-notes" handler={naturenotes} addHandlerKey={true} />
    <Route name="save-the-oaks" path="/save-the-oaks" handler={savetheoaks} addHandlerKey={true} />
		<Route name="contact" path="/contact" handler={contact} addHandlerKey={true} />
		<Route path="/post/:name" handler={post} addHandlerKey={true} />
		<Route path="/posts" handler={posts} addHandlerKey={true} />
		<Route path="/urban-wildlife" handler={urbanwildlife} addHandlerKey={true} />

  </Route>

);


// Router.run(routes, Router.HistoryLocation, function (Handler) {
//   React.render(<Handler/>, document.body);
// });

// var ga = require('./ga');

// function analytics(state, options) {
//   if (!options) {
//     options = {};
//   }
//   options.page = state.path;
//   ga('send', 'pageview', options);
// }
function analytics(state, options) {
	console.log('analytics: '+state.path);
	var create = ga('create', 'UA-29023725-1', 'auto');
	var send = ga('send', 'pageview');

	console.log('create: '+create);
	console.log('send: '+send);
}

var router = Router.create({
  routes: routes,
  location: Router.HistoryLocation
});

router.run(function (Handler, state) {
  React.render(<Handler/>, document.body);
	analytics(state);
});
