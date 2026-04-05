import { useState } from 'react';
import { Link} from 'react-router-dom';
import amazonlogo from '../images/amazonLogo.png';
import { isEmailValid } from '../utils/utils';
import { signinApi } from '../services/authService';
import { ERROR_MESSAGES } from '../constants/errors';
import { toast } from 'react-toastify';
import { ToastContainer } from "react-toastify";

function Login() {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginErrors, setLoginErrors] = useState({ email: false, password: false, apiError: false });


  const handleLogin = async () => {

    let hasErrors = false;
    let tempErrors = { ...loginErrors };

    if (isEmailValid(loginData.email) === false) {
      hasErrors = true;
      tempErrors = { ...tempErrors, email: true };
    } else {
      tempErrors = { ...tempErrors, email: false };
    }

    if (loginData.password.length < 6) {
      hasErrors = true;
      tempErrors = { ...tempErrors, password: true };
    } else {
      tempErrors = { ...tempErrors, password: false };
    }

    setLoginErrors({ ...tempErrors });

    if (hasErrors === false) {
      try {
        const apiResponse = await signinApi(loginData);
        if (apiResponse.data.result === 'success') {
          localStorage.setItem('userData', JSON.stringify(apiResponse.data.data));
          window.location ='/';
        }
      } catch (error) {

          // ❌ Network / CORS error
          if (!error.response) {
            toast.error("Network error / CORS issue. Please try again later.");
          }

          else if (error.response.status === 400) {
            setLoginErrors({ ...tempErrors, apiError: true });
          }

          // ⚠️ Other errors
          else {
            toast.error("Something went wrong. Please try again.");
          }
        }
    }
  };

  return (
    <div className="container">
      <div className="mt-4 row justify-content-center">
        <div className="col-sm-8 col-md-6 col-lg-4">
          <div className="text-center">
            <img src={amazonlogo} className="img-fluid" width={120} alt="amazon logo" />
          </div>
          <div className="card mt-3">
            <div className="card-body">
              <h3>Sign in</h3>

              <div className="mt-3">
                <label htmlFor="email"><strong>Your email</strong></label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="enter your email"
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                />
                <div className="text-danger">
                  {loginErrors.email && ERROR_MESSAGES.LOGIN.EMAIL}
                </div>
              </div>

              <div className="mt-3">
                <label htmlFor="pswd"><strong>Password</strong></label>
                <input
                  type="password"
                  className="form-control"
                  id="pswd"
                  placeholder="password"
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                />
                <div className="text-danger">
                  {loginErrors.password && ERROR_MESSAGES.LOGIN.PASSWORD}
                </div>
              </div>

              <div className="d-grid mt-3">
                <button className="btn btn-warning rounded-5" onClick={handleLogin}>Login</button>
                <div className="text-danger">
                  {loginErrors.apiError && ERROR_MESSAGES.LOGIN.API_ERROR}
                </div>
              </div>
              <div className='text-primary'>
                <Link to="/reset-password" className='text-decoration-none'>Forgot password ? </Link>
              </div>

              <div className="mt-4">
                <span className="fs-6">
                  By continuing, you agree to Amazon's
                  <Link to="/conditions" className="text-decoration-none"> Conditions of Use</Link> and
                  <Link to="/policies" className="text-decoration-none"> Privacy Notice</Link>.
                </span>
              </div>

              <hr />

              <div>
                <strong>Buying for work?</strong> <br />
                <Link to="/create-business-account" className="text-decoration-none">
                  Create a free business account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr />

      <div className="justify-content-center row mb-5 mt-3">
        <div className="col-sm-8 col-md-6 col-lg-4">
          <div className="d-flex justify-content-around fs-6 mt-3">
            <Link to="/conditions" className="text-decoration-none">Conditions of Use</Link>
            <Link to="/policies" className="text-decoration-none">Privacy Notice</Link>
            <Link to="/help" className="text-decoration-none">Help</Link>
          </div>
          <div className="mt-2 text-center">
            &copy; 1996–2025, Amazon.com, Inc. or its affiliates
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
