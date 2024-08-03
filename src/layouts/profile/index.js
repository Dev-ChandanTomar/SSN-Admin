import Grid from "@mui/material/Grid";
import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import Header from "layouts/profile/components/Header";
import { useSoftUIController } from "context";
import Footer from "examples/Footer";
import { setDialog } from "context";
import InfoEdit from "./Form";
import ApiClient from "Services/ApiClient";
import { updateAdmin } from "Services/endpointes";
import { toast } from "react-toastify";
import { startLoading } from "context";
import { setLoading } from "context";

function Overview() {
  const [controller, dispatch] = useSoftUIController();
  const { user } = controller;
  const editInfo = (id) => async (formData) => {
    startLoading(dispatch, true);
    try {
      startLoading(dispatch, true);
      formData.append("id", id);
      console.log(id, formData, formData.get("id"));
      const response = await ApiClient.putData(updateAdmin, formData);
      toast.success(response.message);
      setLoading(dispatch, false);
    } catch (error) {
      setLoading(dispatch, false);
      toast.error(error.response?.data?.message);
    }
  };
  return (
    <DashboardLayout>
      <Header />
      <SoftBox mt={5} mb={3}>
        <Grid container spacing={3} justifyContent={"center"}>
          <Grid item xs={12} md={11.5} xl={11.5}>
            <ProfileInfoCard
              title="profile information"
              info={{
                fullName: user?.name,
                id: user?.id,
                DOB: user?.dob,
                mobile: user?.phone,
                email: user?.email,
                role: user?.type,
              }}
              action={{
                tooltip: "Edit Profile",
                onClick: () => {
                  setDialog(dispatch, [
                    {
                      status: "form",
                      call: editInfo(user.id),

                      message: `UPDATE - Info - ${user.id}`,
                      action: "Update",
                      children: <InfoEdit data={user} />,
                    },
                  ]);
                },
              }}
            />
          </Grid>
        </Grid>
      </SoftBox>

      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
