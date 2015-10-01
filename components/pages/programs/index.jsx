var React = require('react'),
    request = require('superagent'),
    util = require('util');
var Velocity = require('velocity-animate/velocity');
var InlineSVG = require('react-inlinesvg');
var Router = require('react-router');

var Navigation = Router.Navigation;
var Link = Router.Link;

var Footer = require('../../common/footer.jsx');
// var ScrollMagic = require('scrollmagic');



var poster_image;
var Main = React.createClass({
  mixins: [ Router.State, Navigation ],
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
      spider: 0 };
  },


  componentDidMount: function () {
    var self = this;

    var load_images = self.state.load_images;
    console.log("load_images: " + load_images);
    for (image in load_images) {
      console.log("image: " + load_images[image]);
      tmp_image = new Image();
      tmp_image.onload = self.onLoad;
      tmp_image.src = load_images[image];
    }
  },

  // componentWillReceiveProps: function () {
  //   var self = this;
  //   poster_image = new Image();
  //   poster_image.onload = self.onLoad;
  //   poster_image.src = "/img/loop_three.jpg";
  // },


  onLoad: function() {
    var self = this;

    var tmp_pre_count = self.state.pre_count;
    tmp_pre_count++;

    if (tmp_pre_count == self.state.load_images.length) {

      self.setState({pre_count: tmp_pre_count, percent_loaded: 100});
      setTimeout(function() { self.setState({loaded: true}); }, 150);

    } else {

      var percent_loaded = (tmp_pre_count / self.state.load_images.length ) * 100;
      self.setState({pre_count: tmp_pre_count, percent_loaded: percent_loaded});

    }
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
        <p>Looking for a unique setting in which to have fun with your child while learning about the natural world? Mud Pies is a relaxed, drop-in-and-play program that encourages interaction between adult and child. Each week, a natural science topic is explored through station-based activities, free play, and a guided walk. Come discover the joy of sharing nature with your child!</p>
        <p>Mud Pies meets every Monday-Thursday from 9:30-11:30 am at Fontenelle Forest Nature Center. This program is for children ages 5 and younger accompanied by an adult. One adult is required for every two children. This program is free for members or with daily admission.</p>
        <p>Parent groups, day cares, or preschools are accepted on Fridays only by appointment. Contact Lindsay Cooley atlcooley@fontenelleforest.org for more information and available dates.</p>
        <p>Location:</p>
        <p>Fontenelle Forest Nature Center</p>
        <p>Times:</p>
        <p>Every Monday, Tuesday, Wednesday, and Thursday during the school year (except certain holidays)</p>
        <p>9:30 - 11:30 a.m.</p>
        <p>Ages:</p>
        <p>5 and younger, accompanied by an adult</p>
        <p>Admission:</p>
        <p>FF Members: Free</p>
        <p>Non-members: Free with Daily Admission</p>
      </div>
    )

    this.setState({content: content})
  },

  familySundays: function(){
    var content = (
      <div className="main_class">
        <h2>FAMILY SUNDAYS</h2>
        <p>All Ages Discover a new topic every Sunday. This program is offered throughout the year.</p>
      </div>
    )

    this.setState({content: content})
  },

  campfire: function(){
    var content = (
      <div className="main_class">
        <h2>CAMPFIRE PROGRAMS</h2>
        <p>All Ages Bring your family out to the forest for a fun campfire program on the first Friday night of every month.</p>
      </div>
    )

    this.setState({content: content})
  },

  natureExplorers: function(){
    var content = (
      <div className="main_class">
        <h2>NATURE EXPLORERS</h2>
        <p>Ages 5 - 12 This program explores a different nature theme by season, and the group is divided by age. Offered one Saturday every other month; registration is required. Check the calendar for themes.</p>
      </div>
    )

    this.setState({content: content})
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

    this.setState({adult: content})
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

    this.setState({adult: content})
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

    this.setState({adult: content})
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

    this.setState({adult: content})
  },

  seniors: function(){
    var content = (
      <div className="main_class">
        <h2>SUN (SENIORS UNDERSTANDING NATURE)</h2>
        <p>Many seniors grew up in a time when nature was a big part of everyday life; SUN (Seniors Understanding Nature) programs enhance that experience.  Join us at Fontenelle Forest Nature Center on the second Tuesday of each month from 9:45a.m. to 11:00a.m. Refreshments served at 9:45a.m., followed by an indoor program, and completed with an optional nature walk. </p>

      </div>
    )

    this.setState({adult: content})
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
    if (self.state.loaded == true) {
      return (
        <div className="page">
          <div className="page_wrapper">
            <div className="page_container" id="page"  style={loadStyle}>
              <div className="egg_wrap">

                { content ?
                  <div className="current_class main_wrapper">
                    <p className="reset_class" onClick={self.closeContent}>&lt;</p>
                    {content}
                  </div>:
                  <div className="for_kids_container main_wrapper">

                    <div className="for_kids copy_container">
                      <h2 className="marker color">For Kids</h2>
                      <p>What could be more fun than spending a week in the forest? Fontenelle’s Nature Discovery Day Camps feature fun, hands-on, science-based learning through play taught by our year-round professional educators. Camps are offered in the Summer and Winter. We also offer special camps for grandparents and grandkids to participate in together. Registration is limited and begins January 5th. Proof of age is required. Campers should bring their lunch. Snacks provided.</p>

                      <div className="program_item" onClick={self.mudPies}>
                        <h4 className="name">
                          <span className="program_name">Mud Pies</span>
                          <span className="program_description">Mud Pies is a relaxed, drop-in-and-play program that encourages interaction between adult and child.</span>
                        </h4>
                        <span className="program_arrow">
                          <img src="/img/programs/icon_right-arrow-red.svg" />
                          <span className="more_info">More Info</span>
                        </span>
                      </div>

                      <div className="program_item" onClick={self.natureExplorers}>
                        <h4 className="name">
                          <span className="program_name">Nature Explorers</span>
                          <span className="program_description">Etiam porta sem malesuada magna mollis euismod.</span>
                        </h4>
                        <span className="program_arrow">
                          <img src="/img/programs/icon_right-arrow-red.svg" />
                          <span className="more_info">More Info</span>
                        </span>
                      </div>

                      <div className="program_item" onClick={self.campfire}>
                        <h4 className="name">
                          <span className="program_name">Campfire</span>
                          <span className="program_description">Etiam porta sem malesuada magna mollis euismod.</span>
                        </h4>
                        <span className="program_arrow">
                          <img src="/img/programs/icon_right-arrow-red.svg" />
                          <span className="more_info">More Info</span>
                        </span>
                      </div>

                      <div className="program_item" onClick={self.familySundays}>
                        <h4 className="name">
                          <span className="program_name">Family Sundays</span>
                          <span className="program_description">Etiam porta sem malesuada magna mollis euismod.</span>
                        </h4>
                        <span className="program_arrow">
                          <img src="/img/programs/icon_right-arrow-red.svg" />
                          <span className="more_info">More Info</span>
                        </span>
                      </div>

                      <h5 className="preogram_forest_now">Check <Link to="forest-now" className="color">FOREST NOW</Link> for updates and registration</h5>

                      <div className="vine_bottom">
                        <img className="left-half" src="/img/divider/VINE-bottom-left-half.svg" />
                        <img className="down-orange" src="/img/programs/icon_right-arrow-red.svg" />
                        <img className="right-half" src="/img/divider/VINE-bottom-right-half.svg" />
                      </div>

                    </div>
                    <div className="for_kids image_container">
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
                      <div className='embed-container'><iframe src='https://www.youtube.com/embed/f_rum7pLqZc?autoplay=1' frameBorder='0' allowFullScreen></iframe></div>
                    </div>
                  :
                    <div className="centered_content">
                      <h2 className="marker">A Recycled Forest, Built by Local Kids</h2>
                      <p>Fontenelle teamed up with local artist Bart Vargas and non-profits Girls, Inc., Completely Kids, and Arts for All for this community art project.</p>
                      <img className="video_play" onClick={self.toggleVideo} src="/img/icon_play-video.svg" />
                    </div>
                  }
                </div>
              </div>

              <div className="egg_wrap">
                  { adult ?
                    <div className="current_class main_wrapper">
                      <p className="reset_class" onClick={self.closeAdult}>&lt;</p>
                      {adult}
                    </div>:
                    <div className="for_kids_container main_wrapper">
                      <div className="for_kids image_container">
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
                            <img src="/img/programs/icon_right-arrow-red.svg" />
                            <span className="more_info">More Info</span>
                          </span>
                        </div>

                        <div className="program_item" onClick={self.insectClub}>
                          <h4 className="name">
                            <span className="program_name">THE INSECT CLUB </span>
                            <span className="program_description">is our newest club, but already one of our most active, with a variety of activities centered around the numerous tiny species that share the forest.</span>
                          </h4>
                          <span className="program_arrow">
                            <img src="/img/programs/icon_right-arrow-red.svg" />
                            <span className="more_info">More Info</span>
                          </span>
                        </div>

                        <div className="program_item" onClick={self.photoClub}>
                          <h4 className="name">
                            <span className="program_name">PHOTO CLUB </span>
                            <span className="program_description">draws avid photographers of all ages, from beginners to seasoned pros, who all share a love of nature photography.</span>
                          </h4>
                          <span className="program_arrow">
                            <img src="/img/programs/icon_right-arrow-red.svg" />
                            <span className="more_info">More Info</span>
                          </span>
                        </div>

                        <div className="program_item" onClick={self.frogwatch}>
                          <h4 className="name">
                            <span className="program_name">FROGWATCH USA</span>
                            <span className="program_description">is a citizen-science organization designed for long-term monitoring of frog and toad populations.</span>
                          </h4>
                          <span className="program_arrow">
                            <img src="/img/programs/icon_right-arrow-red.svg" />
                            <span className="more_info">More Info</span>
                          </span>
                        </div>

                        <div className="program_item" onClick={self.seniors}>
                          <h4 className="name">
                            <span className="program_name">SENIORS UNDERSTANDING NATURE (SUN) </span>
                            <span className="program_description">We also offer a breadth of events, programs, and activities tailored to seniors, who are some of our most active visitors to the forest. </span>
                          </h4>
                          <span className="program_arrow">
                            <img src="/img/programs/icon_right-arrow-red.svg" />
                            <span className="more_info">More Info</span>
                          </span>
                        </div>

                        <h5 className="preogram_forest_now">Check <Link to="forest-now" className="color">FOREST NOW</Link> for updates and registration</h5>

                        <div className="vine_bottom">
                          <img className="left-half" src="/img/divider/VINE-bottom-left-half.svg" />
                          <img className="down-orange" src="/img/programs/icon_right-arrow-red.svg" />
                          <img className="right-half" src="/img/divider/VINE-bottom-right-half.svg" />
                        </div>

                      </div>

                    </div>
                  }

              </div>
              <div className="egg_wrap">
                <div className='image_container'>
                  <img src="/img/programs/groups.png" />
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

              <div className="egg_wrap">
                <div className="main_wrapper bottom_nav">
                  <span className="prev_page" onClick={self.moveLeft}>Education</span>
                  <span className="next_page" onClick={self.moveRight}>Forest</span>
                </div>
              </div>
              <Footer />
            </div>

            <div className='video-container'>
              <video id="video-background" className="video-wrap" poster="/img/loop_programs.jpg" autoPlay muted="muted" loop>
                <source src="/videos/loop_programs.mp4" type="video/mp4" />
              </video>
              <div className="content_container">
                <div className="video_overlay"></div>
                <div className="content_wrapper">
                  <img src="/img/programs.png" />
                </div>
              </div>
            </div>

          </div>
        </div>
      )
    } else {
      return (
        <div className="page preloading">
          <div className="page_wrapper">
            <div className="page_container" id="page"  style={loadStyle}></div>
            <div className='video-container'>
              <video id="video-background" className="video-wrap" poster="/img/loop_programs.jpg" autoPlay muted="muted" loop>
                <source src="/videos/loop_programs.mp4" type="video/mp4" />
              </video>
              <div className="content_container">
                <div className="video_overlay"></div>
                <div className="content_wrapper">
                  <img src="/img/programs.png" />
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
