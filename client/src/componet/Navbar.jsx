import { Stack,Box,Text, useColorModeValue, Flex, IconButton, useDisclosure, HStack, Button, Menu, MenuButton, Avatar, MenuList, MenuItem } from '@chakra-ui/react'
import React from 'react'

import {HamburgerIcon,CloseIcon, AddIcon} from "@chakra-ui/icons"

const NavLink=({children})=>{
    return (
        <Box as='a' px={2} py={1} rounded={'md'} _hover={{
            textDecoration:'none',
            bg:useColorModeValue('gray.200','gray.700')

        }} href={`task/${children}`}>{children}</Box>
    )
}

export const Navbar = () => {
    const bgColor=useColorModeValue("gray.50","gray.900")
    const {isOpen,onClose,onOpen}=useDisclosure()
  return (
    <Box bg={bgColor} minH={'60px'} px={4}>
        <Flex justify={'space-between'} alignItems={'center'} h={16}>
            <IconButton size={'md'} icon={isOpen?<CloseIcon/>:<HamburgerIcon/>} aria-label={'Open Menu'} display={{md:'none'}} onClick={isOpen?onClose:onOpen} />
            <HStack spacing={8} alignItems={'center'}>
                <Box>Logo</Box>
                <HStack as={'nav'} spacing={4} display={{base:'none',md:'flex'}}>
                    <NavLink>addTask</NavLink>

                </HStack>

            </HStack>
            <Flex alignItems={'center'}>
                <Button variant={'solid'} colorScheme='teal' size={'md'} mr={4} leftIcon={<AddIcon/>}>Action</Button>
                <Menu>
                    <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}><Avatar size={'sm'}/></MenuButton>
                    <MenuList>
                        <MenuItem>1</MenuItem>
                        <MenuItem>2</MenuItem>
                        <MenuItem>3</MenuItem>
                        <MenuItem>4</MenuItem>
                    </MenuList>
                </Menu>

            </Flex>


        </Flex>

        {isOpen ?(<Box pb={4} display={{md:"none"}}>
            <Stack as={'nav'} spacing={4}>
                <NavLink>Add-Task</NavLink>

            </Stack>

        </Box>) : null}
    </Box>
  )
}
