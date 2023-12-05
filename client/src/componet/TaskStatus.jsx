import { Box, Heading, Stack } from '@chakra-ui/react'
import React from 'react'
import { TaskCard } from './TaskCard'
import { useSearchParams } from 'react-router-dom'

export const TaskStatus = ({task,tasks_status}) => {
    const [serchParam]=useSearchParams()

    const filterParamTag=(task)=>{
        const newParmatag=serchParam.getAll("tag")
        if(newParmatag.includes("all") || newParmatag.length==0){
            return task
        }

        const data=task.tags.filter((item)=>newParmatag.includes(item)?true:false)

        if(data.length){
            return task
        }
        else{
            return false
        }

    }

  return (
    <Box>
        <Stack>
            <Stack alignItems={'center'}>
                <Heading fontSize={'xl'}>{tasks_status.toUpperCase()}</Heading>

            </Stack>
            <Stack spacing={4}>
                {task.length>0 && task.filter((item)=>item.task_status===tasks_status).filter(filterParamTag).map((item,ind)=><TaskCard key={ind} {...item}/>)}


            </Stack>
        </Stack>
    </Box>
  )
}
