import React from 'react';
import './QuizDisplayHorizontal.css';

const QuizDisplayHorizontal = ({ quizzes, loading, error, isCreatedView }) => {
    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    const ListItem = ({ quiz }) => {
        return (
            <div className="card mb-3 card-hori">
                <img src={quiz.image} className="card-img-top" alt={quiz.quizTitle} />
                <div className="card-body">
                    <h5 className="card-title">{quiz.title}</h5>
                    <p className="card-text">{quiz.description}</p>
                    <small className="d-inline-flex mb-3 px-2 fw-semibold text-warning-emphasis bg-warning-subtle border border-warning-subtle rounded-2">
                        {quiz.difficulty}
                    </small>
                    {isCreatedView && (
                        <div className="mt-3">
                            <button className="btn btn-primary me-2">
                                <i className="fa-solid fa-plus"></i>
                            </button>
                            <button className="btn btn-secondary me-2">
                                <i className="fa-solid fa-pen"></i>
                            </button>
                            <button className="btn btn-danger">
                                <i className="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="d-flex flex-wrap">
            {quizzes.map((quiz) => (
                <ListItem key={quiz.id} quiz={quiz} />
            ))}
        </div>
    );
};

export default QuizDisplayHorizontal;
