import { useState } from 'react';

import amazonlogo from '../images/amazonLogo.png';
import { isEmailValid } from '../utils/utils';
import { ERROR_MESSAGES } from '../constants/errors';
import { Link } from 'react-router-dom';
import { forgotPasswordApi } from '../services/authService';

function ForgotPassword() {
  const [resetPasswordData, setResetPassworddata] = useState({ email: ''});
  const [resetPasswordErrors, setResetPasswordErrors] = useState({ email: false, apiError: false });

  let [apiMsg, setApiMsg] = useState("");


  let hasErrors = false;
  let tempErrors = { ...resetPasswordErrors };

  const handleResetPassword = async () => {
    if (isEmailValid(resetPasswordData.email) === false) {
      hasErrors = true;
      tempErrors = { ...tempErrors, email: true };
    } else {
      tempErrors = { ...tempErrors, email: false };
    }

    

    setResetPasswordErrors({ ...tempErrors });

    if (hasErrors === false) {
      try {
        const apiResponse = await forgotPasswordApi(resetPasswordData);
        if (apiResponse.data.result === 'success') {
          // localStorage.setItem('userData', JSON.stringify(apiResponse.data.data));
          setApiMsg(apiResponse.data.message);
          setResetPasswordErrors({email:false, apiError:false});
          
        }
      } catch (error) {
        setResetPasswordErrors({ email: false, apiError: true });
        setApiMsg("");
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
              <h3>Forgot Password</h3>

              <div className="mt-3">
                <label htmlFor="email"><strong>Your email</strong></label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="enter your email"
                  onChange={(e) => setResetPassworddata({ ...resetPasswordData, email: e.target.value })}
                />
                <div className="text-danger">
                  {resetPasswordErrors.email && ERROR_MESSAGES.FORGOT_PASSWORD.EMAIL}
                </div>
              </div>

              <div className="d-grid mt-3">
                <button className="btn btn-warning rounded-3" onClick={handleResetPassword}>Login</button>
                <div className="text-danger">
                  {resetPasswordErrors.apiError === true && ERROR_MESSAGES.FORGOT_PASSWORD.API_ERROR}
                </div>
                <div className="text-success">
                  {resetPasswordErrors.apiError === false && apiMsg}
                </div>
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
    </div>
  );
}

export default ForgotPassword;
