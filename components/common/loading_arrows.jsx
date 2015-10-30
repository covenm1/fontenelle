var React = require('react');

var SetIntervalMixin = {
  componentWillMount: function() {
    this.intervals = [];
  },
  setInterval: function() {
    this.intervals.push(setInterval.apply(null, arguments));
  },
  componentWillUnmount: function() {
    this.intervals.forEach(clearInterval);
  }
};


module.exports = React.createClass({
  mixins: [SetIntervalMixin],

  getInitialState: function() {
    return {arrow: 0, speed: 100};
  },
  componentDidMount: function(){
    var self = this;
    if (self.props.speed){
      self.setInterval(self.tick, self.props.speed);
    } else {
      self.setInterval(self.tick, self.state.speed);
    }
  },

  tick: function() {
    var self = this;
    if (self.state.arrow == 4 ) {
      self.setState({arrow: 1});
    } else  {
      self.setState({arrow: self.state.arrow + 1});
    }
  },

  render: function() {
    var self = this;
    var svg_style = {
      enableBackground: "new 0 0 83.2 105.2"
    }
    var class_name = "loading_arrow arrow_" + self.state.arrow;
    return (
      <svg  x="0px" y="0px" viewBox="0 0 83.2 105.2" style={svg_style} className={class_name}>
        <g id="Layer_4">
        	<g>
        		<path fill="none" stroke="white" strokeWidth="3" strokeMiterlimit="10" d="M38.1,40.1c0-2.9,0-10.4,0-10.4"/>
        		<path fill="none" stroke="white" strokeWidth="3" strokeMiterlimit="10" d="M43.1,29.7c0,0,0,7.5,0,10.4"/>
        		<path fill="none" stroke="white" strokeWidth="3" strokeMiterlimit="10" d="M42,29.5h-2.9c-1.6,0-2.9-1.3-2.9-2.9V4.4c0-1.6,1.3-2.9,2.9-2.9H42c1.6,0,2.9,1.3,2.9,2.9v22.2
        			C44.9,28.2,43.6,29.5,42,29.5z"/>
            <path className="st1" d="M40.8,75.4c0,0-19-2.1-16.8-21.4c-11.9,0-18.8-2.6-20-2.6c-1.9,0-3.2,1.3-2.2,3.1S30,93.1,38.6,101.7
        			c0,0,0.9,0.9,2.2,0.9h0.3c1,0,1.7-0.4,2.2-0.9c7.5-7.5,35.6-45.6,36.8-47.2c0.9-1.3,0.6-3.2-2.2-3.1c-1.2,0-9.4,2.5-21.3,2.5
        			C59.9,72,40.8,75.4,40.8,75.4z"/>
            <path fill="none" stroke="white" strokeWidth="3" strokeMiterlimit="10" d="M40.8,58.4c0,0-7-4.4-19.8-4.4c-11.9,0-15.8-2.6-17-2.6c-1.9,0-3.2,1.3-2.2,3.1S30,93.1,38.6,101.7
        			c0,0,0.9,0.9,2.2,0.9h0.3c1,0,1.7-0.4,2.2-0.9c7.5-7.5,35.6-45.6,36.8-47.2c0.9-1.3,0.6-3.2-2.2-3.1c-1.2,0-5.1,2.6-17,2.6
        			C48.1,53.9,40.8,58.4,40.8,58.4z"/>
            <circle fill="none" stroke="white" strokeWidth="3" strokeMiterlimit="10" cx="40.5" cy="57.7" r="16.5"/>
        		<path className="st2" d="M56.5,54.1c-10,0.8-15.7,4.3-15.7,4.3s-5.9-3.7-16.7-4.3"/>
        	</g>
        </g>
        <g id="Layer_3">
        	<g>
        		<path className="st3" d="M6.4,52.8l35.1,44.4L77.4,52c0,0-10.7,2.4-14.4,2.5c-3.7,0.1-14.4,1.6-14.4,1.6l-1.5,8.6c0,0-3.4,14.4-4,14.4
        			c-0.6,0-4.5-0.3-4.7-3.4c-0.1-3.2-2.8-13.6-2.8-13.6l-0.1-6.6l-6.3-1.4L5.9,52.4"/>
            <path fill="none" stroke="white" strokeWidth="3" strokeMiterlimit="10" d="M44.5,64.8h-5.6c-1.6,0-2.9-1.3-2.9-2.9V4.5c0-1.6,1.3-2.9,2.9-2.9h5.6c1.6,0,2.9,1.3,2.9,2.9v57.4
        			C47.4,63.5,46.1,64.8,44.5,64.8z"/>
            <line fill="none" stroke="white" strokeWidth="3" strokeMiterlimit="10" x1="47.1" y1="14.6" x2="36.8" y2="14.6"/>
        		<line fill="none" stroke="white" strokeWidth="3" strokeMiterlimit="10" x1="47.1" y1="19.5" x2="36.8" y2="19.5"/>
        		<line fill="none" stroke="white" strokeWidth="3" strokeMiterlimit="10" x1="47.1" y1="24.3" x2="36.8" y2="24.3"/>
        		<path fill="none" stroke="white" strokeWidth="3" strokeMiterlimit="10" d="M35.1,56.2c-3.3-1-8-2-13.9-2c-12,0-16-2.6-17.1-2.6c-1.9,0-3.2,1.3-2.3,3.2s28.5,39.1,37.1,47.7
        			c0,0,0.9,0.9,2.3,0.9h0.3c1,0,1.8-0.4,2.3-0.9c7.6-7.6,36-46,37.1-47.7c0.9-1.3,0.6-3.3-2.3-3.2c-1.2,0-5.2,2.6-17.1,2.6
        			c-5.8,0-10.5,0.9-13.9,1.9"/>
            <path fill="none" stroke="white" strokeWidth="3" strokeMiterlimit="10" d="M7.8,83.4"/>
        		<path fill="none" stroke="white" strokeWidth="3" strokeMiterlimit="10" d="M36,62.2c0,0,3.1,14.3,3.4,15c0.3,0.7,0.9,3,2.1,3s1.8-2.1,2.1-2.9c0.3-0.8,3.7-14.3,3.7-14.3"/>
        		<polyline fill="none" stroke="white" strokeWidth="3" strokeMiterlimit="10" points="5.5,52.1 41.4,97.2 77.2,52 		"/>
        		<polygon className="st4" points="43.6,73.4 39.3,73.4 41.5,79.8 		"/>
        	</g>
        </g>
        <g id="Layer_2">
        	<g>
        		<path className="st5" d="M41.3,58.4c0,0-7-4.4-19.8-4.4c-11.9,0-15.8-2.6-17-2.6c-1.9,0-3.2,1.3-2.2,3.1s28.2,38.7,36.8,47.3
        			c0,0,0.9,0.9,2.2,0.9h0.3c1,0,1.7-0.4,2.2-0.9c7.5-7.5,35.6-45.6,36.8-47.2c0.9-1.3,0.6-3.2-2.2-3.1c-1.2,0-5.1,2.6-17,2.6
        			C48.6,53.9,41.3,58.4,41.3,58.4z"/>
            <path fill="none" stroke="white" strokeWidth="3" strokeMiterlimit="10" d="M43.7,29.7c0,0,0,7.5,0,10.4s4.4,0,6.3,0c1.6,0,2.6,0.8,2.6,2.6c0,0-4.4,25.5-5.1,27.4s-2.4,4.4-5.1,5.7
        			c0,0-0.6,0.3-1.4,0c-2.8-1-4.4-3.8-5.1-5.7s-5.1-27.4-5.1-27.4c0-1.8,1-2.6,2.6-2.6c1.8,0,5.9,2.9,5.9,0s0-10.4,0-10.4"/>
            <path fill="none" stroke="white" strokeWidth="3" strokeMiterlimit="10" d="M42.8,29.5h-2.9c-1.6,0-2.9-1.3-2.9-2.9V4.4c0-1.6,1.3-2.9,2.9-2.9h2.9c1.6,0,2.9,1.3,2.9,2.9v22.2
        			C45.7,28.2,44.4,29.5,42.8,29.5z"/>
            <line fill="none" stroke="white" strokeWidth="3" strokeMiterlimit="10" x1="45.1" y1="6.3" x2="41.5" y2="6.3"/>
        		<line fill="none" stroke="white" strokeWidth="3" strokeMiterlimit="10" x1="45.1" y1="14.3" x2="41.5" y2="14.3"/>
        		<line fill="none" stroke="white" strokeWidth="3" strokeMiterlimit="10" x1="45.1" y1="22.2" x2="41.5" y2="22.2"/>
        		<path fill="none" stroke="white" strokeWidth="3" strokeMiterlimit="10" d="M41.3,58.4c0,0-7-4.4-19.8-4.4c-11.9,0-15.8-2.6-17-2.6c-1.9,0-3.2,1.3-2.2,3.1s28.2,38.7,36.8,47.3
        			c0,0,0.9,0.9,2.2,0.9h0.3c1,0,1.7-0.4,2.2-0.9c7.5-7.5,35.6-45.6,36.8-47.2c0.9-1.3,0.6-3.2-2.2-3.1c-1.2,0-5.1,2.6-17,2.6
        			C48.6,53.9,41.3,58.4,41.3,58.4z"/>
        	</g>
        </g>
        <g id="Layer_1">
        	<g>
        		<line fill="none" stroke="white" strokeWidth="3" strokeMiterlimit="10" x1="36.9" y1="56.7" x2="36.9" y2="36.6"/>
        		<line fill="none" stroke="white" strokeWidth="3" strokeMiterlimit="10" x1="45.5" y1="35.4" x2="45.5" y2="56.7"/>
        		<path className="st6" d="M41.1,58.5c0,0-7-4.4-19.8-4.4c-11.9,0-15.8-2.6-17-2.6c-1.9,0-3.2,1.3-2.2,3.1s28.2,38.7,36.8,47.3
        			c0,0,0.9,0.9,2.2,0.9h0.3c1,0,1.7-0.4,2.2-0.9c7.5-7.5,35.6-45.6,36.7-47.2c0.9-1.3,0.6-3.2-2.2-3.1c-1.2,0-5.1,2.6-17,2.6
        			C48.4,54.1,41.1,58.5,41.1,58.5z"/>
            <path className="st7" d="M46,56.5c0,2.5,4.2,4.7,10.5,4.7c0,0,3.8,0.2,6.8-0.6"/>
        		<path className="st7" d="M36.4,56.5c0,2.5-4.2,4.7-10.5,4.7c0,0-3.8,0.2-6.8-0.6"/>
        		<path className="st7" d="M41.4,62.7c0,7.4,10.2,11.2,10.2,11.2"/>
        		<path className="st7" d="M31.2,73.9c0,0,10.2-3.8,10.2-11.2c0-1,0-2.7,0-4.8"/>
        		<line className="st7" x1="41.5" y1="67.5" x2="41.5" y2="83.7"/>
        		<path className="st7" d="M53.8,12.2c6.1,0.8,12.6,6.1,12.6,12.4C66.4,31.4,62.6,37,52,37c-2.5,0-4.9-0.7-6.8-2c-1.6-1-2.9-2.4-3.9-4"
        			/>
            <path className="st7" d="M29.2,12c0.9-6,6.1-10.5,12.3-10.5C48.4,1.5,54,7.1,54,14c0,1.5-0.3,2.9-0.7,4.2"/>
        		<path className="st7" d="M45,34.8c-2,1.4-5.8,2.6-9,2.6c-3.5,0-17.4-0.9-17.4-12.9c0-6.9,5.6-12.5,12.5-12.5"/>
        	</g>
        </g>
      </svg>

    )
  }
});
