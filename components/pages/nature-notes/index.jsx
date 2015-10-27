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
      wildlife: [],
      plantlife: [],
      closings: []};
  },

  componentDidMount: function () {
    var self = this;
    self.loadPlantlife();
    self.loadWildlife();
    self.loadClosings();
  },

  componentWillReceiveProps: function () { },

  onLoad: function() { },

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
    var wildlife = self.state.wildlife.map(function(object){
      return (
        <div className="nature_notes_item">
          { object.featured_image ? <img className="plantlife_img" src={object.featured_image.attachment_meta.sizes.thumbnail.url} /> : null }
          <div className="plantlife_copy">
            <h4 className="plantlife_title">{object.title}</h4>
            <div dangerouslySetInnerHTML={{__html: object.content}}></div>
            { object.meta ? <a className="plantlife_link" href={object.meta.naturesearch_link} target="_blank">Read more</a> : null }
          </div>
        </div>
      )
    });
    var plantlife = self.state.plantlife.map(function(object){
      return (
        <div className="nature_notes_item">
          <img className="plantlife_img" src={object.featured_image.attachment_meta.sizes.thumbnail.url} />
          <div className="plantlife_copy">
            <h4 className="plantlife_title">{object.title}</h4>
            <div dangerouslySetInnerHTML={{__html: object.content}}></div>
            <a className="plantlife_link" href={object.meta.naturesearch_link} target="_blank">Read more</a>
          </div>
        </div>
      )
    });

    var closings = self.state.closings.map(function(object){
      return  <Closing title={object.title} content={object.content}/>
    });
    return (
      <div>
        <div className="nature_notes_header egg_wrap">
          <h2 className="marker">Nature Notes</h2>
          <div className="closings">
            {closings}
          </div>
        </div>
        <div className="egg_wrap">
          <div className='image_container'>
            <div className="nature_notes">
              <div className="plantlife">
                <h3 className="plantlife_header">PLANT LIFE</h3>
                {plantlife}
              </div>
              <div className="wildlife">
                <h3 className="plantlife_header">WILD LIFE</h3>
                {wildlife}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});
