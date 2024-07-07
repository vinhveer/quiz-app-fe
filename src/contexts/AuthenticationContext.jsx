import { useContext } from 'react';
import { AppContext } from '../AppContext';

const useAuthentication = () => {
    const { state, login, register, logout } = useContext(AppContext);

    return {
        user: state.user,
        jwt: state.jwt,
        error: state.error,
        loading: state.loading,
        login,
        register,
        logout
    };
};

export default useAuthentication;
