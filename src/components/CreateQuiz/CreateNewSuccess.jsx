import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const CreateNewSuccess = () => {
    const location = useLocation();
    const { state } = location;

    return (
        <div className="container mt-5">
            {state?.status === 'success' ? (
                <div className="text-center">
                    <i className="fas fa-check display-1 mb-3"></i>
                    <h3 className="fs-1">Your quiz has been created successfully!</h3>
                    <div className="mt-4">
                        <Link to={`/quiz/${state.quizId}`} className="btn btn-primary mx-2 mt-1">
                            <i className="fas fa-eye me-2"></i>View your quiz
                        </Link>
                        <Link to={`/quiz/${state.quizId}/add`} className="btn btn-secondary mx-2 mt-1">
                            <i className="fas fa-plus-circle me-2"></i>Add question
                        </Link>
                        <Link to="/" className="btn btn-outline-primary mx-2 mt-1">
                            <i className="fas fa-home me-2"></i>Go home
                        </Link>
                    </div>
                </div>
            ) : state?.status === 'failure' ? (
                <div className="text-center">
                    <h3 className="display-5">There was an error creating your quiz</h3>
                    <p className="mt-3">{state.error}</p>
                    <Link to='/create-new-quiz' className="btn btn-primary mt-3">
                        <i className="fas fa-redo-alt me-2"></i>Try Again
                    </Link>
                </div>
            ) : (
                <div className="text-center">
                    <h3 className="display-5">No operation was performed.</h3>
                    <Link to='/create' className="btn btn-primary mt-3">
                        <i className="fas fa-plus-circle me-2"></i>Create a new quiz
                    </Link>
                </div>
            )}
        </div>
    );
};

export default CreateNewSuccess;
