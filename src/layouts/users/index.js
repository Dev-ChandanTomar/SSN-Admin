import { Grid, Icon, Menu, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import usersView from "layouts/users/data/users";
import adminsView from "./data/admins";
import ApiClient from "Services/ApiClient";
import { getUserById, getAllUsers, getAllAdmin } from "Services/endpointes";
import { useSoftUIController, startLoading, setLoading, setUsers, setDialog } from "context";

function Users() {
  const [controller, dispatch] = useSoftUIController();
  const [page, setPage] = useState(1);
  const [length, setLength] = useState(0);
  const [select, setSelect] = useState("users");
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { users } = controller;

  const endpoints = {
    users: getAllUsers,
    staff: getAllAdmin,
  };

  const getAllUsersData = async () => {
    startLoading(dispatch, true);
    try {
      const response = await ApiClient.getDataWithPagination(endpoints[select], page, rowsPerPage);
      if (response.status === 200) {
        setUsers(dispatch, response.data);
        setLength(response.totalCount); // Ensure you have totalCount in the response for pagination
        toast.success(response.message);
      } else {
        toast.warn(response.message);
        setLoading(dispatch, false);
      }
    } catch (error) {
      setLoading(dispatch, false);
      toast.warn(error.response?.data?.message ?? "Network Error!");
    }
  };

  useEffect(() => {
    getAllUsersData();
  }, [select, page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setUsers(dispatch, []);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    setUsers(dispatch, []);
  };

  const setSelector = (selector) => {
    setSelect(selector);
    setUsers(dispatch, []);
  };

  let memoizedRows =
    select === "users"
      ? usersView.rows(users, dispatch, getAllUsersData)
      : adminsView.rows(users, dispatch, getAllUsersData);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    console.log(inputValue);
    if (inputValue.length === 10) {
      callApiWithInputValue(inputValue);
    }
  };

  const callApiWithInputValue = async (inputValue) => {
    startLoading(dispatch, true);
    try {
      const response = await ApiClient.getDataByParam(getUserById, inputValue);
      if (response?.status === 200) {
        setUsers(dispatch, response.data);
        toast.success(response.message);
      }
      setDialog(dispatch, []);
    } catch (error) {
      setLoading(dispatch, false);
      toast.error(error.response?.data?.message ?? "Oops! Something went wrong, please try later");
    }
  };

  const [menu, setMenu] = useState(null);
  const openMenu = ({ currentTarget }) => {
    if (menu === currentTarget) {
      closeMenu();
    } else {
      setMenu(currentTarget);
    }
  };
  const closeMenu = () => setMenu(null);

  return (
    <DashboardLayout>
      <DashboardNavbar endpoint="users" call={getAllUsersData} />
      <SoftBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="3.5rem"
        height="3.5rem"
        bgColor="white"
        shadow="sm"
        borderRadius="50%"
        position="fixed"
        right="2rem"
        bottom="2rem"
        zIndex={99}
        color="warning"
        sx={{ cursor: "pointer" }}
        onClick={openMenu}
      >
        <Icon fontSize="default" color="inherit">
          settings
        </Icon>
        <Menu
          id="simple-menu"
          anchorEl={menu}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(menu)}
          onClose={closeMenu}
        >
          <MenuItem
            onClick={() => {
              closeMenu();
              setSelector("users");
            }}
          >
            Users
          </MenuItem>
          <MenuItem
            onClick={() => {
              setSelector("staff");
              closeMenu();
            }}
          >
            Staff
          </MenuItem>
        </Menu>
      </SoftBox>

      <SoftBox py={3}>
        <SoftBox mb={3}>
          {users?.length > 0 ? (
            <>
              {select === "users" ? (
                <Table columns={usersView.columns} rows={memoizedRows} />
              ) : (
                <Table columns={adminsView.columns} rows={memoizedRows} />
              )}
            </>
          ) : (
            <SoftBox mt={4}>
              <SoftBox mb={1.5}>
                <Grid container spacing={3}>
                  <Grid item lg={12}>
                    <Grid item container spacing={3}>
                      <Grid item xs={12} xl={12}>
                        <DefaultInfoCard
                          icon="cloud"
                          title="You don't have an active connection yet. Add a connection to your portfolio and start earning."
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </SoftBox>
            </SoftBox>
          )}
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Users;
