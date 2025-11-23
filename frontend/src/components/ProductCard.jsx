import { Box, Button, Heading, HStack, IconButton, Image, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Text, useColorModeValue, useDisclosure, VStack, Input, ModalFooter } from '@chakra-ui/react'
import React from 'react'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { useProductStore} from '../store/product'
import { useToast } from '@chakra-ui/react'
import { useState } from 'react'


export const ProductCard = ({product}) => {
    const [updatedProduct, setUpdatedProduct] = useState(product);
    const textColor = useColorModeValue('gray.700', 'white');
    const bgColor = useColorModeValue('white', 'gray.800');
    const {deleteProduct, updateProduct }=useProductStore();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleDeleteProduct = async(pid) => {
        const {success, message} = await deleteProduct(pid);
        if (!success){
            toast({
                title:"Error",
                description:message,
                status:"error",
                duration:5000,
                isClosable:true
            });}
            else{
                toast({
                title:"Success",
                description:message,
                status:"success",
                duration:5000,
                isClosable:true
            });
        }
    }

const handleUpdateProduct = async(pid, updatedProduct) => {
    const {success, message} = await updateProduct(pid, updatedProduct);
    onClose();
    if (!success){
        toast({
            title:"Error",
            description:message,
            status:"error",
            duration:5000,
            isClosable:true
        });}
        else{
            toast({
            title:"Success",
            description:"Product updated Successfully",
            status:"success",
            duration:5000,
            isClosable:true
        });
    }
    
}
  return (
    <Box
    shadow='lg'
    rounded={'lg'}
    overflow={'hidden'}
    transition={'all .3s'}
    _hover={{transform: "translateY(-5px)", shadow: "xl"}}
    bg={bgColor}
    >
    <Image src={product.image} alt={product.name} objectFit='cover' w={'full'} h={'400px'}/>
    <Box p={4}>
        <Heading as={"h3"} size={"md"} mb={2}>
            {product.name}
        </Heading>
        <Text fontWeight={'bold'} fontSize={"xl"} color={textColor} mb={4}>
            ${product.price}
            </Text>
            <HStack spacing={2}>
                <IconButton icon={<EditIcon />}
                  onClick={onOpen}
                  colorScheme='purple' />
                <IconButton icon={<DeleteIcon />}  onClick={() => handleDeleteProduct(product._id)} colorScheme='red' />
            </HStack>
    </Box>
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Edit Product</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <VStack spacing={4}>
                    <Input 
                    placeholder='Product Name'
                    name={"name"}
                    value={updatedProduct.name}
                    onChange={(e) => setUpdatedProduct({...updatedProduct, name: e.target.value})}
                    ></Input>
                    <Input 
                    placeholder='Price'
                    name={"price"}
                    value={updatedProduct.price}
                    onChange={(e) => setUpdatedProduct({...updatedProduct, price: Number(e.target.value)})}
                    ></Input>
                    <Input 
                    placeholder='Image URL'
                    name={"image"}
                    value={updatedProduct.image}
                    onChange={(e) => setUpdatedProduct({...updatedProduct, image: e.target.value})}
                    ></Input>
                </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='pink' mr={3} onClick={() => handleUpdateProduct(product._id, updatedProduct)}> Save </Button>
                    <Button variant='ghost' onClick={onClose}> Cancel</Button>
                </ModalFooter>
        </ModalContent>
    </Modal>
    </Box>
  )
}
