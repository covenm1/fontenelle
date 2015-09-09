var React = require('react'),
    request = require('superagent'),
    util = require('util');
var Velocity = require('velocity-animate/velocity');
var InlineSVG = require('react-inlinesvg');
var Router = require('react-router');
var TWEEN = require('tween.js');

require('velocity-animate/velocity.ui');

require('../../js/svg-pan-zoom.js');

// require('../../js/tweenjs-0.6.0.combined.js');

require('../../js/requestanimationframe.js');

var poster_image;

var panZoom;

var Main = React.createClass({
  mixins: [ Router.State ],
  getInitialState: function() {
    return { pre_count: 0, panZoom: {}, windowWidth: window.innerWidth };
  },


  componentDidMount: function () {
    var self = this;

    window.addEventListener('resize', this.handleResize);
    
    poster_image = new Image();
    poster_image.onload = self.onLoad;
    poster_image.src = "/img/loop_one.jpg";
  },

  componentWillUnmount: function() {
    window.removeEventListener('resize', this.handleResize);
  },

  handleResize: function(e) {
    this.setState({windowWidth: window.innerWidth});
    panZoom.resize();
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
    panZoom = svgPanZoom('#limit-svg', {
      zoomEnabled: true
    , panEnabled: true
    , controlIconsEnabled: false
    , fit: 1
    , center: 1
    , beforePan: beforePan
    });
    
    // self.setState({ panZoom: panZoom });
  },

  panAndZoom: function(){
    panZoom.zoomAtPoint(3, {x: 50, y: 50});
  },
  tweenPanAndZoom: function(){ 
    console.log('tweenPanAndZoom');
    
    var tween = new TWEEN.Tween( { z: panZoom.getZoom(), x:  panZoom.getPan().x, y: panZoom.getPan().y } )
    .to( { x: panZoom.getPan().x , y: panZoom.getPan().y + 100 , z: 3 }, 2000 )
    .easing( TWEEN.Easing.Quadratic.InOut )
    .onUpdate( function () {
      panZoom.zoomAtPoint( this.z, {x: this.x , y: this.y});
    })
    .start();
   
    animate();
   
    function animate() {
   
      requestAnimationFrame( animate ); // js/RequestAnimationFrame.js needs to be included too.
      TWEEN.update();
   
    }
  },

  resetZoom: function(){
    panZoom.fit();
    panZoom.center();
  },

  getZoom: function(){
    console.log('getZoom(): ' + panZoom.getZoom());
  },

  getPan: function(){
    console.log('getPan(): ' + util.inspect(panZoom.getPan()));
  },

  getSizes: function(){
    console.log('getSizes(): ' + util.inspect(panZoom.getSizes()));
  },

  printPanZoom: function(){
    console.log('panZoom: ' + util.inspect(panZoom));
  },

  getCTM: function(){
    console.log('getCTM(): ' + util.inspect(panZoom.viewport));
  },

  render: function() {
    var self = this;

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
            <div className="buttons">
              <p onClick={self.panAndZoom}>Pan and Zoom</p>
              <p onClick={self.tweenPanAndZoom}>Tween Pan and Zoom</p>
              <p onClick={self.resetZoom}>Reset</p>
              <p onClick={self.getZoom}>getZoom</p>
              <p onClick={self.getPan}>getPan</p>
              <p onClick={self.getSizes}>getSizes</p>
              <p onClick={self.getCTM}>getCTM</p>
              <p onClick={self.printPanZoom}>printPanZoom Object</p>

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
