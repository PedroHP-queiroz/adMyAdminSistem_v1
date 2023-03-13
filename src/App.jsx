import { AddIcon, DeleteIcon, ViewIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Button,
  useDisclosure,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ModalComp from "./components/ModalComp";

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]);
  const [dataEdit, setDataEdit] = useState({});



  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  });

  useEffect(() => {
    const db_costumer = localStorage.getItem("cad_cliente")
      ? JSON.parse(localStorage.getItem("cad_cliente"))
      : [];

    setData(db_costumer);
  }, [setData]);


  const handleRemove = (email) => {
    const newArray = data.filter((item) => item.email !== email);

    setData(newArray);

    localStorage.setItem("cad_cliente", JSON.stringify(newArray));

  };


  return (
    <Flex
      h="100vh"
      align="center"
      justify="center"
      fontSize="20px"
      fontFamily="poppins, sans-serif"
    >
      <Box maxW="100vw" w="100%" h="100vh" py={8} px={4}>

          <Box>
            
          <Button colorScheme="green" height="70px" margin="20px" display="inline-block" textAlign="center" gap="20px" onClick={() => [setDataEdit({}), onOpen()]}>
          <AddIcon 
          fontSize={30}
          />
          </Button>
          <h1>aDmYaDmIn V1</h1>
          </Box>
        <Box overflowY="auto" height="100%">
          <Table mt="6">
            <Thead>
              <Tr>
                <Th maxW={isMobile ? 5 : 100} fontSize="20px" textAlign="block">
                  Nome:
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="20px" textAlign="block">
                  E-Mail:
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="20px" textAlign="block">
                  Senha:
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="20px" textAlign="block">
                  Data de nascimento:
                </Th>
                <Th p={0}></Th>
                <Th p={0}></Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map(({ name, email, senha, dataNasc }, index) => (
                <Tr key={index} cursor="pointer " _hover={{ bg: "gray.100" }}>
                  <Td maxW={isMobile ? 5 : 100} textAlign="center">{name}</Td>
                  <Td maxW={isMobile ? 5 : 100} textAlign="center">{email}</Td>
                  <Td maxW={isMobile ? 5 : 100} textAlign="center">{senha}</Td>
                  <Td maxW={isMobile ? 5 : 100} textAlign="center">{dataNasc}</Td>
                  <Td p={0}>
                    <EditIcon
                      fontSize={25}
                      onClick={() => [
                        setDataEdit({ name, email, index, senha, dataNasc }),
                        onOpen(),
                      ]}
                    />
                  </Td>
                  <Td p={0}>
                    <DeleteIcon
                      fontSize={25}
                      onClick={() => handleRemove(email)}
                    />
                  </Td>
                  <Td p={0}>
                    <ViewIcon
                      fontSize={25}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>


      {isOpen && (
        <>
        <ModalComp
          isOpen={isOpen}
          onClose={onClose}
          data={data}
          setData={setData}
          dataEdit={dataEdit}
          setDataEdit={setDataEdit}
        />
      </>
      )}
    </Flex>
  );
};


export default App;