import React from 'react'
import Question from '../../components/Question/Question'

const CreateQuestion = () => {
  return (
    <div>
      <div className="container-fluid">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-md-3">
                <h5>Create Question</h5>
              </div>
              <div className="col-md-9">
                <div className="d-flex justify-content-end">
                  <button className="btn btn-primary me-2">Prev Question</button>
                  <button className="btn btn-primary me-2">Next Question</button>
                  <button className="btn btn-primary">Save</button>
                  <button className="btn btn-secondary ms-2">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Question />
    </div>
  )
}

export default CreateQuestion
