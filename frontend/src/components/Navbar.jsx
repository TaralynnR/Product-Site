import React from 'react'
import { Button, Container, HStack, Flex, Text, useColorMode } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { BiAddToQueue } from "react-icons/bi";



const Navbar = () => {
    const {colorMode, toggleColorMode} = useColorMode();
  return (
    <Container maxW={"1140px"} px={4}>  
        <Flex 
        h={16} 
        alignItems={"center"} 
        justifyContent={"space-between"}
        flexDirection={{
            base: "column",
            sm:"row"
        }}>

        <Text
        fontSize={{base: "22", sm:"35"}}
        fontWeight={"bold"}
        textTransform={"uppercase"}
        textAlign={"center"}
        bgGradient={"linear(to-r, purple.600,blue.400)"}
        bgClip={"text"}
        >
        <Link to={"/"}>Product Site</Link>
        </Text>
        <HStack spacing={2} alignItems={"center"}>
        <Link to={"/create"}>
            <Button>
                <BiAddToQueue fontSize={20}/>
            </Button>
        </Link>
        <Button onClick={toggleColorMode}>
            {colorMode === "light" ? "Dark" : "Light"}
        </Button>
        </HStack>

        </Flex>
    </Container>
  )
}

export default Navbar