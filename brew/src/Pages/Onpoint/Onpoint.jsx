import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './onpoint.css';

import Section1 from "../../components/Onpoint/section1/Section1";
import Section2 from "../../components/Onpoint/section2/Section2";
import Section3 from "../../components/Onpoint/section3/Section3";
import Pagination from "../../components/Onpoint/Global/pagination/Pagination";
import Background from '../../assets/onpoint/background.jpg';

const Empty = () => {
  const containerRef = useRef(null);
  const backgroundRef = useRef(null);
  const NF = 20;

  const [slideIndex, setSlideIndex] = useState(0);
  const [containerChildrenLength, setContainerChildrenLength] = useState(0);
  const [i, setI] = useState(0);
  const [x0, setX0] = useState(null);
  const [locked, setLocked] = useState(false);
  const [w, setW] = useState(null);
  const [ini, setIni] = useState(null);
  const [fin, setFin] = useState(null);
  const [rID, setRID] = useState(null);
  const [anf, setAnf] = useState(null);

  function unify(e) {
    return e.changedTouches ? e.changedTouches[0] : e
  };

  const stopAni = useCallback(() => {
    window.cancelAnimationFrame(rID);
    setRID(null);
    setSlideIndex(fin);
  }, [rID, fin]);

  const ani = useCallback((cf = 0) => {
    const nextI = ini + (fin - ini) * cf / anf;
    if (nextI >= 0 && nextI <= (containerChildrenLength - 1)) {
      containerRef.current.style.setProperty('--i', ini + (fin - ini) * cf / anf);
      backgroundRef.current.style.setProperty('--i', ini + (fin - ini) * cf / anf);
    }

    if ((cf === anf) || (!ini && !fin && !anf)) {
      stopAni();
      return
    }

    setRID(requestAnimationFrame(ani.bind(this, ++cf)));
  }, [ini, fin, anf]);

  useEffect(() => {
    if (ini && (fin >= 0) && anf) ani();
  }, [ini, fin, anf]);

  const lock = useCallback((e) => {
    setX0(unify(e).clientY);
    setLocked(true);
  }, []);

  const drag = useCallback((e) => {
    e.preventDefault();
    if (locked) {
      let dx = unify(e).clientY - x0, f = +(dx / w).toFixed(2);
      if ((i - f) >= 0 && (i - f) <= (containerChildrenLength - 1)) {
        containerRef.current.style.setProperty('--i', i - f)
        backgroundRef.current.style.setProperty('--i', i - f)
      }
    }
  }, [locked, x0, w, i]);

  const move = useCallback((e) => {
    if (locked) {
      let copyI = i;
      let dx = unify(e).clientY - x0,
        s = Math.sign(dx),
        f = +(s * dx / w).toFixed(2);
      setIni(copyI - s * f);

      if ((copyI > 0 || s < 0) && (copyI < containerChildrenLength - 1 || s > 0) && f > .1) {
        setI(prevState => prevState -= s);
        copyI -= s;
        f = 1 - f
      }

      setFin(copyI);
      setAnf(Math.round(f * NF));
      setX0(null);
      setLocked(false);
    }
  }, [locked, i, containerChildrenLength, w]);

  useEffect(() => {
    setContainerChildrenLength(containerRef.current.children.length);
    containerRef.current.style.setProperty('--n', containerRef.current.children.length);
    backgroundRef.current.style.setProperty('--n', containerRef.current.children.length);
    setW(window.innerWidth)
  }, []);

  const resize = useCallback(() => {
    setW(window.innerWidth);
  }, []);

  const MemoContent = useMemo(() => {
    return (<>
      <Section1 />
      <Section2 />
      <Section3 />
    </>)
  }, []);

  useEffect(() => {
    window.addEventListener('resize', resize, { passive: false });

    containerRef.current.addEventListener('mousedown', lock, { passive: false });
    containerRef.current.addEventListener('touchstart', lock, { passive: false });

    containerRef.current.addEventListener('mousemove', drag, { passive: false });
    containerRef.current.addEventListener('touchmove', drag, { passive: false });

    containerRef.current.addEventListener('mouseup', move, { passive: false });
    containerRef.current.addEventListener('touchend', move, { passive: false });

    return () => {
      window.removeEventListener('resize', resize, { passive: false });

      containerRef.current.removeEventListener('mousedown', lock, { passive: false });
      containerRef.current.removeEventListener('touchstart', lock, { passive: false });

      containerRef.current.removeEventListener('mousemove', drag, { passive: false });
      containerRef.current.removeEventListener('touchmove', drag, { passive: false });

      containerRef.current.removeEventListener('mouseup', move, { passive: false });
      containerRef.current.removeEventListener('touchend', move, { passive: false });
    }
  }, [lock, drag, move]);

  return (
    <div>
      <Pagination slideCount={containerChildrenLength} activeSlideIndex={slideIndex} />
      <img src={Background} alt='Background' className={'Background'} ref={backgroundRef} />
      <div
        className="Onpoint"
        ref={containerRef}
      >
        {MemoContent}
      </div>
    </div>

  );
};
Empty.propTypes = {};

export default Empty;
