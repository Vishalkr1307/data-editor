import { Alert, AlertIcon, Box, Button, HStack, Heading, PinInput, PinInputField, Stack, useColorModeValue } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { postOtpVerificationData, postResendPasswordData } from '../redux/auth/action'

export const VerifyOtp = () => {
    const bgColor=useColorModeValue("gray.50",'gray.700')
    const [text,setText]=useState({
        otp:""
    })
    const {isLoading,isError,user,token,verifyData,isAuth,status}=useSelector((store)=>store.auth)
    const dispatch=useDispatch()
    const {id}=useParams()
    const navigate=useNavigate()
    const location=useLocation()
    
    const handleOtp=()=>{
        dispatch(postOtpVerificationData(id,text))

    }

    const handleResend=()=>{
       
            dispatch(postResendPasswordData(id))

        

    }

    useEffect(()=>{
        if(status && isAuth){
            navigate(location.state.from.pathname =="/auth/login" ? "/":location?.state.from.pathname=="/auth/register"?"/auth/login":`/auth/login/forgetpassword/resetpassword/${user._id}`,{replace:true})
        }

    },[status,isAuth])
    

    
  return (
    <Box bg={bgColor} minH={'100vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Stack justifyContent={'center'} alignItems={'center'} spacing={4}>
            <Stack justify={'center'} alignItems={'center'}>
                <Heading textAlign={'center'}>Please enter Your Otp for verification</Heading>
            </Stack>
            <Stack>
                {isError && <Alert status='error'>
                    <AlertIcon/>
                    {isError}
                    </Alert>}
                {status && <Alert status='success'>
                    <AlertIcon/>
                    {status}
                    </Alert>}
                
            </Stack>
            <HStack>
                <PinInput otp onChange={(val)=>setText({otp:val})}>
                    <PinInputField/>
                    <PinInputField/>
                    <PinInputField/>
                    <PinInputField/>
                </PinInput>
            </HStack>
            <Stack direction={'row'} alignItems={'center'}>
                <Button onClick={handleResend} colorScheme='teal' py={2} px={10} _hover={{bg:"teal.300"}}>Resend-It</Button>

                <Button onClick={handleOtp} colorScheme='teal' py={2} px={10} _hover={{bg:"teal.300"}}>Verify-Otp</Button>
            </Stack>
        </Stack>

    </Box>
  )
}
