// @mui material components
import Card from "@mui/material/Card";

// Next Work Dashboard React components
import SoftBox from "components/SoftBox";

// Next Work Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Data
import { Grid } from "@mui/material";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

import { useEffect, useState } from "react";
import { useSoftUIController, setLoading, setComment } from "context";
import Table from "examples/Tables/Table";
import ApiClient from "Services/ApiClient";
import { toast } from "react-toastify";
import React from "react";
import Footer from "examples/Footer";
import { getComments } from "Services/endpointes";
import commentsView from "./data/royality";
import { setDialog } from "context";

function AllComments() {
  const [controller, dispatch] = useSoftUIController();
  const { comments } = controller;

  const getCommentData = async () => {
    setLoading(dispatch, true);
    try {
      const response = await ApiClient.getData(getComments);
      console.log(response);
      if (response.status == 200) {
        setComment(dispatch, response?.data?.comments);
      }
      setDialog(dispatch, response);
      toast.success(response?.message);
    } catch (error) {
      setLoading(dispatch, false);
      console.log(error);
      toast.error(error.response?.data?.message ?? "Oops! Something went wrong, please try later");
    }
  };

  const memoizedRows = commentsView.rows(comments, dispatch, getCommentData);

  const [menu, setMenu] = useState(null);
  const openMenu = ({ currentTarget }) => {
    if (menu === currentTarget) {
      closeMenu();
    } else {
      setMenu(currentTarget);
    }
  };
  const closeMenu = () => setMenu(null);

  useEffect(() => {
    comments.length < 1 && getCommentData();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar endpoint={"comments"} call={getCommentData} />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            {comments?.length > 0 ? (
              <Table columns={commentsView.columns} rows={memoizedRows} />
            ) : (
              <SoftBox mt={4}>
                <SoftBox mb={1.5}>
                  <Grid container spacing={3}>
                    <Grid item lg={12}>
                      <Grid item container spacing={3}>
                        <Grid item xs={12} xl={12}>
                          <DefaultInfoCard
                            icon="cloud"
                            title={`No comments found. Add a comment to get started.`}
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

export default AllComments;
