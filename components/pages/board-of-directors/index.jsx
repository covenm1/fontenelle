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
                  <li>Paul J. Halbur | President</li>
                  <li>Levi Scheppers | Treasurer</li>
                </ul>
                <ul>
                  <li>Angela L. Burmeister | President-Elect</li>
                  <li>Jim Hawkins | Advisor</li>
                </ul>
                <ul>
                  <li>Jon T. Hansen | Secretary</li>
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
                  <li>Catherine M. Barmettler</li>
                  <li>Ann Christiansen</li>
                  <li>Toba Cohen-Dunning</li>
                  <li>Catherine Demes Maydew</li>
                  <li>Todd Rivers</li>
                </ul>
                <ul>
                  <li>David M. Dvorak</li>
                  <li>Lorraine A. Egger</li>
                  <li>Mike Hamilton</li>
                  <li>Howard J. Kaslow</li>
                  <li>Gerry Lauritzen</li>
                  <li>Robert D. Rose</li>
                </ul>
                <ul>
                  <li>Julie Liakos</li>
                  <li>Kelly Mann</li>
                  <li>Susan Nemer-Haddix</li>
                  <li>Athena Ramos</li>
                  <li>Julee Sauer</li>
                  <li>Christine Schulte</li>
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
                  <li>George F. Haddix</li>
                  <li>Neal C. Hansen</li>
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
      </div>
    )
  }
});
