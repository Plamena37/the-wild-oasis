import styled from "styled-components";

const StyledDataItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  padding: 0.8rem 0;

  @media (max-width: 800px) {
    flex-wrap: wrap;
  }
  @media (max-width: 500px) {
    font-size: 1.2rem;

    ${(props) => props.center && `justify-content: center`}
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

const DataItem = ({ icon, label, center, children }) => {
  return (
    <StyledDataItem center={center}>
      <Label>
        {icon}
        <span>{label}</span>
      </Label>
      {children}
    </StyledDataItem>
  );
};

export default DataItem;
