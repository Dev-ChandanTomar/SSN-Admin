/* eslint-disable react/prop-types */
// Next Work Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { Icon } from "@mui/material";
import { setDialog } from "context";
import { updateUser, deleteUser } from "Services/endpointes";
import ApiClient from "Services/ApiClient";
import { toast } from "react-toastify";
import UsersForm from "../form";
import { useSoftUIController } from "context";
import { setLoading, startLoading } from "context";

function Author({ name, id }) {
  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="button" fontWeight="medium">
          {name}
        </SoftTypography>
        <SoftTypography variant="caption" color="secondary">
          {id}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

const editUsers = (id, getAllusers, endpoint, dispatch) => async (formData) => {
  startLoading(dispatch, true);

  try {
    formData.append("id", id);
    const response = await ApiClient.putData(endpoint, formData);
    if (response.status === 200) {
      toast.success(response.message);
      getAllusers();
    } else {
      toast.error(response.message);
      setLoading(dispatch, false);
    }
  } catch (error) {
    toast.error(error.toString());
    setLoading(dispatch, false);
  }
};

const deleteUsers = (id, getAllusers, dispatch) => async (formData) => {
  startLoading(dispatch, true);
  try {
    const response = await ApiClient.deleteData(deleteUser, id);
    toast.success(response.message);
    getAllusers();
  } catch (error) {
    console.error("Error Deleting user:", error);
    toast.error(error.response?.data?.message ?? "Network Error!");
  }
};

const usersView = {
  columns: [
    { name: "user", align: "left" },
    { name: "email", align: "left" },
    { name: "phone", align: "center" },
    { name: "designation", align: "center" },
    { name: "location", align: "center" },
    { name: "actions", align: "center" },
  ],

  rows: (data, dispatch, getAllusers) => {
    const [controller, _] = useSoftUIController();
    const { userAddress, userKyc, userTab } = controller;
    return data
      .filter((e) => e.type !== "admin")
      .map((e) => {
        const dateObject = new Date(e.createdAt);
        const options = { day: "2-digit", month: "2-digit", year: "2-digit" };
        const formattedDate = dateObject.toLocaleDateString("en-GB", options);

        return {
          user: <Author name={e.name} id={e.id} />,
          email: (
            <SoftTypography variant="caption" color="secondary" fontWeight="medium">
              {e.email}
            </SoftTypography>
          ),
          phone: <Author name={e.phone} />,
          designation: (
            <SoftTypography variant="caption" color="secondary" fontWeight="medium">
              {e.designation}
            </SoftTypography>
          ),
          location: (
            <SoftTypography variant="caption" color="secondary" fontWeight="medium">
              {e.location}, {e.city}, {e.state}, {e.country}
            </SoftTypography>
          ),
          actions: (
            <SoftBox
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap="10px"
              px={1}
              py={0.5}
            >
              <SoftTypography
                component="a"
                href="#"
                variant="caption"
                color="warning"
                fontWeight="medium"
                cursor="pointer"
                onClick={() => {
                  setDialog(dispatch, [
                    {
                      call: editUsers(e.id, getAllusers, updateUser, dispatch),
                      status: "form",
                      route: "",
                      message: `UPDATE USER : ${e.name}`,
                      action: "Update",
                      children: <UsersForm data={e} />,
                    },
                  ]);
                }}
              >
                <Icon fontSize="small" color="info">
                  edit
                </Icon>
              </SoftTypography>
              <SoftTypography
                component="a"
                href="#"
                variant="caption"
                color="danger"
                fontWeight="medium"
                cursor="pointer"
                onClick={() => {
                  setDialog(dispatch, [
                    {
                      call: deleteUsers(e.id, getAllusers, dispatch),
                      status: "form",
                      message: `DELETE - USER - ${e.id}`,
                      action: "Delete",
                    },
                  ]);
                }}
              >
                <Icon fontSize="small" color="error">
                  delete
                </Icon>
              </SoftTypography>
            </SoftBox>
          ),
        };
      });
  },
};

export default usersView;
