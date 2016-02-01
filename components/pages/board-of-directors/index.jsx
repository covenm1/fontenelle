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
                  <li>Angela L. Burmeister | President</li>
                  <li>Levi Scheppers | Treasurer/Chair Finance</li>
                </ul>
                <ul>
                  <li>Ann Christiansen | President-Elect</li>
                  <li>Paul Halbur | Past-President</li>
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
                  <li>Alexis Boulos</li>
                  <li>Toba Cohen-Dunning</li>
                  <li>Catherine Demes Maydew</li>
                  <li>Ryan Gibson</li>
                  <li>Mace Hack</li>
                </ul>
                <ul>
                  <li>Mike Hamilton</li>
                  <li>Howard J. Kaslow</li>
                  <li>Hans Klein-Hewett</li>
                  <li>Gerry Lauritzen</li>
                  <li>Julie Liakos</li>
                  <li>Kelly Mann</li>
                </ul>
                <ul>
                  <li>Susan Nemer-Haddix</li>
                  <li>Athena Ramos</li>
                  <li>Jim Ristow</li>
                  <li>Todd Rivers</li>
                  <li>Julee Sauer</li>
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
        <Footer />
      </div>
    )
  }
});
