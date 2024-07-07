import React from 'react';
import image from '../../assets/pexels-keira-burton-6146978.jpg';

const Card = ({ quiz }) => {
  return (
    <div className="card me-3 mb-3" style={{ width: '16rem' }}>
      <img src={image} className="card-img-top" alt={quiz.quizTitle} />
      <div className="card-body">
        <small class="d-inline-flex mb-3 px-2 py-1 fw-semibold text-warning-emphasis bg-warning-subtle border border-warning-subtle rounded-2">
          {quiz.difficulty}
        </small>
        <h5 className="card-title">{quiz.quizTitle}</h5>
        <p className="card-text">{quiz.quizDescription}</p>
      </div>
    </div>
  );
};

export default Card;
