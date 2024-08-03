import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import Breadcrumbs from "examples/Breadcrumbs";
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";
import { useSoftUIController, setTransparentNavbar, setMiniSidenav } from "context";
import { Avatar, Box, Divider, Stack } from "@mui/material";
import { getUserById } from "Services/endpointes";
import { setUser, setDialog, setRoutes, setTransactions, setProducts } from "context";
import { getProductById } from "Services/endpointes";
import { getTransactionsByUserId } from "Services/endpointes";
import { Diversity3 } from "@mui/icons-material";
import SoftBadge from "components/SoftBadge";

function DashboardNavbar({ absolute, light, isMini, call }) {
  const navigate = useNavigate();
  const [navbarType, setNavbarType] = useState();

  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);

  const logoutHandler = () => {
    setDialog(dispatch, [
      {
        message: "Are you sure you want to Log out?",
        status: "Logout",
      },
    ]);
  };
  const endpoints = {
    users: getUserById,
    appaccess: "",
    products: getProductById,
    transaction: getTransactionsByUserId,
  };
  const setData = {
    users: setUser,
    appaccess: setRoutes,
    products: setProducts,
    transaction: setTransactions,
  };

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);

  // Render the notifications menu
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
    >
      <Box>
        <SoftBox
          variant="gradient"
          px={1}
          my={0.5}
          component={Link}
          to="/profile"
          display="flex"
          sx={{ cursor: "pointer" }}
          alignItems="center"
          color="warning"
        >
          <Divider />
          <Icon fontSize="1rem">account_circle</Icon>
          <SoftTypography cursor="pointer" fontSize="1rem" pl={1} component="span">
            My Profile
          </SoftTypography>
        </SoftBox>
        <SoftBox
          variant="gradient"
          px={1}
          my={0.5}
          component={Link}
          to="/create-staff"
          display="flex"
          sx={{ cursor: "pointer" }}
          alignItems="center"
          color="warning"
        >
          <Divider />
          <Diversity3 size="12px" />
          <SoftTypography cursor="pointer" fontSize="1rem" pl={1} component="span">
            Create Staff
          </SoftTypography>
        </SoftBox>

        <SoftBox
          variant="gradient"
          px={1}
          my={0.5}
          onClick={() => logoutHandler()}
          display="flex"
          sx={{ cursor: "pointer" }}
          alignItems="center"
          color="error"
        >
          <Divider />
          <Icon fontSize="1rem">logout_icon</Icon>
          <SoftTypography cursor="pointer" fontSize="1rem" pl={1} component="span">
            Log Out
          </SoftTypography>
        </SoftBox>
      </Box>
    </Menu>
  );
  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);
  const handleFocus = (event) => {
    event.target.classList.add("focused");
  };

  const handleBlur = (event) => {
    event.target.classList.remove("focused");
  };

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <SoftBox sx={(theme) => navbarRow(theme, { isMini })}>
          <SoftBox
            color="inherit"
            mb={{ xs: 1, md: 0 }}
            sx={(theme) => navbarRow(theme, { isMini })}
          >
            <Breadcrumbs
              icon="home"
              call={call}
              title={route[route.length - 1]}
              route={route}
              light={light}
            />
          </SoftBox>

          <SoftBox>
            <Link to={"https://sanatansewanyas.com/"} target="_blank">
              <SoftBadge badgeContent="View Website" size="lg" container />
            </Link>
          </SoftBox>

          <SoftBox color={light ? "white" : "inherit"}>
            <IconButton
              size="small"
              color="inherit"
              sx={navbarIconButton}
              aria-controls="Profile-menu"
              aria-haspopup="true"
              variant="contained"
              onClick={handleOpenMenu}
            >
              <Stack direction="row" spacing={2}>
                <Avatar alt="Remy Sharp" width="100%" src="51365.jpg" />
              </Stack>
            </IconButton>
            {renderMenu()}
          </SoftBox>

          <IconButton
            size="small"
            color="inherit"
            sx={navbarMobileMenu}
            onClick={handleMiniSidenav}
          >
            <Icon className={light ? "text-white" : "text-dark"}>
              {!miniSidenav ? "menu_open" : "menu"}
            </Icon>
          </IconButton>
        </SoftBox>
      </Toolbar>
    </AppBar>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
  endpoint: "",
  call: () => {},
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
  endpoint: PropTypes.string,
  call: PropTypes.func,
};

export default DashboardNavbar;
