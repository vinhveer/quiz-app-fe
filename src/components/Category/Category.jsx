import React, { useState, useEffect, useContext } from 'react';
import { CategoryContext } from '../../contexts/CategoryContext';
import './Category.css';

const Category = () => {
    const { categories, fetchCategories, createCategory, updateCategory, deleteCategory } = useContext(CategoryContext);
    const [currentCategory, setCurrentCategory] = useState({ name: '', description: '' });
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState({ add: false, delete: {} });

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleShowModal = (category = { name: '', description: '' }) => {
        setCurrentCategory(category);
        setEditMode(!!category.id);
        const myModal = new window.bootstrap.Modal(document.getElementById('categoryModal'));
        myModal.show();
    };

    const handleCloseModal = () => {
        const myModal = window.bootstrap.Modal.getInstance(document.getElementById('categoryModal'));
        myModal.hide();
    };

    const handleSaveCategory = async () => {
        setLoading({ ...loading, add: true });
        if (editMode) {
            await updateCategory(currentCategory.id, currentCategory.name, currentCategory.description);
        } else {
            await createCategory(currentCategory.name, currentCategory.description);
        }
        setLoading({ ...loading, add: false });
        handleCloseModal();
    };

    const handleDeleteCategory = async (id) => {
        setLoading({ ...loading, delete: { ...loading.delete, [id]: true } });
        await deleteCategory(id);
        setLoading({ ...loading, delete: { ...loading.delete, [id]: false } });
    };

    return (
        <div>
            <h3>Category</h3>
            <p>We have added some popular categories; however, we couldn't cover them all. If your category is missing, please add it here, and if any category is spam or not a legitimate category, please remove it. Thank you.</p>
            <div className="options">
                <button className="btn btn-outline-primary" onClick={() => handleShowModal()}>Create new categories</button>
            </div>

            <div className="row mt-4">
                {categories.map(category => (
                    <div key={category.id} className="col-sm-12 col-md-6 col-lg-4">
                        <div className="card mb-3">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <h6 className="card-title m-0">{category.name}</h6>
                                <div className="icons">
                                    <button className="icon-btn" onClick={() => handleShowModal(category)}>
                                        <i className="fa-solid fa-edit"></i>
                                    </button>
                                    <button className="icon-btn" onClick={() => handleDeleteCategory(category.id)} disabled={loading.delete[category.id]}>
                                        {loading.delete[category.id] ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : <i className="fa-solid fa-trash-alt"></i>}
                                    </button>
                                </div>
                            </div>
                            <div className="card-body">
                                <p className="card-text">{category.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            <div className="modal fade" id="categoryModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="categoryModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title fs-5" id="categoryModalLabel">{editMode ? 'Edit Category' : 'Add Category'}</h5>
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
                            <button type="button" className="btn btn-primary" onClick={handleSaveCategory} disabled={loading.add}>
                                {loading.add ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : (editMode ? 'Save Changes' : 'Add Category')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Category;
