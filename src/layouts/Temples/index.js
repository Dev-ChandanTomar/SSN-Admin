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
import { useSoftUIController, startLoading, setLoading, setProducts, setDialog } from "context";
import { getProducts, createProduct } from "Services/endpointes";
import productsView from "./data/products";
import Footer from "examples/Footer";
import SoftButton from "components/SoftButton";
import { Link, useLocation } from "react-router-dom";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { setCount } from "context";

function Products() {
  const [controller, dispatch] = useSoftUIController();
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [type, setType] = React.useState("nextwork");
  const [length, setLength] = React.useState(0);
  const path = useLocation();
  const pathName = path.pathname;
  const { products, count } = controller;

  const getAllProducts = async () => {
    startLoading(dispatch, true);
    try {
      const response = await ApiClient.getData(
        `${getProducts}?type=${type}&page=${page - 1}&limit=${rowsPerPage}`
      );
      setProducts(dispatch, response.data);
      setCount(dispatch, response.count);
      setLength(response?.length);
      toast.success(response?.message);
    } catch (error) {
      setLoading(dispatch, false);
      toast.error(error.response?.data?.message ?? "Oops! Something went wrong, please try later");
    }
  };

  useEffect(() => {
    if (products?.length < 1 || pathName) {
      getAllProducts();
    }
  }, [type, page, rowsPerPage, pathName]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setProducts(dispatch, []);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
    setProducts(dispatch, []);
  };

  let memoizedRows = productsView.rows(products, dispatch, getAllProducts);

  function SetEndpoint(t) {
    setType((_) => {
      let newEndpoint = t;
      return newEndpoint;
    });
    setProducts(dispatch, []);
  }

  const addProduct = async (formData) => {
    startLoading(dispatch, true);
    try {
      const response = await ApiClient.createData(createProduct, formData);
      getAllProducts();
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
      <DashboardNavbar endpoint={"products"} call={getAllProducts} />
      <SoftBox
        position="relative"
        right="0px"
        zIndex={99}
        color="warning"
        sx={{ cursor: "pointer" }}
        onClick={openMenu}
      >
        {/* Optional SoftButton component can be placed here */}
      </SoftBox>

      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">All Temples</SoftTypography>
              <SoftButton
                component={Link}
                to={`/temple-form/new-temple`}
                variant="gradient"
                color="dark"
              >
                <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                &nbsp; Add Temple
              </SoftButton>
            </SoftBox>

            {products?.length > 0 ? (
              <>
                <Table columns={productsView.columns} rows={memoizedRows} />
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

export default Products;
