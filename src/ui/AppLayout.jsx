import { useState } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: scroll;

  @media (max-width: 700px) {
    padding: 4rem 2.5rem 6.4rem;
  }
  @media (max-width: 500px) {
    padding: 4rem 1rem 6.4rem;
  }
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

const AppLayout = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const openMenu = () => setIsMenuOpened(true);
  const closeMenu = () => setIsMenuOpened(false);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          lg: "26rem 1fr",
          md: "unset",
        },
        gridTemplateRows: "auto 1fr",
        height: "100vh",
      }}
    >
      <Header openMenu={openMenu} />
      <Sidebar isOpen={isMenuOpened} closeMenu={closeMenu} />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </Box>
  );
};

export default AppLayout;
