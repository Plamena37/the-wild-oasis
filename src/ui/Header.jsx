import styled from "styled-components";
import MenuIcon from "@mui/icons-material/Menu";
import UserAvatar from "../features/authentication/UserAvatar";
import HeaderMenu from "./HeaderMenu";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 3rem;
  border-bottom: 1px solid var(--color-grey-100);

  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-end;
`;

const Header = ({ openMenu }) => {
  return (
    <StyledHeader>
      <MenuIcon
        sx={{
          fontSize: "2rem",
          marginRight: "auto",
          display: {
            lg: "none",
          },
        }}
        onClick={openMenu}
      />

      <UserAvatar />
      <HeaderMenu />
    </StyledHeader>
  );
};

export default Header;
