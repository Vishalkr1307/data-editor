import { Box, Button, Flex, Stack ,Text} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { getTaskData } from '../redux/app/action'

export const SideBar = () => {
  const [serchParam,setSerchParam]=useSearchParams()
  const [serchTag,setSerchTag]=useState([])
  const {task}=useSelector((store)=>store.app)
  const dispatch=useDispatch()
  const handleTag=(val)=>{
    const newParam=[...serchTag]
    if(serchTag.includes(val)){
      newParam.splice(serchTag.indexOf(val),1)

    }
    else{
      newParam.push(val)
    }
    setSerchTag(newParam)

  }
  useEffect(()=>{
    if(serchTag){
      setSerchParam({tag:serchTag},{replace:true})
    }

  },[serchTag,serchParam,setSerchParam])
  useEffect(()=>{
    if(task.length==0){
      dispatch(getTaskData())
    }

  },[task.length])
  const all=task.length
  const personal=task.filter((item)=>item.tags.includes("personal")).length
  const offical=task.filter((item)=>item.tags.includes("offical")).length
  const others=task.filter((item)=>item.tags.includes("others")).length
  

  return (
    <Box minH={'100vh'} width={'25vw'} border={'1px solid red'}>
        <Stack>
            <Box height={'30vh'} border={'1px solid green'}>
              profile
            </Box>
            <Stack spacing={4} height={'55vh'} border={'1px solid green'} display={'flex'} flexDirection={'column'} justifyContent={'center'}>
               <Flex justifyContent={'space-between'} alignItems={'center'}  rounded={'xl'} bg={serchParam.getAll("tag").includes("all")?"teal":'red.400'} cursor={'pointer'} px={6} py={2} onClick={()=>handleTag("all")}>
                 <Text>All</Text>
                 <Text>{all}</Text>
               </Flex>
               <Flex justifyContent={'space-between'} alignItems={'center'} rounded={'xl'} bg={serchParam.getAll("tag").includes("personal")?"teal":"green.400"} cursor={'pointer'}  px={6} py={2} onClick={()=>handleTag("personal")}>
                 <Text>Personal</Text>
                 <Text>{personal}</Text>
               </Flex>
               <Flex justifyContent={'space-between'} alignItems={'center'} rounded={'xl'} bg={serchParam.getAll("tag").includes("offical")?"teal":'yellow.400'} cursor={'pointer'}  px={6} py={2} onClick={()=>handleTag("offical")}>
                 <Text>Offical</Text>
                 <Text>{offical}</Text>
               </Flex>
               <Flex justifyContent={'space-between'} alignItems={'center'} rounded={'xl'} bg={serchParam.getAll("tag").includes("others")?"teal":'blue.400'} cursor={'pointer'}  px={6} py={2} onClick={()=>handleTag("others")}>
                 <Text>Other</Text>
                 <Text>{others}</Text>
               </Flex>
            </Stack>
            
            <Box>
              Logout
            </Box>
        </Stack>
    </Box>
  )
}
