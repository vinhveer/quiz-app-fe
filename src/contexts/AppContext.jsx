import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserProvider } from './UserContext';
import { CategoryProvider } from './CategoryContext';
import { QuizContext, QuizProvider } from './QuizContext';

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [state, setState] = useState({
        user: null,
        jwt: localStorage.getItem('jwt') || null,
        error: null,
        loading: false,
        loginSuccess: false,
    });

    const navigate = useNavigate();

    const login = async (username, password) => {
        setState(prevState => ({ ...prevState, loading: true, loginSuccess: false }));
        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();
            if (response.ok && data.status === 'success') {
                localStorage.setItem('jwt', data.data.jwt);
                setState(prevState => ({
                    ...prevState,
                    jwt: data.data.jwt,
                    user: username,
                    error: null,
                    loading: false,
                    loginSuccess: true
                }));
            } else {
                setState(prevState => ({
                    ...prevState,
                    error: data.message,
                    loading: false,
                    loginSuccess: false
                }));
            }
        } catch (error) {
            setState(prevState => ({
                ...prevState,
                error: 'Login failed. Please try again.',
                loading: false,
                loginSuccess: false
            }));
        }
    };

    const uploadFile = async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://localhost:8080/upload', {
                method: 'POST',
                body: formData
            });
            const fileUrl = await response.text(); // Assuming the response is a plain text URL

            if (response.ok) {
                return fileUrl; // Return the file URL directly
            } else {
                throw new Error('File upload failed');
            }
        } catch (error) {
            setState(prevState => ({
                ...prevState,
                error: 'File upload failed. Please try again.',
                loading: false
            }));
            throw error;
        }
    };

    const register = async (username, email, password, file) => {
        setState(prevState => ({ ...prevState, loading: true }));

        try {
            const avatar = await uploadFile(file);
            const response = await fetch('http://localhost:8080/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password, avatar })
            });
            const data = await response.json();

            console.log(data);

            if (response.ok && data.status === 'success') {
                setState(prevState => ({
                    ...prevState,
                    error: null,
                    loading: false
                }));
            } else {
                setState(prevState => ({
                    ...prevState,
                    error: data.message,
                    loading: false
                }));
            }
        } catch (error) {
            setState(prevState => ({
                ...prevState,
                error: 'Registration failed. Please try again.',
                loading: false
            }));
        }
    };

    const logout = () => {
        localStorage.removeItem('jwt');
        setState({
            user: null,
            jwt: null,
            error: null,
            loading: false,
            loginSuccess: false
        });
        navigate('/'); // Chuyển hướng về trang gốc
        window.location.reload(); // Tải lại trang để cập nhật giao diện
    };

    const changePassword = async (userId, oldPassword, newPassword) => {
        setState(prevState => ({ ...prevState, loading: true }));
        try {
            const response = await fetch(`http://localhost:8080/api/users/change-password/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${state.jwt}`
                },
                body: JSON.stringify({ oldPassword, newPassword })
            });
            const data = await response.json();

            if (response.ok && data.status === 'success') {
                setState(prevState => ({
                    ...prevState,
                    error: null,
                    loading: false
                }));
                return data.message;
            } else {
                setState(prevState => ({
                    ...prevState,
                    error: data.message,
                    loading: false
                }));
                throw new Error(data.message);
            }
        } catch (error) {
            setState(prevState => ({
                ...prevState,
                error: 'Password change failed. Please try again.',
                loading: false
            }));
            throw error;
        }
    };

    const existsByUsername = async (username) => {
        try {
            const response = await fetch(`http://localhost:8080/api/auth/existsByUsername/${username}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();

            if (response.ok && data.status === 'success') {
                return data.data;
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            throw error;
        }
    };

    const existsByEmail = async (email) => {
        try {
            const response = await fetch(`http://localhost:8080/api/auth/existsByEmail/${email}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();

            if (response.ok && data.status === 'success') {
                return data.data;
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            throw error;
        }
    };

    return (
        <AppContext.Provider value={{ state, login, register, logout, uploadFile, changePassword, existsByUsername, existsByEmail }}>
            <UserProvider jwt={state.jwt}>
                <CategoryProvider>
                    <QuizProvider>
                        {children}
                    </QuizProvider>
                </CategoryProvider>
            </UserProvider>
        </AppContext.Provider>
    );
};

export { AppContext, AppProvider };
