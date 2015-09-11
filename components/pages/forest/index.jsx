var React = require('react'),
    request = require('superagent'),
    util = require('util'),
    Velocity = require('velocity-animate/velocity'),
    InlineSVG = require('react-inlinesvg'),
    Router = require('react-router');

var Navigation = Router.Navigation;
var Link = Router.Link;

var ScrollMagic = require('scrollmagic');
var poster_image, map_image;

var photogallery = require('../../../public/js/fauna_and_flora.json');
var acorngallery = require('../../../public/js/littleexplorers.json');

var Footer = require('../../common/footer.jsx');

/**
 * Randomize array element order in-place.
 * Using Fisher-Yates shuffle algorithm.
 */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

var Main = React.createClass({
  mixins: [ Router.State, Navigation ],
  getInitialState: function() {
    return {
      duration: 750,
      drawer: [],
      photogallery: shuffleArray(photogallery),
      acorngallery: shuffleArray(acorngallery),
      hover: '',
      area: ''
    };
  },

  componentDidMount: function () {
    var self = this;

    window.addEventListener('resize', this.handleResize);

    poster_image = new Image();
    poster_image.onload = self.onLoad;
    poster_image.src = "/img/loop_one.jpg";

  },

  onLoad: function() {
    var self = this;
    self.setState({loaded: true});
  },

  handleResize: function(e) {
    this.setState({windowWidth: window.innerWidth});
  },



  hoverClass: function(index){
    console.log("hoverClass " + index);
    this.setState({hover: "hover_"+index});
  },

  hoverLeave: function(){
    this.setState({hover: ''});
    console.log("hoverLeave" );
  },



  reset: function(){
    var self = this;
    console.log('natureCenter');
    self.setState({ drawer: [], area: '' });

  },

  natureCenter: function(){
    var self = this;
    console.log('natureCenter');

    var drawer = [
      {
        title: "The Nature Center",
        description: "This 25000 square foot building is the home to classrooms, rotating exhibits, and the Fontenelle Forest main offices. Stop by the front desk to grab a map and check the ranger board for the latest on wildlife activity.",
        image: "/img/map_photos/small/1NatureCenterWinter.jpg"
      },
      {
        title: "Acorn Acres",
        description: "Just outside the Nature Center, this natural playscape offers children a unique place for unstructured play and outdoor learning",
        image: "/img/map_photos/small/2AcornAcresFall.jpg"
      },
      {
        title: "Habitat Hollow",
        description: "This short, level trail is a great option when you want a short jaunt off the boardwalk. ",
        image: "/img/map_photos/small/2RiverviewBoardwalkSummer2.jpg"
      },
      {
        title: "Riverview Boardwalk",
        description: "Recommended for all first time visitors, the wooden boardwalk’s three interconnected loops make for a pleasant, mud-free hike in any weather. This barrier-free trail is also well suited to baby strollers.",
        image: "/img/map_photos/small/4NorthernFloodplainsFall.jpg"
      }
    ];

    self.setState({ drawer: drawer, area: 'natureCenter' });
  },


  greatMarsh: function(){
    var self = this;
    console.log('greatMarsh');

    var drawer = [
      {
        title: "Trailheads at the Wetlands Learning Center",
        description: "With 5 trailheads nearby, the Wetlands Learning center is a great spot to park and while you discover a new trail.",
        image: "/img/map_photos/small/1NatureCenterWinter.jpg"
      },
      {
        title: "Gifford Memorial Boardwalk",
        description: "This level, barrier free trail takes you on a half mile journey through wetland and cottonwoods to the observation blind.",
        image: "/img/map_photos/small/2AcornAcresFall.jpg"
      },
      {
        title: "Observation Blind",
        description: "Looks out over the Great Marsh, which is a “river scar” marking a former channel of the Missouri.",
        image: "/img/map_photos/small/2RiverviewBoardwalkSummer2.jpg"
      }
    ];

    self.setState({ drawer: drawer, area: 'greatMarsh' });
  },

  northernFloodplains: function(){
    var self = this;
    console.log('northernFloodplains');

    var drawer = [
      {
        title: "Camp Gifford",
        description: "A young Henry Fonda spent time with other scouts at Camp Gifford. You can still see concrete bunkhouse foundations from Stream Trail.",
        image: "/img/map_photos/small/4NorthernFloodplainsFall.jpg"
      },
      {
        title: "Stream Trail",
        description: "Hike along the stream where you can see beavers, frogs, and other wildlife.",
        image: "/img/map_photos/small/5ChildsHollowWinter2.jpg"
      },
      {
        title: "Cottonwood Trail",
        description: "A level trail across the floodplain where you can find giant cottonwood trees.",
        image: "/img/map_photos/small/1NatureCenterWinter.jpg"
      }
    ];

    self.setState({ drawer: drawer, area: 'northernFloodplains' });
  },

  northernUplands: function(){
    var self = this;
    console.log('northernUplands');

    var drawer = [
      {
        title: "Earth Lodges",
        description: "Along the ridges of Oak Trail and Hawthorn Trail you can find depressions that mark 1000 year old sites of Native American earth lodges.",
        image: "/img/map_photos/small/2AcornAcresFall.jpg"
      },
      {
        title: "Scenic, ridge-top Oak Trail",
        description: "A bit over a mile long with plenty of vertical travel, Oak Trail can give you a workout. The trail follows a ridge with scenic views and 250 year old Burr Oak trees.",
        image: "/img/map_photos/small/2RiverviewBoardwalkSummer2.jpg"
      },
      {
        title: "Child’s MIll",
        description: "",
        image: "/img/map_photos/small/4NorthernFloodplainsFall.jpg"
      }
    ];

    self.setState({ drawer: drawer, area: 'northernUplands' });
  },

  southernUplands: function(){
    var self = this;
    console.log('southernUplands');

    var drawer = [
      {
        title: "Mormon Hollow",
        description: "Follow a deep ravine along traces of a Mormon Pioneer trail blazed in the summer of 1846.",
        image: "/img/map_photos/small/1NatureCenterWinter.jpg"
      },
      {
        title: "Springs and streams",
        description: "Along Morman Hollow’s trail you can find springs and miniature waterfalls.",
        image: "/img/map_photos/small/2AcornAcresFall.jpg"
      },
      {
        title: "History Trail",
        description: "",
        image: "/img/map_photos/small/2RiverviewBoardwalkSummer2.jpg"
      }
    ];

    self.setState({ drawer: drawer, area: 'southernUplands' });
  },

  moveLeft: function(){
    this.props.transition('slide-back');
    this.transitionTo('programs');
  },


  moveRight: function(){
    this.props.transition('slide-forward');
    this.transitionTo('conservation');
  },



  render: function() {
    var self = this;

    if (self.state.loaded == true) {

      var drawer = self.state.drawer.map(function(object, index) {
        var item_style = {
          backgroundImage: "url("+object.image+")",
        };
        return (
          <li className={"drawer_item big_"+index}>
            <div className="drawer_image" style={item_style}></div>
            <div className="drawer_content">
              <h3 className="marker">{object.title}</h3>
              <p>{object.description}</p>
            </div>
          </li>
        )
      });

      var photogallery = self.state.photogallery.map(function(object) {
        var photoStyles = {
          backgroundImage: 'url('+object.image + ')',
        }
        return (
          <div className="photo" style={photoStyles} >
            <div className="description_container">
              <div className="description">
                <h4 className="name">{object.name}</h4>
                <p>{object.description}</p>
              </div>
            </div>
          </div>
        )
      });

      var acorngallery = self.state.acorngallery.map(function(object) {
        var photoStyles = {
          backgroundImage: 'url('+object.image + ')',
        }
        return (
          <div className="photo" style={photoStyles} >
            <div className="description_container">
              <div className="description">
                <h4 className="name">{object.name}</h4>
                <p>{object.description}</p>
              </div>
            </div>
          </div>
        )
      });

      var photogalleryStyles = {
        width: Math.ceil(photogallery.length/2) * 450 +"px"
      };

      var acorngalleryStyles = {
        width: Math.ceil(acorngallery.length/2) * 450 +"px"
      };

      var map_class = "map_wrapper";

      if (self.state.drawer.length) {
        map_class = map_class + " open";
      }

      if (self.state.area.length) {
        map_class = map_class + " " + self.state.area;

        if  ( self.state.area == 'natureCenter' ) {
          drawer_styles = {
            backgroundImage: 'url(/img/forest/nature-center.jpg)'
          }
        }
        if  ( self.state.area == 'northernFloodplains' ) {
          drawer_styles = {
            backgroundImage: 'url(/img/forest/northern-floodplain.jpg)'
          }
        }
        if  ( self.state.area == 'northernUplands' ) {
          drawer_styles = {
            backgroundImage: 'url(/img/forest/northern-upland.jpg)'
          }
        }
        if  ( self.state.area == 'southernUplands' ) {
          drawer_styles = {
            backgroundImage: 'url(/img/forest/southern-upland.jpg)'
          }
        }
        if  ( self.state.area == 'greatMarsh' ) {
          drawer_styles = {
            backgroundImage: 'url(/img/forest/great-marsh.jpg)'
          }
        }

      }

      if (self.state.hover.length) {
        map_class = map_class + " " + self.state.hover;
      }


      return (
        <div className="page">
          <div className="page_wrapper">
            <div className="page_container" id="page">
              <div className="egg_wrap">
                <div className="quiet_wild_container main_wrapper">
                  <div className="quiet_wild image_container">
                    <img src="/img/forest/bird2.png" />
                  </div>
                  <div className="quiet_wild copy_container">
                    <img src="/img/divider/VINE-top-long.svg" />
                    <h2 className="marker">The Quiet Wild</h2>
                    <p>For over a century, thousands of families have experienced the quiet wild of Nebraska's Fontenelle Forest and Neale Woods–hiking, playing and exploring our 26 miles of maintained trails and 2,000 acres of upland and lowland forests, native prairies, wetlands, lakes and waterways. Each visit is its own unique adventure, its own story, its own memory to share.</p>
                    <div className="vine_bottom">
                      <img className="left-half" src="/img/divider/VINE-bottom-left-half.svg" />
                      <img className="down-orange" src="/img/forest/icon_down-orange.svg" />
                      <img className="right-half" src="/img/divider/VINE-bottom-right-half.svg" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="tearjerker_video">
                <div className="tearjerker_wrapper">
                  <div className="centered_content">
                    <h2 className="marker">A Room All to Myself</h2>
                    <p>Push pause on the texting and clicking, just for a moment, and come out to the forest. Move your feet, breathe in the fresh air, explore. And watch what happens.</p>
                  </div>
                  <div className="centered_content wide">
                    <div className='embed-container'><iframe src='https://www.youtube.com/embed/Qxh3eSZlUeM' frameBorder='0' allowFullScreen></iframe></div>
                  </div>
                </div>
              </div>

              <div className="photogallery_header">
                <div className="main_wrapper">
                  <h3 className="marker">Fauna and Flora</h3>
                  <p>A National Natural Landmark and a National Historic District, as designated by the United State Department of Interior, Fontenelle is home to over 600 unique species of plants and animals. </p>
                </div>
              </div>

              <div className="photogallery_wrapper">
                <div className="photogallery" style={photogalleryStyles} >
                  {photogallery}
                </div>
              </div>

              <div className="egg_wrap">
                <div className={ map_class }>
                  { drawer.length ?
                    <div className="drawer" style={drawer_styles}>
                      <div className="orange_overlay"></div>
                      <ul>
                        {drawer}
                      </ul>
                    </div>
                  :
                    <div className="map_content">
                      <div className="copy_container">
                        <img src="/img/divider/VINE-top-long.svg" />
                        <h2 className="marker">Trailmap</h2>
                        <p>For over a century, thousands of families have experienced the quiet wild of Nebraska's Fontenelle Forest and Neale Woods–hiking, playing and exploring our 26 miles of maintained trails and 2,000 acres of upland and lowland forests, native prairies, wetlands, lakes and waterways. Each visit is its own unique adventure, its own story, its own memory to share.</p>
                        <div className="vine_bottom">
                          <img className="left-half" src="/img/divider/VINE-bottom-left-half.svg" />
                          <img className="down-orange" src="/img/forest/icon_down-orange.svg" />
                          <img className="right-half" src="/img/divider/VINE-bottom-right-half.svg" />
                        </div>
                      </div>
                      <div className="trail_map_container"><img className="trailmap" src="/img/forest/trail-map.svg" /></div>
                    </div>
                  }
                  <span className="marker reset_button" onClick={self.reset}></span>
                  <div className="nav_area">
                    <div className="nav_menu">
                      <p className={ self.state.area == 'natureCenter' ? "map_button active" : "map_button" } onClick={self.natureCenter}>Visitor Center Area</p>
                      <p className={ self.state.area == 'northernFloodplains' ? "map_button active" : "map_button" } onClick={self.northernFloodplains}>Northern Floodplains </p>
                      <p className={ self.state.area == 'northernUplands' ? "map_button active" : "map_button" } onClick={self.northernUplands}>Northern Uplands</p>
                      <p className={ self.state.area == 'southernUplands' ? "map_button active" : "map_button" } onClick={self.southernUplands}>Southern Uplands</p>
                      <p className={ self.state.area == 'greatMarsh' ? "map_button active" : "map_button" } onClick={self.greatMarsh}>Great Marsh Area</p>
                    </div>
                  </div>

                </div>
              </div>

              <div className="egg_wrap">
                <div className="image_container">
                  <img src="/img/forest/neale-recovery.jpg" />
                </div>
              </div>

              <div className="tearjerker_video">
                <div className="tearjerker_wrapper">
                  <div className="centered_content">
                    <h2 className="marker">for your favorite little explorers</h2>
                    <p>Acorn Acres is our one acre natural playscape designed for boisterous enthusiasm, outdoor physical activity, and creative play for kids of all ages. </p>
                  </div>
                  <div className="centered_content wide">
                    <div className='embed-container'><iframe src='https://www.youtube.com/embed/LEkB-HvzAuw' frameBorder='0' allowFullScreen></iframe></div>
                  </div>
                </div>
              </div>

              <div className="egg_wrap">
                <div className="photogallery_wrapper">
                  <div className="photogallery" style={acorngalleryStyles} >
                    {acorngallery}
                  </div>
                </div>
              </div>
              
              <div className="egg_wrap">
                <div className="image_container">
                  <img src="/img/forest/bottom.jpg" />
                </div>
              </div>

              <div className="egg_wrap">
                <div className="main_wrapper bottom_nav">
                  <span className="prev_page" onClick={self.moveLeft}>Programs</span>
                  <span className="next_page" onClick={self.moveRight}>Conservation</span>
                </div>
              </div>

              <Footer />
            </div>
          </div>
          <div className='video-container'>
            <video id="video-background" className="video-wrap" poster="/img/loop_one.jpg" autoPlay muted="muted" loop>
              <source src="/videos/loop_one.webm" type="video/webm" />
            </video>
            <div className="content_container">
              <div className="video_overlay"></div>
              <div className="content_wrapper">
                <img src="/img/forest.png" />
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="preloader">
          <h1>Loading...</h1>
        </div>
      )
    }
  }
});

module.exports = Main;
