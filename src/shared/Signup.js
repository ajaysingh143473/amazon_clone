import { useState } from 'react';
import amazonlogo from '../images/amazonLogo.png'
import { signupApi } from '../services/authService';
import { isEmailValid } from '../utils/utils';
import { ERROR_MESSAGES } from '../constants/errors';
import { Link } from 'react-router-dom';
import { toast,ToastContainer } from 'react-toastify';

function Signup(){

    const [signupData, setSignupData] = useState({name:'',email:'',password:''});
    const [signupErrors, setSignupErrors] = useState({name:false, email:false, password:false,api_error:false});

    const nameUpdate = (e) => {
        setSignupData( {...signupData, name: e.target.value});
    }

    const emailUpdate = (e) => {
        setSignupData( {...signupData, email: e.target.value});
    }

    const passwordUpdate = (e) => {
        setSignupData( {...signupData, password: e.target.value});
    }

    const handleSignup = async () => {

        let tempErrors = {...signupErrors}
        let hasErrors = false;

        if( signupData.name.length < 3){
            hasErrors = true;
            tempErrors.name = true;
        }
        else{
            tempErrors.name = false;
        }

        if( isEmailValid(signupData.email) === false ){
            hasErrors = true;
            tempErrors.email = true;
        }
        else{
            tempErrors.email = false;
        }

        if( signupData.password.length < 6){
            hasErrors = true;
            tempErrors.password = true;
        }
        else{
            tempErrors.password = false;
        }

        setSignupErrors({...tempErrors});

        if(!hasErrors){
            try {
                let apiResponse = await signupApi({ ...signupData });

                if (apiResponse.data.result === "success") {
                    localStorage.setItem("userData", JSON.stringify(apiResponse.data.data));
                    window.location = "/";
                } else {
                    setSignupErrors({ ...tempErrors, api_error: true });
                }

            } catch (err) {
                console.log(err);

                // handle API / CORS / network error
                setSignupErrors({ ...tempErrors, api_error: true });
                toast.error("API error from backend");
            }
        }


    }

return(
        <div className="container">
            <div className=" mt-4 row justify-content-center">
                <div className="col-sm-8 col-md-6 col-lg-4">
                    <div className="text-center">
                        <img src={amazonlogo} className="img-fluid" width={120} alt="amazon logo"/>
                    </div>
                    <div className='card mt-3'>
                        <div className='card-body'>
                            <h2>Create Account</h2>
                            <div className='mt-3'>
                                <label htmlFor="name"><strong>Your name</strong></label>
                                <input type='text' className='form-control' id='name' onChange={e => nameUpdate(e)} placeholder='your full name' />
                                <div className='text-danger'>{signupErrors.name === true && ERROR_MESSAGES.SIGNUP.NAME}</div>
                            </div>
                            <div className='mt-3'>
                                <label htmlFor="email"><strong>Your email</strong></label>
                                <input type='email' className='form-control' id='email' onChange={e => emailUpdate(e)} placeholder='enter your email' />
                                <div className='text-danger'>{signupErrors.email === true && ERROR_MESSAGES.SIGNUP.EMAIL}</div>
                            </div>
                            <div className='mt-3'>
                                <label htmlFor="pswd"><strong>Password</strong></label>
                                <input type='password' className='form-control' id='pswd' onChange={e => passwordUpdate(e)} placeholder='password' />
                                <div className='text-danger'>{signupErrors.password === true && ERROR_MESSAGES.SIGNUP.PASSWORD}</div>
                            </div>
                            <div className='mt-3'>
                                <label htmlFor="cpswd"><strong>Confirm Password</strong></label>
                                <input type='password' className='form-control' id='cpswd' placeholder='confirm password' />
                            </div>
                            <div className='d-grid mt-3'>
                                <button className='btn btn-warning rounded-5' onClick={handleSignup}>Create Account</button>
                            </div>
                            <div className='mt-4'>
                                <span className='fs-6'>By continuing, you agree to Amazon's<Link to='/condintions'> Conditions of Use</Link> and <Link to='/policies'>Privacy Notice</Link>.</span>
                            </div>
                            <hr/>
                            <div>
                                <strong>Buying for work?</strong> <br/>
                                <Link to='/create-bussiness-account' className='text-decoration-none'>Create a free business account</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr/>
            <div className='justify-content-center row mb-5 mt-3 '>
                <div className='col-sm-8 col-md-6 col-lg-4'>
                    <div className='d-flex justify-content-around fs-6 mt-3'>
                        <Link to='/conditions' className='text-decoration-none' >Conditions of Use</Link>
                        <Link to='/policies' className='text-decoration-none'>Privacy Notice</Link>
                        <Link to='/help' className='text-decoration-none'>Help</Link>
                    </div>
                    <div className='mt-2 text-center'>
                        &copy; 1996–2025, Amazon.com, Inc. or its affiliates
                    </div>
                </div>
            </div>
            <ToastContainer position="top-center"/>
        </div>
    )
}

export default Signup;