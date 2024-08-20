import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { QuizContext } from '../../contexts/QuizContext';
import './Quiz.css';

const Quiz = () => {
  const { getQuizById, error, loading } = useContext(QuizContext);
  const [quiz, setQuiz] = useState(null);
  const [fetched, setFetched] = useState(false);
  const { quizId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!quizId || fetched) return;

    const loadQuiz = async () => {
      try {
        const quizData = await getQuizById(quizId);
        setQuiz(quizData);
        setFetched(true);
        console.log('Quiz:', quizData);
      } catch (error) {
        console.error('Failed to fetch quiz:', error);
        navigate('/error');
      }
    };

    loadQuiz();
  }, [getQuizById, quizId, fetched, navigate]);

  useEffect(() => {
    if (error) {
      navigate('/error');
    }
  }, [error, navigate]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return <p>No quiz found.</p>;
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <img src={quiz.image} className='img-quiz-details' alt="Quiz" />
              <h4 className='mt-3'>{quiz.title}</h4>
              <p>{quiz.description}</p>
              <small className="d-inline-flex mb-3 px-2 fw-semibold text-warning-emphasis bg-warning-subtle border border-warning-subtle rounded-2">
                {quiz.difficulty}
              </small>
              <p className='d-flex align-items-center'>
                <img src={quiz.createdByAvatar} className='avatar-img me-3' alt="Admin" />
                <span className="fw-semibold">{quiz.createdByUsername}</span>
              </p>
              <h6>Options</h6>
              <div className="list-group list-group-flush border scrollarea mt-0">
                <a
                  className='list-group-item py-3'
                  aria-current="true"
                  onClick={() => setActiveTab('favorite')}
                >
                  <i className="fa-solid fa-heart"></i>
                  <span>Play</span>
                </a>
                <a
                  className='list-group-item py-3'
                  aria-current="true"
                  onClick={() => setActiveTab('favorite')}
                >
                  <i className="fa-solid fa-heart"></i>
                  <span>Start a live session</span>
                </a>
                <a
                  className='list-group-item py-3'
                  aria-current="true"
                  onClick={() => setActiveTab('favorite')}
                >
                  <i className="fa-solid fa-heart"></i>
                  <span>Question</span>
                </a>
                <a
                  className='list-group-item py-3'
                  aria-current="true"
                  onClick={() => setActiveTab('favorite')}
                >
                  <i className="fa-solid fa-heart"></i>
                  <span>Access</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-9 mt-3 mt-md-0">
          <div className="card">
            <div className="card-body">
              <h4 className='mb-3'>Question</h4>
              <div className="mb-3">
                <button className="btn btn-outline-primary me-2">
                  Add new question
                </button>
                <button className="btn btn-outline-primary me-2">
                  Add new slide
                </button>
                <button className="btn btn-outline-danger">
                  More
                </button>
              </div>
              <div className="card">
                <div className="card-body">
                  Question 1.
                  <h5>How to play?</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
