import React, { useState, useEffect, useContext } from 'react';
import { CSSTransition } from 'react-transition-group';
import Category from '../Category/Category';
import { QuizContext } from '../../contexts/QuizContext';
import './Library.css';

const Created = () => {
    const [sortTitle, setSortTitle] = useState('All');
    const [view, setView] = useState('created');
    const [inProp, setInProp] = useState(true);
    const [quizzes, setQuizzes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedQuizzes, setSelectedQuizzes] = useState([]);
    const { getMyQuiz, searchQuiz, loading, error } = useContext(QuizContext);

    useEffect(() => {
        const fetchData = async () => {
            const myQuizzes = await getMyQuiz();
            setQuizzes(myQuizzes);
        };
        fetchData();
    }, [getMyQuiz]);

    const handleSortSelect = (title) => {
        setSortTitle(title);
        // Implement sorting logic here if necessary
    };

    const handleViewChange = (newView) => {
        setInProp(false);
        setTimeout(() => {
            setView(newView);
            setInProp(true);
        }, 150);
    };

    const handleSearch = async (event) => {
        event.preventDefault();
        const result = await searchQuiz(searchTerm);
        setQuizzes(result);
    };

    const handleCardClick = (id) => {
        window.location.href = `/quiz/${id}`;
    };

    const handleSelectQuiz = (id) => {
        setSelectedQuizzes((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((quizId) => quizId !== id)
                : [...prevSelected, id]
        );
    };

    const handleSelectAll = () => {
        if (selectedQuizzes.length === quizzes.length) {
            setSelectedQuizzes([]);
        } else {
            setSelectedQuizzes(quizzes.map((quiz) => quiz.id));
        }
    };

    const handleDeleteSelected = async () => {
        // Implement delete logic here
        // After deleting, refresh the quiz list
        const updatedQuizzes = await getMyQuiz();
        setQuizzes(updatedQuizzes);
        setSelectedQuizzes([]);
    };

    return (
        <div>
            <CSSTransition
                in={inProp}
                timeout={300}
                classNames="page-transition"
                unmountOnExit
            >
                {view === 'created' ? (
                    <div>
                        <h4 className="mb-3 mt-4">Created</h4>
                        <div className="options d-flex justify-content-left align-items-center mb-3">
                            <button type="button" className="btn btn-primary me-2">
                                <i className="fa-solid fa-plus pe-2"></i>
                                Tạo bài quiz mới
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => handleViewChange('category')}
                            >
                                <i className="fa-solid fa-list pe-2"></i>
                                Thêm thể loại mới
                            </button>
                            <div className="dropdown ms-2">
                                <button className="btn btn-outline-secondary d-flex align-items-center" type="button" id="sortDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                    {sortTitle} <i className="ms-2 fa-solid fa-sort"></i>
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="sortDropdown">
                                    <li>
                                        <button className="dropdown-item" onClick={() => handleSortSelect('All')}>All</button>
                                    </li>
                                    <li>
                                        <button className="dropdown-item" onClick={() => handleSortSelect('Public')}>Public</button>
                                    </li>
                                    <li>
                                        <button className="dropdown-item" onClick={() => handleSortSelect('Private')}>Private</button>
                                    </li>
                                </ul>
                            </div>
                            <form onSubmit={handleSearch} className="search mx-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Type here to search ..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </form>
                        </div>
                        <div className="mb-4 d-flex justify-content-between">
                            {selectedQuizzes.length > 0 && (
                                <div className="selected-options">
                                    <button className="btn btn-outline-primary me-2" onClick={handleSelectAll}>
                                        {selectedQuizzes.length === quizzes.length ? 'Deselect All' : 'Select All'}
                                    </button>
                                    <button className="btn btn-outline-danger" onClick={handleDeleteSelected}>
                                        Delete Selected
                                    </button>
                                </div>
                            )}
                        </div>
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
                                    <p className="text-center mt-5 mb-5">Không có quiz</p>
                                </div>
                            </div>
                        )}
                        {!loading && !error && quizzes.length > 0 && (
                            <div className="d-flex flex-wrap w-100 justify-content-left align-items-center">
                                {quizzes.map((quiz) => (
                                    <div
                                        key={quiz.id}
                                        className={`card mb-3 me-3 card-hori ${selectedQuizzes.includes(quiz.id) ? 'selected' : ''}`}
                                        style={{ width: '18rem' }}
                                    >
                                        <img src={quiz.image} className="card-img-top" alt={quiz.title} />
                                        <div className="card-body" onClick={() => handleCardClick(quiz.id)}>
                                            <h5 className="card-title">{quiz.title}</h5>
                                            <p className="card-text">{quiz.description}</p>
                                            <small className="d-inline-flex mb-3 px-2 fw-semibold text-warning-emphasis bg-warning-subtle border border-warning-subtle rounded-2">
                                                {quiz.difficulty}
                                            </small>
                                            <div
                                                className="checkbox-container"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={selectedQuizzes.includes(quiz.id)}
                                                    onChange={() => handleSelectQuiz(quiz.id)}
                                                    className='form-check-input'
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <div>
                        <button type="button" className="btn mb-3 btn-exit" onClick={() => handleViewChange('created')}>
                            <i className="fa-solid fa-arrow-left"></i>
                        </button>
                        <Category />
                    </div>
                )}
            </CSSTransition>
        </div>
    );
};

export default Created;
