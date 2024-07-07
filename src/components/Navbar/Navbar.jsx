import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import avatarPlaceholder from '../../assets/63202399.png';
import logo from '../../assets/logo/svg/logo-no-background.svg';
import logo_dark from '../../assets/logo/svg/logo-white.svg';
import './Navbar.css';
import { UserContext } from '../../contexts/UserContext';

const Navbar = () => {
    const [darkMode, setDarkMode] = useState(false);
    const { user, logout } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        document.body.setAttribute('data-bs-theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const handleNavigation = (path) => {
        const offcanvasElement = document.getElementById('offcanvasExample');
        const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement); // Bootstrap 5.1+ method
        if (bsOffcanvas) {
            bsOffcanvas.hide();
        }
        navigate(path);
    };

    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        logout();
        const offcanvasElement = document.getElementById('offcanvasExample');
        const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement); // Bootstrap 5.1+ method
        if (bsOffcanvas) {
            bsOffcanvas.hide();
        }
        navigate('/');
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm fixed-top">
                <div className="container-fluid ps-4 pe-4">
                    <div className="brand d-flex justify-content-center align-items-center">
                        <a className="navbar-brand" onClick={() => handleNavigation('/')}>
                            <img src={darkMode ? logo_dark : logo} alt="" srcset="" />
                        </a>
                        <button className="btn nav-create-quiz" onClick={() => handleNavigation('/create-new-quiz')}>
                            <i className="fa-solid fa-square-plus"></i>
                            Create
                        </button>
                    </div>
                    {/* For desktop */}
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto me-2 mb-2 mb-lg-0">
                            <li className={`nav-item ${isActive('/') ? 'active-item' : ''}`}>
                                <a className="nav-link" onClick={() => handleNavigation('/')}>
                                    <i className="fa-solid fa-house"></i>
                                    <span>Home</span>
                                </a>
                            </li>
                            <li className={`nav-item ${isActive('/explore') ? 'active-item' : ''}`}>
                                <a className="nav-link" onClick={() => handleNavigation('/explore')}>
                                    <i className="fa-solid fa-compass"></i>
                                    <span>Explore</span>
                                </a>
                            </li>
                            <li className={`nav-item ${isActive('/search') ? 'active-item' : ''}`}>
                                <a className="nav-link" onClick={() => handleNavigation('/search')}>
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                    <span>Search</span>
                                </a>
                            </li>
                            {user && (
                                <li className={`nav-item ${isActive('/library') ? 'active-item' : ''}`}>
                                    <a className="nav-link" onClick={() => handleNavigation('/library')}>
                                        <i className="fa-solid fa-layer-group"></i>
                                        <span>My Library</span>
                                    </a>
                                </li>
                            )}
                        </ul>
                    </div>

                    <div className="auth-container">
                        {!user ? (
                            <button type="button" className="btn btn-login" data-bs-toggle="modal" data-bs-target="#loginModal">Đăng nhập</button>
                        ) : (
                            <button className="btn btn-avatar" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                                <img src={user.avatar || avatarPlaceholder} className='avatar' alt="User Avatar" />
                            </button>
                        )}
                    </div>
                </div>
            </nav>

            {/* For tablet - mobile */}
            <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-bottom mobile-mode">
                <div className="container-fluid">
                    <ul className="nav-items w-100">
                        <li className={`nav-item ${isActive('/') ? 'active-item' : ''}`}>
                            <a className="nav-link" onClick={() => handleNavigation('/')}>
                                <i className="fa-solid fa-house"></i><br />
                                <span>Home</span>
                            </a>
                        </li>
                        <li className={`nav-item ${isActive('/explore') ? 'active-item' : ''}`}>
                            <a className="nav-link" onClick={() => handleNavigation('/explore')}>
                                <i className="fa-solid fa-compass"></i><br />
                                <span>Explore</span>
                            </a>
                        </li>
                        <li className={`nav-item ${isActive('/search') ? 'active-item' : ''}`}>
                            <a className="nav-link" onClick={() => handleNavigation('/search')}>
                                <i className="fa-solid fa-magnifying-glass"></i><br />
                                <span>Search</span>
                            </a>
                        </li>
                        {user && (
                            <li className={`nav-item ${isActive('/library') ? 'active-item' : ''}`}>
                                <a className="nav-link" onClick={() => handleNavigation('/library')}>
                                    <i className="fa-solid fa-layer-group"></i><br />
                                    <span>My Library</span>
                                </a>
                            </li>
                        )}
                    </ul>
                </div>
            </nav>

            <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <div className="offcanvas-header">
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body text-center">
                    <img src={user?.avatar || avatarPlaceholder} className='avatar-full mb-2' alt="User Avatar Full" />
                    <p className="fs-2 full-name">@{user?.username}</p>
                    <span>{user?.email}</span>

                    <ul className="list-group mt-4">
                        <li className="list-group-item" onClick={toggleDarkMode}>
                            {darkMode ? (
                                <div>
                                    <i className="fa-solid fa-sun"></i> 
                                    <span>Light Mode</span>
                                </div>
                            ): (
                                <div>
                                    <i className="fa-solid fa-moon"></i>
                                    <span> Dark Mode</span>
                                </div>
                            )}
                        </li>
                        <li className="list-group-item" onClick={() => handleNavigation('/account-settings')}>
                            <i class="fa-solid fa-gear"></i>
                            <span>Account Settings</span>
                        </li>
                        <li className="list-group-item" onClick={handleLogout}>
                            <i className="fa-solid fa-right-to-bracket"></i>
                            <span>Logout</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
