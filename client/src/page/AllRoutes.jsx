import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from './Home'
import { Login } from './Login'
import { Register } from './Register'
import { VerifyOtp } from '../componet/VerifyOtp'
import { ForgetPassword } from '../componet/ForgetPassword'
import { ResetPassword } from '../componet/ResetPassword'
import { AddTask } from './AddTask'
import { Task } from './Task'
import { Stack } from '@chakra-ui/react'
import { SideBar } from '../componet/SideBar'
import { UpdateTask } from '../componet/UpdateTask'
// import { px } from 'framer-motion'

export const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/task/addTask' element={<AddTask/>}/>
        <Route path='/task/updateTask/:id' element={<UpdateTask/>}/>
        <Route path='/task/getTask' element={<Stack maxW={'100vw'} direction={{md:'row'} } px={2}>
          <SideBar/>
          <Task/>
        </Stack>}/>
        <Route path='/auth/login' element={<Login/>}/>
        <Route path='/auth/login/forgetpassword' element={<ForgetPassword/>}/>
        <Route path='/auth/login/forgetpassword/resetpassword/:id' element={<ResetPassword/>}/>
        <Route path='auth/register' element={<Register/>}/>
        <Route path='auth/verifyotp/:id' element={<VerifyOtp/>}/>
    </Routes>
  )
}
