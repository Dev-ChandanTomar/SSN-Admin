/* eslint-disable react/prop-types */
// Next Work Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftBadge from "components/SoftBadge";
import { Button, Icon } from "@mui/material";
import { setDialog } from "context";
import ApiClient from "Services/ApiClient";
import { toast } from "react-toastify";
import { activateStaff } from "Services/endpointes";
import { startLoading } from "context";
import UsersForm from "../form";
import { updateUser } from "Services/endpointes";
import { setLoading } from "context";
import { deleteUser } from "Services/endpointes";

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

const activateStaffMember = (id, dispatch) => async (form) => {
  startLoading(dispatch, true);
  try {
    const response = await ApiClient.putData(activateStaff, { id: id });
    toast.success(response.message);
  } catch (error) {
    toast.error(error.response?.data?.message ?? "Network Error!");
  }
};
function Verified({ status, dispatch, id }) {
  const handleActivate = () => {
    setDialog(dispatch, [
      {
        status: "form",
        call: activateStaffMember(id, dispatch),
        message: `UPDATE - STAFF `,
        action: "Update",
        children: (
          <p style={{ color: "red", padding: "10px 0" }}>
            Please confirm before activating the account.
          </p>
        ),
      },
    ]);
  };

  if (!status) {
    return (
      <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
        <Button onClick={handleActivate}>
          <SoftBadge
            variant="contained"
            badgeContent="Activate Now"
            color="warning"
            size="sm"
            container
          />
        </Button>
      </SoftBox>
    );
  } else {
    return (
      <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
        <SoftBox display="flex" flexDirection="column">
          <SoftBadge
            variant="gradient"
            badgeContent="Verified"
            color="warning"
            size="xs"
            container
          />
        </SoftBox>
      </SoftBox>
    );
  }
}
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
    console.log(error);
    toast.error(error.toString());
    setLoading(dispatch, false);
  }
};
const adminsView = {
  columns: [
    { name: "user", align: "left" },
    { name: "email", align: "left" },
    { name: "phone", align: "center" },
    { name: "type", align: "center" },

    { name: "actions", align: "center" },
  ],

  rows: (data, dispatch, getAllusers) => {
    return data
      .filter((e) => e.type !== "member")
      .map((e) => {
        const dateObject = new Date(e.createdAt);

        const options = { day: "2-digit", month: "2-digit", year: "2-digit" };

        return {
          user: <Author name={e.name} id={e.id} />,
          email: (
            <SoftTypography variant="caption" color="secondary" fontWeight="medium">
              {e.email}
            </SoftTypography>
          ),
          phone: <Author name={e.phone} />,
          type: <Author name={e.type} />,
          earning: (
            <SoftTypography variant="caption" color="secondary" fontWeight="medium">
              {e.totalEarn}
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
                      message: `UPDATE - STAFF DETAILS - ${e.name}`,
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
                color="error"
                cursor="pointer"
                fontWeight="medium"
                onClick={() => {
                  setDialog(dispatch, [
                    {
                      call: deleteUsers(e.id, getAllusers, dispatch),
                      status: "form",
                      route: "",
                      message: `DELETE - STAFF - ${e.name}`,
                      children: (
                        <p style={{ color: "red", padding: "10px 0" }}>
                          Please confirm before deleting staff.
                        </p>
                      ),
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

export default adminsView;
