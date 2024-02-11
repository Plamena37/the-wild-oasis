import { NavLink } from "react-router-dom";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Drawer, Grid } from "@mui/material";
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";
import Logo from "./Logo";
import MainNav from "./MainNav";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-top: 3rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

const Sidebar = ({ isOpen, closeMenu }) => {
  return (
    <Box
      sx={{
        backgroundColor: "var(--color-grey-0)",
        padding: "3.2rem 2.4rem",
        borderRight: "1px solid var(--color-grey-100)",

        gridRow: "1 / -1",
        display: {
          lg: "flex",
          md: "none",
          sm: "none",
          xs: "none",
        },
        flexDirection: "column",
        gap: "3.2rem",
      }}
    >
      <Logo />

      <Drawer anchor="left" open={isOpen} onClose={closeMenu}>
        <Box sx={{ minWidth: 250 }}>
          <Grid
            container
            p={1}
            sx={{
              justifyContent: "end",
            }}
          >
            <CloseIcon
              onClick={closeMenu}
              sx={{
                cursor: "pointer",
                padding: "0.2rem",
                fontSize: "2.5rem",
              }}
            />
          </Grid>
          <Logo />

          <NavList onClick={closeMenu}>
            <li>
              <StyledNavLink to="/dashboard" sx={{}}>
                <HiOutlineHome />
                <span>Home</span>
              </StyledNavLink>
            </li>

            <li>
              <StyledNavLink to="/bookings">
                <HiOutlineCalendarDays />
                <span>Bookings</span>
              </StyledNavLink>
            </li>

            <li>
              <StyledNavLink to="/cabins">
                <HiOutlineHomeModern />
                <span>Cabins</span>
              </StyledNavLink>
            </li>

            <li>
              <StyledNavLink to="/users">
                <HiOutlineUsers />
                <span>Users</span>
              </StyledNavLink>
            </li>

            <li>
              <StyledNavLink to="/settings">
                <HiOutlineCog6Tooth />
                <span>Settings</span>
              </StyledNavLink>
            </li>
          </NavList>
        </Box>
      </Drawer>
      <MainNav />
    </Box>
  );
};

export default Sidebar;
