import React, { useState, useEffect, useContext } from 'react';
import { CSSTransition } from 'react-transition-group';
import QuizDisplayHorizontal from '../QuizDisplay/QuizDisplayHorizontal'; // Sửa lại đường dẫn nếu cần
import Category from '../Category/Category';
import { QuizContext } from '../../contexts/QuizContext';
import './Library.css';

const Created = () => {
    const { quizzes, getMyQuiz, loading, error } = useContext(QuizContext);
    const [sortTitle, setSortTitle] = useState('All');
    const [view, setView] = useState('created');
    const [inProp, setInProp] = useState(true);

    useEffect(() => {
        getMyQuiz();
    }, []);

    const handleSortSelect = (title) => {
        setSortTitle(title);
    };

    const handleViewChange = (newView) => {
        setInProp(false);
        setTimeout(() => {
            setView(newView);
            setInProp(true);
        }, 150);
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
                            <form action="" className="search mx-3 w-25">
                                <input type="text" className="form-control" placeholder='Type here to search ... ' />
                            </form>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
                            <QuizDisplayHorizontal quizzes={quizzes} loading={loading} error={error} isCreatedView={view === 'created'} />
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
