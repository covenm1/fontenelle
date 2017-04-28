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
                  <li>Ann Christiansen | President</li>
                  <li>Kelly Mann | Treasurer</li>
                </ul>
                <ul>
                  <li>Jon Hansen | President-Elect</li>
                  <li>Sue Nemer Haddix | Secretary</li>
                </ul>
                <ul>
                  <li>Angela Burmeister | Advisor</li>
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
                  <li>Angela Athy</li>
                  <li>Catherine Demes Maydew</li>
                  <li>Ryan Gibson</li>
                  <li>Wendy Goldberg</li>
                  <li>Mace Hack</li>
                  <li>Hans Klein-Hewett</li>
                </ul>
                <ul>
                  <li>Nickie Konen</li>
                  <li>Gerry Lauritzen</li>
                  <li>Tad Leeper</li>
                  <li>Cynthia Lesinski</li>
                  <li>Julie Liakos</li>
                  <li>Adrienne Petsick</li>
                </ul>
                <ul>
                  <li>Don Preister</li>
                  <li>Athena Ramos</li>
                  <li>Jim Ristow</li>
                  <li>Todd Rivers</li>
                  <li>Levi Scheppers</li>
                  <li>Barbara Stratman</li>
                  <li>Maria Vazquez</li>
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
                  <li>George F. Haddix</li>
                </ul>
                <ul>
                  <li>Gerry and Bruce Lauritzen</li>
                  <li>Marilyn Mammel</li>
                </ul>
                <ul>
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
