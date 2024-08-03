import { Grid } from "@mui/material";
import ApiClient from "Services/ApiClient";
import { Card } from "antd";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { Link, useParams } from "react-router-dom";
import { useSoftUIController } from "context";
import { toast } from "react-toastify";
import TempleDetailHeader from "./component/Header";
import { updateTemple } from "Services/endpointes";
import { uploadImage } from "Services/endpointes";

const TempleDetails = () => {
  const { title } = useParams();
  const [controller, dispatch] = useSoftUIController();
  const { products } = controller;
  const templeData = products.find((e) => e.title == title);
  console.log("d", templeData.subImages);
  const editTemple = (id) => async (formData) => {
    try {
      formData.append("id", id);
      const response = await ApiClient.putData(updateTemple, formData);
      toast.success(response.message);
    } catch (error) {
      console.error("Error editing:", error);
      toast.error(error.response?.data?.message ?? "Failed to edit. Please try again later.");
    }
  };
  const uploadImages = (id) => async (formData) => {
    try {
      formData.append("id", id);
      console.log(id, formData, formData.get("id"));
      const response = await ApiClient.createData(`${uploadImage}/${id}`, formData);
      toast.success(response.message);
    } catch (error) {
      console.error("Error editing:", error);
      toast.error(error.response?.data?.message ?? "Failed to edit. Please try again later.");
    }
  };
  console.log("dd", templeData);
  console.log("d", templeData.subImages);
  return (
    <DashboardLayout>
      <TempleDetailHeader
        backgroundImage={templeData.bannerImage}
        title={templeData.title}
        location={{
          city: templeData.city,
          state: templeData.state,
          country: templeData.country,
        }}
      />
      <SoftBox mb={3}>
        <Card>
          <SoftBox pt={2} px={2}>
            <SoftBox mb={0.5}>
              {templeData ? ( // Check if temple is defined
                <SoftTypography variant="h6" fontWeight="medium">
                  {templeData.title}
                </SoftTypography>
              ) : (
                <SoftTypography variant="h6" fontWeight="medium">
                  Loading...
                </SoftTypography>
              )}
            </SoftBox>
            <SoftBox mb={1}>
              <SoftTypography
                target="_blank"
                component={Link}
                to={templeData.help}
                fontWeight="regular"
                color="text"
                cursor="pointer"
              >
                {templeData.help}
              </SoftTypography>
            </SoftBox>
          </SoftBox>
          <SoftBox p={2}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} xl={12}>
                <DefaultProjectCard
                  image={templeData.mainImage}
                  label={templeData.shortDescription}
                  category={templeData.category}
                  description={templeData.description}
                  authors={templeData.subImages}
                />
              </Grid>
            </Grid>
          </SoftBox>
        </Card>
      </SoftBox>
    </DashboardLayout>
  );
};

export default TempleDetails;
