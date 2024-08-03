/* eslint-disable react/prop-types */
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import ApiClient from "Services/ApiClient";
import { toast } from "react-toastify";
import { setLoading, startLoading } from "context";
import { deleteCommitteMembers } from "Services/endpointes";
import { updateCommitteMembers } from "Services/endpointes";

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

const editCommitteMember = (id, getCommitteMemberData, endpoint, dispatch) => async (formData) => {
  startLoading(dispatch, true);

  try {
    formData.append("id", id);
    const response = await ApiClient.putData(endpoint, formData);
    if (response.status === 200) {
      toast.success(response.message);
      getCommitteMemberData();
    } else {
      toast.error(response.message);
      setLoading(dispatch, false);
    }
  } catch (error) {
    toast.error(error.toString());
    setLoading(dispatch, false);
  }
};

const deleteCommitteMember = (id, getCommitteMemberData, dispatch) => async (formData) => {
  startLoading(dispatch, true);
  try {
    const response = await ApiClient.deleteData(deleteCommitteMembers, id);
    toast.success(response.message);
    getCommitteMemberData();
  } catch (error) {
    console.error("Error Deleting Committe Member:", error);
    toast.error(error.response?.data?.message ?? "Network Error!");
  }
};

const CommitteMemberView = {
  columns: [
    { name: "name", align: "left" },
    { name: "fathername", align: "left" },
    { name: "mothername", align: "center" },
    { name: "email", align: "center" },
    { name: "phone", align: "center" },
    { name: "adhare", align: "center" },
    { name: "address", align: "center" },
    { name: "city", align: "center" },
    { name: "state", align: "center" },
    { name: "country", align: "center" },
    { name: "purpose", align: "center" },
  ],

  rows: (data, dispatch, getCommitteMemberData) => {
    return data
      .filter((e) => e.type !== "admin")
      .map((e) => {
        const dateObject = new Date(e.createdAt);
        const options = { day: "2-digit", month: "2-digit", year: "2-digit" };
        const formattedDate = dateObject.toLocaleDateString("en-GB", options);

        return {
          name: <Author name={e.name} id={e.id} />,
          fathername: (
            <SoftTypography variant="caption" color="secondary" fontWeight="medium">
              {e.fathername}
            </SoftTypography>
          ),
          mothername: (
            <SoftTypography variant="caption" color="secondary" fontWeight="medium">
              {e.mothername}
            </SoftTypography>
          ),
          email: (
            <SoftTypography variant="caption" color="secondary" fontWeight="medium">
              {e.email}
            </SoftTypography>
          ),
          phone: (
            <SoftTypography variant="caption" color="secondary" fontWeight="medium">
              {e.phone}
            </SoftTypography>
          ),
          adhare: (
            <SoftTypography variant="caption" color="secondary" fontWeight="medium">
              {e.adhare}
            </SoftTypography>
          ),
          address: (
            <SoftTypography variant="caption" color="secondary" fontWeight="medium">
              {e.address}
            </SoftTypography>
          ),
          city: (
            <SoftTypography variant="caption" color="secondary" fontWeight="medium">
              {e.city}
            </SoftTypography>
          ),
          state: (
            <SoftTypography variant="caption" color="secondary" fontWeight="medium">
              {e.state}
            </SoftTypography>
          ),
          country: (
            <SoftTypography variant="caption" color="secondary" fontWeight="medium">
              {e.country}
            </SoftTypography>
          ),
          purpose: (
            <SoftTypography variant="caption" color="secondary" fontWeight="medium">
              {e.purpose}
            </SoftTypography>
          ),
        };
      });
  },
};

export default CommitteMemberView;
