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
import { setProducts } from "context";
import { useLocation } from "react-router-dom";
import { setDialog } from "context";
import Footer from "examples/Footer";
import { getAllEvent } from "Services/endpointes";
import { setEvents } from "context";
import eventView from "./data/events";
import EventForm from "./form";
import { createEvent } from "Services/endpointes";
import SoftButton from "components/SoftButton";

function Events() {
  const [controller, dispatch] = useSoftUIController();
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [type, setType] = React.useState("nextwork");
  const [length, setLength] = React.useState(0);
  const path = useLocation();
  const pathName = path.pathname;

  const { events } = controller;

  const getAllEvents = async () => {
    startLoading(dispatch, true);
    try {
      const response = await ApiClient.getData(getAllEvent);
      setEvents(dispatch, response.data);
      toast.success(response?.message);
    } catch (error) {
      setLoading(dispatch, false);
      toast.error(error.response?.data?.message ?? "Oops! Something went wrong, please try later");
    }
  };
  useEffect(() => {
    if (events.length < 1 || pathName) {
      getAllEvents();
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
    setProducts(dispatch, []);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
    setEvents(dispatch, []);
  };

  let memoizedRows = eventView.rows(events, dispatch, getAllEvents);

  function SetEndpoint(t) {
    setType((_) => {
      let newEndpoint = t;
      return newEndpoint;
    });
    setEvents(dispatch, []);
  }

  const addEvents = async (formData) => {
    startLoading(dispatch, true);
    try {
      const response = await ApiClient.createData(createEvent, formData);
      getAllEvents();
      setDialog(dispatch, [response]);
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
      <DashboardNavbar endpoint={"Events"} call={getAllEvents} />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">All Events</SoftTypography>{" "}
              <SoftButton
                variant="gradient"
                color="dark"
                ml
                onClick={() => {
                  setDialog(dispatch, [
                    {
                      call: addEvents,
                      status: "form",
                      message: "CREATE NEW Events",
                      action: "Add New",
                      children: <EventForm type={type} />,
                    },
                  ]);
                }}
              >
                <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                &nbsp; Add Event
              </SoftButton>
            </SoftBox>
            {events?.length > 0 ? (
              <>
                <Table columns={eventView.columns} rows={memoizedRows} />
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

export default Events;
