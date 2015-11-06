var React = require('react'),
    request = require('superagent'),
    util = require('util');
var Velocity = require('velocity-animate/velocity');
var InlineSVG = require('react-inlinesvg');
var Router = require('react-router');

var Navigation = Router.Navigation;
var Link = Router.Link;

var timeline = require('../../common/timeline.json');

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
          { self.props.credit ? <p className="photo_credit">Photo by {self.props.credit}</p> : null }
        </div>
        <div className="quiet_wild copy_container">
          <h2>{self.props.title}</h2>
          <p>{self.props.description}</p>
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
            <h4 className="title marker">{self.props.title}</h4>
            <p>{self.props.description}</p>
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
    for (image in load_images) {
      tmp_image = new Image();
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
    this.props.transition('slide-back');
    this.transitionTo('forest');
  },

  moveRight: function(){
    this.props.transition('slide-forward');
    this.transitionTo('education');
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
        <div className="page">
          <div className="page_wrapper">
            <div className="page_container" id="page"  style={loadStyle}>
              <div className="egg_wrap">
                <div className="ongoing_story_container main_wrapper">
                  <div className="quiet_wild image_container">
                    <img src="/img/conservation/sign.png" />
                  </div>
                  <div className="quiet_wild copy_container">
                    <h2 className="marker">An Ongoing Story</h2>
                    <p>The forest is a complex ecosystem that is constantly evolving. It is part of our mission to both understand its history and to plan and protect its future. What you see when you look out into the dense trees, prairie grasses, and marshy wetlands today is different than what you would have seen 200, 100, or even 50 years ago.</p>
                    <p>As we interact with the Forest in a multitude of ways, we all have a role to play in this story. We are leaving our footprint on the Forest, and it’s vital that we consider its size and shape. We’ve learned that a purely “hands off” approach doesn’t work as well as you might guess. In the absence of proactive conservation efforts, the plant and animal life at the Forest would eventually fall out of harmony and reach a non-working state.</p>
                    <p>So we do research, and lots of it. We get out there and observe. We utilize the helping hand of hundreds of dedicated volunteers. We don’t disrupt the natural state of things, but we do encourage nature to thrive in every way we can. Conservation at Fontenelle Forest is the sum of our efforts, from pulling weeds to writing reports.</p>
                    <img className="bottom_vine" src="/img/bottom_vine.svg" />
                  </div>
                  <div className="quiet_wild image_container">
                    <img src="/img/conservation/birds_left.png" />
                  </div>
                </div>
              </div>

              <div className="tearjerker_video thousandyears" style={videoOne_style}>
                <div className="thousandyears video_overlay"></div>
                <div id="history" className="tearjerker_wrapper">
                  <div className="centered_content">
                    <img src="/img/conservation/divider_top_thing.png" />
                    <h2 className="marker">Thousands of Years Plus a Century</h2>
                    <p>Humans have been interacting with the land that is now Fontenelle Forest for hundreds of thousands of years. But, it wasn’t until 1913 that the land was officially protected with the founding of the Fontenelle Nature Association. Though this subsequent centennial is but a sliver of time in the grand scheme of things, it has been marked by dramatic milestones in the area of forest conservation. Learning about the Forest’s history helps us appreciate it even more today and ensures solid stewardship of this land for years to come.</p>
                    <img src="/img/conservation/divider_bottom_thing.png" />
                  </div>
                </div>
              </div>

              <div className="egg_wrap timeline_wrapper">
                <h2 className="time_title marker">Timeline</h2>

                  <span className="left timeline_button" onClick={self.timelineLeft}><img src="/img/conservation/icon_right_blue.svg" /></span>
                  <span className="right timeline_button" onClick={self.timelineRight}><img src="/img/conservation/icon_right_blue.svg"  /></span>
                <div className="timeline_wrapper">
                  <div className="timeline" style={timelineStyles} >
                    <span className="the_line" style={thelineStyles}></span>
                    {timeline}
                  </div>
                </div>
              </div>

              <div className="egg_wrap">
                <div className="ongoing_story_container main_wrapper">
                  <div className="quiet_wild image_container">
                    <img src="/img/conservation/log.png" />
                  </div>
                </div>
              </div>

              <div id="habitat" className="egg_wrap">
                <h2 className="habitat_marker marker">If you have the habitat, you have the home.</h2>
                <div className="habitat_home_container main_wrapper">
                  <div className="quiet_wild copy_container">
                    <p>Our main tenet of land stewardship at Fontenelle Forest is to facilitate the most balanced environment we can. With ideal living conditions, the animals follow—the invertebrates, insects, amphibians, reptiles, and mammals that make the Forest harmonious and happy.</p>
                    <p>Still, it’s vital that we let nature do what it wants to do. Our job is more to pay attention and interpret the natural signs that are out there.</p>
                  </div>
                </div>
              </div>

              <div className="egg_wrap ">
                <div className="main_wrapper">

                  <HabitatThing
                    image="/img/conservation/natures_helpers.png"
                    credit="Josh Preister"
                    title="Habitat Restoration"
                    key="habitat"
                    description="Oak savanna and woodland habitats within Fontenelle Forest face severe decline. Their regeneration has been stunted due to the lack of open space resulting from fire suppression and the encroachment of invasive plants. To ensure the preservation and expansion of this ecological community, FF began an oak woodland restoration. Click to find out how we do it!" />
 
                  <HabitatThing
                    image="/img/conservation/provenplan.png"
                    title="Deer Management"
                    key="deer"
                    description="Since the 1980s, the deer population has exploded, due in part to the lack of larger predators and the abundance of food. To mitigate the issue, Fontenelle embarked on what has been a decades-long process: conducting research, forming and enacting a plan, and constantly evaluating results. Since the official deer hunt program began in 1996, it is arguably the most successful conservation program in the history of the forest. Deer management information can be found here." />

                  <HabitatThing
                    image="/img/conservation/locallysourced.png"
                    credit="Josh Preister"
                    title="Erosion Control"
                    key="erosion"
                    description="Due to years of storm runoff, Coffin Springs Hollow in Fontenelle Forest had eroded into a five-hundred-foot-long gully. Soil repeatedly washed from the area into the nearby stream and was thus threatening the health of our Great Marsh ecosystem. With help from our partners and supporters, Fontenelle Forest successfully completed a series of erosion controls in recent years. Check out our projects!" />

                  <HabitatThing
                    image="/img/conservation/locallysourced.png"
                    credit="Alex Wiles"
                    title="Prescribed fire"
                    key="fire"
                    description="While a house on fire in a neighborhood is not a good thing, fire in a prairie or oak woodland IS! Both of these ecological communities are fire dependent and our trained prescribed burn crew reintroduces this often-missing component to the natural systems here at Fontenelle Forest. Read more about our prescribed fire program." />

                  <HabitatThing
                    image="/img/conservation/locallysourced.png"
                    title="Invasive species control"
                    key="invasive"
                    description="We have many beautiful plants in Fontenelle Forest, but some can wreak havoc on our land. In order to restore and maintain our natural habitat, we remove invasive plants. Ornamentals that escape from yards, and plants accidentally brought from other countries can take over when an ecologically community is out of balance. Invasive removal is hard work." />

                  <HabitatThing
                    image="/img/conservation/locallysourced.png"
                    title="Nature’s Helpers – Volunteers and YOU!"
                    key="nature"
                    description="All of the work we do requires many hours of labor, which is where our land steward volunteers come in. Our dedicated group of people is invaluable in our conservation efforts. We also rely on our neighbors to help keep our forest healthy. What can YOU do?" />

                </div>
              </div>


              <div id="raptor" className="egg_wrap">
                <div className="raptor_container main_wrapper">
                  <div className="quiet_wild copy_container">
                    <div className="raptor">
                      <img src="/img/conservation/divider_top_grey.png" />
                      <h2 className="marker">Raptor Recovery</h2>
                      <p>Birds of prey, such as eagles, falcons, hawks, owls, and vultures, have a vital role in our ecosystem. Fontenelle Forest’s Raptor Recovery is focused on the conservation of these birds through education, research, and the rehabilitation of injured and orphaned raptors.</p>
                      <img src="/img/conservation/divider_bottom_grey.png" />
                    </div>
                    <h2>Rescue</h2>
                    <p>We see between 450–500 birds of prey in need of immediate assistance every year. These birds come to us from an area spanning every corner of Nebraska and parts of western Iowa. What’s highly important here is that at this stage we are not alone in our efforts. We depend on individuals—a dedicated network of volunteers across the entire state—to receive phone calls at all hours of the day and night, and then drive countless miles, first to the injured bird and then back to our trauma care unit. We also work with other organizations across the state to facilitate the program, and we rely on concerned citizens to report the injured raptors. If you have found a bird in need of assistance, please visit this page for more information on what to do next.</p>
                    <h2>Rehabilitate</h2>
                    <p>Birds are evaluated immediately upon arrival to our trauma care unit. Trained rehabilitators and veterinarians provide treatment, medication, and surgery if needed. Some patients may take a few days to mend; others might take months or even years.</p>
                  </div>
                  <div className="quiet_wild image_container">
                    <img src="/img/conservation/raptor.png" />
                  </div>
                </div>
              </div>

              <div className="tearjerker_video meetraptors" style={videoTwo_style}>
                <div className="meetraptors video_overlay"></div>
                <div className="tearjerker_wrapper">
                  <div className="centered_content">
                    <h2 className="marker">Meet the Raptors</h2>
                    <p>See some of the injured birds now rehabbing at Fontenelle</p>
                    <Link to="/meet-the-raptors" ><img src="/img/conservation/arrow_right.png" /></Link>
                  </div>
                </div>
              </div>

              <div className="egg_wrap">
                <div className="raptor_container main_wrapper">
                  <div className="quiet_wild copy_container">
                    <h2>Release</h2>
                    <p>A bird is considered healthy again when it is in ideal feather condition, demonstrates keen flight abilities, and can recognize and catch food. It is then banded and released back to the wild near where it was found. Need to find out what each of these means. Tell more of a story about that moment when they are able to be let back into the wild and what that means to us.</p>
                    <h2>Educate</h2>
                    <p>Even after treatment and months of rehabilitation, a raptor might be unable to fly or hunt due to a variety of factors and cannot be released. Non-releasable birds are channeled into breeding programs, recruited as “foster parents” for young orphans, utilized in research, or join our roster of educational birds for outreach and education programs. Fontenelle Forest Raptor Recovery reaches 20,000 people each year during our live raptor programs.</p>
                  </div>
                  <div className="quiet_wild image_container">
                    <img src="/img/conservation/birds_right.png" />
                  </div>
                </div>
              </div>

              <div className="tearjerker_video urbanwildlife" style={videoThree_style}>
                <div className="urbanwildlife video_overlay"></div>
                <div className="tearjerker_wrapper">
                  <div className="centered_content">
                    <h2 className="marker">Living With Urban Wildlife</h2>
                    <p>City life is often filled with wildlife interactions. Find out some ways to make it more harmonious and see how Fontenelle Forest can help you do so.</p>
                    <Link to="/urban-wildlife"><img src="/img/conservation/arrow_right.png" /></Link>
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

              <div className="egg_wrap">
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
                      <p>We invite you to explore ways you can get involved in our conservation initiatives. As stewards of the land, we are dedicated to the conservation and preservation of our local environment so that future generations can continue to enjoy the forest.</p>
                    </div>
                    <div className="hero_icon_wrap">
                      <span className="line left_line"></span>
                      <img className={ arrow_class ? "hero_icon up" : "hero_icon" } src="/img/conservation/icon_conservation.svg" />
                      <span className="line right_line"></span>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="page preloading">
          <div className="page_wrapper">
            <div className="page_container" id="page"  style={loadStyle}></div>
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
                      <p>We invite you to explore ways you can get involved in our conservation initiatives. As stewards of the land, we are dedicated to the conservation and preservation of our local environment so that future generations can continue to enjoy the forest.</p>
                    </div>
                    <div className="hero_icon_wrap">
                      <span className="line left_line"></span>
                      <img className={ arrow_class ? "hero_icon up" : "hero_icon" } src="/img/conservation/icon_conservation.svg" />
                      <span className="line right_line"></span>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
});

module.exports = Main;
