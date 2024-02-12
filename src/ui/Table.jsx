import { createContext, useContext } from "react";
import styled, { css } from "styled-components";

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;

  ${(props) =>
    props.entity === "cabins" &&
    css`
      @media (max-width: 820px) {
        grid-template-columns: 0.6fr 2fr repeat(3, 0.8fr);
        column-gap: 1.6rem;
      }
    `}
  ${(props) =>
    props.entity === "bookings" &&
    css`
      @media (max-width: 850px) {
        grid-template-columns: 0.6fr 1.8fr 1fr 1fr 0.8fr;
        column-gap: 1.6rem;
      }
      @media (max-width: 710px) {
        grid-template-columns: 0.3fr 1.1fr 1fr 1fr 0.3fr;
        column-gap: 1.6rem;
      }
      @media (max-width: 550px) {
        grid-template-columns: 0.3fr 1.5fr 1.3fr 0.3fr;
        column-gap: 1rem;
      }
      @media (max-width: 450px) {
        grid-template-columns: 0.5fr 1.5fr 0.3fr;
        column-gap: 1rem;
      }
    `}
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);

  ${(props) =>
    props.entity === "cabins" &&
    css`
      @media (max-width: 820px) {
        grid-template-columns: 0.6fr 2fr repeat(3, 0.8fr);
        gap: 3rem;
        padding-left: 1.2rem;
      }
      @media (max-width: 400px) {
        gap: 2.6rem;
        padding-left: 0.8rem;
      }
    `}
  ${(props) =>
    props.entity === "bookings" &&
    css`
      @media (max-width: 710px) {
        padding-left: 1.2rem;
      }
    `}
    @media (max-width: 450px) {
    padding-left: 0.8rem;
  }
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  @media (max-width: 750px) {
    padding: 1.2rem;
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

const TableContext = createContext();

const Table = ({ columns, entity, children }) => {
  return (
    <TableContext.Provider value={{ columns, entity }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
};

const Header = ({ children }) => {
  const { columns, entity } = useContext(TableContext);

  return (
    <StyledHeader role="row" columns={columns} entity={entity} as="header">
      {children}
    </StyledHeader>
  );
};

const Row = ({ children }) => {
  const { columns, entity } = useContext(TableContext);

  return (
    <StyledRow role="row" columns={columns} entity={entity}>
      {children}
    </StyledRow>
  );
};

const Body = ({ data, render }) => {
  if (!data.length) {
    return <Empty>No data to show at the moment</Empty>;
  }

  return <StyledBody role="row">{data.map(render)}</StyledBody>;
};

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;

export default Table;
