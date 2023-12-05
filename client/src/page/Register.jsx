import { Alert, AlertIcon, Box, Button, Checkbox, FormControl, FormLabel, HStack, Heading, Input, InputGroup, InputLeftAddon, InputRightElement, Spinner, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import React, { useEffect, useReducer, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {useSelector,useDispatch} from "react-redux"
import {ViewIcon,ViewOffIcon} from "@chakra-ui/icons"
import { postRegisterData } from '../redux/auth/action'

const init={
    name:"",
    email:"",
    password:"",
}
const reducer=(store,{type,payload})=>{
    switch(type){
        case 'name':
            return {...store,name:payload}
        case 'email':
            return {...store,email:payload}
        case 'password':
            return {...store,password:payload}
        default:
            return {...store}
    }

}
export const Register = () => {
    const bgColor=useColorModeValue("gray.200",'white.100')
    const [text,setText]=useReducer(reducer,init)
    const [showPassword,setShowPassword]=useState(false)
    const {isLoading,isError,verifyData}=useSelector((store)=>store.auth)
    const dispatch=useDispatch()
    const naviagte=useNavigate()
    const location=useLocation()

    const handleRegister=()=>{
        if(text){
            dispatch(postRegisterData(text))

        }

    }
    useEffect(()=>{
        if(verifyData.userId){
            naviagte(`/auth/verifyotp/${verifyData.userId}`,{replace:true,state:{from:location}})

        }

    },[verifyData])
   
  
  return (
    <Box bg={bgColor} minH={'100vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Stack spacing={6}>
            <Stack textAlign={'center'}>
                <Heading fontSize={'4xl'}>Register to  your account</Heading>
                <Heading size={'20xl'}>to enjoy all our cool features <Text color={'blue.400'}>features</Text></Heading>
            </Stack>
            <Box bg={useColorModeValue("white","gray.700")} rounded={'lg'} boxShadow={'lg'}>
                <Stack px={6} py={8} spacing={4}>
                    {isError && <Alert status='error'>
                        <AlertIcon/>
                        {isError}
                        </Alert>}
                <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input type='text' onChange={(e)=>setText({type:"name",payload:e.target.value})}/>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input type='text' onChange={(e)=>setText({type:"email",payload:e.target.value})}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                            <Input type={showPassword?'text':'password'} onChange={(e)=>setText({type:"password",payload:e.target.value})}/>
                           <InputRightElement>
                            <Button variant={'ghost'} onClick={()=>setShowPassword((showPassword)=>!showPassword)}>{showPassword?<ViewIcon/>:<ViewOffIcon/>}</Button>
                           </InputRightElement>
                        </InputGroup>
                    </FormControl>
                    <Button colorScheme='teal' onClick={handleRegister}>{isLoading?<Spinner/>:"Register"}</Button>
                    <Stack  textAlign={'center'}>
                        <Link to="/auth/login">Already have a account ? <Text color={'blue.400'}>Login</Text></Link>
                    </Stack>
                </Stack>

            </Box>
        </Stack>
    </Box>
  )
}
