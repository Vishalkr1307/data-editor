import { ADD_FORGET_PASSWORD_FAILURE, ADD_FORGET_PASSWORD_REQUEST, ADD_FORGET_PASSWORD_SUCCESS, ADD_LOGIN_FAILURE, ADD_LOGIN_REQUEST, ADD_LOGIN_SUCCESS, ADD_OTP_VERIFICATION_FAILURE, ADD_OTP_VERIFICATION_REQUEST, ADD_OTP_VERIFICATION_SUCCESS, ADD_REGISTER_FAILURE, ADD_REGISTER_REQUEST, ADD_REGISTER_SUCCESS, ADD_RESET_PASSWORD_FAILURE, ADD_RESET_PASSWORD_REQUEST, ADD_RESET_PASSWORD_SUCCESS, RESEND_PASSWORD_FAILURE, RESEND_PASSWORD_REQUEST, RESEND_PASSWORD_SUCCESS } from "./actionType";
import axios from "axios"

export const addLoginRequest=(payload)=>({
    type:ADD_LOGIN_REQUEST,
    payload
})
export const addLoginFailure=(payload)=>({
    type:ADD_LOGIN_FAILURE,
    payload
})
export const addLoginSuccess=(payload)=>({
    type:ADD_LOGIN_SUCCESS,
    payload
})

export const addRegisterRequest=(payload)=>({
    type:ADD_REGISTER_REQUEST,
    payload
})
export const addRegisterFailure=(payload)=>({
    type:ADD_REGISTER_FAILURE,
    payload
})
export const addRegisterSuccess=(payload)=>({
    type:ADD_REGISTER_SUCCESS,
    payload
})

export const addForgetRequest=(payload)=>({
    type:ADD_FORGET_PASSWORD_REQUEST,
    payload
    
})

export const addForgetSuccess=(payload)=>({
    type:ADD_FORGET_PASSWORD_SUCCESS,
    payload
});

export const addForgetFailure=(payload)=>({
    type:ADD_FORGET_PASSWORD_FAILURE,
    payload
});

export const resetPasswordRequest=(payload)=>({
    type:ADD_RESET_PASSWORD_REQUEST,
    payload
});

export const resetPasswordSuccess=(payload)=>({
    type:ADD_RESET_PASSWORD_SUCCESS,
    payload
});

export const resetPasswordFailure=(payload)=>({
    type:ADD_RESET_PASSWORD_FAILURE,
    payload
});

export const verifyOtpRequest=(payload)=>({
    type:ADD_OTP_VERIFICATION_REQUEST,
    payload
});

export const verifyOtpFailure=(payload)=>({
    type:ADD_OTP_VERIFICATION_FAILURE,
    payload
});

export const verifyOtpSuccess=(payload)=>({
    type:ADD_OTP_VERIFICATION_SUCCESS,
    payload
});

export const resendPasswordRequest=(payload)=>({
    type:RESEND_PASSWORD_REQUEST,
    payload
});

export const resendPasswordFailure=(payload)=>({
    type:RESEND_PASSWORD_FAILURE,
    payload
});

export const resendPasswordSuccess=(payload)=>({
    type:RESEND_PASSWORD_SUCCESS,
    payload

});

export const postLoginData=(payload)=>(dispatch)=>{
    dispatch(addLoginRequest())
    axios.post("/auth/login",payload).then((res)=>dispatch(addLoginSuccess(res.data))).catch((err)=>dispatch(addLoginFailure(err.response.data)))
}

export const postRegisterData=(payload)=>(dispatch)=>{
    dispatch(addRegisterRequest())
    axios.post("/auth/register",payload).then((res)=>dispatch(addRegisterSuccess(res.data))).catch((err)=>dispatch(addRegisterFailure(err.response.data)))
}

export const postOtpVerificationData=(id,payload)=>(dispatch)=>{
    dispatch(verifyOtpRequest())
    axios.post(`/auth/verifyotp/${id}`,payload).then((res)=>dispatch(verifyOtpSuccess(res.data))).catch((err)=>dispatch(verifyOtpFailure(err.response.data)))
}

export const postForgetPassword=(payload)=>(dispatch)=>{
    dispatch(addForgetRequest())
    axios.post("/auth/login/forgetpassword",payload).then((res)=>dispatch(addForgetSuccess(res.data))).catch((err)=>dispatch(addForgetFailure(err.response.data)))
}

export const postResetPasswordData=(id,payload)=>(dispatch)=>{
    dispatch(resetPasswordRequest())
    axios.patch(`/auth/login/forgetpassword/resetpassword/${id}`,payload).then((res)=>dispatch(resetPasswordSuccess(res.data))).catch((err)=>dispatch(resetPasswordFailure(err.response.data)))
}

export const postResendPasswordData=(payload)=>(dispatch)=>{
    dispatch(resendPasswordRequest())
    axios.post(`/auth/resendotp/${payload}`).then((res)=>dispatch(resendPasswordSuccess(res.data))).catch((err)=>dispatch(resendPasswordFailure(err.response.data)))
}