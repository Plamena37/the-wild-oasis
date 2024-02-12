import { useMediaQuery } from "@mui/material";
import { useBookings } from "./useBookings";
import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";

const BookingTable = () => {
  const { bookings, isLoading, count } = useBookings();
  const isMediumScreen = useMediaQuery("(max-width: 850px)");
  const isSmallScreen = useMediaQuery("(max-width: 550px)");
  const isPhoneScreen = useMediaQuery("(max-width: 450px)");

  if (isLoading) return <Spinner />;

  if (!bookings.length) return <Empty resourceName="bookings" />;

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem" entity="bookings">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          {!isMediumScreen && <div>Dates</div>}
          {!isPhoneScreen && <div>Status</div>}
          {!isSmallScreen && <div>Amount</div>}
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
};

export default BookingTable;
