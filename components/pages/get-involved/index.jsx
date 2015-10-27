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

  componentWillReceiveProps: function () {},

  render: function() {
    var self = this;

    return (
      <div>
        <div className="egg_wrap static">
          <div className='image_container'>
            <img src="/img/get-involved/Get-involved-donate.jpg" />
            <img src="/img/get-involved/Get-involved-membership.jpg" />
            <img src="/img/get-involved/Get-involved-volunteer.jpg" />
          </div>
        </div>
      </div>
    )
  }
});
