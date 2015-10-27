var React = require('react'),
    request = require('superagent'),
    util = require('util');
var Velocity = require('velocity-animate/velocity');
var InlineSVG = require('react-inlinesvg');
var Router = require('react-router');

var Navigation = Router.Navigation;
var Link = Router.Link;
// Require the module
var Forecast = require('forecast');

// Initialize
var forecast = new Forecast({
  service: 'forecast.io',
  key: '428664b41344b3a66849ab1e8432105b',
  units: 'f', // Only the first letter is parsed
  cache: true,      // Cache API requests?
  ttl: {            // How long to cache requests. Uses syntax from moment.js: http://momentjs.com/docs/#/durations/creating/
    minutes: 5,
    seconds: 0
    }
});

var Wunderground = require('node-weatherunderground');

var client = new Wunderground('42a6e811289e89d1');

module.exports = React.createClass({
  mixins: [ Router.State, Navigation ],
  getInitialState: function() {
    return {
      wildlife: [],
      plantlife: [],
      closings: [],
      rweather: {},
      fweather: {}
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

    // forecast.get([41.1797155, -95.9200238], function(err, weather) {
    //   if(err) return console.dir(err);
    //   console.log("fweather: " + weather);
    //   self.setState({fweather: weather});
    // });
    // request
    //   .get('https://api.forecast.io/forecast/428664b41344b3a66849ab1e8432105b/41.1797155,-95.9200238')
    //   .end(function(err, res) {
    //     if (res.ok) {
    //       var weather = res.body;
    //       console.log("weather: " + weather);
    //       self.setState({rweather: weather});
    //
    //     } else {
    //       console.log('Oh no! error ' + res.text);
    //     }
    //   }.bind(self));
      // var opts = {
      //   state: '41.1797155,-95.9200238'
      // }
      var opts = {
        city: 'Omaha',
        state: 'NE'
      }
      client.conditions(opts, function(err, data) {
        if (err) throw err;
        else console.log("weather underground: " + data);
      });
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

    var rtimezone = self.state.rweather.timezone;
    var ftimezone = self.state.fweather.timezone;

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
    return (
      <div>
        <div className="egg_wrap static">
          <div className='image_container'>
            <Link to="nature-notes"><img src={classImage} /></Link>
            <p>{rtimezone}</p>
            <p>{ftimezone}</p>
          </div>
          <div className='image_container now-blue'>
            <div className='now-links'>
              <a href="/hours-and-admissions">Hours and Admissions</a>
              <span>Trail Maps: <a target="_blank" href="http://fontenelleforest.org/images/stories/Trails/ffnc_trailmap_dec09.pdf">Fontenelle</a>|<a target="_blank" href="http://fontenelleforest.org/images/stories/Trails/neale_woods_map_printable.pdf">Neale Woods</a></span>
              <a href="#">Guidelines</a>
              <a href="/contact">Contact</a>
            </div>
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
