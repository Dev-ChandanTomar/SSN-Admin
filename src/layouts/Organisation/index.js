import * as React from "react";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import { Grid, Icon } from "@mui/material";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import { useEffect, useState } from "react";
import Table from "examples/Tables/Table";
import ApiClient from "Services/ApiClient";
import { toast } from "react-toastify";
import { useSoftUIController, startLoading, setLoading, setDialog } from "context";
import Footer from "examples/Footer";
import SoftButton from "components/SoftButton";
import { Link, useLocation } from "react-router-dom";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { setCount } from "context";
import { setOrganisation } from "context";
import { getAllOrganisation } from "Services/endpointes";
import { createOrganisation } from "Services/endpointes";
import organisationView from "./data/organisation";

function Organisation() {
  const [controller, dispatch] = useSoftUIController();
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [type, setType] = React.useState("nextwork");
  const [length, setLength] = React.useState(0);
  const path = useLocation();
  const pathName = path.pathname;
  const { organisation, count } = controller;

  const getAllOrganisations = async () => {
    startLoading(dispatch, true);
    try {
      const response = await ApiClient.getData(
        `${getAllOrganisation}?type=${type}&page=${page - 1}&limit=${rowsPerPage}`
      );
      setOrganisation(dispatch, response.data);
      setCount(dispatch, response.count);
      setLength(response?.length);
      toast.success(response?.message);
    } catch (error) {
      setLoading(dispatch, false);
      toast.error(error.response?.data?.message ?? "Oops! Something went wrong, please try later");
    }
  };

  useEffect(() => {
    if (organisation?.length < 1 || pathName) {
      getAllOrganisations();
    }
  }, [type, page, rowsPerPage, pathName]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setOrganisation(dispatch, []);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
    setOrganisation(dispatch, []);
  };

  let memoizedRows = organisationView.rows(organisation, dispatch, getAllOrganisation);

  function SetEndpoint(t) {
    setType((_) => {
      let newEndpoint = t;
      return newEndpoint;
    });
    setOrganisation(dispatch, []);
  }

  const addOrganisation = async (formData) => {
    startLoading(dispatch, true);
    try {
      const response = await ApiClient.createData(createOrganisation, formData);
      getAllOrganisations();
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
      <DashboardNavbar endpoint={"organisation"} call={getAllOrganisations} />
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
              <SoftTypography variant="h6">All Organisation</SoftTypography>
              <SoftButton
                component={Link}
                to={`/organisation-form/new-organisation`}
                variant="gradient"
                color="dark"
              >
                <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                &nbsp; Add Organisation
              </SoftButton>
            </SoftBox>

            {organisation?.length > 0 ? (
              <>
                <Table columns={organisationView.columns} rows={memoizedRows} />
                <Stack spacing={2} sx={{ my: 2, display: "flex", justifyContent: "center" }}>
                  <Pagination
                    count={Math.ceil(count / rowsPerPage)}
                    page={page}
                    onChange={handleChangePage}
                    shape="rounded"
                    variant="outlined"
                  />
                </Stack>
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
                            title={`You don't have an active connection yet. Add connection to your portfolio and start earning.`}
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

export default Organisation;
