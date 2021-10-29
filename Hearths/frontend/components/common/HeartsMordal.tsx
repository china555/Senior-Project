import {
  Box,
  Image,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

interface IModal {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  isButtonClose?: boolean;
}

export const HeartsMordal: React.FunctionComponent<IModal> = (props) => {
  const { isOpen, onClose, isButtonClose } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent>
        {isButtonClose ? <ModalCloseButton /> : null}
        <ModalBody
          display="flex"
          justifyContent="center"
          alignItems="center"
          p="30px"
          flexDirection="column"
        >
          {props.children}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
