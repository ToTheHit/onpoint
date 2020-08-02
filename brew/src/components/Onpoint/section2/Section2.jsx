import React from 'react';
import './section2.css';
import Background2 from '../../../assets/onpoint/section2/background1.jpg';
import Ice1 from '../../../assets/onpoint/section2/ice1.png';
import Ice2 from '../../../assets/onpoint/section2/ice2.png';
import Ice3 from '../../../assets/onpoint/section2/ice3.png';
import Ice4 from '../../../assets/onpoint/section2/ice4.png';

const Section2 = () => (
  <section className="Section2">
    <svg
      className="Section2__content parallax"
      width="100%"
      height="100%"
      viewBox="0 0 1024 768"
      baseProfile="tiny"
      x="0px"
      y="0px"
    >
      <foreignObject className="Section2__ice Section2__ice-1">
        <img src={Ice1} alt="Ice" />
      </foreignObject>
      <foreignObject className="Section2__ice Section2__ice-2">
        <img src={Ice2} alt="Ice" />
      </foreignObject>
      <foreignObject className="Section2__ice Section2__ice-3">
        <img src={Ice3} alt="Ice" />
      </foreignObject>
      <foreignObject className="Section2__ice Section2__ice-4">
        <img src={Ice4} alt="Ice" />
      </foreignObject>
      <foreignObject className="Section2__iceText">
        <div>
          Основа терапии — патогенез СД2
        </div>
      </foreignObject>

    </svg>

    <svg
      className="Section2__background"
      width="100%"
      height="100%"
      viewBox="0 0 1024 768"
      baseProfile="tiny"
      x="0px"
      y="0px"
    >
      <image
        href={Background2}
        x="0"
        y="0"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
      />
    </svg>
  </section>
);

Section2.propTypes = {};
Section2.defaultProps = {};
export default Section2;
