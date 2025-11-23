import React from "react";
import { Container, Link, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useProductStore } from "../store/product";
import { ProductCard } from "../components/ProductCard";


const HomePage = () => {
const {fetchProducts,products} = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log("products", products);
  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          bgGradient={"linear(to-r, pink.400, purple.500)"}
          bgClip={"text"}
          textAlign={"center"}
        >
          Current Products
        </Text>

<SimpleGrid
columns={{
  base: 1,
  md: 2,
  lg: 3,
}}
spacing={10}
w={"full"}
>
{products.map((product) => (
  <ProductCard key={product._id} product={product} />
))}
</SimpleGrid>

{products.length === 0 && (
  <Text
    fontSize={"xl"}
    textAlign={"center"}
    fontWeight={"bold"}
    color={"gray.500"}
  >
    No Products Found {""}
    <Link href={"/create"}>
      <Text
        as={"span"}
        color={"pink.400"}
        _hover={{ textDecoration: "underline" }}
      >
        Create New Product
      </Text>
    </Link>
  </Text>
)}
      </VStack>
    </Container>
  );
};

export default HomePage;
