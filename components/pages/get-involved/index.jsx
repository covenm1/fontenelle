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

  componentDidMount: function () {
    var self  = this;

    if (self.getParams().scroll) {
      self.scrollThing(self.getParams().scroll)
    }
  },

  componentDidUpdate: function (prevProps, prevState) {
    var self  = this;

    if (prevProps.params != self.props.params){
      self.scrollThing(self.props.params.scroll);
    }
  },

  scrollThing: function(thing){
    var self = this;
    var controller = self.props.controller
    if (thing) {
      controller.scrollTo("#"+thing);
    } else {
      controller.scrollTo(0);
    }
  },

  componentWillReceiveProps: function () {},

  render: function() {
    var self = this;

    return (
      <div className="egg_wrap">
        <div className="gi_video">
          <div id="donate" className="donate video_overlay"></div>
          <div className="gi_wrapper">
            <div className="centered_content">
              <img className="arrow_gi" src="/img/get-involved/arrow_donate-01.svg" />
            </div>
          </div>
        </div>
        <div className="egg_wrap donate_container">
          <div className="gi_wrapper main_wrapper">
            <div className="centered_content donate">
              <h2 className="marker">DONATE</h2>
              <p>It is because of our many generous donors that we are able to offer such a breadth and depth of conservation initiatives, educational activities, and other programs in the forest. Your tax-deductible gifts will go toward ongoing stewardship of over 2,000 acres of natural land and programs that benefit over 80,000 visitors each year.</p>
              <img className="gi_break" src="/img/conservation/divider_bottom_grey.png" />
              <div className="element_contain">
                <a className="gi_button marker" href="">Donate</a>
              </div>
            </div>
          </div>
        </div>

        <div className="gi_video">
          <div id="membership" className="join video_overlay"></div>
          <div className="gi_wrapper">
            <div className="centered_content">
              <img className="arrow_gi" src="/img/get-involved/arrow_join-01.svg" />
            </div>
          </div>
        </div>
        <div className="egg_wrap join_container">
          <div className="gi_wrapper main_wrapper">
            <div className="centered_content join">
              <h2 className="marker">JOIN</h2>
              <p>Become a Fontenelle Forest member today and over 2,000 acres of land will become your backyard to explore as often as you like. Your whole family will enjoy weekly programming, special events, educational classes, and unique encounters that bring a new adventure with every visit.</p>
              <img className="gi_break" src="/img/conservation/divider_bottom_grey.png" />
              <div className="element_contain">
                <a className="gi_button marker" href="">Join or Renew Membership</a>
                <a className="gi_button marker" href="">Purchase Giftcard</a>
              </div>
            </div>
            <div className="centered_content join">
              <h3>MEMBERSHIP BENEFITS</h3>
              <hr />
              <div className="element_contain">
                <ul>
                  <li>Free admission to Fontenelle Forest Nature Center and Neale Woods for 12 months</li>
                  <li>26 miles of marked trails within the extraordinary Loess Hills</li>
                  <li>Two wheelchair accessible boardwalks with Missouri River and wetland views</li>
                  <li>Diverse ecosystems, hidden lakes, and rare wildflowers</li>
                  <li>A premier birding location with over 246 recorded species</li>
                  <li>Family-friendly exhibits and Acorn Acres, a forest playscape with nine exploration areas</li>
                  <li>Habitat Hollow for indoor play and learning</li>
                </ul>
                <ul>
                  <li>Unique entertainment options: critter encounters, guided hikes, children's programs</li>
                  <li>Members-only events and other programming</li>
                  <li>10% discount at The Gift Shop at Fontenelle Forest</li>
                  <li>Subscription to Fontenelle Forest's newsletter "The Leaflet"</li>
                  <li>Free or discounted admission to over 180 nature centers nationwide through ANCA</li>
                  <li>Every time you visit, two of your guests can receive 1/2 priced admission</li>
                  <li>Discounts on Winter and Summer Camps</li>
                  <li>Access to trails before and after hours</li>
                </ul>
              </div>
              <hr />
              <div className="gi_pricing">
                <h3 className="element_spread"><span>MEMBERSHIP</span><span>PRICE</span></h3>
                <ul>
                  <li><span>Individual<br/><em>One Adult</em></span><span>$35</span></li>
                  <li><span>Two Individuals<br/><em>Two adults living in the same household</em></span><span>$45</span></li>
                  <li><span>Household<br/><em>Two adults, children, or grandchildren (under age 18)</em></span><span>$55</span></li>
                </ul>
              </div>
              <div className="gi_pricing">
                <h3 className="element_spread"><span>BECOME A PATRON<br/><em>Fully tax deductible</em></span><span>PRICE</span></h3>
                <ul>
                  <li><span>Patron<br/><em>ADDITIONAL BENEFITS: 4 guest passes, 15% gift shop discount</em></span><span>$150-249</span></li>
                  <li><span>Supporting Patron<br/><em>ADDITIONAL BENEFITS: 10 guest passes, 20% gift shop discount</em></span><span>$250-499</span></li>
                  <li><span>Sustaining Patron<br/><em>ADDITIONAL BENEFITS: 10 guest passes, 25% gift shop discount</em></span><span>$500-999</span></li>
                  <li><span>Distinguished Patron<br/><em>ADDITIONAL BENEFITS: 20 guest passes, 30% gift shop discount</em></span><span>$1,000-2,499</span></li>
                  <li><span>Benefactor<br/><em>ADDITIONAL BENEFITS: 20 guest passes, 30% gift shop discount</em></span><span>$2,500+</span></li>
                </ul>
              </div>
              <div className="element_contain">
                <a className="gi_button marker" href="">Join or Renew Membership</a>
                <a className="gi_button marker" href="">Purchase Giftcard</a>
              </div>
            </div>
          </div>
        </div>

        <div className="gi_video">
          <div id="volunteer" className="volunteer video_overlay"></div>
          <div className="gi_wrapper">
            <div className="centered_content">
              <img className="arrow_gi" src="/img/get-involved/arrow_volunteer-01.svg" />
            </div>
          </div>
        </div>
        <div className="egg_wrap volunteer_container">
          <div className="gi_wrapper main_wrapper">
            <div className="centered_content volunteer">
              <h2 className="marker">VOLUNTEER</h2>
              <p>Our dedicated volunteers are vital to our ongoing educational programs, land stewardship, special events, administration, and many other areas. When you give your time, you are strengthening our ability to preserve historically and ecologically significant land while educating the public about our natural world. We welcome volunteers of all backgrounds and experience levels.</p>
              <img className="gi_break" src="/img/conservation/divider_bottom_grey.png" />
            </div>
            <div className="centered_content volunteer">
              <h3>QUALIFICATIONS</h3>
              <hr />
              <ul>
                <li>Be at least 16 years old (unless you are applying for Teen Naturalist Trainee)</li>
                <li>Commitment of four hours per month</li>
                <li>Commitment of at least six months</li>
                <li>Attend an orientation session</li>
                <li>Sign a waiver/release form</li>
              </ul>
              <hr />
              <div className="element_contain">
                <a className="gi_button marker" href="">Volunteer Form</a>
                <a className="gi_button marker" href="">Volunteer Waiver</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});
