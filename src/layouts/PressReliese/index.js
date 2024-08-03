import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Grid, Icon } from "@mui/material";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import { useEffect, useState } from "react";
import Table from "examples/Tables/Table";
import ApiClient from "Services/ApiClient";
import { toast } from "react-toastify";
import { useSoftUIController, startLoading, setLoading } from "context";
import React from "react";
import { setDialog } from "context";
import Footer from "examples/Footer";
import SoftButton from "components/SoftButton";
import { Link, useLocation } from "react-router-dom";
import { getAllPressReliese } from "Services/endpointes";
import { setPressReliese } from "context";
import { createPressReliese } from "Services/endpointes";
import pressreleaseView from "./data/press";

function PressReliese() {
  const [controller, dispatch] = useSoftUIController();
  const { pressreliese } = controller;

  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [type, setType] = React.useState("nextwork");
  const [length, setLength] = React.useState(0);

  const path = useLocation();
  const pathName = path.pathname;

  const getPressRelieseData = async () => {
    startLoading(dispatch, true);
    try {
      const response = await ApiClient.getData(getAllPressReliese);
      console.log("responseanout", response.data);
      setPressReliese(dispatch, response.data);
      setLength(response?.length);
      toast.success(response?.message);
    } catch (error) {
      setLoading(dispatch, false);
      toast.error(error.response?.data?.message ?? "Oops! Something went wrong, please try later");
    }
  };
  useEffect(() => {
    if (pressreliese?.length < 1 || pathName) {
      getPressRelieseData();
    }
  }, [type, page, rowsPerPage, pathName]);

  const handleChangePage = (event, newPage) => {
    let pageNo = newPage;
    if (pageNo < 1) {
      pageNo = 1;
    } else if (pageNo > length) {
      pageNo = length;
    }
    setPage(pageNo);
    setPressReliese(dispatch, []);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
    setPressReliese(dispatch, []);
  };

  let memoizedRows = pressreleaseView.rows(pressreliese, dispatch, getPressRelieseData);

  function SetEndpoint(t) {
    setType((_) => {
      let newEndpoint = t;
      return newEndpoint;
    });
    setPressReliese(dispatch, []);
  }

  const addPressReliese = async (formData) => {
    startLoading(dispatch, true);
    try {
      const response = await ApiClient.createData(createPressReliese, formData);
      getPressRelieseData();
      setDialog(dispatch, [response.data]);
    } catch (error) {
      toast.error(error?.response?.data.message);
      setLoading(dispatch, false);
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
      <DashboardNavbar endpoint={"PressReliese"} call={getPressRelieseData} />
      <SoftBox
        position="relative"
        right="0px"
        zIndex={99}
        color="warning"
        sx={{ cursor: "pointer" }}
        onClick={openMenu}
      ></SoftBox>

      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">All Press-Reliese</SoftTypography>{" "}
              <SoftButton
                component={Link}
                to={`/add-Reliese/new-pressreliese`}
                variant="gradient"
                color="dark"
              >
                <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                &nbsp; Add Press-Reliese
              </SoftButton>
            </SoftBox>

            {pressreliese?.length > 0 ? (
              <>
                <Table columns={pressreleaseView.columns} rows={memoizedRows} />
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
                            title={`You Don't have an active connection yet. Add connection to your portfolio and start earning.`}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </SoftBox>
              </SoftBox>
            )}
          </Card>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default PressReliese;
