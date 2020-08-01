import React from 'react';
import PropTypes from 'prop-types';
import './section1.css';
import Background from "../../../assets/onpoint/section1/background1.jpg";
import BottomShadow from "../../../assets/onpoint/section1/bottomShadow.png";
import Arrow from "../../../assets/onpoint/section1/arrow.svg";

const Section1 = (props) => {
  return (
    <section className={'Section1'}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1024 768"
        baseProfile='tiny'
        x='0px'
        y='0px'
      >
        <image href={Background}
               x="0" y="0" width="100%" height="100%"
               preserveAspectRatio="xMidYMid slice"
        />
        <g>
          <circle
            cx="288"
            cy="440"
            r="4"
            fill="currentColor"
            className={'Section1__circle'}
          />
          <circle
            cx="288"
            cy="440"
            r="4"
            fill="currentColor"
            className={'Section1__circle Section1__circle-2'}
          />
          <circle
            cx="288"
            cy="440"
            r="4"
            fill="currentColor"
            className={'Section1__circle Section1__circle-3'}
          />
          <circle
            cx="288"
            cy="440"
            r="4"
            fill="currentColor"
            className={'Section1__circle Section1__circle-4'}
          />
        </g>
        <g>
          <circle
            cx="485"
            cy="545"
            r="3"
            fill="currentColor"
            className={'Section1__circle'}
          />
          <circle
            cx="485"
            cy="545"
            r="3"
            fill="currentColor"
            className={'Section1__circle Section1__circle-2'}
          />
          <circle
            cx="485"
            cy="545"
            r="3"
            fill="currentColor"
            className={'Section1__circle Section1__circle-3'}
          />
          <circle
            cx="485"
            cy="545"
            r="3"
            fill="currentColor"
            className={'Section1__circle Section1__circle-4'}
          />
        </g>
        <g>
          <circle
            cx="588"
            cy="287"
            r="6"
            fill="currentColor"
            className={'Section1__circle'}
          />
          <circle
            cx="588"
            cy="287"
            r="6"
            fill="currentColor"
            className={'Section1__circle Section1__circle-2'}
          />
          <circle
            cx="588"
            cy="287"
            r="6"
            fill="currentColor"
            className={'Section1__circle Section1__circle-3'}
          />
          <circle
            cx="588"
            cy="287"
            r="6"
            fill="currentColor"
            className={'Section1__circle Section1__circle-4'}
          />
        </g>
        <g>
          <circle
            cx='830'
            cy='525'
            r='2'
            fill="currentColor"
            className={'Section1__circle'}
          />
          <circle
            cx='830'
            cy='525'
            r='3'
            fill="currentColor"
            className={'Section1__circle Section1__circle-2'}
          />
          <circle
            cx='830'
            cy='525'
            r='3'
            fill="currentColor"
            className={'Section1__circle Section1__circle-3'}
          />
          <circle
            cx='830'
            cy='525'
            r='3'
            fill="currentColor"
            className={'Section1__circle Section1__circle-4'}
          />
        </g>
        <g>
          <foreignObject className="Section1__title">
            <div>Всегда ли цели терапии СД2 на поверхности?</div>
          </foreignObject>
          <foreignObject className="Section1__pointName Section1__pointName-1">
            Гипогликемия
          </foreignObject>
          <foreignObject className="Section1__pointName Section1__pointName-2">
            Осложнения СД
          </foreignObject>
          <foreignObject className="Section1__pointName Section1__pointName-3">
            Цель по HbA1c
          </foreignObject>
          <foreignObject className="Section1__pointName Section1__pointName-4">
            СС риски
          </foreignObject>
        </g>

      </svg>
      <img src={BottomShadow} className={'Section1__bottomShadow'} alt={'Bottom shadow'}/>
      <div className="Section1__bottomText">Листайте вниз</div>
      <Arrow className="Section1__bottomArrow" />
    </section>
  )
};

Section1.propTypes = {};
Section1.defaultProps = {};
export default Section1;