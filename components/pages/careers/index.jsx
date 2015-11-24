var React = require('react'),
    request = require('superagent'),
    moment = require('moment'),
    util = require('util');
var Velocity = require('velocity-animate/velocity');
var Router = require('react-router');

var Navigation = Router.Navigation;
var Link = Router.Link;


var Job = React.createClass({
  render: function(){
    var self = this;
    var title = self.props.title;
    var description = self.props.description;
    var contact = self.props.contact;
    var deadline = self.props.deadline;
    var formatted_deadline = moment(deadline).format('MMMM Do, YYYY');
    var descriptionUrl = self.props.descriptionUrl;

    return (
      <div className="job">
        <h2 className="job_headline" dangerouslySetInnerHTML={{__html: title}}></h2>
        { description ? <div className="job_description " dangerouslySetInnerHTML={{__html: description}}></div> : null }
        { descriptionUrl ? <a className="job_description_url" href={descriptionUrl} target="_blank"><p>Learn More About the Postition</p></a> : null }
        { contact ? <p className="job_contact"><span className="job_label">Please contact: </span><a href={contact}>{contact}</a></p> : null }
        { formatted_deadline ? <p className="job_formatted_deadline"><span className="job_label">Application Deadline: </span>{formatted_deadline}</p> : null }
      </div>
    )
  }
});

module.exports = React.createClass({
  mixins: [ Router.State, Navigation ],
  getInitialState: function() {
    return {
      jobs: [],
    };
  },

  componentDidMount: function () {
    var self = this;
    self.loadJobs();
  },

  componentWillReceiveProps: function () { },

  loadJobs: function(){
    var self = this;
    request
      .get('http://fontenelle.flywheelsites.com/wp-json/posts')
      .query('type[]=job_openings&filter[orderby]=modified&filter[order]=DESC&filter[posts_per_page]=-1')
      .set('Cache-Control', 'no-cache,no-store,must-revalidate,max-age=-1,private')
      .end(function(err, res) {
        if (res.ok) {
          var jobs = res.body;
          console.log("loadjobs count: " + jobs.length);
          self.setState({ jobs: jobs });

        } else {
          console.log('Oh no! error ' + res.text);
        }
          }.bind(self));
  },

  render: function() {
    var self = this;

    var jobs = self.state.jobs.map(function(object){
      return (
        <Job
          title={object.title}
          description={object.content}
          descriptionUrl={object.meta.job_description.url}
          contact={object.meta.contact}
          deadline={object.meta.deadline}
          />
      )
    });

    return (
      <div>
        <div className="egg_wrap post_container">
          <div className='main_wrapper'>
            <h1 className="post_title marker">Job Opportunities</h1>
            <p>Interested in joining our team? Fontenelle Forest is one of Nebraska’s oldest conservation organizations and seeks to provide a place where people can experience the quiet wild of nature. Every member of our staff plays a vital role in the success of our organization. </p>
            { jobs.length ?
              <div className='post_list'>
                {jobs}
              </div>
              : <p>Thank you for your interest in employment opportunities at Fontenelle Forest. We do not currently have any open positions available.</p>
            }
          </div>
        </div>
      </div>
    )
  }
});
