var React = require('react'),
    request = require('superagent'),
    util = require('util');
var Velocity = require('velocity-animate/velocity');
var InlineSVG = require('react-inlinesvg');
var Router = require('react-router');

var Navigation = Router.Navigation;
var Link = Router.Link;

var ScrollMagic = require('scrollmagic');
var TweenMax = require('../../../public/js/tweenmax.js');
require('../../../public/js/scrollTo.js');

var SetIntervalMixin = {
  componentWillMount: function() {
    this.intervals = [];
  },
  setInterval: function() {
    this.intervals.push(setInterval.apply(null, arguments));
  },
  componentWillUnmount: function() {
    this.intervals.forEach(clearInterval);
  }
};

var poster_image;
var Main = React.createClass({
  mixins: [ Router.State, Navigation, SetIntervalMixin ],
  getInitialState: function() {
    return {
      pre_count: 0,
      load_images: [
        "/img/programs/programs-video.jpg",
        "/img/programs/binoculars.png",
        "/img/programs/spider.png",
        "/img/programs/skyline_red.jpg",
        "/img/programs/groups.png"
      ],
      percent_loaded: 0,
      classImage: "/img/programs/programs-1.jpg",
      video: false,
      content: '',
      parent: '',
      spider: 0,
      arrow_class: false };
  },


  componentDidMount: function () {
    var self = this;

    var load_images = self.state.load_images;
    for (image in load_images) {
      tmp_image = new Image();
      tmp_image.onload = self.onLoad;
      tmp_image.src = load_images[image];
    }

    self.setInterval(function() { self.setState({arrow_class: !self.state.arrow_class}); }, 500);
  },

  componentDidUpdate: function (prevProps, prevState) {
    var self  = this;

    if (prevProps.params != self.props.params){
      self.scrollThing(self.props.params.scroll);
    }
  },


  onLoad: function() {
    var self = this;

    var tmp_pre_count = self.state.pre_count;
    tmp_pre_count++;

    if (tmp_pre_count == self.state.load_images.length) {

      self.setState({pre_count: tmp_pre_count, percent_loaded: 100});
      setTimeout(function() { self.setState({loaded: true}); }, 150);
      setTimeout(function() {
        if (self.getParams().scroll) {
          self.scrollThing(self.getParams().scroll)
        }
      }, 350);

    } else {

      var percent_loaded = (tmp_pre_count / self.state.load_images.length ) * 100;
      self.setState({pre_count: tmp_pre_count, percent_loaded: percent_loaded});

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

  topScroll: function(){
    this.scrollThing('page');
  },


  moveLeft: function(){
    this.props.transition('slide-back');
    this.transitionTo('education');
  },


  moveRight: function(){
    this.props.transition('slide-forward');
    this.transitionTo('forest');
  },

  toggleClass: function(){
    if (this.state.classImage == "/img/programs/programs-1.jpg") {
      this.setState({classImage: "/img/programs/programs-2.jpg"});
    } else {
      this.setState({classImage: "/img/programs/programs-1.jpg"});
    }
  },

  toggleVideo: function(){
    this.setState({video: !this.state.video});
  },

  closeContent: function(){
    this.setState({content: ''})
  },

  closeAdult: function(){
    this.setState({adult: ''})
  },

  mudPies: function(){
    var content = (
      <div className="main_class">
        <h2>MUD PIES</h2>
        <img src="/img/programs/mudpies.jpg" width="100%" />
        <p>Looking for a unique setting in which to have fun with your child while learning about the natural world? Mud Pies is a relaxed, drop-in-and-play program that encourages interaction between adult and child. Each week, a natural science topic is explored through station-based activities, free play, and a guided walk. Come discover the joy of sharing nature with your child!</p>
        <p>Mud Pies meets every Monday-Thursday from 9:30-11:30 am at Fontenelle Forest Nature Center. This program is for children ages 5 and younger accompanied by an adult. One adult is required for every two children. This program is free for members or with daily admission.</p>
        <p>Parent groups, day cares, or preschools are accepted on Fridays only by appointment. Contact Lindsay Cooley atlcooley@fontenelleforest.org for more information and available dates.</p>
        <p className="main_label">Location:</p>
        <p className="main_description">Fontenelle Forest Nature Center</p>
        <p className="main_label">Times:</p>
        <p className="main_description">Every Monday, Tuesday, Wednesday, and Thursday during the school year (except certain holidays)</p>
        <p className="main_description">9:30 - 11:30 a.m.</p>
        <p className="main_label">Ages:</p>
        <p className="main_description">5 and younger, accompanied by an adult</p>
        <p className="main_label">Admission:</p>
        <p className="main_description"><strong>FF Members:</strong> Free</p>
        <p className="main_description"><strong>Non-members:</strong> Free with Daily Admission</p>
      </div>
    )

    this.setState({content: content});
    this.scrollThing("kids");
  },

  familySundays: function(){
    var content = (
      <div className="main_class">
        <h2>FAMILY SUNDAYS</h2>
        <img src="/img/programs/family_sundays.jpg" width="100%" />
        <p>Each Sunday at 1:00 p.m. we invite families to come discover the forest. Whether it’s a hike on a new trail with a guide, a meet-and-greet with a raptor, or learning about bird migration, your family will experience the forest like never before.</p>
        <p>These programs are designed for all ages. Each week offers a new topic. Sample topics have included: “Scavenger Hunt Fun,” “Dipping in the Wetlands,” “Migrating Monarchs,” “White-Tailed Deer,” and many more. Make sure to check out Forest Now for the latest topic.</p>
      </div>
    )

    this.setState({content: content});
    this.scrollThing("kids");
  },

  campfire: function(){
    var content = (
      <div className="main_class">
        <h2>CAMPFIRE PROGRAMS</h2>
        <p>Enjoy an enchanting evening roasting s’mores, listening to stories, and spending quality time with your family. Our campfire programs occur the first Friday night of every month. On cold nights enjoy hot cocoa and bring your blanket. Songs will be sung, legends shared, and the forest will surround you at Camp Brewster.</p>
        <p>Each month features a different theme. Past themes have included: “Stories of the Night Sky,” “A Chill in the Air,” “Who is that?,” “Spring Equinox,” “We’ve Gone Batty!,” “Home on the Range,” “Nature Dads: Parenting at the Forest,” and “America the Beautiful.”</p>
        <p>Check Forest Now for the latest theme and date.</p>
      </div>
    )

    this.setState({content: content});
    this.scrollThing("kids");
  },

  natureExplorers: function(){
    var content = (
      <div className="main_class">
        <h2>NATURE EXPLORERS</h2>
        <img src="/img/programs/nature_explorers.jpg" width="100%" />
        <p>This is a child-only learning experience with a new topic each month to learn and explore. Designed for ages 5–11, each program includes snacks, a hike, and a special theme. Past themes have included: “Some like it Wet” featuring the Amphibians of Fontenelle Forest, “April Birds” featuring bird calls and bird feeders, and “Beavers” featuring beaver tracking.</p>
        <p>This interactive and educational program extends the children’s classroom learning into practical, real world learning. Fun and informative led by Fontenelle Forest naturalists, this is one of many unique offerings that only can be found here.</p>
      </div>
    )

    this.setState({content: content});
    this.scrollThing("kids");
  },

  birdClub: function(){
    var content = (
      <div className="main_class">
        <h2>BIRD CLUB </h2>
        <p>The Fontenelle Forest Bird Club (a.k.a. The Down and Dirty Birders) welcomes everyone interested in birding to join the growing number of people who find birding to be an enjoyable and relaxing hobby. We offer regular monthly field trips to local birding sites, as well as regional, national, and international destinations. To become a member, please fill out the application located at fontenelleforest.org/birdclub.pdf and return via mail or bring to a meeting along with your yearly dues. For questions about membership or activities, please contact Rick Schmid at 402.731.3140 x1018 or rschmid@fontenelleforest.org.</p>
        <h4>Club Meetings are Held</h4>
        <ul>
          <li>The first Thursday of each month at 7:00p.m.</li>
          <li>Every month except July and December</li>
          <li>At Fontenelle Forest Nature Center, unless otherwise announced</li>
        </ul>
        <h4>Cost of Membership</h4>
        <ul>
          <li>$12 per individual/$18 per family per year</li>
          <li>Fontenelle Forest membership</li>
        </ul>
      </div>
    )

    this.setState({adult: content});
    this.scrollThing("adults");
  },

  insectClub: function(){
    var content = (
      <div className="main_class">
        <h2>INSECT CLUB </h2>
        <p>This is the second year of Fontenelle Forest’s newest club. If you are interested in learning more about the most numerous animals on earth, please join us. To become a member, please fill out the application located at fontenelleforest.org/insectclub.pdf and return via mail or bring to a meeting along with your yearly dues. For questions about membership or activities, please contact Rick Schmid at 402.731.3140 x1018 or rschmid@fontenelleforest.org.</p>
        <h4>Club Meetings are Held</h4>
        <ul>
          <li>The fourth Thursday of February, April, June, August, & October at 7:00p.m.</li>
          <li>At Fontenelle Forest Nature Center, unless otherwise advertised/announced</li>
        </ul>
        <h4>Cost of Membership</h4>
        <ul>
          <li>$10 per individual/$15 per family per year</li>
          <li>Fontenelle Forest membership</li>
        </ul>
      </div>
    )

    this.setState({adult: content});
    this.scrollThing("adults");
  },

  photoClub: function(){
    var content = (
      <div className="main_class">
        <h2>PHOTO CLUB </h2>
        <p>The Fontenelle Forest Photography Club is dedicated to the pursuit of photography and friendship with like-minded people from the Omaha metro area. Our membership includes photographers of all levels, from beginner to advanced. We are affiliated with Fontenelle Forest and our photographic interests lean toward the flora and fauna of the natural world. However, we have been known to focus on other areas as well. Our monthly programs and activities include presentations by noted photographers, hands-on workshops, annual competitions, and periodic field trips. Visit our calendar for specific program information.</p>
        <h4>Club Meetings are Held</h4>
        <ul>
          <li>The third Thursday of each month (except July and August) at 7:00p.m. </li>
          <li>At Fontenelle Forest Nature Center</li>
        </ul>
        <h4>Cost of Membership</h4>
        <ul>
          <li>$12 per individual/$20 per family per year</li>
          <li>Fontenelle Forest membership</li>
        </ul>
      </div>
    )

    this.setState({adult: content});
    this.scrollThing("adults");
  },

  frogwatch: function(){
    var content = (
      <div className="main_class">
        <h2>FROGWATCH USA</h2>
        <p>Fontenelle Forest hosts a chapter of FrogWatch USA. This is a citizen-science organization designed for long-term monitoring of frog and toad populations. Citizen science refers to research collaborations between scientists and volunteers that expand opportunities for scientific data collection while also providing access to scientific information for community members. The goal of FrogWatch USA is to provide reliable, quality data that can help describe species diversity; detect rare or invasive species or shifts in species range; and serve as a wetlands health indicator.</p>
        <p>(Extended version below:)</p>
        <p>Let’s start with some numbers:     365,000,000 	6,300 	2,468 	1,856 	122 	34</p>
        <p>Amphibians have been around for the last 365 million years (give or take a couple million); they were the first vertebrates to appear on land.</p>
        <p>There are approximately 6,300 amphibian species worldwide. 1,856 are considered threatened as of 2004 on the International Union for Conservation of Nature (IUCN) Red List.  An additional 2,468 species are experiencing declining populations. 34 amphibian species have gone extinct since 1500; however, 122 species are considered “possibly extinct” by the IUCN (Stuart et al. 2004); there’s a lack of information to make a definitive listing.</p>
        <p>To bring things down in scale, there are approximately 280 native amphibian species in the US. Of those, 25 are listed under the Endangered Species Act as either threatened or endangered.</p>
        <p>Bringing the scale down a bit more, Nebraska has approximately 14 amphibian species (Fogell 2010) none of which are listed by the state or federal government.</p>
        <p>Unfortunately, there is not always enough information known about many amphibian species.</p>
        <p>So what is FrogWatch USA and what does it have to do with Fontenelle Forest?  FrogWatch USA is an Association of Zoos and Aquariums (AZA) citizen science program designed for long-term monitoring of frog and toad populations.  Fontenelle Forest was proud to host a chapter last spring.  Citizen science refers to research collaborations between scientists and volunteers that expand opportunities for scientific data collection while also providing access to scientific information for community members (http://www.birds.cornell.edu/citscitoolkit).  These programs have the ability to collect more data, over a larger area, than a single researcher or even a group of researchers.  The goal of FrogWatch USA is to provide reliable, quality data that can help describe species diversity; detect rare or invasive species or shifts in species range; and serve as a wetlands health indicator.</p>
        <p>This research is in response to the global amphibian decline that the numbers we started with seem to suggest.  From roughly March to August, volunteers will be asked to monitor their chosen location, 30 minutes after sunset, twice a week.  They will be listening for, and identifying, frogs and toads based on their calls.  At the end of the year, this data will be submitted to AZA and compiled with the data from all of the other chapters country-wide.  This information then becomes available to scientists, researchers and government entities to help build our understanding of frog and toad populations country-wide.</p>
        <p>If you have any questions or are interested in becoming a Fontenelle Forest FrogWatch volunteer please emailfontenelleforestfrogwatch@gmail.com. Participation in the FrogWatch is free.</p>
        <p>Sources</p>
        <p>Fogell, Daniel D. A Field Guide to the Amphibians and Reptiles of Nebraska. Lincoln, Neb.: University of Nebraska-Lincoln, 2010. Print.</p>
        <p>Stuart, Simon N., Chanson, Janice S., Cox, Neil A., Young, Bruce E., Rodrigues, Ana S. L., Fischman, Debra L, Waller, Robert W. Status and Trends of Amphibian Declines and Extinctions Worldwide, Science 2004; 306 (5702): 1783-1786.</p>
     </div>
    )

    this.setState({adult: content});
    this.scrollThing("adults");
  },

  seniors: function(){
    var content = (
      <div className="main_class">
        <h2>SUN (SENIORS UNDERSTANDING NATURE)</h2>
        <p>Many seniors grew up in a time when nature was a big part of everyday life; SUN (Seniors Understanding Nature) programs enhance that experience.  Join us at Fontenelle Forest Nature Center on the second Tuesday of each month from 9:45a.m. to 11:00a.m. Refreshments served at 9:45a.m., followed by an indoor program, and completed with an optional nature walk. </p>

      </div>
    )

    this.setState({adult: content});
    this.scrollThing("adults");
  },

  spiderClick: function() {
    this.setState({spider: !this.state.spider});
  },


  render: function() {
    var self = this;
    var classImage = self.state.classImage;
    var video = self.state.video;
    var content = self.state.content;

    var adult = self.state.adult;
    var spider = self.state.spider;

    var video_style = {
      backgroundImage: 'url(/img/programs/programs-video.jpg)'
    }

    var loadStyle = {
      width: self.state.percent_loaded + "%"
    }

    var arrow_class = self.state.arrow_class;

    if (self.state.loaded == true) {
      return (
        <div className="page programs_page">
          <div className="page_wrapper">
            <div className="page_container" id="page"  style={loadStyle}>
              <div className="egg_wrap" id="kids">

                { content ?
                  <div className="current_class main_wrapper">

                    <svg onClick={self.closeContent} className="arrow_circle red left_arrow reset_class" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" >
                    	<path className="circle" strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M1,26c0,13.8,11.2,25,25,25c13.8,0,25-11.2,25-25S39.8,1,26,1C12.2,1,1,12.2,1,26z"/>
                    	<g className="arrow" >
                    		<path strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M22.6,25.9c0,0,1,1.6,1,4.4c0,2.6,0.6,3.5,0.6,3.8c0,0.4-0.3,0.7-0.7,0.5s-8.6-6.2-10.5-8.1
                    			c0,0-0.2-0.2-0.2-0.5v-0.1c0-0.2,0.1-0.4,0.2-0.5c1.7-1.7,10.1-7.9,10.5-8.1c0.3-0.2,0.7-0.1,0.7,0.5c0,0.3-0.6,1.1-0.6,3.8
                    			C23.6,24.3,22.6,25.9,22.6,25.9z" />
                    		<line strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' x1="24.2" y1="25.9" x2="39.3" y2="25.9"/>
                    	</g>
                    </svg>
                    {content}
                  </div>:
                  <div className="for_kids_container main_wrapper">

                    <div className="for_kids copy_container">
                      <h2 className="marker color">For Kids</h2>
                      <p>What could be more fun than spending a week in the forest? Fontenelle’s Nature Discovery Day Camps feature fun, hands-on, science-based learning through play taught by our year-round professional educators. Camps are offered in the summer and winter. We also offer special camps for grandparents and grandkids to participate in together. Registration is limited. Proof of age is required. Campers should bring their lunch. Snacks provided.</p>

                      <div className="program_item" onClick={self.mudPies}>
                        <h4 className="name">
                          <span className="program_name">Mud Pies</span>
                          <span className="program_description">Mud Pies is a relaxed, drop-in-and-play program that encourages interaction between adult and child.</span>
                        </h4>
                        <span className="program_arrow">
                          <svg className="arrow_circle red right_arrow" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" >
                          	<path className="circle" strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M1,26c0,13.8,11.2,25,25,25c13.8,0,25-11.2,25-25S39.8,1,26,1C12.2,1,1,12.2,1,26z"/>
                          	<g className="arrow" >
                          		<path strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M29.4,25.9c0,0-1,1.6-1,4.4c0,2.6-0.6,3.5-0.6,3.8c0,0.4,0.3,0.7,0.7,0.5s8.6-6.2,10.5-8.1
                          		c0,0,0.2-0.2,0.2-0.5v-0.1c0-0.2-0.1-0.4-0.2-0.5c-1.7-1.7-10.1-7.9-10.5-8.1c-0.3-0.2-0.7-0.1-0.7,0.5c0,0.3,0.6,1.1,0.6,3.8
                          		C28.4,24.3,29.4,25.9,29.4,25.9z"/>
                          		<line strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' x1="27.8" y1="25.9" x2="12.7" y2="25.9"/>
                          	</g>
                          </svg>
                          <span className="more_info">More Info</span>
                        </span>
                      </div>

                      <div className="program_item" onClick={self.natureExplorers}>
                        <h4 className="name">
                          <span className="program_name">Nature Explorers</span>
                          <span className="program_description">This is a child-only learning experience with a new topic each month to learn and explore.</span>
                        </h4>
                        <span className="program_arrow">
                          <svg className="arrow_circle red right_arrow" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" >
                          	<path className="circle" strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M1,26c0,13.8,11.2,25,25,25c13.8,0,25-11.2,25-25S39.8,1,26,1C12.2,1,1,12.2,1,26z"/>
                          	<g className="arrow" >
                          		<path strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M29.4,25.9c0,0-1,1.6-1,4.4c0,2.6-0.6,3.5-0.6,3.8c0,0.4,0.3,0.7,0.7,0.5s8.6-6.2,10.5-8.1
                          		c0,0,0.2-0.2,0.2-0.5v-0.1c0-0.2-0.1-0.4-0.2-0.5c-1.7-1.7-10.1-7.9-10.5-8.1c-0.3-0.2-0.7-0.1-0.7,0.5c0,0.3,0.6,1.1,0.6,3.8
                          		C28.4,24.3,29.4,25.9,29.4,25.9z"/>
                          		<line strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' x1="27.8" y1="25.9" x2="12.7" y2="25.9"/>
                          	</g>
                          </svg>
                          <span className="more_info">More Info</span>
                        </span>
                      </div>

                      <div className="program_item" onClick={self.campfire}>
                        <h4 className="name">
                          <span className="program_name">Campfire</span>
                          <span className="program_description">Enjoy an enchanting evening roasting s’mores, listening to stories, and spending quality time with your family.</span>
                        </h4>
                        <span className="program_arrow">
                          <svg className="arrow_circle red right_arrow" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" >
                          	<path className="circle" strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M1,26c0,13.8,11.2,25,25,25c13.8,0,25-11.2,25-25S39.8,1,26,1C12.2,1,1,12.2,1,26z"/>
                          	<g className="arrow" >
                          		<path strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M29.4,25.9c0,0-1,1.6-1,4.4c0,2.6-0.6,3.5-0.6,3.8c0,0.4,0.3,0.7,0.7,0.5s8.6-6.2,10.5-8.1
                          		c0,0,0.2-0.2,0.2-0.5v-0.1c0-0.2-0.1-0.4-0.2-0.5c-1.7-1.7-10.1-7.9-10.5-8.1c-0.3-0.2-0.7-0.1-0.7,0.5c0,0.3,0.6,1.1,0.6,3.8
                          		C28.4,24.3,29.4,25.9,29.4,25.9z"/>
                          		<line strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' x1="27.8" y1="25.9" x2="12.7" y2="25.9"/>
                          	</g>
                          </svg>
                          <span className="more_info">More Info</span>
                        </span>
                      </div>

                      <div className="program_item" onClick={self.familySundays}>
                        <h4 className="name">
                          <span className="program_name">Family Sundays</span>
                          <span className="program_description">Each Sunday at 1:00 p.m. we invite families to come discover the forest.</span>
                        </h4>
                        <span className="program_arrow">
                          <svg className="arrow_circle red right_arrow" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" >
                          	<path className="circle" strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M1,26c0,13.8,11.2,25,25,25c13.8,0,25-11.2,25-25S39.8,1,26,1C12.2,1,1,12.2,1,26z"/>
                          	<g className="arrow" >
                          		<path strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M29.4,25.9c0,0-1,1.6-1,4.4c0,2.6-0.6,3.5-0.6,3.8c0,0.4,0.3,0.7,0.7,0.5s8.6-6.2,10.5-8.1
                          		c0,0,0.2-0.2,0.2-0.5v-0.1c0-0.2-0.1-0.4-0.2-0.5c-1.7-1.7-10.1-7.9-10.5-8.1c-0.3-0.2-0.7-0.1-0.7,0.5c0,0.3,0.6,1.1,0.6,3.8
                          		C28.4,24.3,29.4,25.9,29.4,25.9z"/>
                          		<line strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' x1="27.8" y1="25.9" x2="12.7" y2="25.9"/>
                          	</g>
                          </svg>
                          <span className="more_info">More Info</span>
                        </span>
                      </div>

                      <h5 className="preogram_forest_now">Check <Link to="forest-now" className="color">FOREST NOW</Link> for updates and registration</h5>

                    </div>
                    <div className="for_kids">
                      <img className="binoculars" src="/img/programs/binoculars.png" />
                    </div>
                  </div>
                }


              </div>

              <div className="programs_video" style={video_style}>
                <div className="programs video_overlay"></div>
                <div className="programs_video_wrapper">
                  { video ?
                    <div className="centered_content wide">
                      <span className="video_close" onClick={self.toggleVideo}>×</span>
                      <div className='embed-container'><iframe src='https://www.youtube.com/embed/2IhxTqPqNUI?autoplay=1' frameBorder='0' allowFullScreen></iframe></div>
                    </div>
                  :
                    <div className="centered_content">
                      <h2 className="marker">A Recycled Forest, Built by Local Kids</h2>
                      <p>Fontenelle teamed up with local artist Bart Vargas and non-profits Girls, Inc., Completely Kids, and Arts for All for this community art project.</p>


                      <div className="play_button_wrapper">
                        <svg className="left_leaf" x="0px" y="0px" viewBox="0 0 260.993 56.185" enable-background="new 0 0 260.993 56.185">
                          <g>
                            <path fill="none" stroke="#FFFFFF" strokeWidth="3" strokeMiterLimit="10" d="M260.803,21.789c0,0-78.218-9.995-105.16-7.822
                              s-60.945,10.559-78.327,9.689c-17.382-0.869-22.814-0.76-31.287-9.234c0,0-5.377-7.985,0-13.362"/>
                            <path fill="none" stroke="#FFFFFF" strokeWidth="3" strokeMiterLimit="10" d="M53.94,23.206c0,0-15.081,8.055-31.798,5.843
                              C9.377,27.36,5.802,21.1,3.118,16.14C19.968,21.712,36.564,5.83,53.94,23.206z"/>
                            <path fill="none" stroke="#FFFFFF" strokeWidth="3" strokeMiterLimit="10" d="M83.509,23.874
                              c-30.635,0.978-39.172,2.019-50.516,13.362c0,0-7.199,10.689,0,17.888"/>
                            <path fill="none" stroke="#FFFFFF" strokeWidth="3" strokeMiterLimit="10" d="M52.548,23.222c0,0-12.167-3.259-26.942-1.086
                              c-12.962,1.906-20.641-4.563-20.641-4.563"/>
                          </g>
                        </svg>


                        <svg onClick={self.toggleVideo} className="video_play play_button programs" x="0px" y="0px" viewBox="0 0 76 76" >
                          <g>
                            <circle className="circle" cx="38" cy="38" r="36.5"/>
                            <path className="triangle" d="M31.3,38.2c0,0-2.8,4.4-2.8,12.4c0,7.5-1.6,10-1.6,10.7c0,1.2,0.8,2,2,1.4S53.2,45,58.6,39.6
                              c0,0,0.6-0.6,0.6-1.4V38c0-0.6-0.2-1.1-0.6-1.4c-4.7-4.7-28.7-22.4-29.7-23.1c-0.8-0.6-2-0.4-2,1.4c0,0.7,1.6,3.2,1.6,10.7
                              C28.6,33.6,31.3,38.2,31.3,38.2z"/>
                          </g>
                        </svg>

                        <svg className="right_leaf" x="0px" y="0px" viewBox="0 0 260.993 56.185" enable-background="new 0 0 260.993 56.185" >
                          <g>
                            <path fill="none" stroke="#FFFFFF" strokeWidth="3" strokeMiterLimit="10" d="M0.19,21.789c0,0,78.218-9.995,105.16-7.822
                              s60.945,10.559,78.327,9.689c17.382-0.869,22.814-0.76,31.287-9.234c0,0,5.377-7.985,0-13.362"/>
                            <path fill="none" stroke="#FFFFFF" strokeWidth="3" strokeMiterLimit="10" d="M207.053,23.206c0,0,15.081,8.055,31.798,5.843
                              c12.766-1.689,16.34-7.949,19.024-12.909C241.025,21.712,224.429,5.83,207.053,23.206z"/>
                            <path fill="none" stroke="#FFFFFF" strokeWidth="3" strokeMiterLimit="10" d="M177.484,23.874
                              c30.635,0.978,39.172,2.019,50.516,13.362c0,0,7.199,10.689,0,17.888"/>
                            <path fill="none" stroke="#FFFFFF" strokeWidth="3" strokeMiterLimit="10" d="M208.445,23.222c0,0,12.167-3.259,26.942-1.086
                              c12.962,1.906,20.641-4.563,20.641-4.563"/>
                          </g>
                        </svg>
                      </div>

                    </div>
                  }
                </div>
              </div>

              <div className="egg_wrap" id="adults">
                  { adult ?
                    <div className="current_class main_wrapper">
                      <svg onClick={self.closeAdult} className="arrow_circle red left_arrow reset_class" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" >
                      	<path className="circle" strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M1,26c0,13.8,11.2,25,25,25c13.8,0,25-11.2,25-25S39.8,1,26,1C12.2,1,1,12.2,1,26z"/>
                      	<g className="arrow" >
                      		<path strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M22.6,25.9c0,0,1,1.6,1,4.4c0,2.6,0.6,3.5,0.6,3.8c0,0.4-0.3,0.7-0.7,0.5s-8.6-6.2-10.5-8.1
                      			c0,0-0.2-0.2-0.2-0.5v-0.1c0-0.2,0.1-0.4,0.2-0.5c1.7-1.7,10.1-7.9,10.5-8.1c0.3-0.2,0.7-0.1,0.7,0.5c0,0.3-0.6,1.1-0.6,3.8
                      			C23.6,24.3,22.6,25.9,22.6,25.9z" />
                      		<line strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' x1="24.2" y1="25.9" x2="39.3" y2="25.9"/>
                      	</g>
                      </svg>
                      {adult}
                    </div>:
                    <div className="for_kids_container main_wrapper">
                      <div className="for_kids">
                        <img onClick={self.spiderClick} className={ spider ? "rotated spider" : "spider" } src="/img/programs/spider.png" />
                      </div>
                      <div className="for_kids copy_container">
                        <h2 className="marker color">For Adults</h2>
                        <p>A few of our most popular activities at the forest are birding, looking for insects, and shooting nature photography. We have clubs for each one, and more: </p>

                        <div className="program_item" onClick={self.birdClub}>
                          <h4 className="name">
                            <span className="program_name">THE DOWN AND DIRTY BIRDERS</span>
                            <span className="program_description">as they are known, organize monthly field trips and other activities.</span>
                          </h4>
                          <span className="program_arrow">
                            <svg className="arrow_circle red right_arrow" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" >
                            	<path className="circle" strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M1,26c0,13.8,11.2,25,25,25c13.8,0,25-11.2,25-25S39.8,1,26,1C12.2,1,1,12.2,1,26z"/>
                            	<g className="arrow" >
                            		<path strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M29.4,25.9c0,0-1,1.6-1,4.4c0,2.6-0.6,3.5-0.6,3.8c0,0.4,0.3,0.7,0.7,0.5s8.6-6.2,10.5-8.1
                            		c0,0,0.2-0.2,0.2-0.5v-0.1c0-0.2-0.1-0.4-0.2-0.5c-1.7-1.7-10.1-7.9-10.5-8.1c-0.3-0.2-0.7-0.1-0.7,0.5c0,0.3,0.6,1.1,0.6,3.8
                            		C28.4,24.3,29.4,25.9,29.4,25.9z"/>
                            		<line strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' x1="27.8" y1="25.9" x2="12.7" y2="25.9"/>
                            	</g>
                            </svg>
                            <span className="more_info">More Info</span>
                          </span>
                        </div>

                        <div className="program_item" onClick={self.insectClub}>
                          <h4 className="name">
                            <span className="program_name">THE INSECT CLUB </span>
                            <span className="program_description">is our newest club, but already one of our most active, with a variety of activities centered around the numerous tiny species that share the forest.</span>
                          </h4>
                          <span className="program_arrow">
                            <svg className="arrow_circle red right_arrow" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" >
                            	<path className="circle" strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M1,26c0,13.8,11.2,25,25,25c13.8,0,25-11.2,25-25S39.8,1,26,1C12.2,1,1,12.2,1,26z"/>
                            	<g className="arrow" >
                            		<path strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M29.4,25.9c0,0-1,1.6-1,4.4c0,2.6-0.6,3.5-0.6,3.8c0,0.4,0.3,0.7,0.7,0.5s8.6-6.2,10.5-8.1
                            		c0,0,0.2-0.2,0.2-0.5v-0.1c0-0.2-0.1-0.4-0.2-0.5c-1.7-1.7-10.1-7.9-10.5-8.1c-0.3-0.2-0.7-0.1-0.7,0.5c0,0.3,0.6,1.1,0.6,3.8
                            		C28.4,24.3,29.4,25.9,29.4,25.9z"/>
                            		<line strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' x1="27.8" y1="25.9" x2="12.7" y2="25.9"/>
                            	</g>
                            </svg>
                            <span className="more_info">More Info</span>
                          </span>
                        </div>

                        <div className="program_item" onClick={self.photoClub}>
                          <h4 className="name">
                            <span className="program_name">PHOTO CLUB </span>
                            <span className="program_description">draws avid photographers of all ages, from beginners to seasoned pros, who all share a love of nature photography.</span>
                          </h4>
                          <span className="program_arrow">
                            <svg className="arrow_circle red right_arrow" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" >
                            	<path className="circle" strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M1,26c0,13.8,11.2,25,25,25c13.8,0,25-11.2,25-25S39.8,1,26,1C12.2,1,1,12.2,1,26z"/>
                            	<g className="arrow" >
                            		<path strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M29.4,25.9c0,0-1,1.6-1,4.4c0,2.6-0.6,3.5-0.6,3.8c0,0.4,0.3,0.7,0.7,0.5s8.6-6.2,10.5-8.1
                            		c0,0,0.2-0.2,0.2-0.5v-0.1c0-0.2-0.1-0.4-0.2-0.5c-1.7-1.7-10.1-7.9-10.5-8.1c-0.3-0.2-0.7-0.1-0.7,0.5c0,0.3,0.6,1.1,0.6,3.8
                            		C28.4,24.3,29.4,25.9,29.4,25.9z"/>
                            		<line strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' x1="27.8" y1="25.9" x2="12.7" y2="25.9"/>
                            	</g>
                            </svg>
                            <span className="more_info">More Info</span>
                          </span>
                        </div>

                        <div className="program_item" onClick={self.frogwatch}>
                          <h4 className="name">
                            <span className="program_name">FROGWATCH USA</span>
                            <span className="program_description">is a citizen-science organization designed for long-term monitoring of frog and toad populations.</span>
                          </h4>
                          <span className="program_arrow">
                            <svg className="arrow_circle red right_arrow" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" >
                            	<path className="circle" strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M1,26c0,13.8,11.2,25,25,25c13.8,0,25-11.2,25-25S39.8,1,26,1C12.2,1,1,12.2,1,26z"/>
                            	<g className="arrow" >
                            		<path strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M29.4,25.9c0,0-1,1.6-1,4.4c0,2.6-0.6,3.5-0.6,3.8c0,0.4,0.3,0.7,0.7,0.5s8.6-6.2,10.5-8.1
                            		c0,0,0.2-0.2,0.2-0.5v-0.1c0-0.2-0.1-0.4-0.2-0.5c-1.7-1.7-10.1-7.9-10.5-8.1c-0.3-0.2-0.7-0.1-0.7,0.5c0,0.3,0.6,1.1,0.6,3.8
                            		C28.4,24.3,29.4,25.9,29.4,25.9z"/>
                            		<line strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' x1="27.8" y1="25.9" x2="12.7" y2="25.9"/>
                            	</g>
                            </svg>
                            <span className="more_info">More Info</span>
                          </span>
                        </div>

                        <div className="program_item" onClick={self.seniors}>
                          <h4 className="name">
                            <span className="program_name">SENIORS UNDERSTANDING NATURE (SUN) </span>
                            <span className="program_description">We also offer a breadth of events, programs, and activities tailored to seniors, who are some of our most active visitors to the forest. </span>
                          </h4>
                          <span className="program_arrow">
                            <svg className="arrow_circle red right_arrow" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" >
                            	<path className="circle" strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M1,26c0,13.8,11.2,25,25,25c13.8,0,25-11.2,25-25S39.8,1,26,1C12.2,1,1,12.2,1,26z"/>
                            	<g className="arrow" >
                            		<path strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M29.4,25.9c0,0-1,1.6-1,4.4c0,2.6-0.6,3.5-0.6,3.8c0,0.4,0.3,0.7,0.7,0.5s8.6-6.2,10.5-8.1
                            		c0,0,0.2-0.2,0.2-0.5v-0.1c0-0.2-0.1-0.4-0.2-0.5c-1.7-1.7-10.1-7.9-10.5-8.1c-0.3-0.2-0.7-0.1-0.7,0.5c0,0.3,0.6,1.1,0.6,3.8
                            		C28.4,24.3,29.4,25.9,29.4,25.9z"/>
                            		<line strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' x1="27.8" y1="25.9" x2="12.7" y2="25.9"/>
                            	</g>
                            </svg>
                            <span className="more_info">More Info</span>
                          </span>
                        </div>

                        <h5 className="preogram_forest_now">Check <Link to="forest-now" className="color">FOREST NOW</Link> for updates and registration</h5>

                      </div>

                    </div>
                  }

              </div>
              <div className="egg_wrap">
                <div className="main_wrapper" id="groups">
                  <div className="p_groups p_columns">
                    <div>
                      <h2 className="marker color">FOR GROUPS</h2>
                      <p>We get requests frequently from companies, organizations, and clubs looking for a group experience in the forest and have developed the following core programs:</p>
                      <h3>BIO-INSPIRED LEADERSHIP WORKSHOP</h3>
                      <p>We're partnering with Verdis Group to offer a new workshop for organizations who are ready to embrace the ever changing dynamic business world. This immersion experience explores lessons from nature to form adaptable, resilient, and prosperous teams and groups. Attendees will experience an immersive program unlike any other; one that combines sustainability, achieving an ecological balance, and biomimicry - the design of materials, structures, and systems that are modeled on biological entities and processes.</p>
                      <p className="p_info">For more information, including availability and pricing, please contact:
                      <br/><a target="_blank" href="mailto:skronekeith@fontenelleforest.org">Seth Keith at SKroneKeith@fontenelleforest.org</a>.</p>
                      <hr/>
                      <h3>SCOUTS</h3>
                      <p>With hands-on activities, games, and exploration, scouts will discover nature’s mysteries at Fontenelle Forest, the region’s premier nature center that encompasses forest, prairie, and wetlands along the Missouri River. With year-round programming and activities from guided hikes, live animal demonstrations, natural science exhibits, lectures, classes, and even snowshoe rentals, there’s always a reason to bring your troop. Make plans to have your Scouts join us for an exciting adventure!</p>
                      <p className="p_info">For information about Boy and Girl Scouts programs, please contact:
                      <br/><a target="_blank" href="mailto:kfischer@fontenelleforest.org">Kathy Fischer at kfischer@fontenelleforest.org</a>.
                      <br/>For information about Eagle Scout programs:
                      <br/><span className="p_num">(402) 731-3140</span></p>
                    </div>
                    <div>
                      <img src="/img/programs/bag.png" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="egg_wrap">
                <div className='image_container'>
                  <div className="backyard">
                    <h2 className="marker color">In Our Backyard</h2>
                    <p>Conveniently located off Hwy 75 and just minutes from downtown Omaha, Fontenelle Forest is a quiet gem right in our backyard.</p>
                  </div>
                  <img src="/img/programs/skyline_red.jpg" />
                </div>
              </div>

              <div className="egg_wrap cf">
                <div className="main_wrapper bottom_nav">
                  <span className="prev_page" onClick={self.moveLeft}>
                    <svg className="arrow_circle black left_arrow" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" >
                    	<path className="circle" strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M1,26c0,13.8,11.2,25,25,25c13.8,0,25-11.2,25-25S39.8,1,26,1C12.2,1,1,12.2,1,26z"/>
                    	<g className="arrow" >
                    		<path strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M22.6,25.9c0,0,1,1.6,1,4.4c0,2.6,0.6,3.5,0.6,3.8c0,0.4-0.3,0.7-0.7,0.5s-8.6-6.2-10.5-8.1
                    			c0,0-0.2-0.2-0.2-0.5v-0.1c0-0.2,0.1-0.4,0.2-0.5c1.7-1.7,10.1-7.9,10.5-8.1c0.3-0.2,0.7-0.1,0.7,0.5c0,0.3-0.6,1.1-0.6,3.8
                    			C23.6,24.3,22.6,25.9,22.6,25.9z" />
                    		<line strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' x1="24.2" y1="25.9" x2="39.3" y2="25.9"/>
                    	</g>
                    </svg>
                    Education
                  </span>
                  <span className="next_page" onClick={self.moveRight}>Forest
                    <svg className="arrow_circle black right_arrow" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" >
                    	<path className="circle" strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M1,26c0,13.8,11.2,25,25,25c13.8,0,25-11.2,25-25S39.8,1,26,1C12.2,1,1,12.2,1,26z"/>
                    	<g className="arrow" >
                    		<path strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M29.4,25.9c0,0-1,1.6-1,4.4c0,2.6-0.6,3.5-0.6,3.8c0,0.4,0.3,0.7,0.7,0.5s8.6-6.2,10.5-8.1
                    		c0,0,0.2-0.2,0.2-0.5v-0.1c0-0.2-0.1-0.4-0.2-0.5c-1.7-1.7-10.1-7.9-10.5-8.1c-0.3-0.2-0.7-0.1-0.7,0.5c0,0.3,0.6,1.1,0.6,3.8
                    		C28.4,24.3,29.4,25.9,29.4,25.9z"/>
                    		<line strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' x1="27.8" y1="25.9" x2="12.7" y2="25.9"/>
                    	</g>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className='video-container'>
            <video id="video-background" className="video-wrap" poster="/img/loop_programs.jpg" autoPlay muted="muted" loop>
              <source src="/videos/loop_programs.mp4" type="video/mp4" />
            </video>
            <div className="content_container">
              <div className="video_overlay"></div>
              <div className="content_wrapper">
                <img className="old_hero_image" src="/img/programs.png" />
                <div className="hero_content">
                  <h1 className="hero_header">WHAT YOU CAN FIND HERE</h1>
                  <h3 className="hero_subheader marker">Is infinite, and it is yours</h3>
                  <div className="hero_textured_color" >
                    <p>Camps, clubs, events and other programs for forest explorers of every age—from preschoolers to seniors and everyone in between.</p>
                  </div>
                  <div className="hero_icon_wrap">
                    <span className="line left_line"></span>
                    <img className={ arrow_class ? "hero_icon up" : "hero_icon" } src="/img/programs/icon_programs.svg" onClick={self.topScroll} />
                    <span className="line right_line"></span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="page programs_page preloading">
          <div className="page_wrapper">
            <div className="page_container" id="page"  style={loadStyle}></div>
          </div>
          <div className='video-container'>
            <video id="video-background" className="video-wrap" poster="/img/loop_programs.jpg" autoPlay muted="muted" loop>
              <source src="/videos/loop_programs.mp4" type="video/mp4" />
            </video>
            <div className="content_container">
              <div className="video_overlay"></div>
              <div className="content_wrapper">
                <img className="old_hero_image" src="/img/programs.png" />
                <div className="hero_content">
                  <h1 className="hero_header">WHAT YOU CAN FIND HERE</h1>
                  <h3 className="hero_subheader marker">Is infinite, and it is yours</h3>
                  <div className="hero_textured_color" >
                    <p>Camps, clubs, events and other programs for forest explorers of every age—from preschoolers to seniors and everyone in between.</p>
                  </div>
                  <div className="hero_icon_wrap">
                    <span className="line left_line"></span>
                    <img className={ arrow_class ? "hero_icon up" : "hero_icon" } src="/img/programs/icon_programs.svg" />
                    <span className="line right_line"></span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

      )
    }
  }
});

module.exports = Main;
