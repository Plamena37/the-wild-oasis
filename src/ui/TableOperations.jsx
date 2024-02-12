import styled, { css } from "styled-components";

const TableOperations = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;

  ${(props) =>
    props.entity === "bookings" &&
    css`
      @media (max-width: 720px) {
        flex-direction: column;
        gap: 1rem;
      }
    `}

  @media (max-width: 500px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export default TableOperations;
