import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;

  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;

      ${(props) =>
        props.type === "horizontal" &&
        props.entity === "bookings" &&
        css`
          @media (max-width: 930px) {
            flex-direction: column;
            gap: 1rem;
          }
        `}

      @media (max-width: 750px) {
        flex-direction: column;
        gap: 1rem;
      }
    `}

  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;

Row.defaultProps = {
  type: "vertical",
};

export default Row;
