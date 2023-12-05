import { Box, Button,Spinner,Checkbox, FormControl, FormLabel, HStack, Heading, Input, InputGroup, InputLeftAddon, InputRightElement, Stack, Text, useColorModeValue, Alert, AlertIcon, IconButton } from '@chakra-ui/react'
import React, { useEffect, useReducer, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {useSelector,useDispatch} from "react-redux"
import {ViewIcon,ViewOffIcon} from "@chakra-ui/icons"
import { postLoginData } from '../redux/auth/action'
import {FcGoogle} from "react-icons/fc"
import {AiFillGithub} from "react-icons/ai"

const init={
    email:"",
    password:"",
}
const reducer=(store,{type,payload})=>{
    switch(type){
        case 'email':
            return {...store,email:payload}
        case 'password':
            return {...store,password:payload}
        default:
            return {...store}
    }

}
export const Login = () => {
    const bgColor=useColorModeValue("gray.200",'white.100')
    const [text,setText]=useReducer(reducer,init)
    const [showPassword,setShowPassword]=useState(false)
    const {isLoading,isError,verifyData,isLogin}=useSelector((store)=>store.auth)
    const dispatch=useDispatch()
    const location=useLocation()
    const navigate=useNavigate()


    const handleButton=()=>{
        if(text){
            dispatch(postLoginData(text))
        }
    }
    useEffect(()=>{
        if(verifyData.userId && isLogin){
            navigate(`/auth/verifyotp/${verifyData.userId}`,{state:{from:location},replace:true})
        }


    },[verifyData,isLogin])
  
  return (
    <Box bg={bgColor} minH={'100vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Stack>
            <Stack textAlign={'center'}>
                <Heading fontSize={'4xl'}>LogIn to  your account</Heading>
                <Heading size={'20xl'}>to enjoy all our cool features <Text color={'blue.400'}>features</Text></Heading>
            </Stack>
            <Box bg={useColorModeValue("white","gray.700")} rounded={'lg'} boxShadow={'lg'}>
                <Stack px={4} py={8} spacing={4}>
                    {isError && <Alert status='error'>
                        <AlertIcon/>
                        {isError}
                        </Alert>}
                    <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input type='email' onChange={(e)=>setText({type:"email",payload:e.target.value})}/>
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
                    <HStack justify={'space-between'} mt={4}> 
                        <Checkbox>Remmber it</Checkbox>
                        <Link to={"/auth/login/forgetpassword"}><Text color={'blue.400'}>Forget Password</Text></Link>

                    </HStack>
                    <Button colorScheme='teal' onClick={handleButton}>{isLoading?<Spinner/>:"Login"}</Button>
                    <Stack  textAlign={'center'}>
                        <Link to="/auth/register">did'nt Have a account ? <Text color={'blue.400'}>Register</Text></Link>
                    </Stack>
                    <Stack direction={'row'} justify={'center'} alignItems={'center'} spacing={8}>

                    <IconButton variant={'ghost'} cursor={'pointer'}><FcGoogle size={'xxl'}/></IconButton>
                    <IconButton variant={'ghost'} cursor={'pointer'}><AiFillGithub size={'xxl'}/></IconButton>

                   </Stack>
                </Stack>
                

            </Box>
        </Stack>
    </Box>
  )
}
