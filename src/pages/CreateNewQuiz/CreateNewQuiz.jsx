import React, { useState, useContext, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CategoryContext } from '../../contexts/CategoryContext';
import { QuizContext } from '../../contexts/QuizContext';

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const CreateNewQuiz = () => {
  const { categories, fetchCategories, searchCategory, createCategory } = useContext(CategoryContext);
  const { createQuiz, loading: globalLoading } = useContext(QuizContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [difficulty, setDifficulty] = useState('Easy');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [quizTitle, setQuizTitle] = useState('');
  const [quizDescription, setQuizDescription] = useState('');
  const [currentCategory, setCurrentCategory] = useState({ name: '', description: '' });
  const [editMode, setEditMode] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredCategories(categories.slice(0, 10));
    }
  }, [categories, searchTerm]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      if (file.size > 1048576) {
        alert('File size exceeds 1MB. Please select a smaller file.');
        return;
      }
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select an image file.');
    }
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
    setPreview(null);
  };

  const handleDifficultyChange = (level) => {
    setDifficulty(level);
  };

  const handleCategorySelect = (newCategory) => {
    setSelectedCategory(newCategory);
  };

  const handleCategoryRemove = () => {
    setSelectedCategory(null);
  };

  const handleSearchChange = useCallback(debounce(async (searchValue) => {
    if (searchValue) {
      const results = await searchCategory(searchValue);
      setFilteredCategories(results.slice(0, 10));
    } else {
      setFilteredCategories(categories.slice(0, 10));
    }
  }, 300), [categories, searchCategory]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    handleSearchChange(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!quizTitle.trim() || !selectedCategory) {
      alert('Please fill in the title and select a category.');
      return;
    }

    const newQuiz = {
      title: quizTitle,
      description: quizDescription,
      difficulty,
      category: selectedCategory.id,
    };

    setLocalLoading(true); // Set local loading state to true before starting the async operation
    const createdQuiz = await createQuiz(newQuiz, selectedFile);
    setLocalLoading(false); // Set local loading state to false after the async operation completes

    if (createdQuiz) {
      navigate(`/quiz/create/success`, { state: { status: 'success', quizId: createdQuiz.id } });
    } else {
      navigate(`/quiz/create/failure`, { state: { status: 'failure', error: 'Failed to create quiz.' } });
    }
  };

  const handleShowModal = () => {
    setCurrentCategory({ name: '', description: '' });
    setEditMode(false);
    const myModal = new window.bootstrap.Modal(document.getElementById('categoryModal'));
    myModal.show();
  };

  const handleCloseModal = () => {
    const myModal = window.bootstrap.Modal.getInstance(document.getElementById('categoryModal'));
    myModal.hide();
  };

  const handleSaveCategory = async () => {
    setModalLoading(true);
    await createCategory(currentCategory.name, currentCategory.description);
    setModalLoading(false);
    handleCloseModal();
    fetchCategories(); // Refresh categories
  };

  if (globalLoading || localLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center mt-5 mb-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Creating your quiz, please wait...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='container'>
      <h3 className="mb-4">Enter information for your quiz.</h3>
      <form className="row" onSubmit={handleSubmit}>
        <div className="col-md-8">
          <div className="mb-3">
            <label htmlFor="quiz-title" className="form-label">
              Quiz Title
            </label>
            <input
              type="text"
              className="form-control"
              id="quiz-title"
              value={quizTitle}
              onChange={(e) => setQuizTitle(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="quiz-description" className="form-label">
              Quiz Description
            </label>
            <textarea
              className="form-control"
              id="quiz-description"
              rows="3"
              value={quizDescription}
              onChange={(e) => setQuizDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">Difficulty Level</label> <br />
            <div className="btn-group">
              {['Easy', 'Medium', 'Hard'].map(level => (
                <button
                  type="button"
                  key={level}
                  className={`btn ${difficulty === level ? 'btn-primary active' : 'btn-primary'}`}
                  onClick={() => handleDifficultyChange(level)}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Category</label> <br />
            <button type="button" className="btn btn-secondary" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom">
              Select Category
            </button>
            {selectedCategory && (
              <span className="btn btn-light shadow-sm ms-2">
                {selectedCategory.name}
                <button
                  type="button"
                  className="btn-close ms-2"
                  aria-label="Close"
                  onClick={handleCategoryRemove}
                ></button>
              </span>
            )}
          </div>
        </div>
        <div className="col-md-4">
          <div className="mb-3">
            <label htmlFor="quiz-image" className="form-label">
              Upload your quiz image (optional)
            </label>
            <input
              type="file"
              className="form-control"
              id="quiz-image"
              onChange={handleFileChange}
            />
            {preview ? (
              <div className="position-relative mt-3">
                <img
                  id="image-preview"
                  src={preview}
                  alt="Quiz Preview"
                  className="img-thumbnail shadow"
                />
                <button
                  type="button"
                  className="btn-close position-absolute top-0 end-0 m-2"
                  aria-label="Close"
                  onClick={handleFileRemove}
                ></button>
              </div>
            ) : (
              <div id="image-placeholder" className="mt-3 p-5 bg-light rounded text-center shadow-sm">
                You don't have any image selected.
              </div>
            )}
          </div>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Create Quiz
          </button>
        </div>
      </form>

      <div className="offcanvas offcanvas-bottom h-50" tabIndex="-1" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasBottomLabel">Select Category</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body small">
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            className="form-control mb-3"
            placeholder="Search categories"
          />
          <div>
            <button type="button" className="btn btn-outline-primary mt-2" onClick={handleShowModal}>Create new category</button>
            {filteredCategories.filter(cat => !selectedCategory || selectedCategory.id !== cat.id).map(cat => (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat)}
                className="btn btn-outline-secondary ms-4 mt-2"
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <div className="modal fade" id="categoryModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="categoryModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fs-5" id="categoryModalLabel">Add Category</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="formCategoryName" className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="formCategoryName"
                    placeholder="Enter category name"
                    value={currentCategory.name}
                    onChange={e => setCurrentCategory({ ...currentCategory, name: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="formCategoryDescription" className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    id="formCategoryDescription"
                    rows="3"
                    placeholder="Enter category description"
                    value={currentCategory.description}
                    onChange={e => setCurrentCategory({ ...currentCategory, description: e.target.value })}
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleSaveCategory} disabled={modalLoading}>
                {modalLoading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : 'Add Category'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNewQuiz;
