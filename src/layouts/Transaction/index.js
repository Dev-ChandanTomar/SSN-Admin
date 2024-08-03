import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Grid, Icon, Menu, MenuItem } from "@mui/material";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import { useEffect, useState } from "react";
import Table from "examples/Tables/Table";
import ApiClient from "Services/ApiClient";
import { toast } from "react-toastify";
import { useSoftUIController, startLoading, setLoading } from "context";
import React from "react";
import { getUsersTransactions } from "Services/endpointes";
import { setTransactions } from "context";
import TransactionsView from "./data/transaction";
import Footer from "examples/Footer";
import { getTransactionsByUserId } from "Services/endpointes";
import { setDialog } from "context";
import { useLocation } from "react-router-dom";

function Transactions() {
  const [controller, dispatch] = useSoftUIController();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [select, setSelect] = React.useState();
  const path = useLocation();
  const pathName = path.pathName;
  const setSelector = (selector) => {
    setSelect(selector);
  };
  const { transactions } = controller;
  const getAllTransactions = async () => {
    startLoading(dispatch, true);
    try {
      const response = await ApiClient.getDataWithPagination(getUsersTransactions, 0, 100);
      if (response.status == 200) {
        setTransactions(dispatch, response.data);
        toast.success(response?.message);
      } else {
        setDialog(dispatch, [response]);
      }
    } catch (error) {
      setLoading(dispatch, false);
      toast.error(response?.message);
    }
  };
  useEffect(() => {
    if (transactions?.length < 1 || pathName) {
      getAllTransactions();
    }
  }, [pathName]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  let memoizedRows = TransactionsView.rows(transactions, dispatch, getAllTransactions);

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
      const response = await ApiClient.getDataByParam(getTransactionsByUserId, inputValue);
      if (response?.status === 200) {
        setTransactions(dispatch, response.data);
        // setConnlength(response.length);
      }
      toast.success(response?.message);
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
      <DashboardNavbar endpoint={"transaction"} call={getAllTransactions} />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          {transactions?.length > 0 ? (
            <>
              <Table columns={TransactionsView.columns} rows={memoizedRows} />
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
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Transactions;
