var React = require('react'),
    request = require('superagent'),
    util = require('util');
var Velocity = require('velocity-animate/velocity');
var InlineSVG = require('react-inlinesvg');
var Router = require('react-router');

var Navigation = Router.Navigation;
var Link = Router.Link;

module.exports =  React.createClass({
  mixins: [ Router.State, Navigation ],

  componentDidMount: function () { },

  componentWillReceiveProps: function () { },

  render: function() {
    var self = this;

    return (
      <div>
        <div className="egg_wrap fb_container">
          <div className="featured_image">
            <h1>WHAT TO DO IF YOU FIND <br />AN INJURED RAPTOR</h1>
            <h4 className="marker" >eagle, hawk, falcon, owl, vulture</h4>
            <div className="image_overlay" ></div>
          </div>
        </div>
        <div className="egg_wrap fb_container">
          <div className="fb_wrapper main_wrapper">
            <div className="centered_content fb_intro">
              <h2 className="marker">CONTACT</h2>
              <p>If you find an injured or downed raptor, please call the FFRR Center or one of the numbers listed below. Leave a voicemail if there is no answer, and your call will be returned. You may also contact the nearest Nebraska Games & Parks Conservation Officer, your local Humane Society, or local law enforcement. <Link to="/urban-wildlife">Found an animal other than a raptor?</Link></p>
              <img className="fb_break" src="/img/conservation/divider_bottom_grey.png" />
            </div>
          </div>
        </div>
        <div className="egg_wrap fb_container">
          <div className="fb_wrapper main_wrapper">
            <div className="centered_content fb_contact">
              <div className="fb_numbers">
                <ul>
                  <li>
                    <h3>FFRR Center</h3>
                    <p>Betsy: 402-994-2009</p>
                  </li>
                  <li>
                    <h3>A - Omaha Area</h3>
                    <p>Denise: 402-994-2009</p>
                    <p>Warren: 402-990-9779</p>
                  </li>
                  <li>
                    <h3>B - North East Nebraska</h3>
                    <p>Natalie: 402-863-2261</p>
                  </li>
                  <li>
                    <h3>C - South East Nebraska</h3>
                    <p>Janet: 402-525-8682</p>
                    <p>Elaine: 402-488-7586</p>
                    <p>Carri: 402-483-4303</p>
                  </li>
                  <li>
                    <h3>D - Central/Western Nebraska</h3>
                    <p>Vickie: 308-750-3816</p>
                    <p>Blake: 308-383-1875</p>
                  </li>
                </ul>
              </div>
              <div className="fb_map">
                <img src="/img/found-raptor/foundbird_map.svg" />
              </div>
            </div>
          </div>
        </div>
        <div className="egg_wrap fb_container">
          <div className="fb_wrapper main_wrapper">
            <div className="centered_content fb_guidelines">
              <h2 className="marker">IMPORTANT GUIDELINES</h2>
              <div className="fb_columns">
                <ul>
                  <li className="fb_listhead c_start">FIRST RULE OF RAPTOR HANDLING</li>
                  <li>Keep yourself safe! If you don't feel comfortable or are not able to capture the bird, please try to cover it with a laundry basket or ventilated cardboard box until a representative from FFRR can arrive.</li>
                  <li>The raptor you are attempting to rescue will NOT understand that you are trying to help it. When you approach, it will likely try to protect itself and may attack you.</li>
                  <li>Approach the bird from behind, if possible.</li>
                  <li>Cover the bird completely with a large towel, blanket, jacket, or any light-weight item.</li>
                  <li>Cautiously and slowly approach the bird and gently restrain it with the covering - locate the legs and grasp them gently with a finger in between the legs (birds seldom respond to something slowly coming at their feet).</li>
                  <li>As the bird calms down, gather the covering together, being careful to keep the bird covered completely - be sure the wings are folded against its body, and be careful of its talons.</li>
                  <li className="fb_listhead">WHEN TO OBSERVE</li>
                  <li>Sometimes, members of the public happen upon a young raptor and pick up the bird believing it is orphaned, not realizing the parents are watching. Before removing a young bird from its home, observe and watch to determine if parents are returning with food. A young raptor’s best chance of survival is to be raised by its parents in the wild. If the youngster’s parents are still providing food, leave the bird alone. If the young raptor is in immediate danger from predators such as cats and dogs, try placing it on a higher branch off the ground.</li>
                </ul>
                <ul>
                  <li>Transfer the bird to a well-ventilated cardboard box (i.e. with small air holes) as soon as possible—the box should be big enough for the bird to stand up, but not turn around easily (if available, please put a piece of old carpet in the bottom of the box—helps keep the bird from sliding around and being further injured).</li>
                  <li>Contact Fontenelle Forest's Raptor Recovery or the Nebraska Game and Parks Commission (if not already accomplished).</li>
                  <li>Do not attempt to treat or feed the bird yourself! Many well-meaning attempts have resulted in further injury or the death of a bird</li>
                  <li>All wild birds are protected under Nebraska and federal laws. It is illegal for you to possess or keep a wild bird unless you aretemporarily transporting an injured bird to a permitted rehabilitator.</li>
                  <li className="fb_listhead">WHEN TO TAKE ACTION/CALL</li>
                  <li>The bird is obviously injured, a wing is drooping, you see blood, or the bird is lying on the ground, is trapped, or caught in something, e.g. barbed wire or other fence/netting</li>
                  <li>The bird is in obvious danger from a predator or in danger of being captured by one.</li>
                  <li>There are hazards nearby like busy roads or large pools of water.</li>
                  <li>The parents have been killed or seriously injured.</li>
                  <li>The bird has its eyes closed and does not respond to your presence.</li>
                  <li className="fb_listhead">NON-RAPTOR BIRD RESCUE</li>
                  <li>Please bear in mind that Fontenelle Forest Raptor Recovery only cares for birds of prey. If you find non-raptor birds that are injured, please call Nebraska Wildlife Rehabilitation at 402-234-2473 or visit their website: nebraskawildliferehab.org.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});
