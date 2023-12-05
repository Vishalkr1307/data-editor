import { Alert, AlertIcon, Box, Button, FormControl, FormLabel, Heading, Input, Stack, useColorModeValue } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { postResendPasswordData, postResetPasswordData } from '../redux/auth/action'

export const ResetPassword= () => {
    const bgColor=useColorModeValue("gray.50",'grya.700')
    const [text,setText]=useState({newPassword:""})
    const {id}=useParams()
    const {isLoading,isError,status,resetPassword}=useSelector((store)=>store.auth)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const location=useLocation()
    const handleButton=()=>{
        if(id && text){
            dispatch(postResetPasswordData(id, text))
        }
    }
    useEffect(()=>{
        if(resetPassword){
            alert(resetPassword)

            navigate("/auth/login",{replace:true})
        }


    },[resetPassword])
    
  return (
    <Box bg={bgColor} minH={'100vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Stack minW={'300px'} spacing={6}>
            <Stack>
                <Heading textAlign={'center'}>
                    Reset-Password
                </Heading>
            </Stack>
            <Stack bg={useColorModeValue("white","whiteAlpha.400")} spacing={6} px={4} py={14} rounded={'lg'} boxShadow={'lg'}>
                {isError && <Alert status='error'>
                    <AlertIcon/>
                    {isError}
                    </Alert>}
                <FormControl>
                    <FormLabel>New-Password</FormLabel>
                    <Input type='text' onChange={(e)=>setText({newPassword:e.target.value})}/>
                </FormControl>
                <Button colorScheme='teal' onClick={handleButton}>Reset-Password</Button>
            </Stack>
        </Stack>
    </Box>
  )
}

