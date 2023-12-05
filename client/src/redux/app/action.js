import axios from "axios";
import { ADD_TASK_FAILURE, ADD_TASK_REQUEST, ADD_TASK_SUCCESS, DELETE_TASK_FAILURE, DELETE_TASK_REQUEST, DELETE_TASK_SUCCESS, GET_TASK_FAILURE, GET_TASK_REQUEST, GET_TASK_SUCCESS, SINGLE_TASK_FAILURE, SINGLE_TASK_REQUEST, SINGLE_TASK_SUCCESS, UPDATE_TASK_FAILURE, UPDATE_TASK_REQUEST, UPDATE_TASK_SUCCESS } from "./actionType";

export const getTaskRequest=(payload)=>({
    type:GET_TASK_REQUEST,
    payload
})

export const getTaskSuccess=(payload)=>({
    type:GET_TASK_SUCCESS,
    payload
})

export const getTaskFailure=(payload)=>({
    type:GET_TASK_FAILURE,
    payload
})

export const addTaskRequest=(payload)=>({
    type:ADD_TASK_REQUEST,
    payload
})

export const addTaskSuccess=(payload)=>({
    type:ADD_TASK_SUCCESS,
    payload
})

export const addTaskFailure=(payload)=>({
    type:ADD_TASK_FAILURE,
    payload
})

export const singleTaskRequest=(payload)=>({
    type:SINGLE_TASK_REQUEST,
    payload
})

export const singleTaskSuccess=(payload)=>({
    type:SINGLE_TASK_SUCCESS,
    payload
})

export const singleTaskFailure=(payload)=>({
    type:SINGLE_TASK_FAILURE ,
    payload
})

export const updateTaskRequest=(payload)=>({
    type:UPDATE_TASK_REQUEST,
    payload
})

export const updateTaskSuccess=(payload)=>({
    type:UPDATE_TASK_SUCCESS,
    payload
})

export const updateTaskFailure=(payload)=>({
    type:UPDATE_TASK_FAILURE,
    payload
})


export const deleteTaskRequest=(payload)=>({
    type:DELETE_TASK_REQUEST,
    payload
})

export const deleteTaskSuccess=(payload)=>({
    type:DELETE_TASK_SUCCESS,
    payload
})

export const deleteTaskFailure=(payload)=>({
    type:DELETE_TASK_FAILURE,
    payload
})

export const addTaskData=(payload,token)=>(dispatch)=>{
    dispatch(addTaskRequest())
    axios.post("/task/addTask",payload,{
        headers:{
            'Authorization':`Bearer ${token}`
        }
    }).then((res)=>dispatch(getTaskData())).catch((err)=>console.log(err.response.data))

}

export const getTaskData=(payload)=>(dispatch)=>{
    dispatch(getTaskRequest())
    axios.get("/task/getTask").then((res)=>dispatch(getTaskSuccess(res.data))).catch((err)=>dispatch(getTaskFailure(err.response.data)))
}

export const singleTaskData=(payload)=>(dispatch)=>{
    dispatch(singleTaskRequest())
    axios.get(`/task/getTask/${payload}`)
}

export const updateTaskData=(id,payload)=>(dispatch)=>{
    dispatch(updateTaskRequest())
    axios.patch(`/task/updateTask/${id}`, payload).then((res)=>dispatch(getTaskData()))
}

export const deleteTaskData=(id)=>(dispatch)=>{
    dispatch(deleteTaskRequest())
    axios.delete(`/task/deleteTask/${id}`)
}