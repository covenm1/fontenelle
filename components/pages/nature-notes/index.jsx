var React = require('react'),
    request = require('superagent'),
    util = require('util');
var Router = require('react-router');

var Navigation = Router.Navigation;
var Link = Router.Link;


var Footer = require('../../common/footer.jsx');

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
      return <h4 className="wildlife_title">{object.title}</h4>
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
      return <p className="closings_title">{object.title}</p>
    });
    return (
      <div className="page">
        <div className="egg_wrap static">
          <div className='image_container'>
            <div className="nature_notes_header">
              <h2 className="marker">Nature Notes</h2>
              <div className="closings">
                {closings}
              </div>
            </div>
            <div className="nature_notes">
              <div className="plantlife">
                {plantlife}
              </div>
              <div className="wildlife">
                {wildlife}
              </div>
            </div>
          </div>
          <div className='image_container'>
            <img src="/img/forest-now/nature-notes-click.jpg" />
          </div>
        </div>
        <Footer />
      </div>
    )
  }
});
