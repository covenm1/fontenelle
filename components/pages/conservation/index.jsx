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

var Footer = require('../../common/footer.jsx');

var poster_image;
var Main = React.createClass({
  mixins: [ Router.State, Navigation ],
  getInitialState: function() {
    return { pre_count: 0 };
  },

  componentWillMount: function () {
    var self = this;
    var timeline = [
      {
        'year': '1492',
        'title': 'Fontenelle was Older then',
        'description': 'Silver driftfish warty angler finback cat shark rice eel. Taimen, golden dojo goblin shark pipefish, grunt mud catfish, luderick pink salmon seamoth zebra trout. Atlantic silverside grunt sculpin; moray eel herring boarfish beaked salmon river stingray remora neon tetra large-eye bream. '

      },
      {
        'year': '1492',
        'title': 'Fontenelle was Older then',
        'description': 'Silver driftfish warty angler finback cat shark rice eel. Taimen, golden dojo goblin shark pipefish, grunt mud catfish, luderick pink salmon seamoth zebra trout. Atlantic silverside grunt sculpin; moray eel herring boarfish beaked salmon river stingray remora neon tetra large-eye bream. '

      },
      {
        'year': '1492',
        'title': 'Fontenelle was Older then',
        'description': 'Silver driftfish warty angler finback cat shark rice eel. Taimen, golden dojo goblin shark pipefish, grunt mud catfish, luderick pink salmon seamoth zebra trout. Atlantic silverside grunt sculpin; moray eel herring boarfish beaked salmon river stingray remora neon tetra large-eye bream. '

      },
      {
        'year': '1492',
        'title': 'Fontenelle was Older then',
        'description': 'Silver driftfish warty angler finback cat shark rice eel. Taimen, golden dojo goblin shark pipefish, grunt mud catfish, luderick pink salmon seamoth zebra trout. Atlantic silverside grunt sculpin; moray eel herring boarfish beaked salmon river stingray remora neon tetra large-eye bream. '

      },
      {
        'year': '1492',
        'title': 'Fontenelle was Older then',
        'description': 'Silver driftfish warty angler finback cat shark rice eel. Taimen, golden dojo goblin shark pipefish, grunt mud catfish, luderick pink salmon seamoth zebra trout. Atlantic silverside grunt sculpin; moray eel herring boarfish beaked salmon river stingray remora neon tetra large-eye bream. '

      },
      {
        'year': '1492',
        'title': 'Fontenelle was Older then',
        'description': 'Silver driftfish warty angler finback cat shark rice eel. Taimen, golden dojo goblin shark pipefish, grunt mud catfish, luderick pink salmon seamoth zebra trout. Atlantic silverside grunt sculpin; moray eel herring boarfish beaked salmon river stingray remora neon tetra large-eye bream. '

      },
      {
        'year': '1492',
        'title': 'Fontenelle was Older then',
        'description': 'Silver driftfish warty angler finback cat shark rice eel. Taimen, golden dojo goblin shark pipefish, grunt mud catfish, luderick pink salmon seamoth zebra trout. Atlantic silverside grunt sculpin; moray eel herring boarfish beaked salmon river stingray remora neon tetra large-eye bream. '

      },
      {
        'year': '1492',
        'title': 'Fontenelle was Older then',
        'description': 'Silver driftfish warty angler finback cat shark rice eel. Taimen, golden dojo goblin shark pipefish, grunt mud catfish, luderick pink salmon seamoth zebra trout. Atlantic silverside grunt sculpin; moray eel herring boarfish beaked salmon river stingray remora neon tetra large-eye bream. '

      },
    ];

    self.setState({timeline: timeline})
  },

  componentDidMount: function () {
    console.log('componentDidMount');
    var self = this;
    poster_image = new Image();
    poster_image.onload = self.onLoad;
    poster_image.src = "/img/loop_two.jpg";
    window.location.hash = window.decodeURIComponent(window.location.hash);

    console.log(window.location.hash);

    var hashParts = window.location.hash.split('#');

    console.log(hashParts);

    if (hashParts.length > 1) {
      var hash = hashParts.slice(-1)[0];
      // if(hash);
      console.log(hash);
      self.scrollThing(hash);
    }
    window.onhashchange = function() {
      window.location.hash = window.decodeURIComponent(window.location.hash);

      console.log(window.location.hash);

      var hashParts = window.location.hash.split('#');

      console.log(hashParts);

      if (hashParts.length > 1) {
        var hash = hashParts.slice(-1)[0];
        // if(hash);
        console.log(hash);
        self.scrollThing(hash);
      }
    }
  },


  componentWillReceiveProps: function () {
    console.log('componentWillReceiveProps');
    var self = this;
    poster_image = new Image();
    poster_image.onload = self.onLoad;
    poster_image.src = "/img/loop_two.jpg";
  },


  onLoad: function() {
    var self = this;
    self.setState({loaded: true});

  },

  moveLeft: function(){
    this.props.transition('slide-back');
    this.transitionTo('forest');
  },


  moveRight: function(){
    this.props.transition('slide-forward');
    this.transitionTo('education');
  },

  scrollThing: function(thing){
    var controller = new ScrollMagic.Controller();
    controller.scrollTo(function(target) {

      TweenMax.to(window, 0.5, {
        scrollTo : {
          y : target, // scroll position of the target along y axis
          autoKill : true // allows user to kill scroll action smoothly
        },
        ease : Cubic.easeInOut
      });

    });
    controller.scrollTo("#"+thing);
  },

  render: function() {
    var self = this;

    var timeline = self.state.timeline.map(function(object) {
      return (
        <div className="timeline_item" >
          <h4 className="year">{object.year}</h4>
          <span className="circle"></span>
          <div className="timeline_container">
            <div className="description">
              <h4 className="title marker">{object.title}</h4>
              <p>{object.description}</p>
            </div>
          </div>
        </div>
      )
    });

    var timelineStyles = {
      width: timeline.length * 430 +"px"
    };

    var thelineStyles = {
      width: timeline.length * 400 +"px"
    };

    var videoOne_style = {
      backgroundImage: 'url(/img/conservation/Natural-Resources-trail-photo.jpg)'
    }

    var videoTwo_style = {
      backgroundImage: 'url(/img/conservation/Meet-Raptors.jpg)'
    }

    var videoThree_style = {
      backgroundImage: 'url(/img/conservation/urban-wildlife.jpg)'
    }

      return (
        <div className="page">
          <div className="page_wrapper">
            <div className="page_container" id="page">

              <div className="egg_wrap">
                <div className="ongoing_story_container main_wrapper">
                  <div className="quiet_wild image_container">
                    <img src="/img/conservation/sign.png" />
                  </div>
                  <div className="quiet_wild copy_container">
                    <img src="/img/divider/VINE-top-long.svg" />
                    <h2 className="marker">An Ongoing Story</h2>
                    <p>The forest is a complex ecosystem that is constantly evolving. It is part of our mission to both understand its history and to plan and protect its future. What you see when you look out into the dense trees, prairie grasses, and marshy wetlands today is different than what you would have seen 200, 100, or even 50 years ago.</p>
                    <p>As we interact with the Forest in a multitude of ways, we all have a role to play in this story. We are leaving our footprint on the Forest, and it’s vital that we consider its size and shape. We’ve learned that a purely “hands off” approach doesn’t work as well as you might guess. In the absence of proactive conservation efforts, the plant and animal life at the Forest would eventually fall out of harmony and reach a non-working state.</p>
                    <p>So we do research, and lots of it. We get out there and observe. We utilize the helping hand of hundreds of dedicated volunteers. We don’t disrupt the natural state of things, but we do encourage nature to thrive in every way we can. Conservation at Fontenelle Forest is the sum of our efforts, from pulling weeds to writing reports.</p>
                    <div className="vine_bottom">
                      <img className="left-half" src="/img/divider/VINE-bottom-left-half.svg" />
                      <img className="down-orange" src="/img/conservation/icon_down_blue.svg" />
                      <img className="right-half" src="/img/divider/VINE-bottom-right-half.svg" />
                    </div>
                  </div>
                  <div className="quiet_wild image_container">
                    <img src="/img/conservation/birds_left.png" />
                  </div>
                </div>
              </div>

              <div className="tearjerker_video thousandyears" style={videoOne_style}>
                <div className="thousandyears video_overlay"></div>
                <div className="tearjerker_wrapper">
                  <div className="centered_content">
                    <img src="/img/conservation/divider_top_thing.png" />
                    <h2 className="marker">Thousands of Years Plus a Century</h2>
                    <p>Humans have been interacting with the land that is now Fontenelle Forest for hundreds of thousands of years. But, it wasn’t until 1913 that the land was officially protected with the founding of the Fontenelle Nature Association. Though this subsequent centennial is but a sliver of time in the grand scheme of things, it has been marked by dramatic milestones in the area of forest conservation. Learning about the Forest’s history helps us appreciate it even more today and ensures solid stewardship of this land for years to come.</p>
                    <img src="/img/conservation/divider_bottom_thing.png" />
                  </div>
                </div>
              </div>

              <div className="egg_wrap">
                <h2 className="time_title marker">Timeline</h2>
                <div className="timeline_wrapper">
                  <div className="timeline" style={timelineStyles} >
                    <span className="the_line" style={thelineStyles}></span>
                    {timeline}
                  </div>
                </div>
              </div>

              <div className="egg_wrap">
                <div className="ongoing_story_container main_wrapper">
                  <div className="quiet_wild image_container">
                    <img src="/img/conservation/log.png" />
                  </div>
                </div>
              </div>

              <div className="egg_wrap">
                <div className="habitat_home_container main_wrapper">
                  <div className="quiet_wild copy_container">
                    <img src="/img/divider/VINE-top-long.svg" />
                    <h2 className="marker">If you have the habitat, you have the home.</h2>
                    <p>Our main tenet of land stewardship at Fontenelle Forest is to facilitate the most balanced environment we can. With ideal living conditions, the animals follow—the invertebrates, insects, amphibians, reptiles, and mammals that make the Forest harmonious and happy.</p>
                    <p>Still, it’s vital that we let nature do what it wants to do. Our job is more to pay attention and interpret the natural signs that are out there.</p>
                    <img src="/img/divider/VINE-top-long.svg" />
                  </div>
                </div>
              </div>

              <div className="egg_wrap">
                <div className="habitat_container main_wrapper">
                  <div className="quiet_wild image_container">
                    <img src="/img/conservation/natures_helpers.png" />
                  </div>
                  <div className="quiet_wild copy_container">
                    <h2>Nature’s Helpers</h2>
                    <p>The signs are always out there—sometimes you just have to look. One recent Saturday, a group of volunteers was out in a corner of the Forest they hadn’t been in a while, surveying the land for planting opportunities and doing general maintenance. They came to a clearing, a beautiful expanse of rolling grass unmarked by much traffic. Someone in the team noted that it would be an excellent spot for an oak tree. And then, as if following a stage cue, a beam of sunlight revealed just that: a tiny oak tree in the center of the clearing. We returned with a protective cage that would allow the tree to flourish without first succumbing to hungry forest dwelling creatures. We must always remember we are working with nature, not against it or above it, to build the habitat needed to flourish.</p>
                  </div>
                </div>
                <div className="habitat_container main_wrapper">
                  <div className="quiet_wild image_container">
                    <img src="/img/conservation/provenplan.png" />
                  </div>
                  <div className="quiet_wild copy_container">
                    <h2>A Proven Plan</h2>
                    <p>By the late 19th century in Bellevue, Nebraska, as buildings popped up and more and more humans made the area their home, large predators had all but disappeared. As a result, the deer population flourished greatly, to the point where the plant population, as the basis of the deer diet, began to suffer. As we know, this can cause the entire forest population to become imbalanced. To mitigate the issue, Fontenelle embarked on what has been a decades-long process: performing research, forming and enacting a plan, and constantly evaluating results. Since the official deer hunt program began in 1996, it has become known and accepted as the most successful conservation program in the history of the Forest. By dealing with deer overpopulation directly, the Forest had the chance to be a better habitat for other species to call home.</p>
                  </div>
                </div>
                <div className="habitat_container main_wrapper">
                  <div className="quiet_wild image_container">
                    <img src="/img/conservation/locallysourced.png" />
                  </div>
                  <div className="quiet_wild copy_container">
                    <h2>The Original “Locally Sourced”</h2>
                    <p>Anything that we plant in the Forest comes from the Forest, in other words, we only plant “local ecotype:” things that come from within 50 miles (Eastern Nebraska or Western Iowa).</p>
                    <p>This is because temperatures differ ever so slightly north to south and precipitation east to west and only plants from the immediate vicinity will truly thrive.</p>
                  </div>
                </div>
              </div>

              <div className="egg_wrap">
                <div className="raptor_container main_wrapper">
                  <div id="raptor" className="quiet_wild copy_container">
                    <div className="raptor">
                      <img src="/img/conservation/divider_top_grey.png" />
                      <h2 className="marker">Raptor Recovery</h2>
                      <p>Birds of prey, such as eagles, falcons, hawks, owls, and vultures, have a vital role in our ecosystem. Fontenelle Forest’s Raptor Recovery is focused on the conservation of these birds through education, research, and the rehabilitation of injured and orphaned raptors.</p>
                      <img src="/img/conservation/divider_bottom_grey.png" />
                    </div>
                    <h2>Rescue</h2>
                    <p>We see between 450–500 birds of prey in need of immediate assistance every year. These birds come to us from an area spanning every corner of Nebraska and parts of western Iowa. What’s highly important here is that at this stage we are not alone in our efforts. We depend on individuals—a dedicated network of volunteers across the entire state—to receive phone calls at all hours of the day and night, and then drive countless miles, first to the injured bird and then back to our trauma care unit. We also work with other organizations across the state to facilitate the program, and we rely on concerned citizens to report the injured raptors. If you have found a bird in need of assistance, please visit this page for more information on what to do next.</p>
                    <h2>Rehabilitate</h2>
                    <p>Birds are evaluated immediately upon arrival to our trauma care unit. Trained rehabilitators and veterinarians provide treatment, medication, and surgery if needed. Some patients may take a few days to mend; others might take months or even years.</p>
                  </div>
                  <div className="quiet_wild image_container">
                    <img src="/img/conservation/raptor.png" />
                  </div>
                </div>
              </div>

              <div className="tearjerker_video meetraptors" style={videoTwo_style}>
                <div className="meetraptors video_overlay"></div>
                <div className="tearjerker_wrapper">
                  <div className="centered_content">
                    <h2 className="marker">Meet the Raptors</h2>
                    <p>See some of the injured birds now rehabbing at Fontenelle</p>
                    <Link to="/meet-the-raptors" ><img src="/img/conservation/arrow_right.png" /></Link>
                  </div>
                </div>
              </div>

              <div className="egg_wrap">
                <div className="raptor_container main_wrapper">
                  <div className="quiet_wild copy_container">
                    <h2>Release</h2>
                    <p>A bird is considered healthy again when it is in ideal feather condition, demonstrates keen flight abilities, and can recognize and catch food. It is then banded and released back to the wild near where it was found. Need to find out what each of these means. Tell more of a story about that moment when they are able to be let back into the wild and what that means to us.</p>
                    <h2>Educate</h2>
                    <p>Even after treatment and months of rehabilitation, a raptor might be unable to fly or hunt due to a variety of factors and cannot be released. Non-releasable birds are channeled into breeding programs, recruited as “foster parents” for young orphans, utilized in research, or join our roster of educational birds for outreach and education programs. Fontenelle Forest Raptor Recovery reaches 20,000 people each year during our live raptor programs.</p>
                  </div>
                  <div className="quiet_wild image_container">
                    <img src="/img/conservation/birds_right.png" />
                  </div>
                </div>
              </div>

              <div className="tearjerker_video urbanwildlife" style={videoThree_style}>
                <div className="urbanwildlife video_overlay"></div>
                <div className="tearjerker_wrapper">
                  <div className="centered_content">
                    <h2 className="marker">Living With Urban Wildlife</h2>
                    <p>City life is often filled with wildlife interactions. Find out some ways to make it more harmonious and see how Fontenelle Forest can help you do so.</p>
                    <img src="/img/conservation/arrow_right.png" />
                  </div>
                </div>
              </div>

              <div className="egg_wrap">
                <div className="image_container">
                  <div className="backyard">
                    <h2 className="marker color">In Our Backyard</h2>
                    <p>Conveniently located off Hwy 75 and just minutes from downtown Omaha, Fontenelle Forest is a quiet gem right in our backyard.</p>
                  </div>
                  <img src="/img/conservation/skyline_blue.jpg" />
                </div>
              </div>

              <div className="egg_wrap">
                <div className="main_wrapper bottom_nav">
                  <span className="prev_page" onClick={self.moveLeft}>Forest</span>
                  <span className="next_page" onClick={self.moveRight}>Education</span>
                </div>
              </div>

              <Footer />
            </div>
            <div className='video-container'>
              <video id="video-background" className="video-wrap" poster="/img/loop_conservation.jpg" autoPlay muted="muted" loop>
                <source src="/videos/loop_conservation.mp4" type="video/mp4" />
              </video>
              <div className="content_container">
                <div className="video_overlay"></div>
                <div className="content_wrapper">
                  <img src="/img/conservation.png" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )
  }
});

module.exports = Main;
