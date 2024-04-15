import React, { useState, useRef, useEffect } from 'react';
import { Button, IconButton, Input, InputAdornment, InputLabel, FormHelperText, useForm, CloseIcon } from "../../../assets/MaterialUiExports.js";
import { OTPSignUp } from "../../../assets/DialogueAssets.js"
import { verifyOTP } from '../../../features/auth/userAuthSlice.js';
import { useDispatch, useSelector } from "react-redux";
import { resendOTP } from '../../../features/auth/userAuthSlice.js';
import "./Otp.css";

const Otp = ({ openOTP, setOpenOTP, setOpenSignUp, reset }) => {
    const dispatch = useDispatch();
    const inputRefs = useRef([]);
    const [otp, setOtp] = useState(['', '', '', '']);
    const verifingOtp = useSelector((state) => resendOTP(state.user));

    // Handle change for each digit input
    const handleChange = (index, value) => {
        if (/^\d*$/.test(value)) {
            const updatedOtp = [...otp];
            updatedOtp[index] = value;
            setOtp(updatedOtp);

            // Automatically move focus to the next input field if a digit is entered
            if (value !== '' && index < otp.length - 1 && inputRefs.current[index + 1]) {
                inputRefs.current[index + 1].focus();
            } 
        }
    };

    useEffect(()=>{
      if(verifingOtp === "success" ){
        setOpenOTP(false);
        setOpenSignUp(false);
        reset()
      }else if(verifingOtp === "resend"){
        setOpenOTP(false);
      }
    }, [verifingOtp])

    // Handle form submission
    const handleSubmit = () => {
      
        const enteredOtp = otp.join('');
        dispatch(verifyOTP(enteredOtp));
        setOtp(['', '', '', ''])
    };

    return (
        <>
            <OTPSignUp onClose={() => setOpenOTP(false)} open={openOTP} >
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }}>
                    <div className="otpForm">
                        <p className="otpHeading">Enter OTP</p>
                        <div className="otpInputContainer">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    value={digit}
                                    maxLength={1}
                                    min={0}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    className="otpInput"
                                    ref={(input) => {
                                        inputRefs.current[index] = input;
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                    <div className='btnOtpDiv'>
                    <Button id="btnOtp" type='submit' variant='contained' >{verifingOtp === "pending" ? "Verifing..." : "Verify"}</Button>

                    </div>
                </form>
            </OTPSignUp>
        </>
    );
};

export default Otp;
