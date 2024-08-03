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
import aboutView from "./data/about";
import { setAboutSsn } from "context";
import { createAbout } from "Services/endpointes";
import SoftButton from "components/SoftButton";
import { Link, useLocation } from "react-router-dom";
import { getAboutus } from "Services/endpointes";

function AboutSsn() {
  const [controller, dispatch] = useSoftUIController();
  const { AboutSsn } = controller;
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [type, setType] = React.useState("nextwork");
  const [length, setLength] = React.useState(0);

  const path = useLocation();
  const pathName = path.pathname;

  const getaboutdata = async () => {
    startLoading(dispatch, true);
    try {
      const response = await ApiClient.getData(getAboutus);
      console.log("responseanout", response.data);
      setAboutSsn(dispatch, response.data);
      setLength(response.data?.length);
      toast.success(response?.message);
    } catch (error) {
      setLoading(dispatch, false);
      toast.error(error.response?.data?.message ?? "Oops! Something went wrong, please try later");
    }
  };
  useEffect(() => {
    if (AboutSsn?.length < 1 || pathName) {
      getaboutdata();
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
    setAboutSsn(dispatch, []);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
    setAboutSsn(dispatch, []);
  };

  let memoizedRows = aboutView.rows(AboutSsn, dispatch, getaboutdata);

  function SetEndpoint(t) {
    setType((_) => {
      let newEndpoint = t;
      return newEndpoint;
    });
    setAboutSsn(dispatch, []);
  }

  const addAboutus = async (formData) => {
    startLoading(dispatch, true);
    try {
      const response = await ApiClient.createData(createAbout, formData);
      getAboutus();
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
      <DashboardNavbar endpoint={"AboutSsn"} call={getaboutdata} />
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
              <SoftTypography variant="h6">About-Us</SoftTypography>{" "}
              <SoftButton
                component={Link}
                to={`/about-form/new-about`}
                variant="gradient"
                color="dark"
              >
                <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                &nbsp; Add About
              </SoftButton>
            </SoftBox>

            {AboutSsn?.length > 0 ? (
              <>
                <Table columns={aboutView.columns} rows={memoizedRows} />
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

export default AboutSsn;
