import { Button, Modal } from "flowbite-react";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handler: () => void | Promise<void>;
};

const AreYouSure = ({ isOpen, setIsOpen, handler }: Props) => {
  return (
    <Modal dismissible show={isOpen} onClose={() => setIsOpen(false)}>
      <Modal.Header className="bg-secondary">
        <span className="text-2xl font-bold text-text">Are you sure?</span>
      </Modal.Header>
      <Modal.Footer className="flex justify-between">
        <Button onClick={() => setIsOpen(false)} color="blue">
          No
        </Button>

        <Button onClick={handler} color="failure">
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AreYouSure;
