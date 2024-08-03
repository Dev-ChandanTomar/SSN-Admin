// @mui material components
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
import Footer from "examples/Footer";
import SoftButton from "components/SoftButton";
import { Link, useLocation } from "react-router-dom";
import { setVideoGallery } from "context";
import { getAllVideoGallery } from "Services/endpointes";
import videoGalleryView from "./data/videogallery";

function VideoGallery() {
  const [controller, dispatch] = useSoftUIController();
  const { videogallery } = controller;

  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [type, setType] = React.useState("nextwork");
  const [length, setLength] = React.useState(0);
  const path = useLocation();
  const pathName = path.pathname;
  const getVideoGalleryData = async () => {
    startLoading(dispatch, true);
    console.log("pathName", pathName);
    try {
      const response = await ApiClient.getData(getAllVideoGallery);
      console.log("responseanout", response.data);
      setVideoGallery(dispatch, response.data);
      setLength(response?.length);
      toast.success(response?.message);
    } catch (error) {
      setLoading(dispatch, false);
      toast.error(error.response?.data?.message ?? "Oops! Something went wrong, please try later");
    }
  };
  useEffect(() => {
    if (videogallery?.length < 1 || pathName) {
      getVideoGalleryData();
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
    setVideoGallery(dispatch, []);
  };

  let memoizedRows = videoGalleryView.rows(videogallery, dispatch, getVideoGalleryData);

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
      <DashboardNavbar endpoint={"VideoGallery"} call={getVideoGalleryData} />
      <SoftBox
        // display="flex"
        // justifyContent="center"
        // alignItems="center"
        // bgColor="white"
        // shadow="sm"
        position="relative"
        right="0px"
        zIndex={99}
        // top="10%"
        color="warning"
        sx={{ cursor: "pointer" }}
        onClick={openMenu}
      >
        {/* <SoftButton
          variant="gradient"
          color="dark"
          width="100%"
          onClick={() => {
            closeMenu();
            setDialog(dispatch, [
              {
                call: addProduct,
                status: "form",
                message: "CREATE NEW Temple",
                action: "Add New",
                children: <TempleForm type={type} />,
              },
            ]);
          }}
        >
          <Icon sx={{ fontWeight: "bold" }}>add</Icon>
          &nbsp; Add Temple
        </SoftButton> */}
      </SoftBox>

      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">All Video-Gallery</SoftTypography>{" "}
              <SoftButton
                component={Link}
                to={`/add-Video/new-videogallery`}
                variant="gradient"
                color="dark"
              >
                <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                &nbsp; Add Video-Gallery
              </SoftButton>
            </SoftBox>

            {videogallery?.length > 0 ? (
              <>
                <Table columns={videoGalleryView.columns} rows={memoizedRows} />
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

export default VideoGallery;
