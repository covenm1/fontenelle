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

var classes_data = require('../../../public/js/classes.json');

var ClassThing = React.createClass({
  render: function() {
    return (
      <div className="class">
        <h2>{this.props.name}</h2>
        <p>{this.props.age}</p>
        <p>{this.props.science_standards}</p>
        <p>{this.props.series}</p>
        <p>{this.props.duration}</p>
        <p>{this.props.description}</p>
      </div>
    )
  }
});

var ClassList = React.createClass({
  getInitialState: function() {
    return {classes: classes_data, current_classes: classes_data}
  },

  natureFilter: function(){
    var natureClasses = self.state.classes
  },
  render: function() {
    var self = this;
    var classes = self.state.current_classes.map(function(object) {

      return <ClassThing
        name={object.name}
        age={object.age}
        science_standards={object.science_standards}
        series={object.series}
        duration={object.duration}
        description={object.description}  />
    });
    return (
      <div className="classes">
        { classes }
      </div>
    )
  }
});

var poster_image;
var Main = React.createClass({
  mixins: [ Router.State, Navigation ],

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
    this.transitionTo('conservation');
  },


  moveRight: function(){
    this.props.transition('slide-forward');
    this.transitionTo('programs');
  },

  render: function() {
    var self = this;

    return (
      <div className="page">
        <div className="egg_wrap static">
          <div className='image_container'>
            <img src="/img/hours.png" />
          </div>
        </div>
        <Footer />
      </div>
    )
  }
});

module.exports = Main;
