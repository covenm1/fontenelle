var React = require('react'),
    request = require('superagent'),
    util = require('util'),
    Velocity = require('velocity-animate/velocity'),
    InlineSVG = require('react-inlinesvg'),
    Router = require('react-router'),
    TWEEN = require('tween.js');

require('velocity-animate/velocity.ui');

require('../../js/requestanimationframe.js');

var poster_image, map_image;

var photogallery = require('../../js/photogallery.json');

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
  mixins: [ Router.State ],
  getInitialState: function() {
    return { 
      windowWidth: window.innerWidth,
      width: 100,
      left: 0,
      top: -6,
      easing: TWEEN.Easing.Exponential.Out,
      duration: 750,
      drawer: [],
      photogallery: shuffleArray(photogallery),
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
    map_image = new Image();
    map_image.onload = self.onMapLoad;
    map_image.src = "/img/big_map.png";
  }, 

  componentWillUnmount: function() {
    window.removeEventListener('resize', this.handleResize);
  },

  handleResize: function(e) {
    this.setState({windowWidth: window.innerWidth});
  },

  onLoad: function() {
    var self = this;
    self.setState({loaded: true}); 
  },

  onMapLoad: function() {
    var self = this;
    self.setState({mapLoaded: true}); 
  },


  reset: function(){ 
    var self = this;
    console.log('natureCenter');
    self.setState({ drawer: [] });
    var tween = new TWEEN.Tween( { width: self.state.width, left:  self.state.left, top: self.state.top } )
    .to( { width: 100, left:  0, top: 0 }, self.state.duration )
    .easing( self.state.easing )
    .onUpdate( function () {
      self.setState( { width: this.width, left: this.left , top: this.top});
    })
    .start();
   
    animate();
   
    function animate() {
   
      requestAnimationFrame( animate ); // js/RequestAnimationFrame.js needs to be included too.
      TWEEN.update();
   
    }
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

    var tween = new TWEEN.Tween( { width: self.state.width, left:  self.state.left, top: self.state.top } )
    .to( { width: 364, left:  -33, top: -36 }, self.state.duration )
    .easing( self.state.easing )
    .onUpdate( function () {
      self.setState( { width: this.width, left: this.left , top: this.top});
    })
    .start();
   
    animate();
   
    function animate() {
   
      requestAnimationFrame( animate ); // js/RequestAnimationFrame.js needs to be included too.
      TWEEN.update();
   
    }
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


    var tween = new TWEEN.Tween( { width: self.state.width, left:  self.state.left, top: self.state.top } )
    .to( { width: 266, left:  -128, top: -88 }, self.state.duration )
    .easing( self.state.easing )
    .onUpdate( function () {
      self.setState( { width: this.width, left: this.left , top: this.top});
    })
    .start();
    
    animate();
   
    function animate() {
   
      requestAnimationFrame( animate ); // js/RequestAnimationFrame.js needs to be included too.
      TWEEN.update();
   
    }
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


    var tween = new TWEEN.Tween( { width: self.state.width, left:  self.state.left, top: self.state.top } )
    .to( { width: 290, left:  -83, top: -40 }, self.state.duration )
    .easing( self.state.easing )
    .onUpdate( function () {
      self.setState( { width: this.width, left: this.left , top: this.top});
    })
    .start();
   
    animate();
   
    function animate() {
   
      requestAnimationFrame( animate ); // js/RequestAnimationFrame.js needs to be included too.
      TWEEN.update();
   
    }
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

    var tween = new TWEEN.Tween( { width: self.state.width, left:  self.state.left, top: self.state.top } )
    .to( { width: 261, left:  -42, top: -47 }, self.state.duration )
    .easing( self.state.easing )
    .onUpdate( function () {
      self.setState( { width: this.width, left: this.left , top: this.top});
    })
    .start();
   
    animate();
   
    function animate() {
   
      requestAnimationFrame( animate ); // js/RequestAnimationFrame.js needs to be included too.
      TWEEN.update();
   
    }
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

    var tween = new TWEEN.Tween( { width: self.state.width, left:  self.state.left, top: self.state.top } )
    .to( { width: 297, left:  -110, top: -102 }, self.state.duration )
    .easing( self.state.easing )
    .onUpdate( function () {
      self.setState( { width: this.width, left: this.left , top: this.top});
    })
    .start();
   
    animate();
   
    function animate() {
   
      requestAnimationFrame( animate ); // js/RequestAnimationFrame.js needs to be included too.
      TWEEN.update();
   
    }
  },

  hoverClass: function(index){
    console.log("hoverClass " + index);
    this.setState({hover: "hover_"+index});
  },

  hoverLeave: function(){
    this.setState({hover: ''});
    console.log("hoverLeave" );
  },

  render: function() {
    var self = this;

    if (self.state.loaded == true) {
      var styles = {
        width: self.state.width + "%",
        marginLeft: self.state.left + "%",
        marginTop: self.state.top + "%"
      }
      var little_map_buttons = self.state.drawer.map(function(object, index) {
        return (
          <span className={"circle_button small small_"+index} onMouseEnter={self.hoverClass.bind(self,index)} onMouseLeave={self.hoverLeave}></span>
        )
      });

      var drawer = self.state.drawer.map(function(object, index) {
        var item_style = {
          backgroundImage: "url("+object.image+")",
        };
        return (
          <li className={"drawer_item big_"+index} onMouseEnter={self.hoverClass.bind(self,index)} onMouseLeave={self.hoverLeave}>
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

      var photogalleryStyles = {
        width: Math.ceil(photogallery.length/2) * 450 +"px"
      };

      var map_class = "map_wrapper";

      if (self.state.drawer.length) {
        map_class = map_class + " open";
      }

      if (self.state.area.length) {
        map_class = map_class + " " + self.state.area;
      }

      if (self.state.hover.length) {
        map_class = map_class + " " + self.state.hover;
      }


      return (
        <div className="page">
          <div className='video-container'>
            <video id="video-background" className="video-wrap" poster="/img/loop_one.jpg" autoPlay muted="muted" loop>
              <source src="/videos/loop_one.webm" type="video/webm" />
            </video>
            <div className="content_container">
              <div className="content_wrapper">
                <img src="/img/forest.png" />
              </div>
            </div>
          </div>
          <div className="page_container">
            <div className="image_container">
              <img src="/img/forest/top.jpg" />
            </div>
            <div className="photogallery_wrapper"> 
              <div className="photogallery" style={photogalleryStyles} >
                {photogallery}
              </div>
            </div>

            <div className={ map_class }>
              <div className="nav_area">
                <span className="marker reset_button" onClick={self.reset}></span>
                <div className="nav_menu">
                  <p className="title marker">Map Legend</p>
                  <p className={ self.state.area == 'natureCenter' ? "map_button active" : "map_button" } onClick={self.natureCenter}>Visitor Center Area</p>
                  <p className={ self.state.area == 'northernFloodplains' ? "map_button active" : "map_button" } onClick={self.northernFloodplains}>Northern Floodplains </p>
                  <p className={ self.state.area == 'northernUplands' ? "map_button active" : "map_button" } onClick={self.northernUplands}>Northern Uplands</p>
                  <p className={ self.state.area == 'southernUplands' ? "map_button active" : "map_button" } onClick={self.southernUplands}>Southern Uplands</p>
                  <p className={ self.state.area == 'greatMarsh' ? "map_button active" : "map_button" } onClick={self.greatMarsh}>Great Marsh Area</p>
                </div>
                { drawer.length ? 
                  <div className="drawer">
                    <ul>
                      {drawer} 
                    </ul>
                  </div> 
                : null }
              </div>

              <div className="map_zoom">
                { self.state.mapLoaded ? 
                  <div className="map_box" style={styles}>
                    <img className="map_image" src="/img/big_map.png" /> 
                    <span onClick={self.natureCenter} className="circle_button natureCenter"></span>
                    <span onClick={self.northernFloodplains} className="circle_button northernFloodplains"></span>
                    <span onClick={self.northernUplands} className="circle_button northernUplands"></span>
                    <span onClick={self.southernUplands} className="circle_button southernUplands"></span>
                    <span onClick={self.greatMarsh} className="circle_button greatMarsh"></span>
                    { little_map_buttons }
                  </div>
                : "Loading Map" }
              </div>
            </div>
            <div className="image_container">
              <img src="/img/forest/bottom.jpg" />
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
