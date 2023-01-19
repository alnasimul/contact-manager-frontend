import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Button, createTheme, Icon, ThemeProvider } from "@mui/material";
import Modal from "../../Modal/Modal";
import ContactForm from "../../ContactForm/ContactForm";
import { grey } from "@mui/material/colors";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: grey[900],
    },
  },
});


const Header = ({ getSearchResult }) => {
  const [term, setTerm] = useState("");

  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const setSearchData = (termData) => {
    console.log("termData", termData);
    getSearchResult(termData);
  };

  return (
    <div>
      <Box
        sx={{
          bgcolor: "secondary.main",
        }}
      >
        <ThemeProvider theme={darkTheme}>
          <AppBar position="static">
            <Toolbar>
              <Button variant="Text" onClick={openModal} className="mx-3">
                <Icon>add_circle</Icon>
              </Button>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
              >
                Contact Manager
              </Typography>
              <Search
                sx={{ m: 1 }}
                onChange={(e) => {
                  setTerm(e.target.value);
                  setSearchData(e.target.value);
                }}
              >
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </Toolbar>
          </AppBar>
        </ThemeProvider>
      </Box>
      <Modal modalIsOpen={modalIsOpen} closeModal={closeModal}>
        <ContactForm closeModal={closeModal} />
      </Modal>
    </div>
  );
};

export default Header;
