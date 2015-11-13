var React = require('react');

function initGoogleAnalytics(id) {
  if (window.ga) {
    return;
  }

  if (!id) {
    throw new Error('Google analytics ID is undefined');
  }

  window.ga = window.ga || function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date; // eslint-disable-line

  (function loadScript() {
    var gads = document.createElement('script');
    gads.async = true;
    gads.type = 'text/javascript';
    gads.src = '//www.google-analytics.com/analytics.js';

    var head = document.getElementsByTagName('head')[0];
    head.appendChild(gads);
  })();

  window.ga('create', id, 'auto');
}

var GoogleAnalytics = module.exports = React.createClass({
  propTypes: {
    id: React.PropTypes.string.isRequired,
  },

  contextTypes: {
    history: React.PropTypes.func.isRequired,
  },

  componentDidMount() {
    initGoogleAnalytics(this.props.id);

    // this.historyListener = this.context.history.listen((err, renderProps) => {
    //   if (err || !renderProps) {
    //     return;
    //   }
    //
    //   this.pageview(renderProps.location);
    // });

    this.historyListener = this.context.history.listen(function (err, renderProps) {
      if (err || !renderProps) {
        return;
      }

      this.pageview(renderProps.location);
    });

  },

  shouldComponentUpdate() {
    return false;
  },

  componentWillUnmount() {
    if (!this.historyListener) {
      return;
    }

    this.historyListener();
    this.historyListener = null;
  },

  pageview(location) {
    var path = location.pathname + location.search;
    if (this.latestUrl === path) {
      return;
    }

    this.latestUrl = path;

    // wait for correct title
    setTimeout(function wait() {
      GoogleAnalytics.sendPageview(path, document.title);
    }, 0);
  },

  command(args) {
    if (!window.ga) {
      throw new Error('Google analytics is not initialized');
    }

    return window.ga.apply(window.ga, args);
  },

  send(what, options) {
    return GoogleAnalytics.command('send', what, options);
  },

  sendPageview(page, title) {
    return GoogleAnalytics.send('pageview', { page, title });
  },

  render() {
    return null;
  },
});
