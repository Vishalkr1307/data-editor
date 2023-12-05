import { Heading, Stack,Box, useColorModeValue, FormControl, FormLabel, Input, Select, InputGroup, RadioGroup, HStack, Radio, Button, CheckboxGroup, Checkbox } from '@chakra-ui/react'
import React, { useReducer, useState } from 'react'
import {useSelector,useDispatch} from "react-redux"
import { addTaskData } from '../redux/app/action'

const init={
    tittle:"",
    description:"",
    task_status:"",
    tags:[],
    subTasks:[{subTasksTittle:""}]
}

const reducer=(store=init,{type,payload})=>{
    switch(type){
        case "tittle":
            return {...store,tittle:payload}
        case "description":
            return {...store,description:payload}
        case "task_status":
            return {...store,task_status:payload}
        case "tags":
            return {...store,tags:payload}
        case "subTasks":
            return {...store,subTasks:[{subTasksTittle:payload}]}
        default:
            return {...store}

    }
}
export const AddTask = () => {
    const bgColor=useColorModeValue("gray.50","gray.700")
    const [text,setText]=useReducer(reducer,init)
    const {task}=useSelector((store)=>store.app)
    const {token}=useSelector((store)=>store.auth)
    console.log(token)
    const dispatch=useDispatch()

    const handleButton=()=>{
        // console.log(text)
        dispatch(addTaskData(text,token))

    }
  return (
    <Box bg={bgColor} minH={'100vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Stack minW={'400px'} spacing={6}>
            <Stack>
                <Heading textAlign={'center'}>Add Data for Task</Heading>
            </Stack>
            <Stack bg={useColorModeValue("white","whiteAlpha.50")} px={4} py={8} rounded={'lg'} shadow={'lg'}>
                <FormControl>
                    <FormLabel>Tittle</FormLabel>
                    <Input type='text' onChange={(e)=>setText({type:"tittle",payload:e.target.value})}/>
                </FormControl>
                <FormControl>
                    <FormLabel>Description</FormLabel>
                    <Input type='text' onChange={(e)=>setText({type:"description",payload:e.target.value})}/>
                </FormControl>
                <FormControl>
                    <Select placeholder='Select task_Status' onChange={(val)=>setText({type:"task_status",payload:val.target.value})}>
                        <option value='todo'>Todo</option>
                        <option value='done'>Done</option>
                        <option value='in-progress'>In-Progress</option>
                    </Select>
                </FormControl>
                <FormControl>
                    <FormLabel>Select tags</FormLabel>
                    <CheckboxGroup colorScheme='teal' defaultValue={text.tags} onChange={(val)=>setText({type:"tags",payload:val})}>
                        <Stack spacing={2} direction={'row'}>

                            <Checkbox value={'offical'}>Offical</Checkbox>
                            <Checkbox value={'personal'}>Personal</Checkbox>
                            <Checkbox value={'other'}>Other</Checkbox>
                        </Stack>
                    </CheckboxGroup>

                </FormControl>
                <FormControl>
                    <FormLabel>SubTasks</FormLabel>
                    <Input type='text' onChange={(e)=>setText({type:"subTasks",payload:e.target.value})}/>
                </FormControl>
                <Button colorScheme='teal' onClick={handleButton}>Add-Task</Button>
            </Stack>
        </Stack>
    </Box>
  )
}
