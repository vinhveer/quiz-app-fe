import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';
import './Authentication.css';
import { Spinner } from 'react-bootstrap';

const Authentication = () => {
    const { state, login, register } = useContext(AppContext);
    const [loginForm, setLoginForm] = useState({ username: '', password: '' });
    const [registerForm, setRegisterForm] = useState({
        username: '',
        avatar: null,
        email: '',
        password: '',
        confirmPassword: '',
        acceptPolicy: false,
    });

    const [errors, setErrors] = useState({});
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [registerSuccess, setRegisterSuccess] = useState(false);

    useEffect(() => {
        if (!state.loading) {
            if (state.loginSuccess) {
                const loginModal = document.getElementById('loginModal');
                if (loginModal) {
                    const bootstrapModal = bootstrap.Modal.getInstance(loginModal);
                    if (bootstrapModal) {
                        setTimeout(() => {
                            bootstrapModal.hide();
                        }, 800);
                    }
                }
            }
        }
    }, [state.loading, state.error]);

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginForm({
            ...loginForm,
            [name]: value
        });
    };

    const handleRegisterChange = (e) => {
        const { name, value, files, type, checked } = e.target;
        setRegisterForm({
            ...registerForm,
            [name]: type === 'file' ? files[0] : type === 'checkbox' ? checked : value,
        });
    };

    const handleLoginSubmit = () => {
        setLoginSuccess(false);
        login(loginForm.username, loginForm.password);
    };

    const handleRegisterSubmit = async () => {
        let formErrors = {};
        if (!/^[a-zA-Z0-9]+$/.test(registerForm.username)) {
            formErrors.username = 'Tên đăng nhập chỉ có thể chứa chữ cái và số';
        }
        if (!registerForm.avatar) {
            formErrors.avatar = 'Vui lòng tải lên ảnh đại diện';
        }
        if (!validateEmail(registerForm.email)) {
            formErrors.email = 'Email không hợp lệ';
        }
        if (registerForm.password !== registerForm.confirmPassword) {
            formErrors.confirmPassword = 'Mật khẩu và xác nhận mật khẩu không trùng khớp';
        }
        if (!registerForm.acceptPolicy) {
            formErrors.acceptPolicy = 'Bạn phải đồng ý với điều khoản và chính sách';
        }
        setErrors(formErrors);

        if (Object.keys(formErrors).length === 0) {
            setRegisterSuccess(false);
            register(registerForm.username, registerForm.email, registerForm.password, registerForm.avatar);
        }
    };

    return (
        <div>
            {/* Login Modal */}
            <div className="modal fade" id="loginModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="loginModalLabel">Đăng nhập</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Tạo, chia sẻ và hơn thế nữa</p>
                            {state.loading ? (
                                <div className="text-center mt-5 mb-5">
                                    <Spinner animation="border" />
                                    <p>Đang xử lý ...</p>
                                </div>
                            ) : state.loginSuccess ? (
                                <div className="text-success text-center mt-5 mb-5">
                                    <i class="fa-solid fa-check fs-1"></i>
                                </div>
                            ) : (
                                <form>
                                    {state.error && (
                                        <div>
                                            <div className="text-danger mb-3">{state.error}</div>
                                        </div>
                                    )}
                                    <div className="mb-3">
                                        <label htmlFor="loginUsername" className="form-label">Tên đăng nhập</label>
                                        <input type="text" className="form-control" id="loginUsername" name="username" value={loginForm.username} onChange={handleLoginChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="loginPassword" className="form-label">Mật khẩu</label>
                                        <input type="password" className="form-control" id="loginPassword" name="password" value={loginForm.password} onChange={handleLoginChange} />
                                    </div>
                                    <button type="button" className="btn btn-primary" onClick={handleLoginSubmit}>Đăng nhập</button>
                                </form>
                            )}
                        </div>
                        <div className="modal-footer">
                            <p className="mb-0">Bạn chưa có tài khoản? <a href="#" data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#registerModal">Tạo tài khoản mới</a></p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Register Modal */}
            <div className="modal fade" id="registerModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="registerModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="registerModalLabel">Đăng ký</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Tham gia cộng đồng của chúng tôi</p>
                            {state.loading ? (
                                <div className="text-center mt-5 mb-5">
                                    <Spinner animation="border" />
                                    <p>Đang xử lý ...</p>
                                </div>
                            ) : state.registerSuccess ? (
                                <div className="text-success text-center mt-5 mb-5">
                                    <i class="fa-solid fa-check fs-1"></i>
                                    <p>Đăng ký thành công!</p>
                                    <p><a href="#" data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#loginModal">Đăng nhập</a> để tiếp tục.</p>
                                </div>
                            ) : (
                                <form>
                                    {state.error && (
                                        <div>
                                            <div className="text-danger mb-3">{state.error}</div>
                                        </div>
                                    )}
                                    <div className="mb-3">
                                        <label htmlFor="registerUsername" className="form-label">Tên đăng nhập</label>
                                        <input type="text" className="form-control" id="registerUsername" name="username" value={registerForm.username} onChange={handleRegisterChange} />
                                        {errors.username && <div className="text-danger">{errors.username}</div>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="avatar" className="form-label">Tải lên ảnh đại diện</label>
                                        <input type="file" className="form-control" id="avatar" name="avatar" onChange={handleRegisterChange} />
                                        {errors.avatar && <div className="text-danger">{errors.avatar}</div>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="registerEmail" className="form-label">Email</label>
                                        <input type="email" className="form-control" id="registerEmail" name="email" value={registerForm.email} onChange={handleRegisterChange} />
                                        {errors.email && <div className="text-danger">{errors.email}</div>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="registerPassword" className="form-label">Mật khẩu</label>
                                        <input type="password" className="form-control" id="registerPassword" name="password" value={registerForm.password} onChange={handleRegisterChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="registerConfirmPassword" className="form-label">Xác nhận mật khẩu</label>
                                        <input type="password" className="form-control" id="registerConfirmPassword" name="confirmPassword" value={registerForm.confirmPassword} onChange={handleRegisterChange} />
                                        {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}
                                    </div>
                                    <div className="form-check mb-3">
                                        <input type="checkbox" className="form-check-input" id="acceptPolicy" name="acceptPolicy" checked={registerForm.acceptPolicy} onChange={handleRegisterChange} />
                                        <label className="form-check-label" htmlFor="acceptPolicy">Tôi đồng ý với <a href="#">điều khoản và chính sách</a></label>
                                        {errors.acceptPolicy && <div className="text-danger">{errors.acceptPolicy}</div>}
                                    </div>
                                    <button type="button" className="btn btn-primary" onClick={handleRegisterSubmit}>Đăng ký</button>
                                </form>
                            )}
                        </div>
                        <div className="modal-footer">
                            <p className="mb-0">Bạn đã có tài khoản? <a href="#" data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#loginModal">Đăng nhập</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Authentication;
