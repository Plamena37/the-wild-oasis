import Button from "../../ui/Button";
import CreateBookingForm from "./CreateBookingForm";
import Modal from "../../ui/Modal";

const AddBooking = () => {
  return (
    <div>
      <Modal>
        <Modal.Open opens="booking-form">
          <Button>Add new booking</Button>
        </Modal.Open>
        <Modal.Window name="booking-form" smallerModal={true}>
          <CreateBookingForm />
        </Modal.Window>
      </Modal>
    </div>
  );
};

export default AddBooking;
