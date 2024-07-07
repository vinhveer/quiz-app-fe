import React, { useState, useContext, useEffect } from 'react';
import './AccountSettings.css';
import { UserContext } from '../../contexts/UserContext';

const AccountSettings = () => {
    const [activeTab, setActiveTab] = useState('personalInfo');
    const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [deleteConfirmation, setDeleteConfirmation] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [usernameExists, setUsernameExists] = useState(false);
    const [emailExists, setEmailExists] = useState(false);
    const { user, changePassword, deleteUser, updateUserDetails, existsByUsername, existsByEmail, error, loading, logout } = useContext(UserContext);

    useEffect(() => {
        if (user) {
            setUsername(user.username);
            setEmail(user.email);
        }
    }, [user]);

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmNewPassword) {
            alert('Mật khẩu mới và xác nhận mật khẩu mới không khớp.');
            return;
        }
        if (user) {
            await changePassword(user.id, oldPassword, newPassword);
            if (!error) {
                alert('Đổi mật khẩu thành công.');
                setOldPassword('');
                setNewPassword('');
                setConfirmNewPassword('');
            } else {
                alert(error);
            }
        }
    };

    const handleDeleteAccount = async () => {
        if (deleteConfirmation === user.username) {
            await deleteUser(user.id);
            if (!error) {
                alert('Tài khoản đã được xoá.');
                logout();
            } else {
                alert(error);
            }
        } else {
            alert('Xác nhận xoá tài khoản không khớp.');
        }
    };

    const handleUsernameChange = async (e) => {
        const newUsername = e.target.value;
        setUsername(newUsername);
        if (newUsername !== user.username) {
            const exists = await existsByUsername(newUsername);
            setUsernameExists(exists);
        } else {
            setUsernameExists(false);
        }
    };

    const handleEmailChange = async (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        if (newEmail !== user.email) {
            const exists = await existsByEmail(newEmail);
            setEmailExists(exists);
        } else {
            setEmailExists(false);
        }
    };

    const handleAvatarChange = (e) => {
        setAvatar(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (usernameExists) {
            alert('Tên đăng nhập đã tồn tại.');
            return;
        }
        if (emailExists) {
            alert('Email đã tồn tại.');
            return;
        }

        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        if (avatar) {
            formData.append('avatar', avatar);
        }

        if (user) {
            await updateUserDetails(user.id, formData);
            if (!error) {
                alert('Thông tin cá nhân đã được cập nhật.');
            } else {
                alert(error);
            }
        }
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'personalInfo':
                return (
                    <div className="tab-pane fade show active" id="personalInfo" role="tabpanel">
                        <form onSubmit={handleSubmit} className="mt-4">
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Tên đăng nhập</label>
                                <input
                                    type="text"
                                    className={`form-control ${usernameExists ? 'is-invalid' : ''}`}
                                    id="username"
                                    value={username}
                                    onChange={handleUsernameChange}
                                    required
                                />
                                {usernameExists && <div className="invalid-feedback">Tên đăng nhập đã tồn tại.</div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="email"
                                    className={`form-control ${emailExists ? 'is-invalid' : ''}`}
                                    id="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    required
                                />
                                {emailExists && <div className="invalid-feedback">Email đã tồn tại.</div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="avatar" className="form-label">Avatar</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="avatar"
                                    name="avatar"
                                    onChange={handleAvatarChange}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? 'Đang xử lý...' : 'Lưu thay đổi'}
                            </button>
                        </form>
                    </div>
                );
            case 'changePassword':
                return (
                    <div className="tab-pane fade show active" id="changePassword" role="tabpanel">
                        <form onSubmit={handleChangePassword} className="mt-4">
                            <div className="mb-3">
                                <label htmlFor="oldPassword" className="form-label">Mật khẩu cũ</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="oldPassword"
                                    name="oldPassword"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="newPassword" className="form-label">Mật khẩu mới</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="newPassword"
                                    name="newPassword"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="confirmNewPassword" className="form-label">Xác nhận mật khẩu mới</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="confirmNewPassword"
                                    name="confirmNewPassword"
                                    value={confirmNewPassword}
                                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? 'Đang xử lý...' : 'Lưu thay đổi'}
                            </button>
                        </form>
                    </div>
                );
            case 'twoFactor':
                return (
                    <div className="tab-pane fade show active" id="twoFactor" role="tabpanel">
                        <div className="form-check form-switch mt-4">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="twoFactorToggle"
                                checked={isTwoFactorEnabled}
                                onChange={() => setIsTwoFactorEnabled(!isTwoFactorEnabled)}
                            />
                            <label className="form-check-label" htmlFor="twoFactorToggle">
                                Bật xác thực hai lớp qua email?
                            </label>
                        </div>
                    </div>
                );
            case 'deleteAccount':
                return (
                    <div className="tab-pane fade show active" id="deleteAccount" role="tabpanel">
                        <div className="mt-4">
                            <p>Để xóa tài khoản của bạn, vui lòng nhập tên đăng nhập của bạn để xác nhận.</p>
                            <input
                                type="text"
                                className="form-control mb-3"
                                placeholder="Tên đăng nhập"
                                value={deleteConfirmation}
                                onChange={(e) => setDeleteConfirmation(e.target.value)}
                            />
                            <button
                                className="btn btn-danger"
                                onClick={handleDeleteAccount}
                                disabled={loading}
                            >
                                {loading ? 'Đang xử lý...' : 'Xóa tài khoản'}
                            </button>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="container-fluid ps-4 pe-4 d-flex">
            <div className="d-flex flex-column bg-body flex-shrink-0" style={{ width: '250px' }}>
                <a className="d-flex align-items-center flex-shrink-0 p-3 pt-0 link-body-emphasis text-decoration-none">
                    <span className="fs-5 fw-semibold">Tài khoản và bảo mật</span>
                </a>
                <div className="list-group list-group-flush border-bottom scrollarea mt-0">
                    <a
                        className={`list-group-item py-3 ${activeTab === 'personalInfo' ? 'active-item' : ''}`}
                        aria-current="true"
                        onClick={() => setActiveTab('personalInfo')}
                    >
                        <i className="fa-solid fa-user"></i>
                        <span>Thông tin cá nhân</span>
                    </a>
                    <a
                        className={`list-group-item py-3 ${activeTab === 'changePassword' ? 'active-item' : ''}`}
                        aria-current="true"
                        onClick={() => setActiveTab('changePassword')}
                    >
                        <i className="fa-solid fa-key"></i>
                        <span>Thay đổi mật khẩu</span>
                    </a>
                    <a
                        className={`list-group-item py-3 ${activeTab === 'twoFactor' ? 'active-item' : ''}`}
                        aria-current="true"
                        onClick={() => setActiveTab('twoFactor')}
                    >
                        <i className="fa-solid fa-shield-alt"></i>
                        <span>Xác thực hai lớp</span>
                    </a>
                    <a
                        className={`list-group-item py-3 ${activeTab === 'deleteAccount' ? 'active-item' : ''}`}
                        aria-current="true"
                        onClick={() => setActiveTab('deleteAccount')}
                    >
                        <i className="fa-solid fa-user-times"></i>
                        <span>Xóa tài khoản</span>
                    </a>
                </div>
            </div>
            <div className="container ms-3">
                <h4>
                    {activeTab === 'personalInfo' && 'Thông tin cá nhân'}
                    {activeTab === 'changePassword' && 'Thay đổi mật khẩu'}
                    {activeTab === 'twoFactor' && 'Xác thực hai lớp'}
                    {activeTab === 'deleteAccount' && 'Xóa tài khoản'}
                </h4>
                {renderContent()}
            </div>
        </div>
    );
}

export default AccountSettings;
