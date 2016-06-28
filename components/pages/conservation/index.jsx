var React = require('react'),
    request = require('superagent'),
    util = require('util');
var Velocity = require('velocity-animate/velocity');
var InlineSVG = require('react-inlinesvg');
var Router = require('react-router');

var Navigation = Router.Navigation;
var Link = Router.Link;

var timeline = require('../../common/timeline.json');

var Footer = require('../../common/footer.jsx');

var SetIntervalMixin = {
  componentWillMount: function() {
    this.intervals = [];
  },
  setInterval: function() {
    this.intervals.push(setInterval.apply(null, arguments));
  },
  componentWillUnmount: function() {
    this.intervals.forEach(clearInterval);
  }
};


var HabitatThing = React.createClass({
  render : function(){
    var self = this;
    return (
      <div className="habitat_container main_wrapper">
        <div className="quiet_wild image_container">
          <img src={self.props.image} />
        </div>
        <div className="quiet_wild copy_container">
          <h2>{self.props.title}</h2>
          <p>{self.props.description}</p>
          {self.props.link ? <Link className="habitat_thing_link" to={self.props.link}>Read More</Link> : null}
        </div>
      </div>
    )
  }
});


var TimelineThing = React.createClass({
  render : function(){
    var self = this;
    return (
      <div className="timeline_item" >
        <h4 className="year">{self.props.year}</h4>
        <span className="circle"></span>
        <div className="timeline_container">
          <div className="description">
            <h4 className="title">{self.props.title}</h4>
            <p className="description">{self.props.description}</p>
          </div>
        </div>
      </div>
    )
  }
});


var poster_image;
var Main = React.createClass({
  mixins: [ Router.State, Navigation, SetIntervalMixin ],
  getInitialState: function() {
    return {
      pre_count: 0,
      percent_loaded: 0,
      load_images: [
        "/img/conservation/Natural-Resources-trail-photo.jpg",
        "/img/conservation/Meet-Raptors.jpg",
        "/img/conservation/urban-wildlife.jpg",
        "/img/conservation/sign.png",
        "/img/conservation/log.png",
        "/img/conservation/provenplan.png",
        "/img/conservation.png"
      ],
      left: 0,
      windowWidth: window.innerWidth,
      controller: {},
      scrollPos: 0,
      timeline: timeline,
      arrow_class: false
    };
  },

  handleResize: function(e) {

    this.setState({ windowWidth: window.innerWidth });
  },

  componentWillMount: function () { },

  componentDidMount: function () {
    var self = this;
    var load_images = self.state.load_images;
    for (var image in load_images) {
      var tmp_image = new Image();
      tmp_image.onload = self.onLoad;
      tmp_image.src = load_images[image];
    }

    self.setInterval(function() { self.setState({arrow_class: !self.state.arrow_class}); }, 500);
  },

  componentWillReceiveProps: function (nextProps) {
    var self  = this;
  },

  componentDidUpdate: function (prevProps, prevState) {
    var self  = this;

    if (prevProps.params != self.props.params){
      self.scrollThing(self.props.params.scroll);
    }
  },

  onLoad: function() {
    var self = this;
    var tmp_pre_count = self.state.pre_count;
    tmp_pre_count++;

    if (tmp_pre_count == self.state.load_images.length) {

      self.setState({pre_count: tmp_pre_count, percent_loaded: 100});
      setTimeout(function() { self.setState({loaded: true}); }, 150);
      setTimeout(function() {
        if (self.getParams().scroll) {
          self.scrollThing(self.getParams().scroll)
        }
      }, 350);
    } else {

      var percent_loaded = (tmp_pre_count / self.state.load_images.length ) * 100;
      self.setState({pre_count: tmp_pre_count, percent_loaded: percent_loaded});

    }

  },

  moveLeft: function(){
    var self = this;
    self.props.transition('slide-back');
    self.transitionTo('forest');
    setTimeout(function() { self.props.transition('default'); }, 300);
  },


  moveRight: function(){
    var self = this;
    self.props.transition('slide-forward');
    self.transitionTo('education');
    setTimeout(function() { self.props.transition('default'); }, 300);
  },

  scrollThing: function(thing){
    var self = this;
    var controller = self.props.controller
    if (thing) {
      controller.scrollTo("#"+thing);
    } else {
      controller.scrollTo(0);
    }
  },

  timelineRight: function(){
    var self = this;
    var gallery_width = Math.ceil(self.state.timeline.length) * 430;

    var window_width = self.state.windowWidth;
    var left = self.state.left;

    if (window_width <= (gallery_width - left)) {
      self.setState({left: self.state.left + 430});
    }
  },

  timelineLeft: function(){
    var self = this;
    var left = self.state.left;

    if (left > 0) {
      self.setState({left: self.state.left + -430});
    }
  },

  topScroll: function(){
    this.scrollThing('page');
  },


  render: function() {
    var self = this;

    var arrow_class = self.state.arrow_class;

    var timeline = self.state.timeline.map(function(object) {
      return <TimelineThing
          year={object.year}
          title={object.title}
          description={object.description}
          key={object.title} />
    });

    var timelineStyles = {
      width: timeline.length * 430 +"px",
      marginLeft: "-" + self.state.left + "px"
    };

    var thelineStyles = {
      width: timeline.length * 430 - 230 +"px"
    };

    var videoOne_style = {
      backgroundImage: 'url(/img/conservation/Natural-Resources-trail-photo.jpg)'
    }

    var videoTwo_style = {
      backgroundImage: 'url(/img/conservation/Meet-Raptors.jpg)'
    }

    var videoThree_style = {
      backgroundImage: 'url(/img/conservation/urban-wildlife.jpg)'
    }

    var loadStyle = {
      width: self.state.percent_loaded + "%"
    }
    if (self.state.loaded == true) {
      return (
        <div className="page conservation_page">
          <div className="page_wrapper">
            <div className="page_container" id="page"  style={loadStyle}>
              <div className="egg_wrap">
                <div className="ongoing_story_container main_wrapper birds_container">
                  <div className="quiet_wild birds_right">
                    <img src="/img/conservation/birds_left.png" />
                  </div>
                </div>
                <div className="ongoing_story_container main_wrapper">
                  <div className="quiet_wild streetsign">
                    <img src="/img/conservation/sign.png" />
                  </div>
                  <div className="quiet_wild copy_container">
                    <h2 className="marker">An Ongoing Story</h2>
                    <p>The forest is a complex ecosystem that is constantly evolving. It is part of our mission to both understand its history and to plan and protect its future. What you see when you look out into the dense trees, prairie grasses, and marshy wetlands today is different than what you would have seen 200, 100, or even 50 years ago.</p>
                    <p>As we interact with the forest in a multitude of ways, we all have a role to play in this story. We are leaving our footprint on the forest, and it’s vital that we consider its size and shape. We’ve learned that a purely “hands off” approach doesn’t work as well as you might guess. In the absence of proactive conservation efforts, the plant and animal life at the forest would eventually fall out of harmony and reach a non-working state.</p>
                    <p>So we do research, and lots of it. We get out there and observe. We utilize the helping hand of hundreds of dedicated volunteers. We don’t disrupt the natural state of things, but we do encourage nature to thrive in every way we can. Conservation at Fontenelle Forest is the sum of our efforts, from pulling weeds to writing reports.</p>
                    <img className="bottom_vine" src="/img/bottom_vine.svg" />
                  </div>
                </div>
              </div>

              <div className="tearjerker_video thousandyears" style={videoOne_style}>
                <div className="thousandyears video_overlay"></div>
                <div id="history" className="tearjerker_wrapper">
                  <div className="centered_content">
                    <h2 className="marker">Thousands of Years Plus a Century</h2>
                    <p>Humans have been interacting with the land that is now Fontenelle Forest for many thousands of years. But, it wasn’t until 1913 that the land was officially protected with the founding of the Fontenelle Nature Association. Though this subsequent centennial is but a sliver of time in the grand scheme of things, it has been marked by dramatic milestones in the area of forest conservation. Learning about this history helps us appreciate it even more today and ensures solid stewardship of this land for years to come.</p>
                    <img src="/img/conservation/divider_bottom_thing.png" />
                  </div>
                </div>
              </div>

              <div className="egg_wrap timeline_wrapper">
                <h2 className="time_title marker">Timeline</h2>

                <svg onClick={self.timelineLeft} className="arrow_circle blue_white left_arrow left timeline_button" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" >
                  <path className="circle" strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M1,26c0,13.8,11.2,25,25,25c13.8,0,25-11.2,25-25S39.8,1,26,1C12.2,1,1,12.2,1,26z"/>
                  <g className="arrow" >
                    <path strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M22.6,25.9c0,0,1,1.6,1,4.4c0,2.6,0.6,3.5,0.6,3.8c0,0.4-0.3,0.7-0.7,0.5s-8.6-6.2-10.5-8.1
                      c0,0-0.2-0.2-0.2-0.5v-0.1c0-0.2,0.1-0.4,0.2-0.5c1.7-1.7,10.1-7.9,10.5-8.1c0.3-0.2,0.7-0.1,0.7,0.5c0,0.3-0.6,1.1-0.6,3.8
                      C23.6,24.3,22.6,25.9,22.6,25.9z" />
                    <line strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' x1="24.2" y1="25.9" x2="39.3" y2="25.9"/>
                  </g>
                </svg>

                <svg onClick={self.timelineRight} className="arrow_circle blue_white right_arrow right timeline_button" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" >
                  <path className="circle" strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M1,26c0,13.8,11.2,25,25,25c13.8,0,25-11.2,25-25S39.8,1,26,1C12.2,1,1,12.2,1,26z"/>
                  <g className="arrow" >
                    <path strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M29.4,25.9c0,0-1,1.6-1,4.4c0,2.6-0.6,3.5-0.6,3.8c0,0.4,0.3,0.7,0.7,0.5s8.6-6.2,10.5-8.1
                    c0,0,0.2-0.2,0.2-0.5v-0.1c0-0.2-0.1-0.4-0.2-0.5c-1.7-1.7-10.1-7.9-10.5-8.1c-0.3-0.2-0.7-0.1-0.7,0.5c0,0.3,0.6,1.1,0.6,3.8
                    C28.4,24.3,29.4,25.9,29.4,25.9z"/>
                    <line strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' x1="27.8" y1="25.9" x2="12.7" y2="25.9"/>
                  </g>
                </svg>

                <div className="timeline_wrapper">
                  <div className="timeline" style={timelineStyles} >
                    <span className="the_line" style={thelineStyles}></span>
                    {timeline}
                  </div>
                </div>
              </div>

              <div className="egg_wrap">
                <div className="ongoing_story_container main_wrapper">
                  <div className="quiet_wild log_image">
                    <img src="/img/conservation/log.png" />
                  </div>
                </div>
              </div>

              <div id="habitat" className="egg_wrap">
                <h2 className="habitat_marker marker">Healthy Habitats Make Happy Homes</h2>
                <div className="habitat_home_container main_wrapper">
                  <div className="quiet_wild copy_container">
                    <p>If there’s one thing we know, it’s that nature will do what it wants to do. Our job is to pay attention. The approach is simple: focus on maintaining a balanced environment where animals will want to live. With the healthiest trees, the richest soil, the cleanest air possible, the creatures that make the forest harmonious and happy will follow.</p>
                  </div>
                </div>
              </div>

              <div className="egg_wrap ">
                <div className="main_wrapper">

                  <HabitatThing
                    image="/img/conservation/habitat/habitat_restoration.jpg"
                    credit="Josh Preister"
                    title="Habitat Restoration"
                    key="habitat"
                    description="Oak savanna and woodland habitats within Fontenelle Forest face severe decline. Their regeneration has been stunted due to the lack of open space resulting from fire suppression and the encroachment of invasive plants. To ensure the preservation and expansion of this ecological community, we began an oak woodland restoration project." />

                  <HabitatThing
                    image="/img/conservation/habitat/deer_management.jpg"
                    title="Deer Management"
                    key="deer"
                    description="Since the 1980s, the deer population has exploded, due in part to the lack of larger predators and the abundance of food. To mitigate the issue, we embarked on what has been a decades-long process: conducting research, forming and enacting a plan, and constantly evaluating results. Since the official deer hunt program began in 1996, it has become arguably the most successful conservation program in the history of the forest." />

                  <HabitatThing
                    image="/img/conservation/habitat/erosion_control.jpg"
                    credit="Josh Preister"
                    title="Erosion Control"
                    link="/post/erosion-control"
                    key="erosion"
                    description="Due to years of storm runoff, Coffin Springs Hollow had eroded into a five hundred-foot gully. Soil repeatedly washed from the area into the nearby stream and was thus threatening the health of our Great Marsh ecosystem. With help from our partners and supporters, we successfully completed a series of erosion controls in recent years." />

                  <HabitatThing
                    image="/img/conservation/habitat/prescribed_burn.jpg"
                    credit="Alex Wiles"
                    title="Prescribed Fire"
                    link="/post/prescribed-burn"
                    key="fire"
                    description="While a house on fire in a neighborhood is not a good thing, fire in a prairie or oak woodland certainly is. These ecological communities are fire dependent and our trained prescribed burn crew has been reintroducing this component to the natural systems here. Fires are often missed in this age of modern settlement." />

                  <HabitatThing
                    image="/img/conservation/habitat/invasive_species.jpg"
                    title="Invasive Species Control"
                    key="invasive"
                    description="Fontenelle is home to many beautiful plants, but some can wreak havoc on our land. We remove invasive plants in order to restore and maintain the natural habitat. Ornamentals that escape from yards and plants accidentally brought from other countries can take over when an ecological community is out of balance. Invasive removal is hard work." />

                  <HabitatThing
                    image="/img/conservation/habitat/natures_helpers.jpg"
                    title="Nature’s Helpers – Volunteers and You"
                    link="/post/natures-helpers"
                    key="nature"
                    description="All of the work we do requires many hours of labor, which is where our land steward volunteers come in. This dedicated group is invaluable to our conservation efforts, but we also rely on our neighbors to help keep our forest healthy. Find out what you can do to help." />

                </div>
              </div>


            

              <div className="tearjerker_video urbanwildlife" style={videoThree_style}>
                <div className="urbanwildlife video_overlay"></div>
                <div className="tearjerker_wrapper">
                  <div className="centered_content">
                    <h2 className="marker">Living With Urban Wildlife</h2>
                    <p>City life is often filled with wildlife interactions. Find out some ways to make it more harmonious and see how Fontenelle Forest can help you do so.</p>
                    <Link to="/urban-wildlife">
                      <svg className="arrow_circle blue_white shadow right_arrow" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" >
                        <path className="circle" strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M1,26c0,13.8,11.2,25,25,25c13.8,0,25-11.2,25-25S39.8,1,26,1C12.2,1,1,12.2,1,26z"/>
                        <g className="arrow" >
                          <path strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M29.4,25.9c0,0-1,1.6-1,4.4c0,2.6-0.6,3.5-0.6,3.8c0,0.4,0.3,0.7,0.7,0.5s8.6-6.2,10.5-8.1
                          c0,0,0.2-0.2,0.2-0.5v-0.1c0-0.2-0.1-0.4-0.2-0.5c-1.7-1.7-10.1-7.9-10.5-8.1c-0.3-0.2-0.7-0.1-0.7,0.5c0,0.3,0.6,1.1,0.6,3.8
                          C28.4,24.3,29.4,25.9,29.4,25.9z"/>
                          <line strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' x1="27.8" y1="25.9" x2="12.7" y2="25.9"/>
                        </g>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="egg_wrap">
                <div className="image_container">
                  <div className="backyard">
                    <h2 className="marker color">In Our Backyard</h2>
                    <p>Conveniently located off Hwy 75 and just minutes from downtown Omaha, Fontenelle Forest is a quiet gem right in our backyard.</p>
                  </div>
                  <img src="/img/conservation/skyline_blue.jpg" />
                </div>
              </div>

              <div className="egg_wrap cf">
                <div className="main_wrapper bottom_nav">
                  <span className="prev_page" onClick={self.moveLeft}>
                    <svg className="arrow_circle black left_arrow" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" >
                    	<path className="circle" strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M1,26c0,13.8,11.2,25,25,25c13.8,0,25-11.2,25-25S39.8,1,26,1C12.2,1,1,12.2,1,26z"/>
                    	<g className="arrow" >
                    		<path strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M22.6,25.9c0,0,1,1.6,1,4.4c0,2.6,0.6,3.5,0.6,3.8c0,0.4-0.3,0.7-0.7,0.5s-8.6-6.2-10.5-8.1
                    			c0,0-0.2-0.2-0.2-0.5v-0.1c0-0.2,0.1-0.4,0.2-0.5c1.7-1.7,10.1-7.9,10.5-8.1c0.3-0.2,0.7-0.1,0.7,0.5c0,0.3-0.6,1.1-0.6,3.8
                    			C23.6,24.3,22.6,25.9,22.6,25.9z" />
                    		<line strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' x1="24.2" y1="25.9" x2="39.3" y2="25.9"/>
                    	</g>
                    </svg>
                    Forest</span>
                  <span className="next_page" onClick={self.moveRight}>Education
                    <svg className="arrow_circle black right_arrow" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" >
                    	<path className="circle" strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M1,26c0,13.8,11.2,25,25,25c13.8,0,25-11.2,25-25S39.8,1,26,1C12.2,1,1,12.2,1,26z"/>
                    	<g className="arrow" >
                    		<path strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M29.4,25.9c0,0-1,1.6-1,4.4c0,2.6-0.6,3.5-0.6,3.8c0,0.4,0.3,0.7,0.7,0.5s8.6-6.2,10.5-8.1
                    		c0,0,0.2-0.2,0.2-0.5v-0.1c0-0.2-0.1-0.4-0.2-0.5c-1.7-1.7-10.1-7.9-10.5-8.1c-0.3-0.2-0.7-0.1-0.7,0.5c0,0.3,0.6,1.1,0.6,3.8
                    		C28.4,24.3,29.4,25.9,29.4,25.9z"/>
                    		<line strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' x1="27.8" y1="25.9" x2="12.7" y2="25.9"/>
                    	</g>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <Footer />
          </div>
          <div className='video-container'>
            <video id="video-background" className="video-wrap" poster="/img/loop_conservation.jpg" autoPlay muted="muted" loop>
              <source src="/videos/loop_conservation.mp4" type="video/mp4" />
            </video>
            <div className="content_container">
              <div className="video_overlay"></div>
              <div className="content_wrapper">
                <img className="old_hero_image" src="/img/conservation.png" />
                <div className="hero_content">
                  <h1 className="hero_header">SEE THE FOREST</h1>
                  <h3 className="hero_subheader marker">AND THE TREES</h3>
                  <div className="hero_textured_color" >
                    <p>As stewards of the land, we are dedicated to the conservation and preservation of our local environment so that future generations can continue to enjoy the forest.</p>
                  </div>
                  <div className="hero_icon_wrap">
                    <span className="line left_line"></span>
                    <img className={ arrow_class ? "hero_icon up" : "hero_icon" } src="/img/conservation/icon_conservation.svg" onClick={self.topScroll} />
                    <span className="line right_line"></span>
                  </div>
                </div>
                <h2 className="hero_page_title">NATURAL RESOURCES</h2>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="page conservation_page preloading">
          <div className="page_wrapper">
            <div className="page_container" id="page"  style={loadStyle}></div>
          </div>
          <div className='video-container'>
            <video id="video-background" className="video-wrap" poster="/img/loop_conservation.jpg" autoPlay muted="muted" loop>
              <source src="/videos/loop_conservation.mp4" type="video/mp4" />
            </video>
            <div className="content_container">
              <div className="video_overlay"></div>
              <div className="content_wrapper">
                <img className="old_hero_image" src="/img/conservation.png" />
                <div className="hero_content">
                  <h1 className="hero_header">SEE THE FOREST</h1>
                  <h3 className="hero_subheader marker">AND THE TREES</h3>
                  <div className="hero_textured_color" >
                    <p>As stewards of the land, we are dedicated to the conservation and preservation of our local environment so that future generations can continue to enjoy the forest.</p>
                  </div>
                  <div className="hero_icon_wrap">
                    <span className="line left_line"></span>
                    <img className={ arrow_class ? "hero_icon up" : "hero_icon" } src="/img/conservation/icon_conservation.svg" />
                    <span className="line right_line"></span>
                  </div>
                </div>
                <h2 className="hero_page_title">NATURAL RESOURCES</h2>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
});

module.exports = Main;
