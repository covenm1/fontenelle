var React = require('react'),
    request = require('superagent'),
    moment = require('moment'),
    util = require('util');
var Velocity = require('velocity-animate/velocity');
var InlineSVG = require('react-inlinesvg');
var Router = require('react-router');

var Navigation = Router.Navigation;
var Link = Router.Link;

var Footer = require('../../common/footer.jsx');

var FeaturedPost = React.createClass({
  render: function(){
    var self = this;
    var featured_image = self.props.featured_image;
    var title = self.props.title;
    var subheader = self.props.subheader;
    var slug = self.props.slug;
    if (featured_image){
      var style = {
        backgroundImage: "url("+featured_image.attachment_meta.sizes.large.url+")"
      }
    }
    return (
      <div className="post featured" style={style}>
        <div className="post_content">
          <h4 className="post_headline" dangerouslySetInnerHTML={{__html: title}}></h4>
          { subheader ? <p className="post_subheader">{subheader}</p> : null }
          <Link className="post_link" to={"/post/" + slug}>Read more</Link>
        </div>
        <div className="featured_post_overlay"></div>
      </div>
    )
  }
});

module.exports = React.createClass({
  mixins: [ Router.State, Navigation ],
  getInitialState: function() {
    return {
      posts: [],
      featured: {},
      pinned: [],
    };
  },

  componentDidMount: function () {
    var self = this;
    self.loadPosts();
    self.loadFeatured();
    self.loadPinned();
  },

  componentWillReceiveProps: function () { },

  loadPosts: function(){
    var self = this;
    request
      .get('http://fontenelle.flywheelsites.com/wp-json/posts')
      .query('type[]=post&filter[orderby]=modified&filter[order]=DESC&filter[posts_per_page]=-1')
      .set('Cache-Control', 'no-cache,no-store,must-revalidate,max-age=-1,private')
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
  loadFeatured: function(){
    var self = this;
    request
      .get('http://fontenelle.flywheelsites.com/wp-json/posts')
      .query('type[]=post&filter[orderby]=modified&filter[order]=DESC&filter[posts_per_page]=1&filter[category_name]=featured')
      .set('Cache-Control', 'no-cache,no-store,must-revalidate,max-age=-1,private')
      .end(function(err, res) {
        if (res.ok) {
          var featured = res.body[0];

          self.setState({ featured: featured });

        } else {
          console.log('Oh no! error ' + res.text);
        }
          }.bind(self));
  },

  loadPinned: function(){
    var self = this;
    request
      .get('http://fontenelle.flywheelsites.com/wp-json/posts')
      .query('type[]=post&filter[orderby]=modified&filter[order]=DESC&filter[posts_per_page]=1&filter[category_name]=pinned')
      .set('Cache-Control', 'no-cache,no-store,must-revalidate,max-age=-1,private')
      .end(function(err, res) {
        if (res.ok) {
          var pinned = res.body;

          self.setState({ pinned: pinned });

        } else {
          console.log('Oh no! error ' + res.text);
        }
          }.bind(self));
  },

  render: function() {
    var self = this;
    var posts = self.state.posts.map(function(object){
      var post_style ={
        backgroundImage: "url("+object.featured_image.attachment_meta.sizes.medium.url+")"
      }
      if (object.meta){
        var subheader = object.meta.subheader || "";
      }
      return (
        <div className="post">
          <div className="post_image" style={post_style}></div>
          <div className="post_content">
            <h4 className="post_headline" dangerouslySetInnerHTML={{__html: object.title}}></h4>
            { subheader ? <p className="post_subheader">{subheader}</p> : null }
            <Link className="post_link" to={"/post/" + object.slug}>Read more</Link>
          </div>
        </div>
      )
    });

    var featured = self.state.featured;
    if (featured.meta){
      var featured_subheader = featured.meta.subheader || "";
    }

    var pinned_post = self.state.pinned.map(function(object){
      var post_style ={
        backgroundImage: "url("+object.featured_image.attachment_meta.sizes.medium_large.url+")"
      }
      if (object.meta){
        var subheader = object.meta.subheader || "";
      }
      return (
        <div className="post pinned">
          <div className="post_image" style={post_style}></div>
          <div className="post_content">
            <h4 className="post_headline" dangerouslySetInnerHTML={{__html: object.title}}></h4>
            { subheader ? <p className="post_subheader">{subheader}</p> : null }
            <Link className="post_link" to={"/post/" + object.slug}>Read more</Link>
          </div>
        </div>
      )
    });

    return (
      <div>
        <div className="egg_wrap post_container">
          <div className='main_wrapper'>
            <h1 className="post_title marker">Latest Posts</h1>
            <div className='post_list'>
              {featured ?
                <FeaturedPost
                  title={featured.title}
                  featured_image={featured.featured_image}
                  slug={featured.slug}
                  subheader={featured_subheader} />
              : null}
              {pinned_post}
              {posts}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
});
