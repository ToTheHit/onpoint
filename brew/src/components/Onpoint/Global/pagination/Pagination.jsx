import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './pagination.css';
import classNames from "../../../../lib/classNames";

const Pagination = (props) => {
  const { slideCount, activeSlideIndex } = props;
  const [renderedDots, setRenderedDots] = useState([]);

  useEffect(() => {
    let rendered = [];
    for (let i = 0; i < slideCount; i += 1) {
      rendered.push(
        <div
          key={`PaginationDot_${i}`}
          className={classNames('Pagination__dot', ((activeSlideIndex === i) && 'Pagination__dot-active'))}
        />
      )
    }
    setRenderedDots(rendered);
  }, [slideCount, activeSlideIndex]);

  return (
    <div className={'Pagination'}>
      {renderedDots}
    </div>
  )
};

Pagination.propTypes = {
  slideCount: PropTypes.number.isRequired,
  activeSlideIndex: PropTypes.number.isRequired,
};
Pagination.defaultProps = {};
export default Pagination;