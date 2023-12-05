import { Alert, AlertIcon, Box, Button, FormControl, FormLabel, Heading, Input, Spinner, Stack, useColorModeValue } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postForgetPassword } from '../redux/auth/action'
import { useLocation, useNavigate } from 'react-router-dom'

export const ForgetPassword = () => {
    const bgColor=useColorModeValue("gray.50",'grya.700')
    const [text,setText]=useState({email:""})
    const {isLoading,isError,verifyData,status}=useSelector((store)=>store.auth)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const location=useLocation()
    const handleButton=()=>{
        dispatch(postForgetPassword(text))
    }
    useEffect(()=>{
        if(verifyData.userId && status){
            navigate(`/auth/verifyotp/${verifyData.userId}`,{replace:true,state:{from:location}})

        }

    },[verifyData.userId,status])
  return (
    <Box bg={bgColor} minH={'100vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Stack minW={'400px'} spacing={6}>
            <Stack>
                <Heading textAlign={'center'}>
                    Forget -Password
                </Heading>
            </Stack>
            <Stack bg={useColorModeValue("white","whiteAlpha.400")} spacing={6} px={4} py={14} rounded={'lg'} boxShadow={'lg'}>
                {isError && <Alert status='error'>
                    <AlertIcon/>
                    {isError}
                    </Alert>}
                <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input type='text' onChange={(e)=>setText({email:e.target.value})}/>
                </FormControl>
                <Button colorScheme='teal' onClick={handleButton}>{isLoading?<Spinner/>:"Forget-Password"}</Button>
            </Stack>
        </Stack>
    </Box>
  )
}

