import React, { useContext, useState, useEffect } from 'react';
import './Home.css';
import { UserContext } from '../../contexts/UserContext';
import { QuizContext } from '../../contexts/QuizContext';

const Home = () => {
  const { user } = useContext(UserContext);
  const { getMyQuiz, error, loading } = useContext(QuizContext);
  const [activeTab, setActiveTab] = useState('created');
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      if (activeTab === 'created') {
        const data = await getMyQuiz();
        console.log(data);
        setQuizzes(data);
      }
    };

    fetchQuizzes();
  }, [activeTab]);

  return (
    <div>
      {!user ? (
        <div>
          <div className="hero-section ms-4 me-4 mt-4 mb-4">
            <div className="container shadow-lg rounded">
              <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                  <h2 className="hero-heading">Create. Take. Share.</h2>
                  <p className="hero-paragraph">
                    Join our platform to create quizzes, take quizzes, and share them with your friends. Whether you're a student, teacher, or quiz enthusiast, there's something for everyone!
                  </p>
                  <button className="btn btn-get-started">Get Started</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="container-fluid ps-4 pe-4">
            <h3 className='display-6'>Welcome, {user.username}</h3>
            <div className="row">
              <div className="col-md-8 mt-3 mb-3">
                <div className="card">
                  <div className="card-body">
                    <h6>Join to live quiz sessions</h6>
                    <input type="text" className='form-control' placeholder='Enter quiz join code ...' />
                  </div>
                </div>
              </div>
              <div className="col-md-2 mt-3 mb-3">
                <div className="card">
                  <div className="card-body">
                    <h5>My Quizzes</h5>
                  </div>
                </div>
              </div>
              <div className="col-md-2 mt-3 mb-3">
                <div className="card">
                  <div className="card-body">
                    <h5>My Scores</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid mt-4">
            <ul className="nav nav-pills">
              <li className="nav-item">
                <button className={`nav-link ${activeTab === 'created' ? 'active' : ''}`} onClick={() => setActiveTab('created')}>
                  Created
                </button>
              </li>
            </ul>
          </div>
          <div className="container-fluid mt-4 ps-4 pe-4">
            {loading && (
              <div className="d-flex align-items-center mb-3 flex-wrap">
                <div className="d-flex flex-wrap w-100 justify-content-center">
                  <div className="spinner-border text-center mt-5 mb-5" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              </div>
            )}
            {error && <p>{error}</p>}
            {!loading && !error && quizzes.length === 0 && (
              <div className="d-flex align-items-center mb-3 flex-wrap">
                <div className="d-flex flex-wrap w-100 justify-content-center">
                  <p className="text-center mt-5 mb-5">No quizzes found</p>
                </div>
              </div>
            )}
            {!loading && !error && quizzes.length > 0 && (
              <div className="d-flex flex-wrap w-100 justify-content-left align-items-center">
                {quizzes.map((quiz) => (
                  <div key={quiz.id} className="card mb-3 me-3 card-hori" style={{ width: '18rem' }}>
                    <img src={quiz.image} className="card-img-top" alt={quiz.title} />
                    <div className="card-body">
                      <h5 className="card-title">{quiz.title}</h5>
                      <p className="card-text">{quiz.description}</p>
                      <small className="d-inline-flex mb-3 px-2 fw-semibold text-warning-emphasis bg-warning-subtle border border-warning-subtle rounded-2">
                        {quiz.difficulty}
                      </small>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
