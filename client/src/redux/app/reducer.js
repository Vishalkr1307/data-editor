import { ADD_TASK_FAILURE, DELETE_TASK_FAILURE,ADD_TASK_REQUEST, ADD_TASK_SUCCESS, DELETE_TASK_REQUEST, DELETE_TASK_SUCCESS, GET_TASK_FAILURE, GET_TASK_REQUEST, GET_TASK_SUCCESS, SINGLE_TASK_FAILURE, SINGLE_TASK_REQUEST, SINGLE_TASK_SUCCESS, UPDATE_TASK_FAILURE, UPDATE_TASK_REQUEST, UPDATE_TASK_SUCCESS } from "./actionType"

const init={
    loading:false,
    error:false,
    task:[],
    singleData:{}

}

export const appReducer=(store=init,{type,payload})=>{
    switch(type){
        case GET_TASK_REQUEST:
            return {...store,loading:true}
        case GET_TASK_SUCCESS:
            return {...store,loading:false,task:payload}
        case GET_TASK_FAILURE:
            return {...store,loading:false,error:payload}
        case ADD_TASK_REQUEST:
            return {...store,loading:true}
        case ADD_TASK_SUCCESS:
            return {...store,loading:false,}
        case ADD_TASK_FAILURE:
            return {...store,loading:false,error:payload}
        case SINGLE_TASK_REQUEST:
            return {...store,loading:true}
        case SINGLE_TASK_SUCCESS:
            return {...store,loading:false,singleData:payload}
        case SINGLE_TASK_FAILURE:
            return {...store,loading:false,error:payload}
        case UPDATE_TASK_REQUEST:
            return {...store,loading:true}
        // case UPDATE_TASK_SUCCESS:
        //     return {...store,loading:false}
        case UPDATE_TASK_FAILURE:
            return {...store,loading:false,error:payload}
        case DELETE_TASK_REQUEST:
            return {...store,loading:true}
        case DELETE_TASK_SUCCESS:
            return {...store,loading:false}
        case DELETE_TASK_FAILURE:
            return {...store,loading:false,error:payload}
        default:
            return {...store}

    }

}