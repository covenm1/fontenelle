var React = require('react'),
    request = require('superagent'),
    util = require('util');
var Velocity = require('velocity-animate/velocity');
var InlineSVG = require('react-inlinesvg');
var Router = require('react-router');

var Navigation = Router.Navigation;
var Link = Router.Link;


var Footer = require('../../common/footer.jsx');

var ScrollMagic = require('scrollmagic');
var TweenMax = require('../../../public/js/tweenmax.js');
require('../../../public/js/scrollTo.js');

var classes_data = require('../../common/classes.json');

var ClassThing = React.createClass({
  render: function() {
    var self = this;
    return (
      <div className="class">
        { self.props.categories.length ?
          <span className="icons">
            { self.props.categories.indexOf('forest') > -1 ? <img src="/img/education/icon_outdoor-grey.svg" /> : null }
            { self.props.categories.indexOf('nature') > -1 ? <img src="/img/education/icon_indoor-grey.svg" /> : null }
          </span>
        : null }
        <h2 className="marker color" onClick={self.props.show}>{self.props.name}</h2>
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
        show={self.showClass.bind(self,object)} />

    });
    var current_class = self.state.current_class;
    if (current_class.length) {
      return (
        <div className="current_class" id="class_section">
          <p className="reset_class"  onClick={self.resetClass}>&lt;</p>
          <div className="main_class">
            <h2 className="marker color">{ current_class.name }</h2>
            <p>{ current_class.description }</p>
            { current_class.categories.length ?
              <span className="icons">
                { current_class.categories.indexOf('forest') > -1 ? <span className="category marker color"><img src="/img/education/icon_outdoor-grey.svg" /> Fontenell Forest</span> : null }
                { current_class.categories.indexOf('nature') > -1 ? <span className="category marker color"><img src="/img/education/icon_indoor-grey.svg" /> Forest On-The-Go</span> : null }
              </span>
            : null }
            <div className="details">
              <p>LEVEL<br />{ current_class.level }</p>
              <p>LENGTH<br />{ current_class.length }</p>
              <p>NE STATE SCIENCE STANDARDS<br />{ current_class.standards }</p>
            </div>
            { current_class.prepost.length ?
            <div className="enhance">
              <p>Enhance your class experience with pre and post class activities.</p>
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
  mixins: [ Router.State, Navigation ],
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

      ]

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
    if (self.state.loaded == true) {
      return (
        <div className="page">
          <div className="page_wrapper">
            <div className="page_container" id="page" style={loadStyle}>
              <div className="egg_wrap living_classroom_container">
                <div className="living_classroom copy_container">
                  <h2 className="marker">A living classroom</h2>
                  <p>The Forest offers nearly unlimited opportunities for learning. Over 100,000 youth and adults each year take part in environmental education programs through Fontenelle.</p>
                  <img className="bottom_vine" src="/img/bottom_vine.svg" />
                </div>
                <div className="living_classroom image_container">
                  <img src="/img/education/caterpillar.png" />
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
                      <img className="video_play" onClick={self.toggleVideo} src="/img/icon_play-video.svg" />
                    </div>
                  }
                </div>
              </div>

              <div id="classes" className="egg_wrap classes_container">
                <div className="living_classroom copy_container">
                  <h2 className="marker in_forest">In the Forest</h2>
                  <p>Book your next field trip with Fontenelle Forest! Our experienced educators will provide an engaging, hands-on program for your group. Each program includes an indoor and outdoor portion. To register for a school program for the 2011/2012 school year, please contact the FF Education Department at (402) 731-3140. For directions to the nature centers, click here.</p>
                  <p className="small_text"><strong>Once you have booked a field trip</strong>, be sure to take advantage of the activities provided below. These activities will greatly enhance your students' field trip experience - and they're a lot of fun!</p>
                </div>
                <div className="living_classroom copy_container">
                  <h2 className="marker on_go">Nature On-The-Go</h2>
                  <p>Nature-On-the-Go traveling programs introduce hands-on natural science programs to your students. During each program, your students will explore a variety of topics. These are great to supplement your school-day lessons or as an after-school program.</p>
                  <p className="small_text"><strong>To schedule a program</strong>, call our Manager of Programming and Outreach at 402-731-3140 x1026</p>
                  <p className="small_text">All programs are aligned with Nebraska State Science Standards.</p>
                  <p className="small_text">Each program is 45–60 minutes long. Maximum 30 students per On-the-Go program. For groups larger than 30, multiple programs must be scheduled.</p>
                </div>
                <div className='image_container'>
                  <img src="/img/education/flowers.png" />
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
              <div className="egg_wrap">
                <div className="main_wrapper bottom_nav">
                  <span className="prev_page" onClick={self.moveLeft}>Natural Resources</span>
                  <span className="next_page" onClick={self.moveRight}>Programs</span>
                </div>
              </div>
              <Footer />
            </div>
          </div>
          <div className='video-container'>
            <video id="video-background" className="video-wrap" poster="/img/loop_education.jpg" autoPlay muted="muted" loop>
              <source src="/videos/loop_education.mp4" type="video/mp4" />
            </video>
            <div className="content_container">
              <div className="video_overlay"></div>
              <div className="content_wrapper">
                <img src="/img/education.png" />
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="page preloading">
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
                <img src="/img/education.png" />
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
});

module.exports = Main;
