import React from 'react';

const Question = () => {
    return (
        <div>
            <div className="container-fluid mb-3">
                <button className="btn btn-outline-primary me-2">
                    Time limit (10s)
                </button>
                <button className="btn btn-outline-primary me-2">
                    Prev
                </button>
                <button className="btn btn-outline-primary me-2">
                    Next
                </button>
                <button className="btn btn-outline-primary me-2">
                    Question 1 of 10
                </button>
                <button className="btn btn-outline-primary me-2 float-end">
                    Save
                </button>
                <button className="btn btn-outline-primary me-2 float-end">
                    Type question
                </button>
            </div>
            <div className="container-fluid mt-3">
                <div className="row">
                    <div className="col-md-9">
                        <div className="card">
                            <textarea className="card-body form-control" placeholder="Type here your question ...">
                            </textarea>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card">
                            <input type="file" className="card-body">
                            </input>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <textarea className="form-control" placeholder="Option 1"></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <textarea className="form-control" placeholder="Option 2"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <textarea className="form-control border-none" placeholder="Option 3"></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <textarea className="form-control" placeholder="Option 4"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Question;
