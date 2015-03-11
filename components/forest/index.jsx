var React = require('react'),
    request = require('superagent'),
    util = require('util');
var Velocity = require('velocity-animate/velocity');
var InlineSVG = require('react-inlinesvg');
var Router = require('react-router');

require('velocity-animate/velocity.ui');

require('../../js/svg-pan-zoom.js');

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
    poster_image.src = "/img/loop_one.jpg";
  },

  onLoad: function() {
    var self = this;
    var tmp_pre_count = self.state.pre_count;
    tmp_pre_count++;
    if (tmp_pre_count == 1) {
      self.setState({loaded: true, pre_count: tmp_pre_count}); 
      // self.svgPan();

    } else {
      self.setState({pre_count: tmp_pre_count}); 
    }
  },

  svgPan: function() {
    beforePan = function(oldPan, newPan){
      var stopHorizontal = false
        , stopVertical = false
        , gutterWidth = 100
        , gutterHeight = 100
          // Computed variables
        , sizes = this.getSizes()
        , leftLimit = -((sizes.viewBox.x + sizes.viewBox.width) * sizes.realZoom) + gutterWidth
        , rightLimit = sizes.width - gutterWidth - (sizes.viewBox.x * sizes.realZoom)
        , topLimit = -((sizes.viewBox.y + sizes.viewBox.height) * sizes.realZoom) + gutterHeight
        , bottomLimit = sizes.height - gutterHeight - (sizes.viewBox.y * sizes.realZoom)

      customPan = {}
      customPan.x = Math.max(leftLimit, Math.min(rightLimit, newPan.x))
      customPan.y = Math.max(topLimit, Math.min(bottomLimit, newPan.y))

      return customPan
    }

    // Expose to window namespace for testing purposes
    window.panZoom = svgPanZoom('#limit-svg', {
      zoomEnabled: true
    , controlIconsEnabled: true
    , fit: 1
    , center: 1
    , beforePan: beforePan
    });
  },

  render: function() {
    var self = this;
    var svgStyle = {
      display: 'inline',
      width: 'inherit',
      minWidth: 'inherit',
      maxWidth: 'inherit',
      height: 'inherit',
      minHeight: 'inherit',
      maxHeight: 'inherit',
    };
    var grad1 = {
      stopColor: "rgb(56,121,217)",
      stopOpacity: "1"
    };

    var grad2 = {
      stopColor: "rgb(138,192,7)",
      stopOpacity: "1"
    };

    if (self.state.loaded == true) {
      return (
        <div className="page">
          <div className='video-container'>
            <video id="video-background" className="video-wrap" poster="/img/loop_one.jpg" autoPlay muted="muted" loop>
              <source src="/videos/loop_one.webm" type="video/webm" />
            </video>
            <div className="content_container">
              <div className="content_wrapper">
                <img src="/img/forest.png" />
              </div>
            </div>
          </div>
          <div className="main_wrapper">
            <InlineSVG src="/img/limit-svg.svg" uniquifyIDs={false} onLoad={self.svgPan}></InlineSVG>
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
