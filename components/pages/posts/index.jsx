var React = require('react'),
    request = require('superagent'),
    moment = require('moment'),
    util = require('util');
var Velocity = require('velocity-animate/velocity');
var InlineSVG = require('react-inlinesvg');
var Router = require('react-router');

var Navigation = Router.Navigation;
var Link = Router.Link;

module.exports = React.createClass({
  mixins: [ Router.State, Navigation ],
  getInitialState: function() {
    return {
      posts: []
    };
  },

  componentDidMount: function () {
    var self = this;
    self.loadPosts();
  },

  componentWillReceiveProps: function () { },

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

  render: function() {
    var self = this;
    var posts = self.state.posts.map(function(object){
      return (
        <div className="post">
          <h4 className="post_headline">{object.title}</h4>
          <Link className="post_link" to={"/post/" + object.slug}>Read more</Link>
        </div>
      )
    });


    return (
      <div>
        <div className="egg_wrap post_container">
          <div className='main_wrapper'>
            <h1 className="post_title marker">Latest Posts</h1>
            <div className='post_list'>
              {posts}
            </div>
          </div>
        </div>
      </div>
    )
  }
});
