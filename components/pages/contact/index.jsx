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

var management = require('../../common/management.json');
var staff = require('../../common/staff.json');

var StaffMember = React.createClass({
  render: function() {
    var self = this;
    return (
      <div className="staff_member">
        <h2 className="name">
          <span className="staff_name">{self.props.name}</span>
          <span className="title"> | {self.props.title}</span>
        </h2>
        <p className="email">{self.props.email} <a href={"mailto:"+self.props.email}><img src="/img/conservation/icon_right_blue.svg" /></a></p>
      </div>
    )
  }
});

var StaffList = React.createClass({
  getInitialState: function() {
    return {staff: staff, management: management}
  },


  render: function() {
    var self = this;

    var management = self.state.management.map(function(object) {

      return <StaffMember
        name={object.name}
        title={object.title}
        email={object.email}  />
    });

    var staff = self.state.staff.map(function(object) {

      return <StaffMember
        name={object.name}
        title={object.title}
        email={object.email}  />
    });
    return (
      <div className="staffs">
        <h1 className="main_staff_title marker">Staff</h1>
        <h2 className="staff_title">Management</h2>
        { management }
        <h2 className="staff_title">Staff</h2>
        { staff }
      </div>
    )
  }
});

var poster_image;

module.exports = React.createClass({
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
        <div className="blue_wrap static">
          <div className="centered_content">
            <span className="phone_wrapper">
              <span className="phone_label">PHONE</span>
              <a href="tel:4027313140" className="phone_button">(402) 731-3140</a>
            </span>
            <span className="phone_wrapper">
              <span className="phone_label">FAX</span>
              <a href="tel:4027312403" className="phone_button">(402) 731-2403</a>
            </span>
          </div>
        </div>
        <div className="egg_wrap tpadded">
          <div className='main_wrapper'>
            <div className='place'>
              <h2 className="place_title">Fontenelle Forest Nature Center</h2>
              <p className="address">1111 Bellevue Blvd. North <br/>Bellevue, NE 68005</p>
              <p className="place_directions">From I-80, take Hwy 75 (Kennedy Freeway) south to Chandler Road. Turn left onto Chandler. Stay on Chandler approx. 1 mile until the road ends at the stop sign at Bellevue Blvd. Turn right onto Bellevue Blvd. Continue approximately .5 of a mile to the nature center (on the left).</p>
              <a target="_blank" href="http://maps.google.com/maps?q=1111+N.+Bellevue+Blvd.+Bellevue,+NE+68005&hl=en&z=16" className="map_link">View Map</a>
            </div>
            <div className='place'>
              <h2 className="place_title">Camp Brewster</h2>
              <p className="address">1313 Bellevue Blvd. North<br/>Bellevue, NE 68005</p>
              <p className="place_directions">From I-80, take Hwy 75 (Kennedy Freeway) South to Chandler Road. Turn left onto Chandler. Stay on Chandler approx. 1 mile until the road ends at the stop sign at Bellevue Blvd. Turn right onto Bellevue Blvd. Continue approximately .3 of a mile to Camp Brewster (on the left)</p>
              <a target="_blank" href="http://maps.google.com/maps?q=1313+N.+Bellevue+Blvd.+Bellevue,+NE+68005&hl=en&ll=41.181803,-95.920923&spn=0.012451,0.027831&sll=41.180745,-95.914198&sspn=0.012452,0.027831&z=16" className="map_link">View Map</a>
            </div>
            <div className='place'>
              <h2 className="place_title">Camp Logan Fontenelle</h2>
              <p className="address">720 Camp Gifford Road <br/>Bellevue, NE 68005</p>
              <p className="place_directions">From I-80, take Hwy 75 (Kennedy Freeway) South to Chandler Road. Turn left onto Chandler. Stay on Chandler approx. 1 mile until the road ends at the stop sign at Bellevue Blvd. Turn right onto Bellevue Blvd. Continue for a little over .5 of a mile and turn left onto Childs Road. Continue on Childs Road through the housing development. The road becomes Camp Gifford Road and will change into a gravel surface. After the first curve, Camp Logan Fontenelle will be on your left.</p>
              <a target="_blank" href="http://maps.google.com/maps?q=720+Camp+Gifford+Road+Bellevue,+NE+68005&hl=en&sll=41.181803,-95.920923&sspn=0.012451,0.027831&z=16" className="map_link">View Map</a>
            </div>
            <div className='place'>
              <h2 className="place_title">Hitchcock Wetlands Learning Center</h2>
              <p className="address">103 Camp Gifford Road <br/>Bellevue, NE 68005</p>
              <p className="place_directions">From I-80 take Hwy 75 North. Merge onto Storz Expressway towards Florence Blvd/Eppley Airfield. Take the Florence Blvd ramp and turn left at the stop sign. Florence Blvd. becomes J. Pershing Drive. Continue through the T intersection at Mormon Bridge onto River Road. From there, you will travel 2.7 miles to White Deer Lane (past NP Dodge and Hummel Park, stay to the right at the fork in road). Turn a slight left onto White Deer Lane and left again onto Edith Marie Ave.</p>
              <a target="_blank" href="http://maps.google.com/maps?q=103+Camp+Gifford+Road+Bellevue,+NE+68005&hl=en&ll=41.178428,-95.883179&spn=0.024904,0.055661&sll=41.169328,-95.903122&sspn=0.012454,0.027831&z=15" className="map_link">View Map</a>
            </div>
            <div className='place'>
              <h2 className="place_title">Neale Woods</h2>
              <p className="address">14323 Edith Marie Ave. <br/>Omaha, NE 68112</p>
              <p className="place_directions">From I-80, take Hwy 75 (Kennedy Freeway) south to Chandler Road. Turn left onto Chandler. Stay on Chandler approx. 1 mile until the road ends at the stop sign at Bellevue Blvd. Turn right onto Bellevue Blvd. Continue approximately .5 of a mile to the nature center (on the left).</p>
              <a target="_blank" href="http://maps.google.com/maps?q=14323+Edith+Marie+Ave.+Omaha,+NE+68112&hl=en&sll=41.178428,-95.883179&sspn=0.024904,0.055661&z=16" className="map_link">View Map</a>
            </div>
          </div>
          <div className='main_wrapper'>
            <h2 className="staff_title">General Contact</h2>
              <div className="staff_member">
                <h2 className="name">
                  <span className="staff_name">Media: </span>
                  <span className="title">For all media inquiries, please e-mail the Director of Communications</span>
                </h2>
                <p className="email"><a href="#"><img src="/img/conservation/icon_right_blue.svg" /></a></p>
              </div>
              <div className="staff_member">
                <h2 className="name">
                  <span className="staff_name">Donate to FF: </span>
                  <span className="title">If you have questions about making a donation, please e-mail the Director of Development.</span>
                </h2>
                <p className="email"><a href="#"><img src="/img/conservation/icon_right_blue.svg" /></a></p>
              </div>
              <div className="staff_member">
                <h2 className="name">
                  <span className="staff_name">Careers: </span>
                  <span className="title">For current open positions</span>
                </h2>
                <p className="email"><a href="#"><img src="/img/conservation/icon_right_blue.svg" /></a></p>
              </div>
              <div className="staff_member">
                <h2 className="name">
                  <span className="staff_name">Donation Requests: </span>
                  <span className="title">For qualifications and instructions</span>
                </h2>
                <p className="email"><a href="#"><img src="/img/conservation/icon_right_blue.svg" /></a></p>
              </div>
              <div className="staff_member">
                <h2 className="name">
                  <span className="staff_name">Memberships: </span>
                  <span className="title">To learn more about membership and to join or renew online.</span>
                </h2>
                <p className="email"><a href="#"><img src="/img/conservation/icon_right_blue.svg" /></a></p>
              </div>
              <div className="staff_member">
                <h2 className="name">
                  <span className="staff_name">Programs: </span>
                  <span className="title">For information about our classes, events, and programs, please see the Calendar of Events.</span>
                </h2>
                <p className="email"><a href="#"><img src="/img/conservation/icon_right_blue.svg" /></a></p>
              </div>
              <div className="staff_member">
                <h2 className="name">
                  <span className="staff_name">Volunteer: </span>
                  <span className="title">FTo become a volunteer or to learn more about FF's volunteer opportunities</span>
                </h2>
                <p className="email"><a href="#"><img src="/img/conservation/icon_right_blue.svg" /></a></p>
              </div>
              <div className="staff_member">
                <h2 className="name">
                  <span className="staff_name">Media: </span>
                  <span className="title">For all media inquiries, please e-mail the Director of Communications</span>
                </h2>
                <p className="email"><a href="#"><img src="/img/conservation/icon_right_blue.svg" /></a></p>
              </div>
          </div>
          <div className='main_wrapper'>
            <StaffList />
          </div>
          <div className='main_wrapper'>
            <h2 className="staff_title">PART-TIME EDUCATORS</h2>
            <ul className="name_list">
              <li>Kyle Anderson</li>
              <li>Katie Arkfield</li>
              <li>Amy Campagna</li>
              <li>Julianne Carbonell</li>
              <li>Amanda Dague</li>
            </ul>
            <ul className="name_list">
              <li>Kathy Fischer</li>
              <li>Lisa Formanik</li>
              <li>Dianne Guinn</li>
              <li>Janie Helt</li>
              <li>Emma Hoffman</li>
              <li>Tisha Johnson</li>
            </ul>
            <ul className="name_list">
              <li>Seth Krone-Keith</li>
              <li>Jean Neneman</li>
              <li>Nick Sauvageau</li>
              <li>Dorie Stone</li>
              <li>Chelsea Taxman</li>
              <li>Tracy Van Zee</li>
            </ul>
            <h2 className="staff_title">VISITOR SERVICES ASSISTANTS</h2>
            <span className="name_item">Helen Beebe</span>
            <span className="name_item">Brian Mark Conover</span>
            <span className="name_item">Brenna Watkins</span>
            <span className="name_item">Lisa Wiles</span>
          </div>
        </div>

        <Footer />
      </div>
    )
  }
});
