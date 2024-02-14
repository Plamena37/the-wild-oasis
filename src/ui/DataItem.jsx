import styled, { css } from "styled-components";

const StyledDataItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  padding: 0.8rem 0;

  @media (max-width: 700px) {
    display: grid;
    margin-bottom: 1rem;

    ${(props) =>
      props.price &&
      css`
        display: flex;
        margin-bottom: 0;
      `}
  }
`;

const Label = styled.span`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-weight: 500;

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-brand-600);
  }
`;

const DataItem = ({ icon, label, price, children }) => {
  return (
    <StyledDataItem price={price}>
      <Label>
        {icon}
        <span>{label}</span>
      </Label>
      {children}
    </StyledDataItem>
  );
};

export default DataItem;
