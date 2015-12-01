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
            <p className="bird_overview" dangerouslySetInnerHTML={{__html: object.meta.overview}}></p>
          </div>
        </div>
      )
    });

    return (
      <div>
        <div className="nature_notes_header egg_wrap">
          <div className="raptor">
              <h1 className="marker">Meet the Raptors</h1>
              <h3>Scheduling an Educational Raptor Event</h3>
              <p>Want to learn about how your school, organization, or club can invite some Fontenelle Forest Raptor Recovery educational birds to visit? Our trained staff and volunteer presenters are experienced in tailoring presentations to a wide variety of audiences and group sizes.</p>

              <p>To find out more information about educational programs, please fill out the form below or contact Denise Lewis at <a href="mailto:dlewis@fontenelleforest.org" target="_blank">dlewis@fontenelleforest.org</a> / <a href="tel:4027313140x1031" target="_blank">402-731-3140 x1031</a>.</p>

              <img src="/img/conservation/divider_bottom_grey.png" />
            </div>
        </div>
        <div className="egg_wrap">
          <div className='image_container birds'>
            {birds}
          </div>
        </div>
        <Footer />
      </div>
    )
  }
});
