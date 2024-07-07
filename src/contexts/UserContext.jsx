import React, { createContext, useState, useEffect, useContext } from 'react';
import { AppContext } from '../AppContext';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const { state, logout } = useContext(AppContext);
    const { jwt } = state;
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (jwt) {
            fetchUserDetails();
        }
    }, [jwt]);

    const fetchUserDetails = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8080/api/auth/me', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${jwt}`
                }
            });
            const data = await response.json();
            if (response.ok && data.status === 'success') {
                setUser(data.data);
                setError(null);
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError('Failed to fetch user details. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const updateUserDetails = async (userId, updatedData) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt}`
                },
                body: JSON.stringify(updatedData)
            });
            const data = await response.json();
            if (response.ok && data.status === 'success') {
                setUser(data.data);
                setError(null);
                alert('User details updated successfully.');
            } else {
                setError(data.message);
                alert(data.message);
            }
        } catch (error) {
            setError('Failed to update user details. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (userId) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${jwt}`
                }
            });
            const data = await response.json();
            if (response.ok && data.status === 'success') {
                setUser(null);
                setError(null);
                // Perform any additional cleanup or redirection if necessary
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError('Failed to delete user. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const changePassword = async (userId, oldPassword, newPassword) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8080/api/users/change-password/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt}`
                },
                body: JSON.stringify({ oldPassword, newPassword })
            });
            const data = await response.json();
            if (response.ok && data.status === 'success') {
                setError(null);
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError('Failed to change password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const existsByUsername = async (username) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8080/api/auth/existsByUsername/${username}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${jwt}`
                }
            });
            const data = await response.json();
            setLoading(false);
            return data.data;
        } catch (error) {
            setError('Failed to check username. Please try again.');
            setLoading(false);
            return false;
        }
    };

    const existsByEmail = async (email) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8080/api/auth/existsByEmail/${email}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${jwt}`
                }
            });
            const data = await response.json();
            setLoading(false);
            return data.data;
        } catch (error) {
            setError('Failed to check email. Please try again.');
            setLoading(false);
            return false;
        }
    };

    return (
        <UserContext.Provider value={{
            user, error, loading, fetchUserDetails, updateUserDetails,
            deleteUser, changePassword, existsByUsername, existsByEmail, logout
        }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
