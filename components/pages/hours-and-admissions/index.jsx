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
          <div className="egg_wrap static">
            <div className="fb_wrapper main_wrapper">
              <div className="centered_content bd_members">
                <div className="ha_columns">
                  <div>
                    <h3>HOURS</h3>
                    <p><b>Open daily, year-round from 8 a.m. - 5 p.m.</b></p>
                    <p>Trails open dawn to dusk for FF members (with a Keyless Access FOB*) and visitors entering before nature center closes.</p>
                    <p>*Keyless Access Fobs are issued by request during business hours at Visitor Services and require a refundable $10 deposit.</p>
                    <p>All facilities are closed on Thanksgiving Day, Christmas Day and New Year's Day. FF Closure Policy for Inclement Weather: All of FF properties are closed when Omaha Public Schools cancels classes.</p>
                  </div>
                  <div>
                    <h3>ADMISSION</h3>
                    <p><b>Free for FF Members - Become a member today!</b>
                      <br/>$7 per adult
                      <br/>$6 per senior (62+)
                      <br/>$5 per child/student (2-17)
                      <br/>Free for children under age 2
                    </p>
                    <p>New! Purchase admission online. Click here</p>
                    <p>Parking is free and available on a first-come, first-served basis. Please pay your admission and pick up a trail map at the Visitor Services Desk.</p>
                    <p>Fontenelle Forest's properties are tobacco-free.</p>
                  </div>
                  <div>
                    <h3>GROUP RATES</h3>
                    <p>Fontenelle Forest is a great place to spend an entire day with a group of people of any age! We can host groups of any size. Reservations are not required; however, if your group needs any special accomodations, please call prior to your arrival.</p>
                    <p>Group Rate Policy
                      <br/>Groups with a minimum of 12 people can receive $1 off the regular admission price when:
                      <br/>- Payment is made at the time of arrival
                      <br/>- One payment is made for the entire group
                      <br/>Please keep in mind that people arriving later than the group will be charged full admission.</p>
                    <p>For questions about bringing your group to Fontenelle Forest, please contact Visitor Services at (402) 731-3140.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
    )
  }
});
