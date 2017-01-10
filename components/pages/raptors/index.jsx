var React = require('react'),
    request = require('superagent'),
    util = require('util');
var Velocity = require('velocity-animate/velocity');
var InlineSVG = require('react-inlinesvg');
var Router = require('react-router');

var Navigation = Router.Navigation;
var Link = Router.Link;

var Footer = require('../../common/footer.jsx');

var videoTwo_style = {
  backgroundImage: 'url(/img/conservation/Meet-Raptors.jpg)'
}

var raptor_style = {
  backgroundImage: 'url(/img/raptors/header.jpg)'
}

module.exports = React.createClass({
  mixins: [ Router.State, Navigation ],

  componentDidMount: function () { },

  componentWillReceiveProps: function () { },

  render: function() {
    var self = this;

    return (
        <div>
          <div className="egg_wrap fb_container fb_top post_container">
            <div className="featured_image" style={raptor_style}></div>
          </div>
          <div id="raptor" className="egg_wrap">
            <div className="raptor_container raptorrefuge main_wrapper">
              <div className="quiet_wild copy_container">
                <div className="raptor">
                  <h2 className="marker">Raptor Recovery</h2>
                  <p>Birds of prey, such as eagles, falcons, hawks, owls, and vultures, have a vital role in our ecosystem. Fontenelle Forest’s Raptor Recovery is focused on the conservation of these birds through education, research, and the rehabilitation of injured and orphaned raptors.</p>
                  <img src="/img/conservation/divider_bottom_grey.png" />
                </div>
                <h2>Rescue</h2>
                <p>We see between 450–500 birds of prey in need of immediate assistance every year. These birds come to us from an area spanning every corner of Nebraska and parts of western Iowa. What’s highly important here is that at this stage we are not alone in our efforts. We depend on individuals—a dedicated network of volunteers across the entire state—to receive phone calls at all hours of the day and night, and then drive countless miles, first to the injured bird and then back to our trauma care unit. We also work with other organizations across the state to facilitate the program, and we rely on concerned citizens to report the injured raptors. If you have found a bird in need of assistance, please visit this page for more information on what to do next.</p>
                <h2>Rehabilitate</h2>
                <p>Birds are evaluated immediately upon arrival to our trauma care unit. Trained rehabilitators and veterinarians provide treatment, medication, and surgery if needed. Some patients may take a few days to mend; others might take months or even years.</p>
              </div>
              <div className="quiet_wild the_raptor">
                <img src="/img/raptors/raptor.png" />
              </div>
            </div>
          </div>

          <div className="tearjerker_video meetraptors" style={videoTwo_style}>
            <div className="meetraptors video_overlay"></div>
            <div className="tearjerker_wrapper">
              <div className="centered_content">
                <h2 className="marker">Meet the Raptors</h2>
                <p>See some of the amazing educational raptors of Fontenelle Forest.</p>
                <Link to="/meet-the-raptors" >
                  <svg className="arrow_circle blue_white shadow right_arrow" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" >
                    <path className="circle" strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M1,26c0,13.8,11.2,25,25,25c13.8,0,25-11.2,25-25S39.8,1,26,1C12.2,1,1,12.2,1,26z"/>
                    <g className="arrow" >
                      <path strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M29.4,25.9c0,0-1,1.6-1,4.4c0,2.6-0.6,3.5-0.6,3.8c0,0.4,0.3,0.7,0.7,0.5s8.6-6.2,10.5-8.1
                      c0,0,0.2-0.2,0.2-0.5v-0.1c0-0.2-0.1-0.4-0.2-0.5c-1.7-1.7-10.1-7.9-10.5-8.1c-0.3-0.2-0.7-0.1-0.7,0.5c0,0.3,0.6,1.1,0.6,3.8
                      C28.4,24.3,29.4,25.9,29.4,25.9z"/>
                      <line strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' x1="27.8" y1="25.9" x2="12.7" y2="25.9"/>
                    </g>
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          <div className="egg_wrap">
            <div className="raptor_container raptorrefuge main_wrapper">
              <div className="quiet_wild copy_container">
                <h2>Release</h2>
                <p>A bird is considered healthy again when it is in ideal feather condition, demonstrates keen flight abilities, and can recognize and catch food. It is then banded and released back to the wild near where it was found.</p>
                <h2>Educate</h2>
                <p>Even after treatment and months of rehabilitation, a raptor might be unable to fly or hunt due to a variety of factors and cannot be released. Non-releasable birds are channeled into breeding programs, recruited as “foster parents” for young orphans, utilized in research, or join our roster of educational birds for outreach and education programs. Fontenelle Forest Raptor Recovery reaches 20,000 people each year during our live raptor programs.</p>
              </div>
              <div className="littlebirds">
                <img src="/img/raptors/birds.png" />
              </div>
            </div>
          </div>

          <div id="raptor-woodland-refuge" className="refuge_header">
            <div className="main_wrapper centered_content">
              <h3 className="marker">Raptor Woodland Refuge</h3>
              <p className="textleft">Thirty feet above the forest ﬂoor is where we are. This canopy-level exhibit is designed according to the natural habitat of the rescued birds housed within these mews. These are not ordinary enclosures; these are homes. These owls, hawks, falcons and other species are birds of prey that can no longer survive in the wild. But they can provide us with their experiences, so we can know more about this important part of nature. Each visit is its own unique adventure, its own story, its own memory to share.</p>
              <p className="textleft"><br/>Raptor Woodland Refuge is located at the Fontenelle Forest Nature Center. Raptor Woodland Refuge is open 8 a.m. until 5 p.m. daily at the Fontenelle Forest Nature Center.</p>
            </div>
          </div>

          <div className="egg_wrap">
            <div className="raptormap_container main_wrapper">
              <div className="quiet_wild raptormaplist copy_container">
                <ul>
                  <li><b>1</b> Red-tailed Hawk</li>
                  <li><b>2</b> Ferruginous Hawk</li>
                  <li><b>3</b> Great Horned Owl</li>
                  <li><b>4</b> Barn Owl</li>
                  <li><b>5</b> Swainson's Hawk</li>
                  <li><b>6</b> Peregrine Falcon</li>
                  <li><b>7</b> Turkey Vulture</li>
                  <li><b>8</b> Osprey/Northern Harrier</li>
                  <li><b>9</b> Rough-legged Hawk</li>
                  <li><b>10</b> American Kestrel</li>
                  <li><b>11</b> Eastern Screech-Owl</li>
                  <li><b>12</b> Barred Owl</li>
                </ul>
              </div>
              <div className="raptormap">
                <img src="/img/raptors/raptor_refuge_map.png" />
              </div>
            </div>
          </div>

          <div className="egg_wrap">
            <div className="raptor_container raptorrefuge main_wrapper">
              <div className="quiet_wild copy_container">
                <h2 className="rehabilitationtitle">The Raptor Rehabilitation Cycle</h2>
                <div className="groupa">
                  <div className="raptorfact">
                  <img src="/img/raptors/bird_found.jpg" />
                  <h2>1. A Bird Is Found</h2>
                  <p>Birds of prey can face many issues in the wild; some, like lead poisoning and shooting, are caused by man. When a sick, injured or orphaned raptor is found—on a roadside, deep in the woods, in a backyard, or anywhere else—our process begins when someone picks up the phone and reports it to us.</p>
                  </div>
                  <div className="raptorfact">
                  <img src="/img/raptors/mobilize.jpg" />
                  <h2>2. Our Volunteers Mobilize</h2>
                  <p>We then notify our volunteers closest to the raptor in need. They carefully pick up the bird, perform triage and begin the transport process to the rehab facility. This can take several days and involve numerous transporters as the birds travel across the state. Our network of volunteers also includes veterinarians who are sometimes needed to stabilize birds that need immediate medical attention.</p>
                  </div>
                  <div className="raptorfact">
                  <img src="/img/raptors/treat_bird.jpg" />
                  <h2>3. Our Staff Treats the Bird</h2>
                  <p>Once the bird is safe at the rehab facility, trained raptor handlers and veterinarians do everything they can to treat it. X-rays, medication and surgery are often required. No matter what, we hope for the best. Each year we admit over 450 birds of prey in need of assistance.</p>
                  </div>
                </div>
                <div className="groupb">
                  <div className="raptorfact">
                  <h2>45% Are Released Back Into the Wild</h2>
                  <p>A bird is considered healthy again when it is in ideal feather condition, demonstrates keen flight abilities, and can recognize and catch food. When the bird is ready for release, we band it with an aluminum band on its foot so that its progress can be tracked if ever found again. Our dedicated network of over 70 transport volunteers helps to get the bird back to where it was found for release.</p>
                  </div>
                  <div className="raptorfact">
                  <h2>5% Remain In Captivity as Education Birds</h2>
                  <p>Some birds brought to the rehab center only partially recover. Although they cannot be released, usually due to ongoing health problems that would make survival impossible, they are used to help educate the public. Every year, Fontenelle Forest’s raptor handlers conduct raptor education programs reaching more than 20,000 people.</p>
                  </div>
                  <div className="raptorfact">
                  <h2>50% Succumb to Their Injuries</h2>
                  <p>Even with all conventional treatments administered and great amounts of attention and care provided, some birds brought to the rehab center unfortunately do not survive.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="egg_wrap">
            <div className="raptor_container raptorrefuge main_wrapper">
              <div className="quiet_wild copy_container">
                <h2 className="recoveriestitle">Raptor Recoveries</h2>
                <div className="recoveries">
                  <img src="/img/raptors/rough-legged.jpg" />
                  <div>
                    <h2>Ladyhawk</h2>
                    <p><b>Rough-legged Hawk</b></p>
                    <p>Lady Hawk has had quite a journey. It began around 1993, when she is believed to have hatched. One day she was found on a lonesome roadside in rural Nebraska, suffering from multiple wing fractures that had already begun to set. This was extra challenging to treat, and ultimately all attempts to correct and reset the fractures were unsuccessful. Today, Lady Hawk’s wing is healed in a closed position and can only be moved at the shoulder. She lives at Raptor Woodland Refuge and is more or less the matriarch of the bunch.</p>
                  </div>
                </div>
                <div className="recoveries">
                  <img src="/img/raptors/peregrine.jpg" />
                  <div>
                    <h2>Charlotte</h2>
                    <p><b>Peregrine Falcon</b></p>
                    <p>This bird hails from Omaha, where she lived on the Woodmen Tower with others known as the Woodmen Peregrines until she was found one day in 2015 down on the city streets. Charlotte appears to have a neurological dysfunction and her vision is impaired; we know this because she has difficulty navigating and finding food within her enclosure. We have attempted to release her back to her Peregrine family but have been unsuccessful. Charlotte makes her home at Raptor Woodland Refuge, where she interacts warmly with staff and visitors.</p>
                  </div>
                </div>
                <div className="recoveries">
                  <img src="/img/raptors/eastern-screech.jpg" />
                  <div>
                    <h2>Chinook</h2>
                    <p><b>Eastern Screech-Owl</b></p>
                    <p>This little guy was found in an Omaha neighborhood in 2005 as a youngster. His nest tree had blown down in a storm, his parents were gone, and his two siblings had already perished. He was raised at our facility by a foster parent Screech-Owl, but as he grew older it quickly became apparent that he lacked “owl self-awareness” and showed no fear of larger owls or people. He is totally unguarded, and would not survive if released in the wild—but he makes an excellent education bird.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <Footer />
        </div>
    )
  }
});
