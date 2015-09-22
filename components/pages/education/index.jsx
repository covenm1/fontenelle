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
  },

  resetClass: function(){
    var self = this;
    self.setState({current_class: {}});
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
        <div className="current_class">
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
          </div>
        </div>
      )
    } else {
      return (
        <div className="classes">
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
    return { pre_count: 0, classImage: "/img/education/class-1.jpg" };
  },


  componentDidMount: function () {
    var self = this;
    poster_image = new Image();
    poster_image.onload = self.onLoad;
    poster_image.src = "/img/loop_three.jpg";
  },

  componentWillReceiveProps: function () {
    var self = this;
    poster_image = new Image();
    poster_image.onload = self.onLoad;
    poster_image.src = "/img/loop_three.jpg";

  },

  onLoad: function() {
    var self = this;
    self.setState({loaded: true});
  },

  moveLeft: function(){
    this.props.transition('slide-back');
    this.transitionTo('natural-resources');
  },


  moveRight: function(){
    this.props.transition('slide-forward');
    this.transitionTo('programs');
  },

  toggleClass: function(){
    if (this.state.classImage == "/img/education/class-1.jpg") {
      this.setState({classImage: "/img/education/class-2.jpg"});
    } else {
      this.setState({classImage: "/img/education/class-1.jpg"});
    }
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
    if (self.state.loaded == true) {
      return (
        <div className="page">
          <div className="page_wrapper">
            <div className="page_container" id="page">
              <div className="egg_wrap">
                <div className='image_container'>
                  <img src="/img/education/top.jpg" />
                </div>
              </div>
              <div className="education_video" style={video_style}>
                <div className="education video_overlay"></div>
                <div className="education_video_wrapper">
                  { video ?
                    <div className="centered_content wide">
                      <div className='embed-container'><iframe src='https://www.youtube.com/embed/tdohcrA-o8M' frameBorder='0' allowFullScreen></iframe></div>
                    </div>
                  :
                    <div className="centered_content">
                      <h2 className="marker">The Walls Became the World All Around</h2>
                      <img className="video_play" onClick={self.toggleVideo} src="/img/icon_play-video.svg" />
                    </div>
                  }
                </div>
              </div>
              <div className="egg_wrap">
                <div className='image_container'>
                  <img src="/img/education/middle.jpg" />
                </div>
              </div>

              <div className="egg_wrap">
                <div className='image_container'>
                  <ClassList />
                </div>
              </div>

              <div className="egg_wrap">
                <div className='image_container'>
                  <img src="/img/education/bottom.jpg" />
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
        <div className="preloader">
          <h1>Loading...</h1>
        </div>
      )
    }
  }
});

module.exports = Main;
