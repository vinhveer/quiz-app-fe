import React, { createContext, useState, useContext } from 'react';
import { AppContext } from '../AppContext';

const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {
    const { state } = useContext(AppContext);
    const { jwt } = state;
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8080/api/category', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${jwt}`
                }
            });
            const data = await response.json();
            if (response.ok && data.status === 'success') {
                setCategories(data.data);
                setError(null);
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError('Failed to fetch categories. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const createCategory = async (name, description) => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8080/api/category', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt}`
                },
                body: JSON.stringify({ name, description })
            });
            const data = await response.json();
            if (response.ok && data.status === 'success') {
                setCategories(prev => [...prev, data.data]);
                setError(null);
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError('Failed to create category. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const updateCategory = async (id, name, description) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8080/api/category/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt}`
                },
                body: JSON.stringify({ name, description })
            });
            const data = await response.json();
            if (response.ok && data.status === 'success') {
                setCategories(prev => prev.map(cat => cat.id === id ? data.data : cat));
                setError(null);
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError('Failed to update category. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const deleteCategory = async (id) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8080/api/category/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${jwt}`
                }
            });
            const data = await response.json();
            if (response.ok && data.status === 'success') {
                setCategories(prev => prev.filter(cat => cat.id !== id));
                setError(null);
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError('Failed to delete category. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const searchCategory = async (name) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8080/api/category/search?name=${name}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${jwt}`
                }
            });
            const data = await response.json();
            if (response.ok && data.status === 'success') {
                return data.data;
            } else {
                setError(data.message);
                return [];
            }
        } catch (error) {
            setError('Failed to search categories. Please try again.');
            return [];
        } finally {
            setLoading(false);
        }
    };

    return (
        <CategoryContext.Provider value={{ categories, fetchCategories, createCategory, updateCategory, deleteCategory, searchCategory, loading, error }}>
            {children}
        </CategoryContext.Provider>
    );
};

export { CategoryContext, CategoryProvider };
