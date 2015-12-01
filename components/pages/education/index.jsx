var React = require('react'),
    request = require('superagent'),
    util = require('util');
var Velocity = require('velocity-animate/velocity');
var InlineSVG = require('react-inlinesvg');
var Router = require('react-router');

var Navigation = Router.Navigation;
var Link = Router.Link;

var ScrollMagic = require('scrollmagic');
var TweenMax = require('../../../public/js/tweenmax.js');
require('../../../public/js/scrollTo.js');

var classes_data = require('../../common/classes.json');

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


var ClassThing = React.createClass({
  render: function() {
    var self = this;
    return (
      <div className="class" onClick={self.props.show}>
        { self.props.categories.length ?
          <span className="icons">
            { self.props.categories.indexOf('forest') > -1 ? <img src="/img/education/icon_outdoor-grey.svg" /> : null }
            { self.props.categories.indexOf('nature') > -1 ? <img src="/img/education/icon_indoor-grey.svg" /> : null }
          </span>
        : null }
        <h2 className="marker color">{self.props.name}</h2>
        <p>{self.props.level}</p>
      </div>
    )
  }
});

var ClassList = React.createClass({
  getInitialState: function() {
    return {classes: classes_data, current_class: {}, video: false}
  },

  natureFilter: function(){
    var natureClasses = self.state.classes;
  },

  showClass: function(object){
    var self = this;
    self.setState({current_class: object});
    self.scrollThing('class_section');
  },

  resetClass: function(){
    var self = this;
    self.setState({current_class: {}});
  },
  scrollThing: function(thing){
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


  render: function() {
    var self = this;
    var classes = self.state.classes.map(function(object) {

      return <ClassThing
        name={object.name}
        level={object.level}
        standards={object.standards}
        categories={object.categories}
        length={object.length}
        description={object.description}
        show={self.showClass.bind(self,object)}
        key={object.name}  />

    });
    var current_class = self.state.current_class;
    if (current_class.length) {
      return (
        <div className="current_class" id="class_section">
          <svg onClick={self.resetClass} className="arrow_circle green left_arrow reset_class" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" >
            <path className="circle" strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M1,26c0,13.8,11.2,25,25,25c13.8,0,25-11.2,25-25S39.8,1,26,1C12.2,1,1,12.2,1,26z"/>
            <g className="arrow" >
              <path strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M22.6,25.9c0,0,1,1.6,1,4.4c0,2.6,0.6,3.5,0.6,3.8c0,0.4-0.3,0.7-0.7,0.5s-8.6-6.2-10.5-8.1
                c0,0-0.2-0.2-0.2-0.5v-0.1c0-0.2,0.1-0.4,0.2-0.5c1.7-1.7,10.1-7.9,10.5-8.1c0.3-0.2,0.7-0.1,0.7,0.5c0,0.3-0.6,1.1-0.6,3.8
                C23.6,24.3,22.6,25.9,22.6,25.9z" />
              <line strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' x1="24.2" y1="25.9" x2="39.3" y2="25.9"/>
            </g>
          </svg>
          <div className="main_class">
            <h2 className="marker color">{ current_class.name }</h2>
            <p>{ current_class.description }</p>
            { current_class.categories.length ?
              <span className="icons">
                { current_class.categories.indexOf('forest') > -1 ? <span className="category marker color"><img src="/img/education/icon_outdoor-grey.svg" /> Fontenelle Forest</span> : null }
                { current_class.categories.indexOf('nature') > -1 ? <span className="category marker color"><img src="/img/education/icon_indoor-grey.svg" /> Nature On-The-Go</span> : null }
              </span>
            : null }
            <div className="details">
              <p>LEVEL<br />{ current_class.level }</p>
              <p>LENGTH<br />{ current_class.length }</p>
              <p>NE STATE SCIENCE STANDARDS<br />{ current_class.standards }</p>
            </div>
            { current_class.prepost.length ?
            <div className="enhance">
              <p>Enhance your class experience with pre- and post-class activities.</p>
              <a href={ current_class.prepost } target="_blank" className="download_pdf">Download PDF</a>
            </div>
            : null }
            <div className="signup">
              <p>To sign up, contact:</p>
              <p><a href="education@fontenelleforest.org" >education@fontenelleforest.org</a></p>
              <a href="" >(402) 731-3140</a>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="classes" id="class_section">
          { classes }
        </div>
      )
    }
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
        "/img/loop_three.jpg",
        "/img/education/Education_video_screenshot.jpg",
        "/img/education/skyline_green.jpg",
        "/img/education.png",
        "/img/education/flowers.png",
        "/img/education/caterpillar.png"
      ],
      arrow_class: false

    };
  },

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
      setTimeout(function() {
        self.setState({loaded: true});
      }, 150);
      setTimeout(function() {
        if (self.getParams().scroll) {
          self.scrollThing(self.getParams().scroll)
        }
      }, 350);

    } else {

      var percent_loaded = (tmp_pre_count / self.state.load_images.length ) * 100;
      self.setState({pre_count: tmp_pre_count, percent_loaded: percent_loaded})
    }
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

  moveLeft: function(){
    this.props.transition('slide-back');
    this.transitionTo('natural-resources');
  },


  moveRight: function(){
    this.props.transition('slide-forward');
    this.transitionTo('programs');
  },

  toggleVideo: function(){
    this.setState({video: !this.state.video});
  },

  topScroll: function(){
    this.scrollThing('page');
  },


  render: function() {
    var self = this;
    var classImage = self.state.classImage;
    var video = self.state.video;
    var video_style = {
      backgroundImage: 'url(/img/education/Education_video_screenshot.jpg)'
    }
    var loadStyle = {
      width: self.state.percent_loaded + "%"
    }
    var arrow_class = self.state.arrow_class;
    if (self.state.loaded == true) {
      return (
        <div className="page education_page">
          <div className="page_wrapper">
            <div className="page_container" id="page" style={loadStyle}>
              <div className="egg_wrap living_classroom_container">
                <div className="living_classroom image_container">
                  <img src="/img/education/caterpillar.png" />
                </div>
                <div className="living_classroom copy_container">
                  <h2 className="marker">A living classroom</h2>
                  <p>The forest offers nearly unlimited opportunities for learning. Over 100,000 youth and adults each year take part in environmental education programs through Fontenelle.</p>
                  <img className="bottom_vine" src="/img/bottom_vine.svg" />
                </div>
              </div>

              <div className="education_video" style={video_style}>
                <div className="education video_overlay"></div>
                <div className="education_video_wrapper">
                  { video ?
                    <div className="centered_content wide">
                      <span className="video_close" onClick={self.toggleVideo}>×</span>
                      <div className='embed-container'><iframe src='https://www.youtube.com/embed/tdohcrA-o8M?autoplay=1' frameBorder='0' allowFullScreen></iframe></div>
                    </div>
                  :
                    <div className="centered_content">
                      <h2 className="marker">The Walls Became the World All Around</h2>
                        <div className="play_button_wrapper">
                          <svg className="left_leaf" x="0px" y="0px" viewBox="0 0 260.993 56.185" enable-background="new 0 0 260.993 56.185">
                            <g>
                              <path fill="none" stroke="#FFFFFF" strokeWidth="3" strokeMiterLimit="10" d="M260.803,21.789c0,0-78.218-9.995-105.16-7.822
                                s-60.945,10.559-78.327,9.689c-17.382-0.869-22.814-0.76-31.287-9.234c0,0-5.377-7.985,0-13.362"/>
                              <path fill="none" stroke="#FFFFFF" strokeWidth="3" strokeMiterLimit="10" d="M53.94,23.206c0,0-15.081,8.055-31.798,5.843
                                C9.377,27.36,5.802,21.1,3.118,16.14C19.968,21.712,36.564,5.83,53.94,23.206z"/>
                              <path fill="none" stroke="#FFFFFF" strokeWidth="3" strokeMiterLimit="10" d="M83.509,23.874
                                c-30.635,0.978-39.172,2.019-50.516,13.362c0,0-7.199,10.689,0,17.888"/>
                              <path fill="none" stroke="#FFFFFF" strokeWidth="3" strokeMiterLimit="10" d="M52.548,23.222c0,0-12.167-3.259-26.942-1.086
                                c-12.962,1.906-20.641-4.563-20.641-4.563"/>
                            </g>
                          </svg>


                          <svg onClick={self.toggleVideo} className="video_play play_button education" x="0px" y="0px" viewBox="0 0 76 76" >
                            <g>
                              <circle className="circle" cx="38" cy="38" r="36.5"/>
                              <path className="triangle" d="M31.3,38.2c0,0-2.8,4.4-2.8,12.4c0,7.5-1.6,10-1.6,10.7c0,1.2,0.8,2,2,1.4S53.2,45,58.6,39.6
                                c0,0,0.6-0.6,0.6-1.4V38c0-0.6-0.2-1.1-0.6-1.4c-4.7-4.7-28.7-22.4-29.7-23.1c-0.8-0.6-2-0.4-2,1.4c0,0.7,1.6,3.2,1.6,10.7
                                C28.6,33.6,31.3,38.2,31.3,38.2z"/>
                            </g>
                          </svg>

                          <svg className="right_leaf" x="0px" y="0px" viewBox="0 0 260.993 56.185" enable-background="new 0 0 260.993 56.185" >
                            <g>
                              <path fill="none" stroke="#FFFFFF" strokeWidth="3" strokeMiterLimit="10" d="M0.19,21.789c0,0,78.218-9.995,105.16-7.822
                                s60.945,10.559,78.327,9.689c17.382-0.869,22.814-0.76,31.287-9.234c0,0,5.377-7.985,0-13.362"/>
                              <path fill="none" stroke="#FFFFFF" strokeWidth="3" strokeMiterLimit="10" d="M207.053,23.206c0,0,15.081,8.055,31.798,5.843
                                c12.766-1.689,16.34-7.949,19.024-12.909C241.025,21.712,224.429,5.83,207.053,23.206z"/>
                              <path fill="none" stroke="#FFFFFF" strokeWidth="3" strokeMiterLimit="10" d="M177.484,23.874
                                c30.635,0.978,39.172,2.019,50.516,13.362c0,0,7.199,10.689,0,17.888"/>
                              <path fill="none" stroke="#FFFFFF" strokeWidth="3" strokeMiterLimit="10" d="M208.445,23.222c0,0,12.167-3.259,26.942-1.086
                                c12.962,1.906,20.641-4.563,20.641-4.563"/>
                            </g>
                          </svg>
                        </div>
                    </div>
                  }
                </div>
              </div>

              <div id="classes" className="egg_wrap">
                <div id="classes" className="main_wrapper classes_container">
                  <div className="living_classroom copy_container">
                    <h2 className="marker in_forest">In the Forest</h2>
                    <p>Field trips to the forest consistently top students’ lists of favorites. Our experienced educators will provide an engaging, hands-on program for your group during your visit to Fontenelle. Each trip includes an indoor educational portion that complements the outdoor program. To register, please contact our Education Department at (402) 731-3140.</p>
                  </div>
                  <div className="living_classroom copy_container">
                    <h2 className="marker on_go">Nature On-The-Go</h2>
                    <p>Traveling programs that come to you, Nature On-the-Go brings hands-on, natural science education to your students without having to make a field trip. Each program is 45-60 minutes in length, covers a variety of topics, and meets Nebraska State Science Standards. To schedule, please call our Manager of Programming and Outreach at (402) 731-3140 x1026.</p>
                  </div>
                  <div className="flower_image">
                    <img src="/img/education/flowers.png" />
                  </div>
                </div>
              </div>

              <div className="egg_wrap">
                <div className='image_container'>
                  <ClassList />
                </div>
              </div>

              <div className="egg_wrap">
                <div className='image_container'>
                  <div className="backyard">
                    <h2 className="marker color">In Our Backyard</h2>
                    <p>Conveniently located off Hwy 75 and just minutes from downtown Omaha, Fontenelle Forest is a quiet gem right in our backyard.</p>
                  </div>
                  <img src="/img/education/skyline_green.jpg" />
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
                    Natural Resources</span>
                  <span className="next_page" onClick={self.moveRight}>Programs
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
            <video id="video-background" className="video-wrap" poster="/img/loop_education.jpg" autoPlay muted="muted" loop>
              <source src="/videos/loop_education.mp4" type="video/mp4" />
            </video>
            <div className="content_container">
              <div className="video_overlay"></div>
              <div className="content_wrapper">
                <img className="old_hero_image" src="/img/education.png" />
                <div className="hero_content">
                  <h1 className="hero_header">CALL OF THE WILD BECKONS</h1>
                  <h3 className="hero_subheader marker">Teachers, administrators and scout leaders</h3>
                  <div className="hero_textured_color" >
                    <p>Explore opportunities for your school group, including curriculum tied to state science standards. Fontenelle's educational programs take many forms—from field trips, classes, and camps in the forest to hands-on, nature on-the-go presentations at schools, to community art projects.</p>
                  </div>
                  <div className="hero_icon_wrap">
                    <span className="line left_line"></span>
                    <img className={ arrow_class ? "hero_icon up" : "hero_icon" } src="/img/education/icon_education.svg" onClick={self.topScroll} />
                    <span className="line right_line"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="page education_page preloading">
          <div className="page_wrapper">
            <div className="page_container" id="page" style={loadStyle}></div>
          </div>
          <div className='video-container'>
            <video id="video-background" className="video-wrap" poster="/img/loop_education.jpg" autoPlay muted="muted" loop>
              <source src="/videos/loop_education.mp4" type="video/mp4" />
            </video>
            <div className="content_container">
              <div className="video_overlay"></div>
              <div className="content_wrapper">
                <img className="old_hero_image" src="/img/education.png" />
                <div className="hero_content">
                  <h1 className="hero_header">CALL OF THE WILD BECKONS</h1>
                  <h3 className="hero_subheader marker">Teachers, administrators and scout leaders</h3>
                  <div className="hero_textured_color" >
                    <p>Explore opportunities for your school group, including curriculum tied to state science standards. Fontenelle's educational programs take many forms—from field trips, classes, and camps in the forest to hands-on, nature on-the-go presentations at schools, to community art projects.</p>
                  </div>
                  <div className="hero_icon_wrap">
                    <span className="line left_line"></span>
                    <img className={ arrow_class ? "hero_icon up" : "hero_icon" } src="/img/education/icon_education.svg" />
                    <span className="line right_line"></span>
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
