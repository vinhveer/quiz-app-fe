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
    }, []);

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
                        <h4 className="mb-3">Created</h4>
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
                            <div className="dropdown ms-auto">
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
                            <form onSubmit={handleSearch} className="search mx-3 w-25">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Type here to search ..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </form>
                            {selectedQuizzes.length > 0 && (
                                <div className="selected-options ms-3">
                                    <button className="btn btn-outline-primary me-2" onClick={handleSelectAll}>
                                        {selectedQuizzes.length === quizzes.length ? 'Deselect All' : 'Select All'}
                                    </button>
                                    <button className="btn btn-outline-danger" onClick={handleDeleteSelected}>
                                        Delete Selected
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
                            <div className="d-flex flex-wrap">
                                {loading && <p>Loading...</p>}
                                {error && <p>{error}</p>}
                                {!loading && !error && quizzes.map((quiz) => (
                                    <div
                                        key={quiz.id}
                                        className={`card mb-3 card-hori ${selectedQuizzes.includes(quiz.id) ? 'selected' : ''}`}
                                        onClick={() => handleCardClick(quiz.id)}
                                    >
                                        <img src={quiz.image} className="card-img-top" alt={quiz.title} />
                                        <div className="card-body">
                                            <h5 className="card-title">{quiz.title}</h5>
                                            <p className="card-text">{quiz.description}</p>
                                            <small className="d-inline-flex mb-3 px-2 fw-semibold text-warning-emphasis bg-warning-subtle border border-warning-subtle rounded-2">
                                                {quiz.difficulty}
                                            </small>
                                            <input
                                                type="checkbox"
                                                checked={selectedQuizzes.includes(quiz.id)}
                                                onChange={(e) => {
                                                    e.stopPropagation();
                                                    handleSelectQuiz(quiz.id);
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
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
