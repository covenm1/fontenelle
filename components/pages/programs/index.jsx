var React = require('react'),
    request = require('superagent'),
    util = require('util');
var Velocity = require('velocity-animate/velocity');
var InlineSVG = require('react-inlinesvg');
var Router = require('react-router');

var Navigation = Router.Navigation;
var Link = Router.Link;

var Footer = require('../../common/footer.jsx');
// var ScrollMagic = require('scrollmagic');

var poster_image;
var Main = React.createClass({
  mixins: [ Router.State, Navigation ],
  getInitialState: function() {
    return { pre_count: 0, classImage: "/img/programs/programs-1.jpg", video: false };
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


  // onLoad: function() {
  //   var self = this;
  //   var tmp_pre_count = self.state.pre_count;
  //   tmp_pre_count++;
  //   if (tmp_pre_count == 1) {
  //     self.setState({loaded: true, pre_count: tmp_pre_count});
  //   } else {
  //     self.setState({pre_count: tmp_pre_count});
  //   }
  // },


  onLoad: function() {
    var self = this;
    self.setState({loaded: true});
  },

  moveLeft: function(){
    this.props.transition('slide-back');
    this.transitionTo('education');
  },


  moveRight: function(){
    this.props.transition('slide-forward');
    this.transitionTo('forest');
  },

  toggleClass: function(){
    if (this.state.classImage == "/img/programs/programs-1.jpg") {
      this.setState({classImage: "/img/programs/programs-2.jpg"});
    } else {
      this.setState({classImage: "/img/programs/programs-1.jpg"});
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
      backgroundImage: 'url(/img/programs/programs-video.jpg)'
    }
    if (self.state.loaded == true) {
      return (
        <div className="page">
          <div className="page_wrapper">
            <div className="page_container" id="page">
              <div className="egg_wrap">
                <div className='image_container'>
                  <img src="/img/programs/top.jpg" />
                </div>
              </div>
              <div className="programs_video" style={video_style}>
                <div className="programs video_overlay"></div>
                <div className="programs_video_wrapper">
                  { video ?
                    <div className="centered_content wide">
                      <span className="video_close" onClick={self.toggleVideo}>×</span>
                      <div className='embed-container'><iframe src='https://www.youtube.com/embed/f_rum7pLqZc?autoplay=1' frameBorder='0' allowFullScreen></iframe></div>
                    </div>
                  :
                    <div className="centered_content">
                      <h2 className="marker">A Recycled Forest, Built by Local Kids</h2>
                      <p>Curabitur blandit tempus porttitor. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Curabitur blandit tempus porttitor. Donec id elit non mi porta gravida at eget metus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis risus eget urna mollis ornare vel eu leo.</p>
                      <img className="video_play" onClick={self.toggleVideo} src="/img/icon_play-video.svg" />
                    </div>
                  }
                </div>
              </div>
              <div className="egg_wrap">
                <div className='image_container'>
                  <img src={classImage} onClick={self.toggleClass}/>
                  <img src="/img/programs/bottom.jpg" />
                </div>
              </div>
              <div className="egg_wrap">
                <div className="main_wrapper bottom_nav">
                  <span className="prev_page" onClick={self.moveLeft}>Education</span>
                  <span className="next_page" onClick={self.moveRight}>Forest</span>
                </div>
              </div>
              <Footer />
            </div>
            <div className='video-container'>
              <video id="video-background" className="video-wrap" poster="/img/loop_programs.jpg" autoPlay muted="muted" loop>
                <source src="/videos/loop_programs.mp4" type="video/mp4" />
              </video>
              <div className="content_container">
                <div className="video_overlay"></div>
                <div className="content_wrapper">
                  <img src="/img/programs.png" />
                </div>
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
