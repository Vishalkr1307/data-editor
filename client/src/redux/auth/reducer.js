import { getLocalData, postLocalData } from "../../Utiles/storage"
import { ADD_FORGET_PASSWORD_FAILURE, ADD_FORGET_PASSWORD_REQUEST, ADD_FORGET_PASSWORD_SUCCESS, ADD_LOGIN_FAILURE, ADD_LOGIN_REQUEST, ADD_LOGIN_SUCCESS, ADD_OTP_VERIFICATION_FAILURE, ADD_OTP_VERIFICATION_REQUEST, ADD_OTP_VERIFICATION_SUCCESS, ADD_REGISTER_FAILURE, ADD_REGISTER_REQUEST, ADD_REGISTER_SUCCESS, ADD_RESET_PASSWORD_FAILURE, ADD_RESET_PASSWORD_REQUEST, ADD_RESET_PASSWORD_SUCCESS, RESEND_PASSWORD_FAILURE, RESEND_PASSWORD_REQUEST, RESEND_PASSWORD_SUCCESS } from "./actionType"

const init={
    isLoading:false,
    isError:false,
    token:getLocalData("token")||"",
    isAuth:getLocalData("token")?true:false,
    verifyData:{},
    status:"",
    user:{},
    resetPassword:"",
    isLogin:false,
    isRegister:false,


}
export const authReducer=(store=init,{type,payload})=>{
    switch(type){
        case ADD_LOGIN_REQUEST:
            return {...store,isLoading:true}
        case ADD_LOGIN_SUCCESS:
            return {...store,isLoading:false,verifyData:payload,isError:false,isLogin:true}
        case ADD_LOGIN_FAILURE:
            return {...store,isLoading:false,isError:payload}
        case ADD_OTP_VERIFICATION_REQUEST:
            return {...store,isLoading:true}
        case ADD_OTP_VERIFICATION_SUCCESS:
            postLocalData("token",payload.token)
            return {...store,isLoading:false,isError:false,token:payload.token,status:payload.status,isAuth:true,user:payload.user}
        case ADD_OTP_VERIFICATION_FAILURE:
            return {...store,isLoading:false,isError:payload}
        case RESEND_PASSWORD_REQUEST:
            return {...store,isLoading:true}
        case RESEND_PASSWORD_SUCCESS:
            return {...store,isLoading:false,status:payload.status,verifyData:payload.sendData}
        case RESEND_PASSWORD_FAILURE:
            return {...store,isLoading:false,isError:payload}
        case ADD_FORGET_PASSWORD_REQUEST:
            return {...store,isLoading:true}
        case ADD_FORGET_PASSWORD_SUCCESS:
            return {...store,isLoading:false,isError:false,status:payload.status,verifyData:payload.sendData}
        case ADD_FORGET_PASSWORD_FAILURE:
            return {...store,isLoading:false,isError:payload}
        case ADD_RESET_PASSWORD_REQUEST:
            return {...store,isLoading:true}
        case ADD_RESET_PASSWORD_SUCCESS:
            return {...store,isLoading:false,resetPassword:payload.status}
        case ADD_RESET_PASSWORD_FAILURE:
            return {...store,isLoading:false,isError:payload}
        case ADD_REGISTER_REQUEST:
            return {...store,isLoading:true}
        case ADD_REGISTER_SUCCESS:
            return {...store,isLoading:false,verifyData:payload,isError:true}
        case ADD_REGISTER_FAILURE:
            return {...store,isLoading:false,isError:payload}
        default:
            return {...store}
    }

}