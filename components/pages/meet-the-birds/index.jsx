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
          <Link to="/natural-resources" className="back_to_nr">
            <svg className="arrow_circle blue left_arrow left" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" >
              <path className="circle" strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M1,26c0,13.8,11.2,25,25,25c13.8,0,25-11.2,25-25S39.8,1,26,1C12.2,1,1,12.2,1,26z"/>
              <g className="arrow" >
                <path strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M22.6,25.9c0,0,1,1.6,1,4.4c0,2.6,0.6,3.5,0.6,3.8c0,0.4-0.3,0.7-0.7,0.5s-8.6-6.2-10.5-8.1
                  c0,0-0.2-0.2-0.2-0.5v-0.1c0-0.2,0.1-0.4,0.2-0.5c1.7-1.7,10.1-7.9,10.5-8.1c0.3-0.2,0.7-0.1,0.7,0.5c0,0.3-0.6,1.1-0.6,3.8
                  C23.6,24.3,22.6,25.9,22.6,25.9z" />
                <line strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' x1="24.2" y1="25.9" x2="39.3" y2="25.9"/>
              </g>
            </svg>
          </Link>
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
