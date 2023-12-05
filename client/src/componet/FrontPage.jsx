import { Container,Text,Image, Heading, Stack, Button, Flex, Box, IconButton } from '@chakra-ui/react'
import React from 'react'
// import {} from "@chakra-ui/icons"
import {AiOutlinePlayCircle} from "react-icons/ai"

export const FrontPage = () => {
  return (
    <Container maxW={'7xl'}>
        <Stack align={'center'} spacing={{base:8,md:10}} py={{base:20,md:28}} direction={{base:'column',md:'row'}}>
            <Stack flex={1} spacing={{base:5,md:10}}>
                <Heading lineHeight={1.1} fontWeight={600} fontSize={{base:'3xl',sm:'4xl',lg:'6xl'}}>
                    <Text as={'span'} position={'relative'} _after={{
                        content:"''",
                        width:'full',
                        height:'30%',
                        position:'absolute',
                        bottom:1,
                        left:0,
                        bg:'red.400',
                        zIndex:-1
                    }}>Write once</Text>
                    <br/>
                    <Text as={'span'} color={'red.400'}>
                        use everywhere!
                    </Text>
                </Heading>
                <Text color={'gray.400'} textAlign={'center'}>
                    Snippy is a rich coding snippets app that lets you create your own code snippets,categorize them,and even sync them in the cloud so you can use them anywhere. All that is free!
                </Text>
                <Stack spacing={{base:4,sm:6}} direction={{base:'column',sm:'row'}}>
                    <Button rounded={'full'} size={'lg'} fontWeight={'normal'} px={6} colorScheme='red' bg={'red.400'} _hover={{bg:'red.500'}}>Get started</Button>

                    <Button rounded={'full'} size={'lg'} fontWeight={'normal'} px={6} leftIcon={<AiOutlinePlayCircle height={4} width={4} color='gray.300'/>}>How It works</Button>

                </Stack>
            </Stack>
            <Flex flex={1} justify={'center'} align={'center'} position={'relative'} w={'full'}>
                <Box position={'relative'} height={'300px'} rounded={'2xl'} boxShadow={'2xl'} width={'full'} overflow={'hidden'}>
                   <IconButton variant={'ghost'} aria-label='play-button' icon={<AiOutlinePlayCircle height={16} w={8}/>} position={'absolute'} top={'50%'} left={'50%'} color={'white'}/>
                   <Image alt={'hero image'} fit={'cover'} align={'center'} height={'100%'} width={'100%'} src='https://images.unsplash.com/photo-1690793158393-13193b1801b2?auto=format&fit=crop&q=80&w=871&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />


                </Box>
            </Flex>

        </Stack>

    </Container>
  )
}
