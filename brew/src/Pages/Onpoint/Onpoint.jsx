import React, {
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import './onpoint.css';

import Section1 from '../../components/Onpoint/section1/Section1';
import Section2 from '../../components/Onpoint/section2/Section2';
import Section3 from '../../components/Onpoint/section3/Section3';
import Pagination from '../../components/Onpoint/Global/pagination/Pagination';
import Background from '../../assets/onpoint/background.jpg';
import useThrottle from '../../components/Onpoint/Global/useThrottle';

const Empty = () => {
  const containerRef = useRef(null);

  const [slideIndex, setSlideIndex] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [containerChildrenLength, setContainerChildrenLength] = useState(0);
  const throttledScrollPosition = useThrottle(scrollPosition, 100);

  useEffect(() => {
    setSlideIndex(Math.round(throttledScrollPosition / window.innerHeight));
  }, [throttledScrollPosition]);

  useEffect(() => {
    setContainerChildrenLength(containerRef.current.children.length);
    containerRef.current.addEventListener('scroll', onScroll, { passive: false });
    return () => {
      containerRef.current.removeEventListener('scroll', onScroll, { passive: false });
    };
  }, []);

  const MemoContent = useMemo(() => (
    <Section1
      slideIndex={slideIndex}
    />
  ), [slideIndex]);

  const MemoContent1 = useMemo(() => (
    <>
      <Section2 />
      <Section3 />
    </>
  ), []);

  const onScroll = useCallback(() => {
    setScrollPosition(containerRef.current.scrollTop);
  }, []);

  return (
    <>
      <Pagination slideCount={containerChildrenLength} activeSlideIndex={slideIndex} />
      <div
        className="Onpoint wrapper"
        style={{ backgroundImage: `url(${Background})` }}
        ref={containerRef}
      >
        {MemoContent}
        {MemoContent1}
      </div>
    </>
  );
};
Empty.propTypes = {};

export default Empty;
