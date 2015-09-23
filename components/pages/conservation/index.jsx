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
    return { pre_count: 0, left: 0, windowWidth: window.innerWidth };
  },

  handleResize: function(e) {

    this.setState({ windowWidth: window.innerWidth });
  },

  componentWillMount: function () {
    var self = this;
    var timeline = [
      {
        "year": "3 million years ago",
        "title": "Fontenelle Underwater",
        "description": "Here in the Heartland it’s hard to imagine that the ground beneath your feet was once at the floor of the sea. But fossil records indicate our forest was once covered by warm, shallow seas, home to life forms ranging from tiny trilobites to giant sharks. These bodies of water helped form limestone and sandstone deposits that lie more than 200 feet below the forest’s surface today. "

      },
      {
        "year": "160,000 – 10,000 years ago",
        "title": "The Last Glacial Periods of the Ice Age",
        "description": "Imagine giant jack pines and majestic white spruces, a thick forest of coniferous trees coating the landscape. This was a prime spot for large grazing mammals like mammoths, mastodons, giant beavers, ground sloths, and musk ox. With the eventual retreat of the glaciers, many of these animals became extinct or migrated north. But for a time, this was a real winter wonderland."

      },
      {
        "year": "160,000 – 10,000 years ago",
        "title": "Formation of the Loess Hills",
        "description": "It’s amazing to think there was ice up to a mile thick covering our forest. But the glaciers also left a legacy: as the ice sheets pushed south, they carried everything from big boulders to bits of sand and silt. The smaller particles known as loess (pronounced luss) formed the loess hills of modern-day Fontenelle Forest, an area blanketed by 200-foot thick soil."

      },
      {
        "year": "9,000 – 3,000 years ago",
        "title": "Warm, Dry Prairie",
        "description": "At the close of the Ice Age, the climate became even warmer and drier than it is today. Coniferous forests were gradually replaced by prairie as drought-tolerant plants and animals extended their range. It was eight-foot tall grasses and hundreds of species of wildflowers as far as the eye could see. The prairie plants we encounter today are remnants of this climate."

      },
      {
        "year": "3,000 years ago to present",
        "title": "Forest As We Know It",
        "description": "Conditions moderated to a more moist and cool environment, similar to today. The dry uplands and loess hills remained prairie or oak savannah, but forests began to expand up from the wetter ravines and valley bottoms. This is a haven for fox squirrels, white-tailed deer, red fox and other forest-dwelling creatures that thrive in tree-covered landscapes."

      },
      {
        "year": "4500 B.C. – 1000 A.D.",
        "title": "Early Inhabitants",
        "description": "Numerous Native American tribes lived on this land over time long before the arrival of the first Europeans to the scene. The earliest dwellers were roaming bands of hunters who fashioned spears out of stone in pursuit of the now-extinct grazing mammals of the last ice age. Later populations were foragers as well as hunters. Eventually primitive agriculture was introduced around 500 B.C."

      },
      {
        "year": "1100 A.D. – 1400 A.D.",
        "title": "The Nebraska Phase Farmers",
        "description": "The ridgetops along present-day Fontenelle were inhabited by a group referred to as the Nebraska Culture or Nebraska Phase, known to be village farmers. Perhaps their most lasting legacy are the earth lodges along the Missouri River, permanent living spaces constructed only from timber, sod and grasses. Fishhooks, knives, grinding stones and more have been found within nearly 70 earth lodges that have been catalogued within the Forest since initial excavations in 1937."

      },
      {
        "year": "1804",
        "title": "European Explorers",
        "description": "Lewis and Clark’s Corps of Discovery expedition passed through on both their outward and return trips, and the subsequent explorers following in their footsteps would have a profound effect on the area. The land of abundant natural resources was described by one as a place where “mayapples covered the ground” and “redbud and hawthorn trees mingled their red and white blossoms.” Needless to say, this was a very attractive place for all walks of trappers, traders, farmers and businessmen."

      },
      {
        "year": "1822",
        "title": "Founding of Trading Post in Present-Day Fontenelle Forest",
        "description": "This post was one of many established as part of an overall plan to maintain good trading relations with Native Americans. Blankets, hats, food, clothing, beads and earrings were available, as well as tools of the fur trade like traps, rifles, and knives. These stations played a critical role in outfitting explorers and traders with supplies—soon enough, they also became somewhat of a social gathering place."

      },
      {
          "year": "1823",
          "title": "A Beautiful View: Nebraska’s Oldest Settlement is Founded",
          "description": "When French explorers first encountered the “sea of grass” that covered much of central North America, they coined the word “prairie” to describe it. The name Bellevue is also of French origin. Legend has it that Manuel Lisa, founder of the Missouri Fur Company, once paused at a hillside overlooking the area, so overwhelmed by the panorama before him that he exclaimed, “la belle vue!”"

        },
        {
          "year": "1855",
          "title": "The Death of Logan Fontenelle",
          "description": "The son of French fur trader Lucien Fontenelle and Bright Sun of the Omaha tribe, he spent much of his childhood among the Omaha people, learning their ways, customs, and languages. After working as a U.S. interpreter, Logan was killed by a band of Sioux Indians while out on a hunt and is said to be buried alongside his father somewhere on Fontenelle’s property. It is officially Logan for whom the Forest is named. "

        },
        {
          "year": "1913",
          "title": "Birth of a Nature Preserve",
          "description": "Bellevue College professor Dr. A. A. Taylor first met with friends in 1910 to discuss his vision for a state forest preserve. While initially unsuccessful at the state level, the group persisted and formed a private, non-profit nature association. Three years later, Nebraska’s governor signed a bill incorporating the Child’s Point Forest Association, the forerunner to the Fontenelle Forest Association and today’s Fontenelle Nature Association."

        },
        {
          "year": "1902 – 1920",
          "title": "The Forest that Built Bellevue",
          "description": "In some sections it is nearly impossible to find a tree more than a century old because loggers for the Phoenix Land and Cattle Company clear cut huge areas during this time to help build the growing community around it. It’s easy to spot direct evidence of that logging, as many larger trees have two to four trunks growing from the same spot. Foresters call these “stump suckers” because they began their lives as sprouts growing from the stumps of cut trees."

        },
        {
          "year": "1920 ",
          "title": "A Place to Call Home",
          "description": "With the interruption of World War I, it took the Association years to buy their first tract of land, Child’s Point, which amounted to over 300 acres and was finally deeded to the Association in 1920. By 1990, Fontenelle had grown to own and maintain nearly 1,800 acres of land."

        },
        {
          "year": "1920s and 1930s",
          "title": "Channelization of the Missouri River",
          "description": "In the early 19th century the Missouri was a wide, meandering river constantly changing course. It flowed at the foot of the bluffs where our forest is today, but eventually shifted away from the hills. To improve navigation and increase commerce, the U.S. Army Corps of Engineers began channelizing the river, forcing it into a deep, relatively straight channel. What was positive for river navigation was devastating to wildlife habitat. Today, Fontenelle’s Great Marsh and HIdden Lake are examples of the continuing restoration work undertaken to reclaim those lost habitats."

        },
        {
          "year": "1960s",
          "title": "Era of Education",
          "description": "Before this time, the Forest had been primarily used as a place for hikes and picnics and a caretaker was the only professional staff member employed. Omaha's city forester, Jim Malkowski, saw the opportunity to attract the community even more and began leading educational hikes that grew rapidly in popularity. Before long a nature center opened in 1966 to facilitate these hikes, with Malkowski as its first director."

        },
        {
          "year": "1971",
          "title": "Acquisition of Neale Woods Nature Center",
          "description": "Edith Neale donated 120 acres of North Omaha land that her father had homesteaded in the mid-nineteenth century, marking the beginning of Neale Woods as part of the Fontenelle Forest Association. Another 60 acres of land was donated by Carl Jonas, whose father had been a founding member of Fontenelle. Jonas' former home serves as the current Neale Woods Nature Center."

        },
        {
          "year": "1992",
          "title": "Construction of the Boardwalk",
          "description": "Fontenelle Forest’s Riverview Boardwalk is the result of what had been the largest private fundraising effort to date at the time. This wheelchair/stroller accessible wooden walk winds through a full mile of rich forest, and is the place to be—during any season—to spot wildlife and take in the sights, sounds and smells of nature."

        },
        {
          "year": "Late 1990s",
          "title": "Oak Savanna Recreation Experiment",
          "description": "It’s often not enough to just preserve the land; active land management is sometimes necessary to retain proper species in the forest. Preservationists began working to recreate the oak savanna, a combination of prairie and widely spaced bur oak trees that was once present. Over time, our hope is that a variety of prairie plants will take hold and, once again, the savanna will thrive within this area."

        },
        {
          "year": "2000",
          "title": "Construction of the Fontenelle Forest Nature Center",
          "description": "Fontenelle Forest Nature Center, also known as The Katherine and Fred Buffett Forest Learning Center, opened as the Forest’s primary facility. This 25,000-square-foot building provides space for school programs, public education and private events. It has been the site of numerous exhibitions over the years, and is where our friendly staff greets visitors with all the information needed to build an experience all your own."

        },
        {
          "year": "2014",
          "title": "Acquisition of Raptor Recovery Program",
          "description": "Fontenelle Nature Association officially gained Raptor Recovery Nebraska, an organization that cares for injured and orphaned predatory birds. The arrangement was considered a true milestone in the organization’s 100-year history, with the two non-profits merging into a single staff body to rehabilitate hundreds of birds from across the state per year."

        },
        {
          "year": "Late 2015",
          "title": "Raptor Woodland Refuge Opening",
          "description": "Raptor Woodland Refuge will provide an opportunity for the public to view nearly two dozen birds of prey in a unique outdoor setting that inspires both adventure and education. Species of raptors on display will include Bald and Golden Eagles, six species of owls, five species of hawks, and more. The birds will be housed in a variety of distinctive treehouse-like mews, including several amongst the treetops on a suspended walkway high above the forest floor. Visitors will be able to enjoy Raptor Woodland Refuge year-round."

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

  timelineRight: function(){
    var self = this;
    var gallery_width = Math.ceil(self.state.timeline.length) * 430;

    var window_width = self.state.windowWidth;
    var left = self.state.left;

    if (window_width <= (gallery_width - left)) {
      self.setState({left: self.state.left + 430});
    }
  },

  timelineLeft: function(){
    var self = this;
    var left = self.state.left;

    if (left > 0) {
      self.setState({left: self.state.left + -430});
    }
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
      width: timeline.length * 430 +"px",
      marginLeft: "-" + self.state.left + "px"
    };

    var thelineStyles = {
      width: timeline.length * 430 - 230 +"px"
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

              <div className="egg_wrap timeline_wrapper">
                <h2 className="time_title marker">Timeline</h2>

                  <span className="left timeline_button" onClick={self.timelineLeft}><img src="/img/conservation/icon_right_blue.svg" /></span>
                  <span className="right timeline_button" onClick={self.timelineRight}><img src="/img/conservation/icon_right_blue.svg"  /></span>
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
