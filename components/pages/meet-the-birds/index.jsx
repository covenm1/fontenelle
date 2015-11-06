var React = require('react'),
    request = require('superagent'),
    util = require('util');
var Router = require('react-router');

var Navigation = Router.Navigation;
var Link = Router.Link;

var Closing = React.createClass({
  getInitialState: function(){
    return { content: false };
  },
  toggleContent: function(){
    var self = this;
    self.setState({content: !self.state.content})
  },
  render: function() {
    var self = this;
    if (self.props.content) {
      return (
         <div className="closing">
            { self.state.content ?
              <div className='image_container'>
                <p className="closings_title">{self.props.title}
                  <span className="more_closing" onClick={self.toggleContent}>×</span>
                </p>
                <div dangerouslySetInnerHTML={{__html: self.props.content}}></div>
              </div>
            :
              <div className='image_container'>
                <p className="closings_title">{self.props.title}
                  <span className="more_closing" onClick={self.toggleContent}>More Info</span>
                </p>
              </div>
            }
          </div>
        )
    } else {
      return (
         <div className="closing">
            <div className='image_container'>
              <p className="closings_title">{self.props.title}</p>
            </div>
          </div>
        )}
    }
});

module.exports = React.createClass({
  mixins: [ Router.State, Navigation ],

  getInitialState: function() {
    return {
      birds: []};
  },

  componentDidMount: function () {
    var self = this;
    self.loadBirds();
  },

  componentWillReceiveProps: function () { },

  onLoad: function() { },

  loadBirds: function(){
    var self = this;
      request
        .get('http://fontenelle.flywheelsites.com/wp-json/posts')
        .query('type[]=raptors&filter[posts_per_page]=-1')
        .set('Cache-Control', 'no-cache,no-store,must-revalidate,max-age=-1,private')
        .end(function(err, res) {
      if (res.ok) {
        var birds = res.body;

        self.setState({birds: birds});

      } else {
        console.log('Oh no! error ' + res.text);
      }
        }.bind(self));
  },

  render: function() {
    var self = this;

    var birds = self.state.birds.map(function(object){
      return (
        <div className="bird">
          <img className="bird_img" src={object.meta.raptor_image.url} />
          <div className="bird_copy">
            <h2 className="bird_title marker">{object.title}</h2>
            <h4 className="bird_species">{object.meta.species}</h4>
            <h4 className="bird_date">Date added: {object.meta.date_added}</h4>
            <p className="bird_overview">{object.meta.overview}</p>
          </div>
        </div>
      )
    });

    return (
      <div>
        <div className="nature_notes_header egg_wrap">
          <div className="raptor">
              <h1 className="marker">Meet the Birds</h1>
              <img src="/img/conservation/divider_bottom_grey.png" />
            </div>
        </div>
        <div className="egg_wrap">
          <div className='image_container birds'>
            {birds}
          </div>
        </div>
      </div>
    )
  }
});
