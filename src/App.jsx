import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import './App.css';
import Authentication from './components/Authentication/Authentication';
import Navbar from './components/Navbar/Navbar';

const Home = lazy(() => import('./pages/Home/Home'));
const AccountSettings = lazy(() => import('./pages/Account/AccountSettings'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));
const MyLibrary = lazy(() => import('./pages/MyLibrary/MyLibrary'));
const Search = lazy(() => import('./pages/Search/Search'));
const CreateNewQuiz = lazy(() => import('./pages/CreateNewQuiz/CreateNewQuiz'));
const CreateNewSuccess = lazy(() => import('./components/CreateQuiz/CreateNewSuccess'));
const Quiz = lazy(() => import('./pages/Quiz/Quiz'));

function App() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    handleStart(); // Start loading when route changes

    const timer = setTimeout(() => handleComplete(), 300); // Simulate loading completion after 300ms

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div>
      <Navbar />
      <Authentication />
      <Suspense
        fallback={
          <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
            <Spinner animation="border" role="status" style={{ width: '3rem', height: '3rem' }}>
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        }
      >
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
      </Suspense>
    </div>
  );
}

export default App;
