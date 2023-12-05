import { EditIcon } from '@chakra-ui/icons'
import { Badge, Box, Button, Checkbox, CheckboxGroup, Heading, Stack, Text } from '@chakra-ui/react'
// import { STATES } from 'mongoose'
import React from 'react'
import {Link} from "react-router-dom"
export const TaskCard = ({tittle,task_status,description,_id,tags,subTasks}) => {
    const checkBoxStatus=subTasks.filter((item)=>item.status).map((item)=>item.subTasksTittle)
  

  return (
    <Box mb={4}>
        <Stack px={4}>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} >
                <Text>{tittle}</Text>
                <Link to={`/task/updateTask/${_id}`}><EditIcon/></Link>
            </Stack>
            
            <Stack direction={'row'}>
                {tags.length>0 && tags.map((item,ind)=><Badge key={ind} colorScheme='green'>{item}</Badge>)}

            </Stack>
            <Stack>
                <Text>{description}</Text>
            </Stack>
            <Stack>
                <CheckboxGroup defaultValue={checkBoxStatus}>

                    {subTasks.length>0 && subTasks.map((task,ind)=><Checkbox key={ind} value={task.subTasksTittle}>{task?.subTasksTittle}</Checkbox>)}
                </CheckboxGroup>

            </Stack>
            
        </Stack>
    </Box>
  )
}
