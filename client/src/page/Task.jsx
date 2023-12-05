import { Box, Heading, Stack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { TaskStatus } from '../componet/TaskStatus'
import {useSelector,useDispatch} from "react-redux"
import { getTaskData } from '../redux/app/action'

export const Task = () => {
  const {loading,error,task}=useSelector((store)=>store.app)
  const dispatch=useDispatch()

  useEffect(()=>{
    if(task.length==0){

      dispatch(getTaskData())
    }
    
    

  },[task])

  console.log(task)


 
  return (
    <Box>
        <Stack direction={'row'} width={'80vw'} justifyContent={'space-around'}>
            <Box border={'1px solid red'} width={'400px'} minH={'100vh'}>
              <TaskStatus  task={task} tasks_status="todo"/>
            </Box>
            <Box border={'1px solid red'} width={'400px'} minH={'100vh'}>
            <TaskStatus  task={task} tasks_status="in-progress"/>

            </Box>
            <Box border={'1px solid red'} width={'400px'} minH={'100vh'}>
            <TaskStatus  task={task} tasks_status="done"/>

            </Box>
        </Stack>

    </Box>
  )
}
