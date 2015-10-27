var React = require('react'),
    request = require('superagent'),
    util = require('util');
var Velocity = require('velocity-animate/velocity');
var InlineSVG = require('react-inlinesvg');
var Router = require('react-router');

var jsonp = require('superagent-jsonp');

var Navigation = Router.Navigation;
var Link = Router.Link;

module.exports = React.createClass({
  mixins: [ Router.State, Navigation ],
  getInitialState: function() {
    return {
      wildlife: [],
      plantlife: [],
      closings: [],
      weather: {}
    };
  },

  componentDidMount: function () {
    var self = this;
    self.loadPlantlife();
    self.loadWildlife();
    self.loadClosings();

    self.loadWeather();

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

  render: function() {
    var self = this;
    var classImage = "/img/forest-now/nature-notes.jpg";
    var temp, currently, hourly, minutely, icon;
    if (self.state.weather.currently) {
      temp = self.state.weather.currently.temperature;
      icon = self.state.weather.currently.icon;
      currently = self.state.weather.currently.summary;
      hourly = self.state.weather.hourly.summary;
      minutely = self.state.weather.minutely.summary;
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
                    <h3>Come Splash Around</h3>
                    <h3 className="marker">in our backyard</h3>
                  </div>
                </div>
                <div className="fn_wrap blue_wrapper">
                  <div className="halfcontainer left">
                    <p>Now: {temp}</p>
                    <p>icon: {icon}</p>
                    <p>currently: {currently}</p>
                    <p>hourly: {hourly}</p>
                    <p>minutely: {minutely}</p>
                  </div>
                </div>
              </div>
              <div className="fn_top_right" style={nature_notes_image}>
                <Link to="nature-notes">nature notes</Link>
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
            <Link to="nature-notes"><img src={classImage} /></Link>

          </div>
          <div className='image_container'>
            <div className='now-left'>
              <img src="/img/forest-now/calendar.jpg" />
            </div>
            <div className='now-right'>
              <Link to='/save-the-oaks'><img src="/img/forest-now/blog.jpg" /></Link>
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
