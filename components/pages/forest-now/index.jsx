var React = require('react'),
    request = require('superagent'),
    moment = require('moment'),
    util = require('util');
var Velocity = require('velocity-animate/velocity');
var InlineSVG = require('react-inlinesvg');
var Router = require('react-router');

var jsonp = require('superagent-jsonp');

var Navigation = Router.Navigation;
var Link = Router.Link;

var Footer = require('../../common/footer.jsx');

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

var Instagram = React.createClass({
  render: function(){
    var self = this;
    var content = self.props.content;
    var time = self.props.time;
    var style = {
      backgroundImage: "url("+content.images.standard_resolution.url+")"
    }
    return (
      <div className="social instagram" style={style}>
        <div className="social_content">
          <p className="tweet_text">{content.caption.text}</p>
          <a href={content.link} className="social_icon" target="_blank"><i className="fa fa-instagram"></i></a>
        </div>
        <a href={content.link} className="social_icon" target="_blank"><i className="fa fa-instagram"></i></a>
      </div>
    )
  }
});

var FeaturedPost = React.createClass({
  render: function(){
    var self = this;
    var featured_image = self.props.featured_image;
    var title = self.props.title;
    var subheader = self.props.subheader;
    var slug = self.props.slug;
    if (featured_image){
      var style = {
        backgroundImage: "url("+featured_image.attachment_meta.sizes.medium_large.url+")"
      }
    }
    return (
      <div className="post featured" style={style}>
        <div className="post_content">
          <h4 className="post_headline" dangerouslySetInnerHTML={{__html: title}}></h4>
          { subheader ? <p className="post_subheader">{subheader}</p> : null }
          <Link className="post_link" to={"/post/" + slug}>Read more</Link>
        </div>
        <div className="featured_post_overlay"></div>
      </div>
    )
  }
});

var Tweet = React.createClass({
  render: function(){
    var self = this;
    var content = self.props.content;
    var time = self.props.time;
    if (content.extended_entities) {
      var style = {
        backgroundImage: "url(" + content.extended_entities.media[0].media_url + ")"
      }
    }
    if ( style ) {
      return (
        <div className="social tweet tweetwimage" style={style}>
          <div className="social_content">
            <p className="tweet_text">{content.text}</p>
            <a href={"https://twitter.com/fontenelle4est/status/"+content.id_str} className="social_icon" target="_blank"><i className="fa fa-twitter"></i></a>
          </div>
          <a href={"https://twitter.com/fontenelle4est/status/"+content.id_str} className="social_icon" target="_blank"><i className="fa fa-twitter"></i></a>
        </div>
      )
    } else {
      return (
        <div className="social tweet">
          <div className="social_content">
            <p className="tweet_text">{content.text}</p>
            <a href={"https://twitter.com/fontenelle4est/status/"+content.id_str} className="social_icon" target="_blank"><i className="fa fa-twitter"></i></a>
          </div>
        </div>
      )
    }
  }
});

var Event = React.createClass({
  getInitialState: function(){
    return {
      open: false
    }
  },
  toggleContent: function(){
    var self = this;
    self.setState({open: !self.state.open});
  },
  render : function(){
    var self = this;
    if (self.props.age_group == "all") {
      var age = "All Ages";
    } else if (self.props.age_group == "adults") {
      var age = "Adults";
    } else if (self.props.age_group == "children") {
      var age = "Children";
    } else {
      var age = null;
    }

    var open = self.state.open;
    var location_map_url = self.props.location_map_url;
    var location = self.props.location;
    var content = self.props.content;
    var signup = self.props.signup_link;

    if (self.props.end_date){
      return (
        <div className={ signup ? "event green" : "event blue"} >
          <h4 className="event_title" onClick={self.toggleContent}>
            <span className="title" dangerouslySetInnerHTML={{__html: self.props.title}}></span>
            <span className="age">{age}</span>
          </h4>
          { open ?
            <div className="description_wrapper">
              { location_map_url ?
                <a className="event_link" href={location_map_url} target="_blank"><p><i className="fa fa-map-marker"></i> {location}</p></a>
                : <p>{location}</p>
              }
              <div className="event_description" dangerouslySetInnerHTML={{__html: content}}></div>
              { signup ? <a className="event_link" href={self.props.signup_link} target="_blank"><p>Register for this Event.</p></a> : null}
            </div>
          : null }
          <div className="event_bar">
            <span className="date">{moment(self.props.start_date, "YYYYMMDD").format("M/D")} - {moment(self.props.end_date, "YYYYMMDD").format("M/D")}</span>
            <span className="days">
              <span className={ ( self.props.days.indexOf('mon') > -1) ? "day active" : "day" }>m</span>
              <span className={ ( self.props.days.indexOf('tues') > -1) ? "day active" : "day" }>t</span>
              <span className={ ( self.props.days.indexOf('wed') > -1) ? "day active" : "day" }>w</span>
              <span className={ ( self.props.days.indexOf('thurs') > -1) ? "day active" : "day" }>t</span>
              <span className={ ( self.props.days.indexOf('fri') > -1) ? "day active" : "day" }>f</span>
              <span className={ ( self.props.days.indexOf('sat') > -1) ? "day active" : "day" }>s</span>
              <span className={ ( self.props.days.indexOf('sun') > -1) ? "day active" : "day" }>s</span>
            </span>
            <span className="time">{self.props.start_time}-{self.props.end_time}</span>
          </div>
        </div>
      )
    } else {
      return (
        <div className={ signup ? "event green" : "event blue"}>
          <h4 className="event_title" onClick={self.toggleContent}>
            <span className="title" dangerouslySetInnerHTML={{__html: self.props.title}}></span>
            <span className="age">{age}</span>
          </h4>
          { open ?
            <div className="description_wrapper">
              { location_map_url ?
                <a className="event_link" href={location_map_url} target="_blank"><p><i className="fa fa-map-marker"></i> {location}</p></a>
                : <p>{location}</p>
              }
              <div className="event_description" dangerouslySetInnerHTML={{__html: content}}></div>
              { signup ? <a className="event_link" href={self.props.signup_link} target="_blank"><p>Register for this Event.</p></a> : null}
            </div>
          : null }
          <div className="event_bar">
            <span className="date">{moment(self.props.start_date, "YYYYMMDD").format("M/D")}</span>
            <span className="days">
              <span className={ ( self.props.days.indexOf('mon') > -1) ? "day active" : "day" }>m</span>
              <span className={ ( self.props.days.indexOf('tues') > -1) ? "day active" : "day" }>t</span>
              <span className={ ( self.props.days.indexOf('wed') > -1) ? "day active" : "day" }>w</span>
              <span className={ ( self.props.days.indexOf('thurs') > -1) ? "day active" : "day" }>t</span>
              <span className={ ( self.props.days.indexOf('fri') > -1) ? "day active" : "day" }>f</span>
              <span className={ ( self.props.days.indexOf('sat') > -1) ? "day active" : "day" }>s</span>
              <span className={ ( self.props.days.indexOf('sun') > -1) ? "day active" : "day" }>s</span>
            </span>
            <span className="time">{self.props.start_time}-{self.props.end_time}</span>
          </div>
        </div>
      )
    }
  }
});

module.exports = React.createClass({
  mixins: [ Router.State, Navigation, SetIntervalMixin ],
  getInitialState: function() {
    return {
      wildlife: [],
      plantlife: [],
      closings: [],
      posts: [],
      featured: {},
      pinned: [],
      events: [],
      twistagrams: [],
      weather: {},
      wildlife_excerpt: "",
      plantlife_excerpt: "",
      week: '',
      this_week: ''
    };
  },

  componentDidMount: function () {
    var self = this;
    self.loadPlantlife();
    self.loadWildlife();
    self.loadClosings();

    self.loadWeather();
    self.loadEvents();

    self.loadPosts();
    self.loadFeatured();
    self.loadPinned();

    self.loadExcerpts();
    self.loadTwistagrams();

    self.setInterval(function() { self.setState({arrow_class: !self.state.arrow_class}); }, 500);

  },

  componentWillReceiveProps: function () { },

  loadWeather:function(){
    var self = this;

    request
      .get('https://api.forecast.io/forecast/428664b41344b3a66849ab1e8432105b/41.1797155,-95.9200238')
      .use(jsonp)
      .end(function(err, res) {
        if (res) {
          var weather = res.body;
          self.setState({weather: weather});

          console.log("icon: " + weather.currently.icon);

        } else {
          console.log('Oh no! error ' + res);
        }
      }.bind(self));

  },

  loadPlantlife: function(){
    var self = this;
      request
        .get('http://fontenelle.flywheelsites.com/wp-json/posts')
        .query('type[]=plantlife&filter[posts_per_page]=-1')
        .set('Cache-Control', 'no-cache,no-store,must-revalidate,max-age=-1,private')
        .end(function(err, res) {
      if (res.ok) {
        var plantlife = res.body;

        self.setState({plantlife: plantlife});

      } else {
        console.log('Oh no! error ' + res.text);
      }
        }.bind(self));
  },

  loadWildlife: function(){
    var self = this;
      request
        .get('http://fontenelle.flywheelsites.com/wp-json/posts')
        .query('type[]=wildlife&filter[posts_per_page]=-1')
        .set('Cache-Control', 'no-cache,no-store,must-revalidate,max-age=-1,private')
        .end(function(err, res) {
      if (res.ok) {
        var wildlife = res.body;

        self.setState({wildlife: wildlife});

      } else {
        console.log('Oh no! error ' + res.text);
      }
        }.bind(self));
  },

  loadClosings: function(){
    var self = this;
      request
        .get('http://fontenelle.flywheelsites.com/wp-json/posts')
        .query('type[]=closings&filter[posts_per_page]=-1')
        .set('Cache-Control', 'no-cache,no-store,must-revalidate,max-age=-1,private')
        .end(function(err, res) {
      if (res.ok) {
        var closings = res.body;

        self.setState({closings: closings});

      } else {
        console.log('Oh no! error ' + res.text);
      }
        }.bind(self));
  },

  loadPosts: function(){
    var self = this;
    request
      .get('http://fontenelle.flywheelsites.com/wp-json/posts')
      .query('type[]=post&filter[orderby]=modified&filter[order]=DESC&filter[posts_per_page]=3&filter[category_name]=Uncategorized')
      .set('Cache-Control', 'no-cache,no-store,must-revalidate,max-age=-1,private')
      .end(function(err, res) {
        if (res.ok) {
          var posts = res.body;
          console.log("loadPosts count: " + posts.length);
          self.setState({ posts: posts });

        } else {
          console.log('Oh no! error ' + res.text);
        }
          }.bind(self));
  },

  loadFeatured: function(){
    var self = this;
    request
      .get('http://fontenelle.flywheelsites.com/wp-json/posts')
      .query('type[]=post&filter[orderby]=modified&filter[order]=DESC&filter[posts_per_page]=1&filter[category_name]=featured')
      .set('Cache-Control', 'no-cache,no-store,must-revalidate,max-age=-1,private')
      .end(function(err, res) {
        if (res.ok) {
          var featured = res.body[0];

          self.setState({ featured: featured });

        } else {
          console.log('Oh no! error ' + res.text);
        }
          }.bind(self));
  },

  loadPinned: function(){
    var self = this;
    request
      .get('http://fontenelle.flywheelsites.com/wp-json/posts')
      .query('type[]=post&filter[orderby]=modified&filter[order]=DESC&filter[posts_per_page]=1&filter[category_name]=pinned')
      .set('Cache-Control', 'no-cache,no-store,must-revalidate,max-age=-1,private')
      .end(function(err, res) {
        if (res.ok) {
          var pinned = res.body;

          self.setState({ pinned: pinned });

        } else {
          console.log('Oh no! error ' + res.text);
        }
          }.bind(self));
  },

  loadEvents: function(){
    var self = this;

    var this_week = moment().startOf('week').add(1, 'd').format('DDMMYYYY');

    request
      .get('http://fontenelle.flywheelsites.com/wp-json/posts')
      .query('type[]=events&filter[posts_per_page]=-1&filter[meta_query]&filter[meta_key]=week&filter[meta_value]=' + this_week)
      .set('Cache-Control', 'no-cache,no-store,must-revalidate,max-age=-1,private')
      .end(function(err, res) {
        if (res.ok) {
          var events = res.body;

          var sorted_events = events.sort(function(a, b) {
            var start_date =  parseInt(a.meta.start_date) - parseInt(b.meta.start_date) ;

            if(start_date) return start_date;

            // If there is a tie, sort by year

            var start_time = moment(a.meta.start_time, "H:m A") - moment(b.meta.start_time, "H:m A");

            return start_time;
          });


          self.setState({ events: sorted_events, week: this_week, this_week: this_week });

        } else {
          console.log('Oh no! error ' + res.text);
        }
          }.bind(self));
  },

  nextWeek: function(){
    var self = this;
    var this_week = moment(self.state.week, 'DDMMYYYY').add(1, 'w').startOf('week').add(1, 'd').format('DDMMYYYY');

    request
      .get('http://fontenelle.flywheelsites.com/wp-json/posts')
      .query('type[]=events&filter[posts_per_page]=-1&filter[meta_query]&filter[meta_key]=week&filter[meta_value]=' + this_week)
      .set('Cache-Control', 'no-cache,no-store,must-revalidate,max-age=-1,private')
      .end(function(err, res) {
        if (res.ok) {
          var events = res.body;

          var sorted_events = events.sort(function(a, b) {
            var start_date =  parseInt(a.meta.start_date) - parseInt(b.meta.start_date) ;

            if(start_date) return start_date;

            // If there is a tie, sort by year

            var start_time = moment(a.meta.start_time, "H:m A") - moment(b.meta.start_time, "H:m A");

            return start_time;
          });

          console.log('nextWeek: ' + events.length);

          self.setState({ events: sorted_events, week: this_week });

        } else {
          console.log('Oh no! error ' + res.text);
        }
          }.bind(self));
  },

  prevWeek: function(){
    var self = this;
    var this_week = moment(self.state.week, 'DDMMYYYY').subtract(1, 'w').startOf('week').add(1, 'd').format('DDMMYYYY');

    request
      .get('http://fontenelle.flywheelsites.com/wp-json/posts')
      .query('type[]=events&filter[posts_per_page]=-1&filter[meta_query]&filter[meta_key]=week&filter[meta_value]=' + this_week)
      .set('Cache-Control', 'no-cache,no-store,must-revalidate,max-age=-1,private')
      .end(function(err, res) {
        if (res.ok) {
          var events = res.body;
          console.log('prevWeek: ' + events.length);

          var sorted_events = events.sort(function(a, b) {
            var start_date =  parseInt(a.meta.start_date) - parseInt(b.meta.start_date) ;

            if(start_date) return start_date;

            // If there is a tie, sort by year

            var start_time = moment(a.meta.start_time, "H:m A") - moment(b.meta.start_time, "H:m A");

            return start_time;
          });


          self.setState({ events: sorted_events, week: this_week });

        } else {
          console.log('Oh no! error ' + res.text);
        }
          }.bind(self));
  },

  loadExcerpts: function(){
    var self = this;
    request
      .get('http://fontenelle.flywheelsites.com/wp-json/pages')
      .query('filter[name]=nature-notes')
      .set('Cache-Control', 'no-cache,no-store,must-revalidate,max-age=-1,private')
      .end(function(err, res) {
        if (res.ok) {
          var page = res.body[0];

          var wildlife_excerpt = page.meta.wildlife;
          var plantlife_excerpt = page.meta.plantlife;

          self.setState({ wildlife_excerpt: wildlife_excerpt, plantlife_excerpt: plantlife_excerpt });

        } else {
          console.log('Oh no! error ' + res.text);
        }
          }.bind(self));
  },

  loadTwistagrams: function(){
    var self = this;
    request
      .get('/twistagrams')
      .set('Cache-Control', 'no-cache,no-store,must-revalidate,max-age=-1,private')
      .end(function(err, res) {
        if (res.ok) {
          var twistagrams = res.body;

          self.setState({ twistagrams: twistagrams});

        } else {
          console.log('Oh no! error ' + res.text);
        }
          }.bind(self));
  },


  render: function() {
    var self = this;
    var classImage = "/img/forest-now/nature-notes.jpg";
    var temp, currently, hourly, minutely, icon;
    if (self.state.weather.currently) {
      temp = self.state.weather.currently.temperature;
      icon = self.state.weather.currently.icon;
      currently = self.state.weather.hourly.data[0].precipProbability * 100;
      hourly = self.state.weather.hourly.summary;
    }
    var wildlife = self.state.wildlife.map(function(object, index){
      return <h4 className="wildlife_title" key={index}>{object.title}</h4>
    });
    var plantlife = self.state.plantlife.map(function(object, index){
      return (
        <div className="nature_notes_item" key={index}>
          <img src={object.featured_image.attachment_meta.sizes.thumbnail.url} />
          <h4 className="plantlife_title">{object.title}</h4>
          <div dangerouslySetInnerHTML={{__html: object.content}}></div>
          <a href={object.meta.naturesearch_link} target="_blank">Read more</a>
        </div>
      )
    });

    var events = self.state.events.map(function(object, index){
      return (
        <Event
          title={object.title}
          content={object.content}
          start_time={object.meta.start_time}
          end_time={object.meta.end_time}
          start_date={object.meta.start_date}
          end_date={object.meta.end_date}
          days={object.meta.days}
          age_group={object.meta.age_group}
          signup_link={object.meta.signup_link}
          location={object.meta.location}
          location_map_url={object.meta.location_map_url}
          key={index} />
      )
    });

    var posts = self.state.posts.map(function(object, index){
      var post_style ={
        backgroundImage: "url("+ object.featured_image.attachment_meta.sizes.medium.url +")"
      }
      if (object.meta){
        var subheader = object.meta.subheader || "";
      }
      return (
        <div className="post" key={index}>
          <div className="post_image" style={post_style}></div>
          <div className="post_content">
            <h4 className="post_headline" dangerouslySetInnerHTML={{__html: object.title}}></h4>
            { subheader ? <p className="post_subheader">{subheader}</p> : null }
            <Link className="post_link" to={"/post/" + object.slug}>Read more</Link>
          </div>
        </div>
      )
    });

    var pinned_post = self.state.pinned.map(function(object, index){
      var post_style ={
        backgroundImage: "url("+ object.featured_image.attachment_meta.sizes.medium_large.url +")"
      }
      if (object.meta){
        var subheader = object.meta.subheader || "";
      }
      return (
        <div className="post pinned" key={index}>
          <div className="post_image" style={post_style}></div>
          <div className="post_content">
            <h4 className="post_headline" dangerouslySetInnerHTML={{__html: object.title}}></h4>
            { subheader ? <p className="post_subheader">{subheader}</p> : null }
            <Link className="post_link" to={"/post/" + object.slug}>Read more</Link>
          </div>
        </div>
      )
    });

    var closings = self.state.closings.map(function(object, index){
      return <p className="closings_title" key={index}>{object.title}</p>
    });

    var iconPossibilities = [ "clear-day", "clear-night", "rain", "snow", "sleet", "wind", "fog", "cloudy", "partly-cloudy-day", "partly-cloudy-night"];

    var fogPossibilities = [ "fog", "cloudy"];
    var snowPossibilities = [ "snow", "sleet"];
    var rainPossibilities = [ "rain" ];
    var clearNightPossibilities = [ "clear-night", "partly-cloudy-night" ];
    var clearDayPossibilities = [ "clear-day", "partly-cloudy-day", "wind" ];

    if ( fogPossibilities.indexOf(icon) > -1) {

      var top_image = { backgroundImage: "url(/img/weather/fog.jpg)" }

    } else if ( snowPossibilities.indexOf(icon) > -1) {

      var top_image = { backgroundImage: "url(/img/weather/snow.jpg)" }

    } else if ( snowPossibilities.indexOf(icon) > -1) {

      var top_image = { backgroundImage: "url(/img/weather/rain.jpg)" }

    } else if ( clearNightPossibilities.indexOf(icon) > -1) {

      var top_image = { backgroundImage: "url(/img/weather/clear_skies_night.jpg)" }

    } else if ( clearDayPossibilities.indexOf(icon) > -1) {

      var top_image = { backgroundImage: "url(/img/weather/clear_skies_day.jpg)" }

    } else {

      var top_image = { backgroundImage: "url(/img/weather/beautiful-day.jpg)" }

    }

    var nature_notes_image = {
      backgroundImage: "url(/img/forest-now/nature_notes_bkgd.jpg)"
    }

    var wild_excerpt = self.state.wildlife_excerpt;
    var plant_excerpt = self.state.plantlife_excerpt;

    var twistagrams = self.state.twistagrams.map(function(object, index){
      if (object.type == "instagram") {
        return <Instagram content={object.content} time={object.time} key={index}/>
      } else if (object.type == "tweet") {
        return <Tweet content={object.content} time={object.time} key={index}/>
      }
    });

    if(self.state.week == self.state.this_week) {
      var week_text = "This Week: ";
    } else {
      var week_text = "Week of: "
    }

    var featured = self.state.featured;
    if (featured.meta){
      var featured_subheader = featured.meta.subheader || "";
    }

    // style={top_image}

    var arrow_class = self.state.arrow_class;

    return (
      <div>
        <div className="egg_wrap nature_notes_header">
          <div className="forest_now_top">
            <div className="fn_top_top">
              {featured.meta ?
                <div className="fn_top_left" >
                  <FeaturedPost
                    title={featured.title}
                    featured_image={featured.featured_image}
                    slug={featured.slug}
                    subheader={featured_subheader} />
                </div>
              : null}
                <div className="fn_top_right">
                  <div className="nn_wrap" >
                    { (self.state.closings.length > 0) ?
                      <Link to="nature-notes">
                        <div className="closings_bar">
                          <div>
                            {self.state.closings.length} Alert{(self.state.closings.length > 1) ? "s" : null}
                          </div>
                        </div>
                      </Link>
                    : null }
                    <div className="nn_wrapper">
                      <div>
                        <h2 className="marker nn_main_title">nature notes</h2>
                        <h3 className="nn_title">PLANTLIFE</h3>
                        <p className="excerpt">{plant_excerpt}</p>
                        <h3 className="nn_title">WILDLIFE</h3>
                        <p className="excerpt">{wild_excerpt}</p>
                        <div className="nn_links">
                          <Link to="nature-notes" className="marker nn_link">see all</Link>
                          <a href="http://www.fnanaturesearch.org/" target="_blank" className="marker nn_link">Nature Search</a>
                        </div>
                      </div>
                      <div className="nature_notes_overlay"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="fn_top_bottom">
                <div className="fn_top_left" >
                  <h3 className="explore">Explore the Forest</h3>
                  <div className="explore-grid">
                    <Link to="forest" className="explore-link forest-square" style={{backgroundImage: "url(/img/loop_one.jpg)"}}>
                      <div className="explore-wrapper">
                        <img className={ arrow_class ? "hero_icon up" : "hero_icon" } src="/img/forest/icon_forest.svg" />
                        forest
                      </div>
                      <div className="explore-overlay"></div>
                    </Link>
                    <Link to="education" className="explore-link education-square" style={{backgroundImage: "url(/img/loop_education.jpg)"}}>
                      <div className="explore-wrapper">
                        <img className={ arrow_class ? "hero_icon up" : "hero_icon" } src="/img/education/icon_education.svg" />
                        education
                      </div>
                      <div className="explore-overlay"></div>
                    </Link>
                    <Link to="programs" className="explore-link programs-square" style={{backgroundImage: "url(/img/loop_programs.jpg)"}}>
                      <div className="explore-wrapper">
                        <img className={ arrow_class ? "hero_icon up" : "hero_icon" } src="/img/programs/icon_programs.svg" />
                        programs
                      </div>
                      <div className="explore-overlay"></div>
                    </Link>
                    <Link to="natural-resources" className="explore-link conservation-square" style={{backgroundImage: "url(/img/loop_conservation.jpg)"}}>
                      <div className="explore-wrapper">
                        <img className={ arrow_class ? "hero_icon up" : "hero_icon" } src="/img/conservation/icon_conservation.svg" />
                        natural resources
                      </div>
                      <div className="explore-overlay"></div>
                    </Link>
                  </div>
                </div>
                <div className="fn_top_right fn_wrap blue_wrapper">
                  {self.state.weather.currently ?
                    <div className="halfcontainer left">
                      <p className="date">{moment().format('MMMM Do, YYYY')}</p>
                      <p className="temp">{Math.ceil(temp)}°</p>
                      <p className="desc">{hourly}</p>
                      <p className="desc">{Math.floor(currently)}% Chance of rain</p>
                    </div>
                  :
                    <div className="halfcontainer left">
                      <p className="date">{moment().format('MMMM Do, YYYY')}</p>
                      <p className="weather_loader"><i className="fa fa-spinner fa-spin"></i></p>
                    </div>
                  }
                </div>
              </div>
          </div>
          <div className='now-blue'>
            <div className='now-links image_container'>
              <a href="/hours-and-admissions">Hours and Admissions</a>
              <span className="trailmaps">Trail Maps: <a target="_blank" href="http://fontenelle.flywheelsites.com/wp-content/uploads/2016/03/FFTrailMap.pdf">Fontenelle</a>|<a target="_blank" href="http://fontenelle.flywheelsites.com/wp-content/uploads/2016/03/NWTrailMap.pdf">Neale Woods</a></span>
              <a target="_blank" href="http://fontenelle.flywheelsites.com/wp-content/uploads/2016/03/FFTrailMap.pdf">Guidelines</a>
              <a href="/contact">Contact</a>
            </div>
          </div>

          <div className='image_container'>
            { events.length ?
              <div className='now-left'>
                <h3 className="week_title marker">
                  <span className="prev_week" onClick={self.prevWeek}>
                    <svg className="arrow_circle blue left_arrow" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" >
                    	<path className="circle" strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M1,26c0,13.8,11.2,25,25,25c13.8,0,25-11.2,25-25S39.8,1,26,1C12.2,1,1,12.2,1,26z"/>
                    	<g className="arrow" >
                    		<path strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M22.6,25.9c0,0,1,1.6,1,4.4c0,2.6,0.6,3.5,0.6,3.8c0,0.4-0.3,0.7-0.7,0.5s-8.6-6.2-10.5-8.1
                    			c0,0-0.2-0.2-0.2-0.5v-0.1c0-0.2,0.1-0.4,0.2-0.5c1.7-1.7,10.1-7.9,10.5-8.1c0.3-0.2,0.7-0.1,0.7,0.5c0,0.3-0.6,1.1-0.6,3.8
                    			C23.6,24.3,22.6,25.9,22.6,25.9z" />
                    		<line strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' x1="24.2" y1="25.9" x2="39.3" y2="25.9"/>
                    	</g>
                    </svg>
                  </span>
                  {week_text}<span className="actual_week">{moment(self.state.week, 'DDMMYYYY').startOf('week').add(1, "day").format('MMMM D')} - {moment(self.state.week, 'DDMMYYYY').endOf('week').add(1, "day").format('MMMM D')} </span>
                  <span className="next_week" onClick={self.nextWeek}>
                    <svg className="arrow_circle blue right_arrow" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" >
                      <path className="circle" strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M1,26c0,13.8,11.2,25,25,25c13.8,0,25-11.2,25-25S39.8,1,26,1C12.2,1,1,12.2,1,26z"/>
                      <g className="arrow" >
                        <path strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M29.4,25.9c0,0-1,1.6-1,4.4c0,2.6-0.6,3.5-0.6,3.8c0,0.4,0.3,0.7,0.7,0.5s8.6-6.2,10.5-8.1
                        c0,0,0.2-0.2,0.2-0.5v-0.1c0-0.2-0.1-0.4-0.2-0.5c-1.7-1.7-10.1-7.9-10.5-8.1c-0.3-0.2-0.7-0.1-0.7,0.5c0,0.3,0.6,1.1,0.6,3.8
                        C28.4,24.3,29.4,25.9,29.4,25.9z"/>
                        <line strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' x1="27.8" y1="25.9" x2="12.7" y2="25.9"/>
                      </g>
                    </svg>
                  </span>
                </h3>
                <p className="event_legend"><span className="greenbox"></span><span className="registration"> Registration Required</span></p>
                {events}
              </div>
              : null
            }
            <div className='now-right'>
              {pinned_post}
              { posts.length ?
                  <span>
                    {posts}
                    <Link to='/posts' className="all_posts_link">VIEW ALL POSTS</Link>
                  </span>
                : null
              }
            </div>
          </div>

          <div className='now-blue social_blue'>
            <div className='now-links image_container marker'>
                <a href="https://twitter.com/fontenelle4est" target="_blank">@fontenelle4est</a> / <a href="https://www.instagram.com/fontenelleforest/" target="_blank">@fontenelleforest</a> / <a href="https://twitter.com/search?q=%234estnow" target="_blank">#4estnow</a> / <a href="https://www.instagram.com/explore/tags/fontenelleforest/" target="_blank">#fontenelleforest</a>
            </div>
          </div>
          <div className='social_wrapper'>
            {twistagrams}
          </div>
        </div>
        <Footer />
      </div>
    )
  }
});
