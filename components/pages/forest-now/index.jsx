var React = require('react'),
    request = require('superagent'),
    util = require('util');
var Velocity = require('velocity-animate/velocity');
var InlineSVG = require('react-inlinesvg');
var Router = require('react-router');

var Navigation = Router.Navigation;
var Link = Router.Link;

var Footer = require('../../common/footer.jsx');

var poster_image;
var Main = React.createClass({
  mixins: [ Router.State, Navigation ],
  getInitialState: function() {
    return { pre_count: 0,
      classImage: "/img/forest-now/nature-notes.jpg",
      video: false,
      wildlife: [],
      plantlife: [],
      closings: []};
  },

  componentDidMount: function () {
    var self = this;
    poster_image = new Image();
    poster_image.onload = self.onLoad;
    poster_image.src = "/img/loop_three.jpg";

    self.loadPlantlife();
    self.loadWildlife();
    self.loadClosings();
  },

  componentWillReceiveProps: function () {
    var self = this;
    poster_image = new Image();
    poster_image.onload = self.onLoad;
    poster_image.src = "/img/loop_three.jpg";

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

  toggleClass: function(){
    if (this.state.classImage == "/img/forest-now/nature-notes.jpg") {
      this.setState({classImage: "/img/forest-now/nature-notes-click.jpg"});
    } else {
      this.setState({classImage: "/img/forest-now/nature-notes.jpg"});
    }
  },

  render: function() {
    var self = this;
    var classImage = self.state.classImage;
    var self = this;
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
      <div className="page">
        <div className="egg_wrap static">
          <div className='image_container'>
            <img src={classImage} onClick={self.toggleClass}/>
          </div>
          <div className="nature_notes">
            <div className="nature_notes_header">
              <h2 className="marker">Nature Notes</h2>
              <div className="closings">
                {closings}
              </div>
            </div>
            <div className="plantlife">
              {plantlife}
            </div>
            <div className="wildlife">
              {wildlife}
            </div>
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
        <Footer />
      </div>
    )
  }
});

module.exports = Main;
