import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import './range.css';
import PropTypes from 'prop-types';
import Polygon from '../../../../../assets/onpoint/section3/Polygon.png';
import classNames from '../../../../../lib/classNames';
// import useDebounce from "./useDebounce";
import useThrottle from '../../../Global/useThrottle';

const Range = (props) => {
  const { updateTab } = props;
  const dragItemRef = useRef(null);
  const dragContainerRef = useRef(null);
  const dragContainerLineRef = useRef(null);
  const borderRef = useRef(null);
  const [tabIndex, setTabIndex] = useState(0);

  const [currentCoords, setCurrentCoords] = useState({
    currentX: 0,
    currentY: 0,
  });
  const [initialCoords, setInitialCoords] = useState({
    initialX: 0,
    initialY: 0,
  });
  const [offsets, setOffsets] = useState({
    xOffset: 0,
    yOffset: 0,
  });
  const [active, setActive] = useState(false);

  // const coordsForTabIndex = useDebounce(currentCoords, 100);
  const coordsForTabIndex = useThrottle(currentCoords, 100);

  useEffect(() => {
    if (coordsForTabIndex) {
      // eslint-disable-next-line max-len
      if (dragContainerLineRef.current.getBBox().width <= dragContainerRef.current.getBBox().width / 3) {
        setTabIndex(0.0001);
        // eslint-disable-next-line max-len
      } else if (dragContainerLineRef.current.getBBox().width <= dragContainerRef.current.getBBox().width / 3 * 2) {
        setTabIndex(1);
      } else {
        setTabIndex(2);
      }
    }
  }, [coordsForTabIndex]);

  useEffect(() => {
    updateTab(tabIndex);
  }, [tabIndex]);

  const dragStart = useCallback((e) => {
    if (e.target === dragItemRef.current) {
      setActive(true);

      if (e.type === 'touchstart') {
        setInitialCoords({
          initialX: e.touches[0].clientX - offsets.xOffset,
          initialY: e.touches[0].clientY - offsets.yOffset,
        });
      } else {
        setInitialCoords({
          initialX: e.clientX - offsets.xOffset,
          initialY: e.clientY - offsets.yOffset,
        });
      }
    }
  }, [offsets]);

  const dragEnd = useCallback(() => {
    setInitialCoords({
      initialX: currentCoords.currentX,
      initialY: currentCoords.currentY,
    });
    setActive(false);

    let nextCoords;
    const dragItemData = dragItemRef.current.getBoundingClientRect();
    const borderData = borderRef.current.getBoundingClientRect();
    // eslint-disable-next-line max-len
    if (dragContainerLineRef.current.getBBox().width <= dragContainerRef.current.getBBox().width / 3) {
      nextCoords = {
        x: -dragItemRef.current.getBoundingClientRect().width / 2,
        y: 0,
      };
      dragItemRef.current.style.transform = `translateX(${nextCoords.x}px)`;
      dragContainerLineRef.current.style.width = `${(nextCoords.x < 0 ? 0 : nextCoords.x)}px`;
      // eslint-disable-next-line max-len
    } else if (dragContainerLineRef.current.getBBox().width <= dragContainerRef.current.getBBox().width / 3 * 2) {
      nextCoords = {
        x: borderData.width / 2 - dragItemData.width / 2,
        y: 0,
      };
      dragItemRef.current.style.transform = `translateX(${dragContainerRef.current.getBBox().width / 2 - dragItemData.width / 2}px)`;
      dragContainerLineRef.current.style.width = `${dragContainerRef.current.getBBox().width / 2 - dragItemData.width / 2}px`;
    } else {
      nextCoords = {
        x: borderData.width,
        y: 0,
      };
      dragItemRef.current.style.transform = `translateX(${borderRef.current.getBBox().width - dragItemData.width / 2}px)`;
      dragContainerLineRef.current.style.width = `${borderRef.current.getBBox().width - dragItemData.width / 2}px`;
    }

    if (nextCoords) {
      setCurrentCoords({
        currentX: nextCoords.x,
        currentY: nextCoords.y,
      });
      setInitialCoords({
        initialX: nextCoords.x,
        initialY: nextCoords.y,
      });
      setOffsets({
        xOffset: nextCoords.x,
        yOffset: nextCoords.y,
      });
    }
  }, [currentCoords]);

  const dragItem = useCallback((e) => {
    if (active) {
      e.preventDefault();
      e.stopPropagation();
      let current;

      if (e.type === 'touchmove') {
        current = {
          currentX: e.touches[0].clientX - initialCoords.initialX,
          currentY: e.touches[0].clientY - initialCoords.initialY,
        };
      } else {
        current = {
          currentX: e.clientX - initialCoords.initialX,
          currentY: e.clientY - initialCoords.initialY,
        };
      }

      const dragItemData = dragItemRef.current.getBoundingClientRect();
      const borderData = borderRef.current.getBoundingClientRect();

      if (current.currentX < -dragItemData.width / 2) current.currentX = -dragItemData.width / 2;
      if (current.currentX > borderData.width - dragItemData.width / 2) {
        current.currentX = borderData.width - dragItemData.width / 2;
      }

      setCurrentCoords(current);
      setOffsets({
        xOffset: current.currentX,
        yOffset: current.currentY,
      });

      dragItemRef.current.style.transform = `translateX(${current.currentX}px)`;
      dragContainerLineRef.current.style.width = `${current.currentX + 5}px`;
    }
  }, [active, initialCoords]);

  useEffect(() => {
    setCurrentCoords({
      currentX: -dragItemRef.current.getBoundingClientRect().width / 2,
      currentY: 0,
    });
    setInitialCoords({
      initialX: -dragItemRef.current.getBoundingClientRect().width / 2,
      initialY: 0,
    });
    setOffsets({
      xOffset: -dragItemRef.current.getBoundingClientRect().width / 2,
      yOffset: 0,
    });
  }, []);

  useEffect(() => {
    dragContainerRef.current.addEventListener('touchstart', dragStart, { passive: false });
    document.addEventListener('touchend', dragEnd, { passive: false });
    document.addEventListener('touchmove', dragItem, { passive: false });

    dragContainerRef.current.addEventListener('mousedown', dragStart, { passive: false });
    document.addEventListener('mouseup', dragEnd, { passive: false });
    document.addEventListener('mousemove', dragItem, { passive: false });
    return () => {
      dragContainerRef.current.removeEventListener('touchstart', dragStart, { passive: false });
      document.removeEventListener('touchend', dragEnd, { passive: false });
      document.removeEventListener('touchmove', dragItem, { passive: false });

      dragContainerRef.current.removeEventListener('mousedown', dragStart, { passive: false });
      document.removeEventListener('mouseup', dragEnd, { passive: false });
      document.removeEventListener('mousemove', dragItem, { passive: false });
    };
  }, [dragStart, dragItem, dragEnd]);

  return (
    <svg
      className="Range"
      width="100%"
      height="100%"
      viewBox="0 0 1024 768"
      baseProfile="tiny"
      x="0px"
      y="0px"
    >
      <g ref={dragContainerRef}>
        <rect
          x="195"
          y="682"
          width="640"
          height="12"
          fill="rgba(209, 234, 255, 0.5)"
          ref={borderRef}
        />
        <rect
          x="195"
          y="682"
          width="0"
          height="12"
          fill="#d1eaff"
          ref={dragContainerLineRef}
          className={classNames(!active && 'Range__anim')}
        />
        <image
          href={Polygon}
          x="189"
          y="661"
          preserveAspectRatio="xMidYMid slice"
          ref={dragItemRef}
          className={classNames(!active && 'Range__anim')}
        />
        <text
          x="191"
          y="735"
          className="Range__text"
          fill="currentColor"
        >
          1988
        </text>
        <text
          x="485"
          y="735"
          className="Range__text"
          fill="currentColor"
        >
          2009
        </text>
        <text
          x="792"
          y="735"
          className="Range__text"
          fill="currentColor"
        >
          2016
        </text>
      </g>

    </svg>
  );
};

Range.propTypes = {
  updateTab: PropTypes.func.isRequired,
};
Range.defaultProps = {};
export default Range;
