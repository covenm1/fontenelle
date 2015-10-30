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


var Event = React.createClass({
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

    if (self.props.end_date){
      return (
        <div className="event green">
          <h4 className="event_title">{self.props.title}
            <span className="age">{age}</span>
          </h4>
          <div className="event_bar">
            <span className="date">{moment(self.props.start_date, "YYYYMMDD").format("M/D")} - {moment(self.props.end_date, "YYYYMMDD").format("M/D")}</span>
            <span className="days">
              <span className={ ( self.props.days.indexOf('sun') > -1) ? "day active" : "day" }>s</span>
              <span className={ ( self.props.days.indexOf('mon') > -1) ? "day active" : "day" }>m</span>
              <span className={ ( self.props.days.indexOf('tues') > -1) ? "day active" : "day" }>t</span>
              <span className={ ( self.props.days.indexOf('wed') > -1) ? "day active" : "day" }>w</span>
              <span className={ ( self.props.days.indexOf('thurs') > -1) ? "day active" : "day" }>t</span>
              <span className={ ( self.props.days.indexOf('fri') > -1) ? "day active" : "day" }>f</span>
              <span className={ ( self.props.days.indexOf('sat') > -1) ? "day active" : "day" }>s</span>
            </span>
            <span className="time">{self.props.start_time}-{self.props.end_time}</span>
          </div>
        </div>
      )
    } else {
      return (
        <div className="event blue">
          <h4 className="event_title">{self.props.title}
            <span className="age">{age}</span>
          </h4>
          <div className="event_bar">
            <span className="date">{moment(self.props.start_date, "YYYYMMDD").format("M/D")}</span>
            <span className="days">
              <span className={ ( self.props.days.indexOf('sun') > -1) ? "day active" : "day" }>s</span>
              <span className={ ( self.props.days.indexOf('mon') > -1) ? "day active" : "day" }>m</span>
              <span className={ ( self.props.days.indexOf('tues') > -1) ? "day active" : "day" }>t</span>
              <span className={ ( self.props.days.indexOf('wed') > -1) ? "day active" : "day" }>w</span>
              <span className={ ( self.props.days.indexOf('thurs') > -1) ? "day active" : "day" }>t</span>
              <span className={ ( self.props.days.indexOf('fri') > -1) ? "day active" : "day" }>f</span>
              <span className={ ( self.props.days.indexOf('sat') > -1) ? "day active" : "day" }>s</span>
            </span>
            <span className="time">{self.props.start_time}-{self.props.end_time}</span>
          </div>
        </div>
      )
    }
  }
});

module.exports = React.createClass({
  mixins: [ Router.State, Navigation ],
  getInitialState: function() {
    return {
      wildlife: [],
      plantlife: [],
      closings: [],
      posts: [],
      events: [],
      weather: {}
    };
  },

  componentDidMount: function () {
    var self = this;
    self.loadPlantlife();
    self.loadWildlife();
    self.loadClosings();

    self.loadWeather();
    self.loadPosts();
    self.loadEvents();

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
          console.log("forecast: " + util.inspect(weather));

        } else {
          console.log('Oh no! error ' + res);
        }
      }.bind(self));

      // request
      //   .get('http://api.wunderground.com/api/42a6e811289e89d1/conditions/q/41.1797155,-95.9200238.json')
      //   .end(function(err, res) {
      //     if (res.ok) {
      //       var weather = res.body;
      //       console.log("weather: " + util.inspect(weather));
      //       self.setState({weather: weather});
      //
      //     } else {
      //       console.log('Oh no! error ' + res.text);
      //     }
      //   }.bind(self));

  },

  loadPlantlife: function(){
    var self = this;
      request
        .get('http://fontenelle.flywheelsites.com/wp-json/posts')
        .query('type[]=plantlife&filter[posts_per_page]=-1')
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
      .query('type[]=post&filter[posts_per_page]=-1')
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

  loadEvents: function(){
    var self = this;
    request
      .get('http://fontenelle.flywheelsites.com/wp-json/posts')
      .query('type[]=events&filter[posts_per_page]=-1')
      .end(function(err, res) {
        if (res.ok) {
          var events = res.body;
          console.log("loadPosts count: " + events.length);
          self.setState({ events: events });

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
      currently = self.state.weather.currently.precipProbability;
      hourly = self.state.weather.hourly.summary;
    }
    var wildlife = self.state.wildlife.map(function(object){
      return <h4 className="wildlife_title">{object.title}</h4>
    });
    var plantlife = self.state.plantlife.map(function(object){
      return (
        <div className="nature_notes_item">
          <img src={object.featured_image.attachment_meta.sizes.thumbnail.url} />
          <h4 className="plantlife_title">{object.title}</h4>
          <div dangerouslySetInnerHTML={{__html: object.content}}></div>
          <a href={object.meta.naturesearch_link} target="_blank">Read more</a>
        </div>
      )
    });

    var events = self.state.events.map(function(object){
      return (
        <Event
          title={object.title}
          start_time={object.meta.start_time}
          end_time={object.meta.end_time}
          start_date={object.meta.start_date}
          end_date={object.meta.end_date}
          days={object.meta.days}
          age_group={object.meta.age_group}
          signup_link={object.meta.signup_link} />
      )
    });

    var posts = self.state.posts.map(function(object){
      return (
        <div className="post">
          <h4 className="post_headline">{object.title}</h4>
          <Link className="post_link" to={"/post/" + object.slug}>Read more</Link>
        </div>
      )
    });

    var closings = self.state.closings.map(function(object){
      return <p className="closings_title">{object.title}</p>
    });
    var top_image = {
      backgroundImage: "url(/img/weather/rain.jpg)"
    }
    var nature_notes_image = {
      backgroundImage: "url(/img/forest-now/nature_notes_bkgd.jpg)"
    }

    return (
      <div>
        <div className="egg_wrap nature_notes_header">
          <div className="forest_now_top">
              <div className="fn_top_left" style={top_image}>
                <div className="fn_wrap">
                  <div className="halfcontainer left">
                    <h3 className="main_title">Come Splash Around</h3>
                    <h3 className="marker sub_title">in our backyard</h3>
                  </div>
                </div>
                <div className="fn_wrap blue_wrapper">
                  {self.state.weather.currently ?
                    <div className="halfcontainer left">
                      <p className="date">{moment().format('MMMM Do, YYYY')}</p>
                      <p className="temp">{Math.ceil(temp)}°</p>
                      <p className="desc">{hourly}</p>
                      <p className="desc">{currently}% Chance of rain</p>
                    </div>
                  :
                    <div className="halfcontainer left">
                      <p className="date">{moment().format('MMMM Do, YYYY')}</p>
                      <p className="weather_loader"><i className="fa fa-spinner fa-spin"></i> brb, grabbing the forecast.</p>
                    </div>
                  }
                </div>
              </div>
              <div className="fn_top_right" style={nature_notes_image}>
                <div className="nn_wrap">
                  { (self.state.closings.length > 0) ?
                    <Link to="nature-notes">
                      <div className="closings_bar">
                        <div className="halfcontainer right">
                          {self.state.closings.length} Closings
                        </div>
                      </div>
                    </Link>
                  : null }
                  <div className="halfcontainer right">
                    <h2 className="marker nn_main_title">nature notes</h2>
                    <h3 className="nn_title">PLANTLIFE</h3>
                    <h3 className="nn_title">WILDLIFE</h3>
                    <Link to="nature-notes" className="marker nn_link">see all</Link>
                  </div>
                </div>
                <div className="nature_notes_overlay"></div>
              </div>

          </div>
          <div className='now-blue'>
            <div className='now-links image_container'>
              <a href="/hours-and-admissions">Hours and Admissions</a>
              <span>Trail Maps: <a target="_blank" href="http://fontenelleforest.org/images/stories/Trails/ffnc_trailmap_dec09.pdf">Fontenelle</a>|<a target="_blank" href="http://fontenelleforest.org/images/stories/Trails/neale_woods_map_printable.pdf">Neale Woods</a></span>
              <a href="#">Guidelines</a>
              <a href="/contact">Contact</a>
            </div>
          </div>

          <div className='image_container'>
            <div className='now-left'>
              <h3 className="week_title marker">This Week: <span className="actual_week">{moment().startOf('week').format('MMMM D')} - {moment().endOf('week').format('MMMM D')} </span></h3>
              {events}
            </div>
            <div className='now-right'>
              {posts}
              <Link to='/posts'>VIEW ALL POSTS</Link>
            </div>
          </div>

          <div className='image_container'>
            <div className='now-left'>
              <img src="/img/forest-now/calendar.jpg" />
            </div>
            <div className='now-right'>
              <Link to='/posts'><img src="/img/forest-now/blog.jpg" /></Link>
            </div>
          </div>
          <div className='image_container'>
            <img src="/img/forest-now/social-media.jpg" />
          </div>
        </div>
      </div>
    )
  }
});
