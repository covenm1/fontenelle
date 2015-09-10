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
    return { pre_count: 0 };
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

  render: function() {
    var self = this;

    if (self.state.loaded == true) {
      return (
        <div className="page">
          <div className="page_wrapper">
            <div className="page_container" id="page">
              <div className="egg_wrap">
                <div className='image_container'>
                  <img src="/img/education/top.jpg" />
                  <img src="/img/education/bottom.jpg" />
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
              <video id="video-background" className="video-wrap" poster="/img/loop_three.jpg" autoPlay muted="muted" loop>
                <source src="/videos/loop_three.webm" type="video/webm" />
              </video>
              <div className="content_container">
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
