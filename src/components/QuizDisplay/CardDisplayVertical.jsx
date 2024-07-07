import React, { useRef, useState, useEffect } from 'react';
import { quizzesSet1, quizzesSet2 } from '../../assets/example';
import Card from '../Card/Card';
import './CardDisplayVertical.css';

const CardDisplayVertical = () => {
  const allQuizzes = [...quizzesSet1, ...quizzesSet2];
  const wrapperRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (wrapperRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = wrapperRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (wrapperRef.current) {
      wrapperRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (wrapperRef.current) {
      wrapperRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    checkScrollButtons();
    if (wrapperRef.current) {
      wrapperRef.current.addEventListener('scroll', checkScrollButtons);
    }
    return () => {
      if (wrapperRef.current) {
        wrapperRef.current.removeEventListener('scroll', checkScrollButtons);
      }
    };
  }, []);

  return (
    <div className="container-fluid ps-4 pe-4">
      <div className="wrapper-container">
        {canScrollLeft && (
          <button type="button" className="btn scroll-button scroll-left" onClick={scrollLeft}>
            <i className="fa-solid fa-chevron-left"></i>
          </button>
        )}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <button className='btn btn-button'>
            <span className="fs-5 fw-semibold">Tất cả bài quiz</span>
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
        <div className="wrapper" ref={wrapperRef}>
          {allQuizzes.map((quiz) => (
            <Card key={quiz.quizId} quiz={quiz} className="item" />
          ))}
        </div>
        {canScrollRight && (
          <button type="button" className="btn btn-scroll scroll-button scroll-right" onClick={scrollRight}>
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default CardDisplayVertical;
