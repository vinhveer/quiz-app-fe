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
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-md-3">
              <img src={quiz.image} className='img-quiz-details' alt="Quiz" />
            </div>
            <div className="col-md-9">
              <h2 className='mt-3'>{quiz.title}</h2>
              <p>{quiz.description}</p>
              <div>
                <small className="d-inline-flex mb-3 px-2 fw-semibold text-warning-emphasis bg-warning-subtle border border-warning-subtle rounded-2">
                  {quiz.difficulty}
                </small>
                <p className='d-flex align-items-center'>
                  <img src={quiz.createdByAvatar} className='avatar-img me-3' alt="Admin" />
                  <span className="fw-semibold">{quiz.createdByUsername}</span>
                </p>
              </div>
              <button className="btn btn-primary">Play now</button>
              <button className="btn btn-primary ms-2">Start a Live session</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="card mt-3">
            <div className="card-body">
              <h5>Manage</h5>
              <p>You don't have access</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card mt-3">
            <div className="card-body">
              <h5>Leaderboard</h5>
              <p>You haven't played yet</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
