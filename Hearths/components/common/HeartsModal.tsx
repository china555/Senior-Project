import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

interface IModal {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  isButtonClose?: boolean;
}

export const HeartsModal: React.FunctionComponent<IModal> = (props) => {
  const { isOpen, onClose, isButtonClose } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent>
        {isButtonClose && <ModalCloseButton />}
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
