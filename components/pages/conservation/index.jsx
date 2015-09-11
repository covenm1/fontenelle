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

var Footer = require('../../common/footer.jsx');

var poster_image;
var Main = React.createClass({
  mixins: [ Router.State, Navigation ],
  getInitialState: function() {
    return { pre_count: 0 };
  },

  componentWillMount: function () {
    var self = this;
    var timeline = [
      {
        'year': '1492',
        'title': 'Fontenelle was Older then',
        'description': 'Silver driftfish warty angler finback cat shark rice eel. Taimen, golden dojo goblin shark pipefish, grunt mud catfish, luderick pink salmon seamoth zebra trout. Atlantic silverside grunt sculpin; moray eel herring boarfish beaked salmon river stingray remora neon tetra large-eye bream. '

      },
      {
        'year': '1492',
        'title': 'Fontenelle was Older then',
        'description': 'Silver driftfish warty angler finback cat shark rice eel. Taimen, golden dojo goblin shark pipefish, grunt mud catfish, luderick pink salmon seamoth zebra trout. Atlantic silverside grunt sculpin; moray eel herring boarfish beaked salmon river stingray remora neon tetra large-eye bream. '

      },
      {
        'year': '1492',
        'title': 'Fontenelle was Older then',
        'description': 'Silver driftfish warty angler finback cat shark rice eel. Taimen, golden dojo goblin shark pipefish, grunt mud catfish, luderick pink salmon seamoth zebra trout. Atlantic silverside grunt sculpin; moray eel herring boarfish beaked salmon river stingray remora neon tetra large-eye bream. '

      },
      {
        'year': '1492',
        'title': 'Fontenelle was Older then',
        'description': 'Silver driftfish warty angler finback cat shark rice eel. Taimen, golden dojo goblin shark pipefish, grunt mud catfish, luderick pink salmon seamoth zebra trout. Atlantic silverside grunt sculpin; moray eel herring boarfish beaked salmon river stingray remora neon tetra large-eye bream. '

      },
      {
        'year': '1492',
        'title': 'Fontenelle was Older then',
        'description': 'Silver driftfish warty angler finback cat shark rice eel. Taimen, golden dojo goblin shark pipefish, grunt mud catfish, luderick pink salmon seamoth zebra trout. Atlantic silverside grunt sculpin; moray eel herring boarfish beaked salmon river stingray remora neon tetra large-eye bream. '

      },
      {
        'year': '1492',
        'title': 'Fontenelle was Older then',
        'description': 'Silver driftfish warty angler finback cat shark rice eel. Taimen, golden dojo goblin shark pipefish, grunt mud catfish, luderick pink salmon seamoth zebra trout. Atlantic silverside grunt sculpin; moray eel herring boarfish beaked salmon river stingray remora neon tetra large-eye bream. '

      },
      {
        'year': '1492',
        'title': 'Fontenelle was Older then',
        'description': 'Silver driftfish warty angler finback cat shark rice eel. Taimen, golden dojo goblin shark pipefish, grunt mud catfish, luderick pink salmon seamoth zebra trout. Atlantic silverside grunt sculpin; moray eel herring boarfish beaked salmon river stingray remora neon tetra large-eye bream. '

      },
      {
        'year': '1492',
        'title': 'Fontenelle was Older then',
        'description': 'Silver driftfish warty angler finback cat shark rice eel. Taimen, golden dojo goblin shark pipefish, grunt mud catfish, luderick pink salmon seamoth zebra trout. Atlantic silverside grunt sculpin; moray eel herring boarfish beaked salmon river stingray remora neon tetra large-eye bream. '

      },
    ];

    self.setState({timeline: timeline})
  },

  componentDidMount: function () {
    console.log('componentDidMount');
    var self = this;
    poster_image = new Image();
    poster_image.onload = self.onLoad;
    poster_image.src = "/img/loop_two.jpg";
    window.location.hash = window.decodeURIComponent(window.location.hash);

    console.log(window.location.hash);

    var hashParts = window.location.hash.split('#');

    console.log(hashParts);

    if (hashParts.length > 1) {
      var hash = hashParts.slice(-1)[0];
      // if(hash);
      console.log(hash);
      self.scrollThing(hash);
    }
    window.onhashchange = function() {
      window.location.hash = window.decodeURIComponent(window.location.hash);

      console.log(window.location.hash);

      var hashParts = window.location.hash.split('#');

      console.log(hashParts);

      if (hashParts.length > 1) {
        var hash = hashParts.slice(-1)[0];
        // if(hash);
        console.log(hash);
        self.scrollThing(hash);
      }
    }
  },


  componentWillReceiveProps: function () {
    console.log('componentWillReceiveProps');
    var self = this;
    poster_image = new Image();
    poster_image.onload = self.onLoad;
    poster_image.src = "/img/loop_two.jpg";
  },


  onLoad: function() {
    var self = this;
    self.setState({loaded: true});

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
    var controller = new ScrollMagic.Controller();
    controller.scrollTo(function(target) {

      TweenMax.to(window, 0.5, {
        scrollTo : {
          y : target, // scroll position of the target along y axis
          autoKill : true // allows user to kill scroll action smoothly
        },
        ease : Cubic.easeInOut
      });

    });
    controller.scrollTo("#"+thing);
  },

  render: function() {
    var self = this;

    var timeline = self.state.timeline.map(function(object) {
      return (
        <div className="timeline_item" >
          <h4 className="year">{object.year}</h4>
          <span className="circle"></span>
          <div className="timeline_container">
            <div className="description">
              <h4 className="title marker">{object.title}</h4>
              <p>{object.description}</p>
            </div>
          </div>
        </div>
      )
    });

    var timelineStyles = {
      width: timeline.length * 430 +"px"
    };

    var thelineStyles = {
      width: timeline.length * 400 +"px"
    };

      return (
        <div className="page">
          <div className="page_wrapper">
            <div className="page_container" id="page">
              <div className="egg_wrap">
                <h3 onClick={self.scrollThing.bind(this, "raptor")}>raptor</h3>
                <div className='image_container'>
                  <img src="/img/conservation/top_1.png" />
                </div>
              </div>

              <div className="egg_wrap">
                <div className='image_container'>
                  <img src="/img/conservation/conservationthing.jpg" />
                </div>
              </div>

              <div className="egg_wrap">
                <h2 className="time_title marker">Timeline</h2>
                <div className="timeline_wrapper">
                  <div className="timeline" style={timelineStyles} >
                    <span className="the_line" style={thelineStyles}></span>
                    {timeline}
                  </div>
                </div>
              </div>

              <div className="egg_wrap">
                <div className='image_container'>
                  <img src="/img/conservation/top_2.png" />
                  <img src="/img/conservation/top_2b.png" id="raptor" />
                  <Link to="/meet-the-raptors" ><img src="/img/conservation/meetraptors.jpg" id="raptor" /></Link>
                  <img src="/img/conservation/top_3.png" />
                </div>
              </div>

              <div className="egg_wrap">
                <div className="main_wrapper bottom_nav">
                  <span className="prev_page" onClick={self.moveLeft}>Forest</span>
                  <span className="next_page" onClick={self.moveRight}>Education</span>
                </div>
              </div>

              <Footer />
            </div>
            <div className='video-container'>
              <video id="video-background" className="video-wrap" poster="/img/loop_conservation.jpg" autoPlay muted="muted" loop>
                <source src="/videos/loop_conservation.mp4" type="video/mp4" />
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
  }
});

module.exports = Main;
