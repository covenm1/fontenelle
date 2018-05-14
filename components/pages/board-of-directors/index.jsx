var React = require('react'),
    request = require('superagent'),
    util = require('util');
var Velocity = require('velocity-animate/velocity');
var InlineSVG = require('react-inlinesvg');
var Router = require('react-router');

var Navigation = Router.Navigation;
var Link = Router.Link;
var Footer = require('../../common/footer.jsx');

module.exports = React.createClass({
  mixins: [ Router.State, Navigation ],

  componentDidMount: function () { },

  componentWillReceiveProps: function () { },

  render: function() {
    var self = this;

    return (
      <div>
        <div className="egg_wrap fb_container">
          <div className="fb_wrapper main_wrapper">
            <div className="centered_content bd_intro">
              <h2 className="marker">BOARD OF DIRECTORS</h2>
            </div>
          </div>
        </div>
        <div className="egg_wrap fb_container">
          <div className="fb_wrapper main_wrapper">
            <div className="centered_content bd_officers">
              <h3>OFFICERS</h3>
              <div className="fb_columns">
                <ul>
                  <li>Jon Hansen | President</li>
                  <li>Kelly Mann | Treasurer</li>
                </ul>
                <ul>
                  <li>Angela Athy | President-Elect</li>
                  <li>Susan Haddix | Secretary</li>
                </ul>
                <ul>
                  <li>Ann Christiansen | Past-President</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="egg_wrap fb_container">
          <div className="fb_wrapper main_wrapper">
            <div className="centered_content bd_members">
              <h3>DIRECTORS</h3>
              <div className="fb_columns">
                <ul>
                  <li>Alexis Boulos</li>
                  <li>Catherine Demes Maydew</li>
                  <li>Ryan Gibson</li>
                  <li>Wendy Goldberg</li>
                  <li>Mace Hack</li>
                  <li>Andrew Huettner</li>
                </ul>
                <ul>
                  <li>Hans Klein-Hewett</li>
                  <li>Nickie Konen</li>
                  <li>Scott Marble</li>
                  <li>Chris Morrow</li>
                  <li>Don Preister</li>
                  <li>Athena Ramos</li>
                </ul>
                <ul>
                  <li>Brittni Redding</li>
                  <li>Jim Ristow</li>
                  <li>Todd Rivers</li>
                  <li>Barbara Stratman</li>
                  <li>Ray Turkle</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="egg_wrap fb_container">
          <div className="fb_wrapper main_wrapper">
            <div className="centered_content bd_members">
              <h3>HONORARY TRUSTEES</h3>
              <div className="fb_columns">
                <ul>
                  <li>Mogens Bay</li>
                  <li>Charles Gifford</li>
                  <li>Susan and George Haddix</li>
                  <li>Gerry and Bruce Lauritzen</li>
                  <li>Marilyn Mammel</li>
                  <li>Ann Pape</li>
                  <li>Walter Scott, Jr.</li>
                  <li>Ann and Ken Stinson</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
});
