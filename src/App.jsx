import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import './App.css';
import Authentication from './components/Authentication/Authentication';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import AccountSettings from './pages/Account/AccountSettings';
import NotFound from './pages/NotFound/NotFound';
import MyLibrary from './pages/MyLibrary/MyLibrary';
import Search from './pages/Search/Search';
import CreateNewQuiz from './pages/CreateNewQuiz/CreateNewQuiz';
import CreateNewSuccess from './components/CreateQuiz/CreateNewSuccess';
import Quiz from './pages/Quiz/Quiz';

function App() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    handleStart(); // Start loading when route changes

    const timer = setTimeout(() => handleComplete(), 300); // Simulate loading completion after 1 second

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div>
      <Navbar />
      <Authentication />
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
          <Spinner animation="border" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/account-settings" element={<AccountSettings />} />
          <Route path="/library/*" element={<MyLibrary />} />
          <Route path="/search" element={<Search />} />
          <Route path="/create-new-quiz" element={<CreateNewQuiz />} />
          <Route path="/quiz/:quizId" element={<Quiz />} />
          <Route path="/quiz/:quizId/success" element={<CreateNewSuccess />} />
          <Route path="/quiz/create/failure" element={<CreateNewSuccess />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
