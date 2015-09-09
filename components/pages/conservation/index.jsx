var React = require('react'),
    request = require('superagent'),
    util = require('util');
var Velocity = require('velocity-animate/velocity');
var InlineSVG = require('react-inlinesvg');
var Router = require('react-router');
var ScrollMagic = require('scrollmagic');

var Footer = require('../../common/footer.jsx');

var poster_image;
var Main = React.createClass({
  mixins: [ Router.State ],
  getInitialState: function() {
    return { pre_count: 0 };
  },


  componentDidMount: function () {
    var self = this;
    poster_image = new Image();
    poster_image.onload = self.onLoad;
    poster_image.src = "/img/loop_two.jpg";
  },

  componentWillReceiveProps: function () {
    var self = this;
    poster_image = new Image();
    poster_image.onload = self.onLoad;
    poster_image.src = "/img/loop_two.jpg";

    // var controller = self.state.controller;
    // controller.removeScene(top);
    // controller = controller.destroy(true);
  },

  // componentWillUnmount: function() {
  //   var controller = this.state.controller;
  //   controller.removeScene(top);
  //   controller = controller.destroy(true);
  // },

  onLoad: function() {
    var self = this;
    self.setState({loaded: true});
    // var controller = new ScrollMagic.Controller();
    // var top = new ScrollMagic.Scene({
    //             triggerElement: "#page",
    //             triggerHook: 'onLeave',
    //             offset: -60
    //         })
    //         .setClassToggle("header.header", "scrolled")
    //         .addTo(controller);
    //
    // self.setState({controller: controller});

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

              <Footer />
            </div>
            <div className='video-container'>
              <video id="video-background" className="video-wrap" poster="/img/loop_two.jpg" autoPlay muted="muted" loop>
                <source src="/videos/loop_two.webm" type="video/webm" />
              </video>
              <div className="content_container">
                <div className="content_wrapper">
                  <img src="/img/conservation.png" />
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
