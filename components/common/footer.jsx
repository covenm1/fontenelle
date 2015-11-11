var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <footer>
        <div className="footer_top copy_container">
          <nav>
              <a className="social_fb" target="_blank" href="https://www.facebook.com/fontenelleforest/" >Facebook</a>
              <a className="social_tw" target="_blank" href="https://twitter.com/fontenelle4est/" >Twitter</a>
              <a className="social_ig" target="_blank" href="https://www.instagram.com/fontenelleforest/" >Instagram</a>
              <a className="social_yt" target="_blank" href="https://www.youtube.com/user/FontenelleForest" >YouTube</a>
          </nav>
          <div className="newsletter">
            Sign up for our newsletter <a target="_blank" href="http://visitor.r20.constantcontact.com/d.jsp?llr=imwa5ckab&p=oi&m=1110347635080&sit=ysqei7ahb&f=025c8173-5ba1-4aed-92a6-a9f9aebb2d65">SUBSCRIBE</a>
          </div>
        </div>
        <div className="contactinfo footer_bottom copy_container">
          <ul>
            <li>Fontenelle Forest</li>
            <li>1111 Bellevue Blvd. N. Bellevue, NE 68005</li>
            <li>Phone (402) 731-3140</li>
            <li>Fax (402) 731-2403</li>
            <li><a target="_blank" href="mailto:info@fontenelleforest.org">info@fontenelleforest.org</a></li>
          </ul>
        </div>
      </footer>
    )
  }
});
