var React = require('react'),
    request = require('superagent'),
    moment = require('moment'),
    util = require('util');

var jsonp = require('superagent-jsonp');
var noCache = require('superagent-no-cache')

var Velocity = require('velocity-animate/velocity');
var InlineSVG = require('react-inlinesvg');
var Router = require('react-router');

var Navigation = Router.Navigation;
var Link = Router.Link;

module.exports = React.createClass({
  mixins: [ Router.State, Navigation ],
  getInitialState: function() {
    return {
      post: {}
    };
  },

  componentDidMount: function () {
    var self = this;
    self.loadPost();
  },

  componentWillReceiveProps: function () { },

  loadPost: function(){
    var self = this;

    console.log("loadPost name: " + self.getParams().name);

    // request.set('X-Requested-With', 'XMLHttpRequest')
    // request.set('Expires', '-1')
    // request.set('Cache-Control', 'no-cache,no-store,must-revalidate,max-age=-1,private')

    request
      .get('http://fontenelle.flywheelsites.com/wp-json/posts')
      .query('filter[name]='+ self.getParams().name)
      .set('X-Requested-With', 'XMLHttpRequest')
      .set('Expires', '-1')
      .set('Cache-Control', 'no-cache,no-store,must-revalidate,max-age=-1,private')
      .end(function(err, res) {
        if (res.ok) {
          var post = res.body;
          console.log("loadPost content: " + util.inspect(post[0].content));
          self.setState({
            title: post[0].title,
            featured_image: post[0].featured_image,
            content: post[0].content
          });

        } else {
          console.log('Oh no! error ' + res.text);
        }
          }.bind(self));
  },

  render: function() {
    var self = this;
    var title = self.state.title;
    var content = self.state.content;
    var featured_image = self.state.featured_image;
    if (featured_image){
      var image_style = {
        backgroundImage: 'url('+featured_image.guid+')'
      };
    }

    return (
      <div>
        <div className="egg_wrap post_container">
          { featured_image ? <div className="featured_image" style={image_style}></div> : null }
          <div className='main_wrapper'>
            <h1 className="post_title marker">{title}</h1>
            <div className='post_content' dangerouslySetInnerHTML={{__html: content}}></div>
          </div>
        </div>
      </div>
    )
  }
});
