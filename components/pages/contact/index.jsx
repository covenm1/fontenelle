var React = require('react'),
    request = require('superagent'),
    util = require('util');
var Velocity = require('velocity-animate/velocity');
var InlineSVG = require('react-inlinesvg');
var Router = require('react-router');

var Navigation = Router.Navigation;
var Link = Router.Link;

var ScrollMagic = require('scrollmagic');

var management = require('../../common/management.json');
var staff = require('../../common/staff.json');

var Footer = require('../../common/footer.jsx');

var StaffMember = React.createClass({
  render: function() {
    var self = this;
    return (
      <div className="staff_member">
        <h2 className="name">
          <span className="staff_name">{self.props.name}</span>
          <span className="title"> | {self.props.title}</span>
        </h2>
        <p className="email">{self.props.email} <a href={"mailto:"+self.props.email}>
          <svg className="arrow_circle blue right_arrow" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" >
            <path className="circle" strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M1,26c0,13.8,11.2,25,25,25c13.8,0,25-11.2,25-25S39.8,1,26,1C12.2,1,1,12.2,1,26z"/>
            <g className="arrow" >
              <path strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M29.4,25.9c0,0-1,1.6-1,4.4c0,2.6-0.6,3.5-0.6,3.8c0,0.4,0.3,0.7,0.7,0.5s8.6-6.2,10.5-8.1
              c0,0,0.2-0.2,0.2-0.5v-0.1c0-0.2-0.1-0.4-0.2-0.5c-1.7-1.7-10.1-7.9-10.5-8.1c-0.3-0.2-0.7-0.1-0.7,0.5c0,0.3,0.6,1.1,0.6,3.8
              C28.4,24.3,29.4,25.9,29.4,25.9z"/>
              <line strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' x1="27.8" y1="25.9" x2="12.7" y2="25.9"/>
            </g>
          </svg></a></p>
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
      <div>
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
              <p className="place_directions">From I-80, take Hwy 75 (Kennedy Freeway) South to Chandler Road. Turn left onto Chandler. Stay on Chandler approx. 1 mile until the road ends at the stop sign at Bellevue Blvd. Turn right onto Bellevue Blvd. Continue for a little over .5 of a mile and turn left onto Childs Road. Continue on Childs Road through the housing development. The road becomes Camp Gifford Road and will change into a gravel surface. Continue 1.5 miles on the gravel surface. The Wetlands Learning Center will be on your right.</p>
              <a target="_blank" href="https://www.google.com/maps/place/41%C2%B010'29.5%22N+95%C2%B053'25.5%22W/@41.1748546,-95.8913087,18z/data=!3m1!4b1!4m2!3m1!1s0x0:0x0?hl=en" className="map_link">View Map</a>
            </div>
            <div className='place'>
              <h2 className="place_title">Neale Woods</h2>
              <p className="address">14323 Edith Marie Ave. <br/>Omaha, NE 68112</p>
              <p className="place_directions">From I-80 take Hwy 75 North. Merge onto Storz Expressway towards Florence Blvd/Eppley Airfield. Take the Florence Blvd ramp and turn left at the stop sign. Florence Blvd. becomes J. Pershing Drive. Continue through the T intersection at Mormon Bridge onto River Road. From there, you will travel 2.7 miles to White Deer Lane (past NP Dodge and Hummel Park, stay to the right at the fork in road). Turn a slight left onto White Deer Lane and left again onto Edith Marie Ave.</p>
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
                <p className="email">jvavak@fontenelleforest.org<a href="mailto:jvavak@fontenelleforest.org">
                  <svg className="arrow_circle blue right_arrow" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" >
                    <path className="circle" strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M1,26c0,13.8,11.2,25,25,25c13.8,0,25-11.2,25-25S39.8,1,26,1C12.2,1,1,12.2,1,26z"/>
                    <g className="arrow" >
                      <path strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M29.4,25.9c0,0-1,1.6-1,4.4c0,2.6-0.6,3.5-0.6,3.8c0,0.4,0.3,0.7,0.7,0.5s8.6-6.2,10.5-8.1
                        c0,0,0.2-0.2,0.2-0.5v-0.1c0-0.2-0.1-0.4-0.2-0.5c-1.7-1.7-10.1-7.9-10.5-8.1c-0.3-0.2-0.7-0.1-0.7,0.5c0,0.3,0.6,1.1,0.6,3.8
                        C28.4,24.3,29.4,25.9,29.4,25.9z"/>
                      <line strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' x1="27.8" y1="25.9" x2="12.7" y2="25.9"/>
                    </g>
                  </svg></a></p>
              </div>
              <div className="staff_member">
                <h2 className="name">
                  <span className="staff_name">Donate to FF: </span>
                  <span className="title">If you have questions about making a donation, please e-mail the Director of Development.</span>
                </h2>
                <p className="email">jvavak@fontenelleforest.org<a href="mailto:jvavak@fontenelleforest.org">
                  <svg className="arrow_circle blue right_arrow" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" >
                    <path className="circle" strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M1,26c0,13.8,11.2,25,25,25c13.8,0,25-11.2,25-25S39.8,1,26,1C12.2,1,1,12.2,1,26z"/>
                    <g className="arrow" >
                      <path strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M29.4,25.9c0,0-1,1.6-1,4.4c0,2.6-0.6,3.5-0.6,3.8c0,0.4,0.3,0.7,0.7,0.5s8.6-6.2,10.5-8.1
                        c0,0,0.2-0.2,0.2-0.5v-0.1c0-0.2-0.1-0.4-0.2-0.5c-1.7-1.7-10.1-7.9-10.5-8.1c-0.3-0.2-0.7-0.1-0.7,0.5c0,0.3,0.6,1.1,0.6,3.8
                        C28.4,24.3,29.4,25.9,29.4,25.9z"/>
                      <line strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' x1="27.8" y1="25.9" x2="12.7" y2="25.9"/>
                    </g>
                  </svg></a></p>
              </div>
              <div className="staff_member">
                <h2 className="name">
                  <span className="staff_name">Careers: </span>
                  <span className="title">For current open positions</span>
                </h2>
                <p className="email"><Link to="/careers">
                  <svg className="arrow_circle blue right_arrow" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" >
                    <path className="circle" strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M1,26c0,13.8,11.2,25,25,25c13.8,0,25-11.2,25-25S39.8,1,26,1C12.2,1,1,12.2,1,26z"/>
                    <g className="arrow" >
                      <path strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M29.4,25.9c0,0-1,1.6-1,4.4c0,2.6-0.6,3.5-0.6,3.8c0,0.4,0.3,0.7,0.7,0.5s8.6-6.2,10.5-8.1
                        c0,0,0.2-0.2,0.2-0.5v-0.1c0-0.2-0.1-0.4-0.2-0.5c-1.7-1.7-10.1-7.9-10.5-8.1c-0.3-0.2-0.7-0.1-0.7,0.5c0,0.3,0.6,1.1,0.6,3.8
                        C28.4,24.3,29.4,25.9,29.4,25.9z"/>
                      <line strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' x1="27.8" y1="25.9" x2="12.7" y2="25.9"/>
                    </g>
                  </svg></Link></p>
              </div>
              <div className="staff_member">
                <h2 className="name">
                  <span className="staff_name">Donation Requests: </span>
                  <span className="title">For qualifications and instructions</span>
                </h2>
                <p className="email"><Link to="/get-involved/donate">
                  <svg className="arrow_circle blue right_arrow" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" >
                    <path className="circle" strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M1,26c0,13.8,11.2,25,25,25c13.8,0,25-11.2,25-25S39.8,1,26,1C12.2,1,1,12.2,1,26z"/>
                    <g className="arrow" >
                      <path strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M29.4,25.9c0,0-1,1.6-1,4.4c0,2.6-0.6,3.5-0.6,3.8c0,0.4,0.3,0.7,0.7,0.5s8.6-6.2,10.5-8.1
                        c0,0,0.2-0.2,0.2-0.5v-0.1c0-0.2-0.1-0.4-0.2-0.5c-1.7-1.7-10.1-7.9-10.5-8.1c-0.3-0.2-0.7-0.1-0.7,0.5c0,0.3,0.6,1.1,0.6,3.8
                        C28.4,24.3,29.4,25.9,29.4,25.9z"/>
                      <line strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' x1="27.8" y1="25.9" x2="12.7" y2="25.9"/>
                    </g>
                  </svg></Link></p>
              </div>
              <div className="staff_member">
                <h2 className="name">
                  <span className="staff_name">Memberships: </span>
                  <span className="title">To learn more about membership and to join or renew online.</span>
                </h2>
                <p className="email"><Link to="/get-involved/membership">
                  <svg className="arrow_circle blue right_arrow" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" >
                    <path className="circle" strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M1,26c0,13.8,11.2,25,25,25c13.8,0,25-11.2,25-25S39.8,1,26,1C12.2,1,1,12.2,1,26z"/>
                    <g className="arrow" >
                      <path strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M29.4,25.9c0,0-1,1.6-1,4.4c0,2.6-0.6,3.5-0.6,3.8c0,0.4,0.3,0.7,0.7,0.5s8.6-6.2,10.5-8.1
                        c0,0,0.2-0.2,0.2-0.5v-0.1c0-0.2-0.1-0.4-0.2-0.5c-1.7-1.7-10.1-7.9-10.5-8.1c-0.3-0.2-0.7-0.1-0.7,0.5c0,0.3,0.6,1.1,0.6,3.8
                        C28.4,24.3,29.4,25.9,29.4,25.9z"/>
                      <line strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' x1="27.8" y1="25.9" x2="12.7" y2="25.9"/>
                    </g>
                  </svg></Link></p>
              </div>
              <div className="staff_member">
                <h2 className="name">
                  <span className="staff_name">Programs: </span>
                  <span className="title">For information about our classes, events, and programs, please see the Calendar of Events.</span>
                </h2>
                <p className="email"><Link to="/programs">
                  <svg className="arrow_circle blue right_arrow" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" >
                    <path className="circle" strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M1,26c0,13.8,11.2,25,25,25c13.8,0,25-11.2,25-25S39.8,1,26,1C12.2,1,1,12.2,1,26z"/>
                    <g className="arrow" >
                      <path strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M29.4,25.9c0,0-1,1.6-1,4.4c0,2.6-0.6,3.5-0.6,3.8c0,0.4,0.3,0.7,0.7,0.5s8.6-6.2,10.5-8.1
                        c0,0,0.2-0.2,0.2-0.5v-0.1c0-0.2-0.1-0.4-0.2-0.5c-1.7-1.7-10.1-7.9-10.5-8.1c-0.3-0.2-0.7-0.1-0.7,0.5c0,0.3,0.6,1.1,0.6,3.8
                        C28.4,24.3,29.4,25.9,29.4,25.9z"/>
                      <line strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' x1="27.8" y1="25.9" x2="12.7" y2="25.9"/>
                    </g>
                  </svg></Link></p>
              </div>
              <div className="staff_member">
                <h2 className="name">
                  <span className="staff_name">Volunteer: </span>
                  <span className="title">To become a volunteer or to learn more about FF's volunteer opportunities</span>
                </h2>
                <p className="email"><Link to="/get-involved/volunteer">
                  <svg className="arrow_circle blue right_arrow" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" >
                    <path className="circle" strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M1,26c0,13.8,11.2,25,25,25c13.8,0,25-11.2,25-25S39.8,1,26,1C12.2,1,1,12.2,1,26z"/>
                    <g className="arrow" >
                      <path strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M29.4,25.9c0,0-1,1.6-1,4.4c0,2.6-0.6,3.5-0.6,3.8c0,0.4,0.3,0.7,0.7,0.5s8.6-6.2,10.5-8.1
                        c0,0,0.2-0.2,0.2-0.5v-0.1c0-0.2-0.1-0.4-0.2-0.5c-1.7-1.7-10.1-7.9-10.5-8.1c-0.3-0.2-0.7-0.1-0.7,0.5c0,0.3,0.6,1.1,0.6,3.8
                        C28.4,24.3,29.4,25.9,29.4,25.9z"/>
                      <line strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' x1="27.8" y1="25.9" x2="12.7" y2="25.9"/>
                    </g>
                  </svg></Link></p>
              </div>
          </div>
          <div className='main_wrapper'>
            <StaffList />
          </div>
          <div className='main_wrapper'>
            <h2 className="staff_title">PART-TIME EDUCATORS</h2>
            <ul className="name_list">
              <li>Kyle Anderson</li>
              <li>Amy Campagna</li>
              <li>Julianne Carbonell</li>
              <li>Amanda Dague</li>
              <li>Kathy Fischer</li>
            </ul>
            <ul className="name_list">
              <li>Lisa Formanik</li>
              <li>Dianne Guinn</li>
              <li>Emma Hoffman</li>
              <li>Tisha Johnson</li>
              <li>Seth Krone-Keith</li>
            </ul>
            <ul className="name_list">
              <li>Jean Neneman</li>
              <li>Nick Sauvageau</li>
              <li>Tina Tweedy</li>
              <li>Tracy Van Zee</li>
            </ul>
            <h2 className="staff_title">VISITOR SERVICES ASSISTANTS</h2>
            <span className="name_item">Helen Beebe</span>
            <span className="name_item">Brian Mark Conover</span>
            <span className="name_item">Emma Hoffman</span>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
});
