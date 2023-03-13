import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";

const CardComp = ({ data, setData, isOpen, onClose }) => {
  const name = useState(data.name || "");
  const email = useState(data.email || "");
  const senha  = useState(data.senha ||"");
  const dataNasc = useState(data.dataNasc || "")

  const handleSave = () => {
    if (!name || !email) return;

    if (emailAlreadyExists()) {
      return alert("E-mail já cadastrado!");
    }

    if (Object.keys(data).length) {
      data[data.index] = { name, email, senha, dataNasc };
    }

    const newDataArray = !Object.keys(data).length
      ? [...(data ? data : []), { name, email, senha, dataNasc }]
      : [...(data ? data : [])];

    localStorage.setItem("cad_cliente", JSON.stringify(newDataArray));

    setData(newDataArray);

    onClose();
  };

  const emailAlreadyExists = () => {
    if (dataEdit.email !== email && data?.length) {
      return data.find((item) => item.email === email);
    }

    return false;
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Usuario:</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl display="flex" flexDir="column" gap={4}>
              <Box>
                <FormLabel>Nome</FormLabel>
                <Input
                  type="text"
                  value={name}
                />
              </Box>
              <Box>
                <FormLabel>E-mail</FormLabel>
                <Input
                  type="email"
                  value={email}
                />
              </Box>
              <Box>
                <FormLabel>Data de nascimento</FormLabel>
                <Input
                  type="date"
                  value={dataNasc}
                />
              </Box>
              <Box>
                <FormLabel>Senha</FormLabel>
                <Input
                  type="text"
                  value={senha}
                />
              </Box>
            </FormControl>
          </ModalBody>

          <ModalFooter justifyContent="start">
            <Button colorScheme="red" onClick={onClose}>
              Sair
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CardComp;