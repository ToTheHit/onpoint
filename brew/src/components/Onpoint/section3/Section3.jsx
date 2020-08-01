import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './section3.css';
import Background3 from "../../../assets/onpoint/section3/background.jpg";
import Tab1Ice1 from '../../../assets/onpoint/section3/tab1/ice1.png';
import Tab1Ice2 from '../../../assets/onpoint/section3/tab1/ice2.png';
import Tab1Ice3 from '../../../assets/onpoint/section3/tab1/ice3.png';
import Tab1Content from '../../../assets/onpoint/section3/tab_1.png';
import Tab2Ice1 from '../../../assets/onpoint/section3/tab2/ice1.png';
import Tab2Ice2 from '../../../assets/onpoint/section3/tab2/ice2.png';
import Tab2Ice3 from '../../../assets/onpoint/section3/tab2/ice3.png';
import Tab2Content from '../../../assets/onpoint/section3/tab_2.png';
import Tab3Ice1 from '../../../assets/onpoint/section3/tab3/ice1.png';
import Tab3Ice2 from '../../../assets/onpoint/section3/tab3/ice2.png';
import Tab3Ice3 from '../../../assets/onpoint/section3/tab3/ice3.png';
import Tab3Content from '../../../assets/onpoint/section3/tab_3.png';
import Range from "./Components/range/Range";

const Section3 = (props) => {
  const containerRef = useRef(null);
  const NF = 30;

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
    setIni(fin);
  }, [rID, fin]);

  const ani = useCallback((cf = 0) => {
    // console.info(ini, fin);
    containerRef.current.style.setProperty('--i1', ini + (fin - ini) * cf / anf);

    if ((cf === anf) || (!ini && !fin && !anf)) {
      stopAni();
      return
    }

    setRID(requestAnimationFrame(ani.bind(this, ++cf)));
  }, [ini, fin, anf]);

  useEffect(() => {
    if (ini && anf) ani();
  }, [ini, fin, anf]);

  const lock = useCallback((e) => {
    console.info('lock', e.target);
    setX0(unify(e).clientX);
    setLocked(true);
  }, []);

  const drag = useCallback((e) => {

    e.preventDefault();

    if (locked) {
      console.info('drag');

      let dx = unify(e).clientX - x0, f = +(dx / w).toFixed(2);

      containerRef.current.style.setProperty('--i1', i - f)
    }
  }, [locked, x0, w, i]);

  const move = useCallback((e) => {
    if (locked) {
      console.info('move');
      let copyI = i;
      let dx = unify(e).clientX - x0,
        s = Math.sign(dx),
        f = +(s * dx / w).toFixed(2);

      setIni(copyI - s * f);

      if ((copyI > 0 || s < 0) && (copyI < containerChildrenLength - 1 || s > 0) && f > .2) {
        console.info('condition')
        setI(prevState => prevState -= s);
        copyI -= s;
        f = 1 - f
      }
      setFin(copyI);
      setAnf(Math.round(f * NF));
      // ani();
      setX0(null);
      setLocked(false);
    }
  }, [locked, i, containerChildrenLength, w]);

  useEffect(() => {
    setContainerChildrenLength(containerRef.current.children.length);
    containerRef.current.style.setProperty('--n1', containerRef.current.children.length)
    setW(window.innerWidth)
  }, []);

  useEffect(() => {
 /*   containerRef.current.addEventListener('mousedown', lock, false);
    containerRef.current.addEventListener('touchstart', lock, false);

    containerRef.current.addEventListener('mousemove', drag, false);
    containerRef.current.addEventListener('touchmove', drag, false);

    containerRef.current.addEventListener('mouseup', move, false);
    containerRef.current.addEventListener('touchend', move, false);*/

    return () => {
/*      containerRef.current.removeEventListener('mousedown', lock, false);
      containerRef.current.removeEventListener('touchstart', lock, false);

      containerRef.current.removeEventListener('mousemove', drag, false);
      containerRef.current.removeEventListener('touchmove', drag, false);

      containerRef.current.removeEventListener('mouseup', move, false);
      containerRef.current.removeEventListener('touchend', move, false);*/
    }
  }, [lock, drag, move]);

  useEffect(() => {
    setIni(0.0001);
  }, []);

  const updateTab = useCallback((fin) => {
    // setIni(0);
    setFin(fin);
    setAnf(15);
  }, []);

  const content = useMemo(() => {
    return <>
      <svg
        className="Section3__background"
        width="100%"
        height="100%"
        viewBox="0 0 1024 768"
        baseProfile='tiny'
        x='0px'
        y='0px'
      >
        <image href={Background3}
               x="0" y="0" width="100%" height="100%"
               preserveAspectRatio="xMidYMid slice"
        />
      </svg>
      <div
        className="Section3__wrapper"
        ref={containerRef}
      >
        <div className="Section3__item">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 1024 768"
            baseProfile='tiny'
            x='0px'
            y='0px'
          >
            <foreignObject className={'Section3__tab1 Section3__tab1__ice-1'}>
              <img src={Tab1Ice1} alt={'Ice'} />
            </foreignObject>
            <foreignObject className={'Section3__tab1 Section3__tab1__ice-2'}>
              <img src={Tab1Ice2} alt={'Ice'} />
            </foreignObject>
            <foreignObject className={'Section3__tab1 Section3__tab1__ice-3'}>
              <img src={Tab1Ice3} alt={'Ice'} />
            </foreignObject>
            <foreignObject className={'Section3__tab1 Section3__tab1__title'}>
              <div>Звенья патогенеза СД2</div>
            </foreignObject>
            <foreignObject className={'Section3__tab1 Section3__tab1__content'}>
              <img src={Tab1Content} alt={'Ice'} />
            </foreignObject>
          </svg>
        </div>
        <div className="Section3__item">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 1024 768"
            baseProfile='tiny'
            x='0px'
            y='0px'
          >
            <foreignObject className={'Section3__tab2 Section3__tab2__ice-1'}>
              <img src={Tab2Ice1} alt={'Ice'} />
            </foreignObject>
            <foreignObject className={'Section3__tab2 Section3__tab2__ice-2'}>
              <img src={Tab2Ice2} alt={'Ice'} />
            </foreignObject>
            <foreignObject className={'Section3__tab2 Section3__tab2__ice-3'}>
              <img src={Tab2Ice3} alt={'Ice'} />
            </foreignObject>
            <foreignObject className={'Section3__tab2 Section3__tab2__title'}>
              <div>Смертельный октет</div>
            </foreignObject>
            <foreignObject className={'Section3__tab2 Section3__tab2__content'}>
              <img src={Tab2Content} alt={'Ice'} />
            </foreignObject>
          </svg>

        </div>
        <div className="Section3__item">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 1024 768"
            baseProfile='tiny'
            x='0px'
            y='0px'
          >
            <foreignObject className={'Section3__tab3 Section3__tab3__ice-1'}>
              <img src={Tab3Ice1} alt={'Ice'} />
            </foreignObject>
            <foreignObject className={'Section3__tab3 Section3__tab3__ice-2'}>
              <img src={Tab3Ice2} alt={'Ice'} />
            </foreignObject>
            <foreignObject className={'Section3__tab3 Section3__tab3__ice-3'}>
              <img src={Tab3Ice3} alt={'Ice'} />
            </foreignObject>
            <foreignObject className={'Section3__tab3 Section3__tab3__title'}>
              <div>Звенья патогенеза СД2</div>
            </foreignObject>
            <foreignObject className={'Section3__tab3 Section3__tab3__content'}>
              <img src={Tab3Content} alt={'Ice'} />
            </foreignObject>
          </svg>

        </div>
      </div>

      <Range
        updateTab={updateTab}
      />
    </>
  }, []);

  return (
    <section
      className={'Section3'}

    >
      {content}
      {/*      <div
        className="Section3__item"
      >
        3
      </div>*/}
      {/*      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1024 768"
        baseProfile='tiny'
        x='0px'
        y='0px'
        ref={containerRef}
      >
        <image href={Background3}
               x="0" y="0" width="100%" height="100%"
               preserveAspectRatio="xMidYMid slice"
        />
        <g>
          <foreignObject className={'Section3__tab1 Section3__tab1__ice-1'}>
            <img src={Tab1Ice1} alt={'Ice'} />
          </foreignObject>
          <foreignObject className={'Section3__tab1 Section3__tab1__ice-2'}>
            <img src={Tab1Ice2} alt={'Ice'} />
          </foreignObject>
          <foreignObject className={'Section3__tab1 Section3__tab1__ice-3'}>
            <img src={Tab1Ice3} alt={'Ice'} />
          </foreignObject>
          <foreignObject className={'Section3__tab1 Section3__tab1__title'}>
            <div>Звенья патогенеза СД2</div>
          </foreignObject>
          <foreignObject className={'Section3__tab1 Section3__tab1__content'}>
            <img src={TabContent1} alt={'Ice'} />
          </foreignObject>
        </g>

        <g>
          <foreignObject className={'Section3__tab2 Section3__tab2__ice-1'}>
            <img src={Tab2Ice1} alt={'Ice'} />
          </foreignObject>
          <foreignObject className={'Section3__tab2 Section3__tab2__ice-2'}>
            <img src={Tab2Ice2} alt={'Ice'} />
          </foreignObject>
          <foreignObject className={'Section3__tab2 Section3__tab2__ice-3'}>
            <img src={Tab2Ice3} alt={'Ice'} />
          </foreignObject>
          <foreignObject className={'Section3__tab2 Section3__tab2__title'}>
            <div>Смертельный октет</div>
          </foreignObject>
          <foreignObject className={'Section3__tab2 Section3__tab2__content'}>
            <img src={TabContent2} alt={'Ice'} />
          </foreignObject>
        </g>

        <g>
          <foreignObject className={'Section3__tab3 Section3__tab3__ice-1'}>
            <img src={Tab3Ice1} alt={'Ice'} />
          </foreignObject>
          <foreignObject className={'Section3__tab3 Section3__tab3__ice-2'}>
            <img src={Tab3Ice2} alt={'Ice'} />
          </foreignObject>
          <foreignObject className={'Section3__tab3 Section3__tab3__ice-3'}>
            <img src={Tab3Ice3} alt={'Ice'} />
          </foreignObject>
          <foreignObject className={'Section3__tab3 Section3__tab3__title'}>
            <div>Звенья патогенеза СД2</div>
          </foreignObject>
          <foreignObject className={'Section3__tab3 Section3__tab3__content'}>
            <img src={TabContent3} alt={'Ice'} />
          </foreignObject>
        </g>
      </svg>*/}
    </section>
  )
};

Section3.propTypes = {};
Section3.defaultProps = {};
export default Section3;