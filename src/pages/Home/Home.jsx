import React, { useContext } from 'react';
import './Home.css';
import { UserContext } from '../../contexts/UserContext';
import CardDisplayVertical from '../../components/QuizDisplay/CardDisplayVertical';

const Home = () => {
  const { user } = useContext(UserContext);

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
          
        </div>
      )}
      <CardDisplayVertical />
    </div>
  );
}

export default Home;
