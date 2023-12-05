import { Box, Button, Checkbox, CheckboxGroup, FormControl, FormLabel, IconButton, Input, Radio, RadioGroup, Stack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getTaskData, updateTaskData } from '../redux/app/action'
import { DeleteIcon } from '@chakra-ui/icons'

export const UpdateTask = () => {
    const {task}=useSelector((store)=>store.app)
    const dispatch=useDispatch()
    const {id}=useParams()

    const [tittle,setTittle]=useState("")
    const [description,setDescription]=useState("")
    const [taskStatus,setTaskStatus]=useState("")
    const [tag,setTag]=useState([])
    const [subTasks,setSubTasks]=useState([])
    const [subTasksTittle,setSubTasksTittle]=useState("")
    const [checkbox,setCheckbox]=useState([])

    useEffect(()=>{
        if(task.length==0){
            dispatch(getTaskData())
        }

    },[task])

    useEffect(()=>{
        if(task){
            const currentTask=task.find((item)=>item._id===id)
            if(currentTask){
                setTittle(currentTask.tittle)
                setDescription(currentTask.description)
                setTaskStatus(currentTask.task_status)
                setTag(currentTask.tags)
                setSubTasks(currentTask.subTasks)

                let data=currentTask.subTasks.filter((item,ind)=>item.status && item.subTasksTittle).map((item,ind)=>item.subTasksTittle)
                setCheckbox(data)

            }
        }

    },[task])
    
    
    const handleUpdate=(name,value)=>{
        if(name==="tittle"){
            dispatch(updateTaskData(id,{
                tittle:tittle,
                description:description
            }))
        }
        else if(name==="task_status"){
            console.log(value)
            dispatch(updateTaskData(id,{
                task_status:value
            }))

        }
        else if(name==="tag"){
            dispatch(updateTaskData(id,{
                tags:value
            }))
        }
        else if(name==="update_subTask"){
            if(subTasksTittle){
                var newSubTask=[...subTasks,{
                    subTasksTittle:subTasksTittle
                }]
                dispatch(updateTaskData(id,{
                    subTasks:newSubTask
                }))
            }


        }
        else if(name==="update_checkbox"){
            const update=subTasks.map((item)=>{
                if(value.includes(item.subTasksTittle)){
                    return {...item,status:true}
                }
                else{
                    return {...item,status:false}
                }
            })
            dispatch(updateTaskData(id,{subTasks:update}))
        }
        else if(name==="delete"){
            var deleteData=subTasks.filter((item)=>item.subTasksTittle!==value)
            dispatch(updateTaskData(id,{subTasks:deleteData}))
        
        }
    
        

    }
    


    

  return (
    <Box px={8}>
        <Stack direction={'row'} justifyContent={'space-between'} >
            <Box border={'1px solid red'} width={'40vw'} height={'100vh'} px={4}>
                <Stack>
                    <Stack>
                        <FormControl>
                            <FormLabel>Tittle</FormLabel>
                            <Input type='text' value={tittle} onChange={(e)=>setTittle(e.target.value)} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Description</FormLabel>
                            <Input type='text' value={description} onChange={(e)=>setDescription(e.target.value)}/>
                        </FormControl>
                        <Button colorScheme='teal' onClick={()=>handleUpdate("tittle")}>Updata-Data</Button>
                    </Stack>
                    <Stack>
                        <RadioGroup value={taskStatus} onChange={(val)=>{
                            setTaskStatus(val);
                            handleUpdate("task_status",val)
                        }}>
                            <Stack>
                                <Radio value='todo'>Todo</Radio>
                                <Radio value='in-progress'>In-Progress</Radio>
                                <Radio value='done'>Done</Radio>
                            </Stack>
                        </RadioGroup>
                    </Stack>
                    <Stack>
                        <CheckboxGroup value={tag} onChange={(val)=>{
                            setTag(val);
                            handleUpdate("tag", val);
                        }}>
                            <Checkbox value={'personal'}>Personal</Checkbox>
                            <Checkbox value={'offical'}>Offical</Checkbox>
                            <Checkbox value={'others'}>Others</Checkbox>
                        </CheckboxGroup>
                    </Stack>
                </Stack>
            </Box>
            <Box border={'1px solid red'} width={'40vw'} height={'100vh'} px={4}>
                <Stack>
                    <Stack>
                        <FormControl>
                            <FormLabel>Add-SubTasks</FormLabel>
                            <Input type='text'onChange={(e)=>setSubTasksTittle(e.target.value)}/>
                        </FormControl>
                        <Button colorScheme='teal' onClick={()=>handleUpdate("update_subTask")}>Add-SubTask</Button>
                    </Stack>
                    <Stack>
                        <CheckboxGroup value={checkbox} onChange={(val)=>{
                            setCheckbox(val)
                            handleUpdate("update_checkbox",val)
                        }}>
                            {subTasks.length>0 && subTasks.map((task,ind)=><Stack key={ind} direction={'row'} justifyContent={'space-between'} alignItems={'center'} px={4}>
                                <Checkbox value={task.subTasksTittle}>{task.subTasksTittle}</Checkbox>
                                <IconButton icon={<DeleteIcon/>} size={'sm'} variant={'outline'} cursor={'pointer'} colorScheme='teal' onClick={()=>handleUpdate("delete",task.subTasksTittle)}/>
                            </Stack>)}
                        </CheckboxGroup>
                    </Stack>
                </Stack>
            </Box>

        </Stack>
    </Box>
  )
}
