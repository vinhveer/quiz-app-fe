import React, { createContext, useState, useEffect, useContext } from 'react';
import { AppContext } from './AppContext';
import { UserContext } from './UserContext';

const QuizContext = createContext();

const QuizProvider = ({ children }) => {
    const { state, uploadFile } = useContext(AppContext);
    const { user, fetchUserDetails } = useContext(UserContext);
    const { jwt } = state;
    const [quizzes, setQuizzes] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            fetchQuizzes();
        }
    }, [user, jwt]);

    const fetchQuizzes = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8080/api/quiz', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${jwt}`
                }
            });
            const data = await response.json();
            if (response.ok && data.status === 'success') {
                setQuizzes(data.data);
                setError(null);
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError('Failed to fetch quizzes. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const createQuiz = async (quiz, imageFile) => {
        setLoading(true);
        try {
            fetchUserDetails();
            const imageUrl = await uploadFile(imageFile);
            const response = await fetch('http://localhost:8080/api/quiz', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt}`
                },
                body: JSON.stringify({ ...quiz, image: imageUrl, createdBy: user.id }),
            });
            const data = await response.json();
            if (response.ok && data.status === 'success') {
                setQuizzes(prev => [...prev, data.data]);
                setError(null);
                return data.data;
            } else {
                setError(data.message);
                return null;
            }
        } catch (error) {
            console.log(error);
            setError('Failed to create quiz. Please try again.');
            return null;
        } finally {
            setLoading(false);
        }
    };

    const updateQuiz = async (id, quiz, imageFile) => {
        setLoading(true);
        try {
            let imageUrl = quiz.image;
            if (imageFile) {
                imageUrl = await uploadFile(imageFile);
            }
            const response = await fetch(`http://localhost:8080/api/quiz/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt}`
                },
                body: JSON.stringify({ ...quiz, image: imageUrl, createdBy: user.id })
            });
            const data = await response.json();
            if (response.ok && data.status === 'success') {
                setQuizzes(prev => prev.map(q => q.id === id ? data.data : q));
                setError(null);
                return data.data;
            } else {
                setError(data.message);
                return null;
            }
        } catch (error) {
            setError('Failed to update quiz. Please try again.');
            return null;
        } finally {
            setLoading(false);
        }
    };

    const deleteQuiz = async (id) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8080/api/quiz/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${jwt}`
                }
            });
            const data = await response.json();
            if (response.ok && data.status === 'success') {
                setQuizzes(prev => prev.filter(q => q.id !== id));
                setError(null);
                return data.data;
            } else {
                setError(data.message);
                return null;
            }
        } catch (error) {
            setError('Failed to delete quiz. Please try again.');
            return null;
        } finally {
            setLoading(false);
        }
    };

    const searchQuiz = async (name) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8080/api/quiz/search?name=${name}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${jwt}`
                }
            });
            const data = await response.json();
            if (response.ok && data.status === 'success') {
                setError(null);
                return data.data;
            } else {
                setError(data.message);
                return [];
            }
        } catch (error) {
            setError('Failed to search quizzes. Please try again.');
            return [];
        } finally {
            setLoading(false);
        }
    };

    const getQuizById = async (id) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8080/api/quiz/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${jwt}`
                }
            });
            const data = await response.json();
            if (response.ok && data.status === 'success') {
                setError(null);
                return data.data;
            } else {
                setError(data.message);
                return null;
            }
        } catch (error) {
            setError('Failed to fetch quiz. Please try again.');
            return null;
        } finally {
            setLoading(false);
        }
    };

    const getQuizByCategoryId = async (categoryId) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8080/api/quiz/category/${categoryId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${jwt}`
                }
            });
            const data = await response.json();
            if (response.ok && data.status === 'success') {
                setError(null);
                return data.data;
            } else {
                setError(data.message);
                return [];
            }
        } catch (error) {
            setError('Failed to fetch quizzes by category. Please try again.');
            return [];
        } finally {
            setLoading(false);
        }
    };

    const getQuizByDifficulty = async (difficulty) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8080/api/quiz/difficulty/${difficulty}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${jwt}`
                }
            });
            const data = await response.json();
            if (response.ok && data.status === 'success') {
                setError(null);
                return data.data;
            } else {
                setError(data.message);
                return [];
            }
        } catch (error) {
            setError('Failed to fetch quizzes by difficulty. Please try again.');
            return [];
        } finally {
            setLoading(false);
        }
    };

    const getQuizByCreatedBy = async (createdBy) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8080/api/quiz/createdBy/${createdBy}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${jwt}`
                }
            });
            const data = await response.json();
            if (response.ok && data.status === 'success') {
                setError(null);
                return data.data;
            } else {
                setError(data.message);
                return [];
            }
        } catch (error) {
            setError('Failed to fetch quizzes by creator. Please try again.');
            return [];
        } finally {
            setLoading(false);
        }
    };

    const getMyQuiz = async () => {
        if (!user) {
            setError('User not logged in.');
            return [];
        }

        return await getQuizByCreatedBy(user.id);
    };

    return (
        <QuizContext.Provider value={{
            quizzes, fetchQuizzes, createQuiz, updateQuiz, deleteQuiz,
            searchQuiz, getQuizById, getQuizByCategoryId, getQuizByDifficulty,
            getQuizByCreatedBy, getMyQuiz, error, loading
        }}>
            {children}
        </QuizContext.Provider>
    );
};

export { QuizContext, QuizProvider };
