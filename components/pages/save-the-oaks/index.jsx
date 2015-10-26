var React = require('react'),
    request = require('superagent'),
    util = require('util');
var Velocity = require('velocity-animate/velocity');
var InlineSVG = require('react-inlinesvg');
var Router = require('react-router');

var Navigation = Router.Navigation;
var Link = Router.Link;

module.exports = React.createClass({
  mixins: [ Router.State, Navigation ],

  componentDidMount: function () { },

  componentWillReceiveProps: function () { },

  render: function() {
    var self = this;

    return (
      <div className="page">
        <div className="egg_wrap static">
          <div className='image_container'>
            <img src="/img/forest-now/blog-post-1.jpg" />
            <img src="/img/forest-now/blog-post-2.jpg" />
            <img src="/img/forest-now/blog-post-3.jpg" />
            <img src="/img/forest-now/blog-post-4.jpg" />
            <img src="/img/forest-now/blog-post-5.jpg" />
          </div>
        </div>
        <Footer />
      </div>
    )
  }
});
