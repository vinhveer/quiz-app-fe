import React from 'react'
import p from '../../assets/pexels-keira-burton-6146978.jpg'
import a from '../../assets/63202399.png'
import './Quiz.css'

const Quiz = () => {
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <img src={p} className='img-quiz-details' />
          </div>
          <div className="col-md-9">
            <h2 className='mt-3'>Quiz</h2>
            <p>Quiz description</p>
            <div>
              <small className="d-inline-flex mb-3 px-2 fw-semibold text-warning-emphasis bg-warning-subtle border border-warning-subtle rounded-2">
                Medium
              </small>
              <p className='d-flex align-items-center'>
                <img src={ a } className='avatar-img me-3'/>
                <span className="fw-semibold">Admin</span>
              </p>
            </div>
            <button className="btn btn-primary">Play now</button>
            <button className="btn btn-primary ms-2">Start a Live season</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Quiz
