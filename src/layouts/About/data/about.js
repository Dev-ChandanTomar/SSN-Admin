import React from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { Icon } from "@mui/material";
import { setDialog } from "context";
import { Link } from "react-router-dom";
import { deleteAbout } from "Services/endpointes";
import ApiClient from "Services/ApiClient";

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
Author.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
const truncateText = (text, letterLimit) => {
  if (text.length <= letterLimit) return text;
  return text.slice(0, letterLimit) + " ...";
};

const deleteAboutData = (id, getaboutdata) => async () => {
  try {
    console.log(id);
    const response = await ApiClient.deleteData(deleteAbout, id);
    console.log("ddd",response)
    toast.success(response?.message);
    getaboutdata();
  } catch (error) {
    console.error("Error deleting:", error);
   // toast.error(error.response?.data?.message ?? "Failed to delete. Please try again later.");
  }
};
const aboutView = {
  columns: [
    { name: "title", align: "left" },
    { name: "description", align: "left" },
    { name: "visiondescription", align: "left" },
    { name: "missiondescription", align: "center" },
    { name: "actions", align: "center" },
  ],

  rows: (data, dispatch, getaboutdata) => {
    return data?.map((e) => {
      const formattedDate = new Date(e.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      });

      return {
        title: <Author name={e.title} id={e._id} />,
        description: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {truncateText(e.description, 10)}
          </SoftTypography>
        ),
        visiondescription: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {truncateText(e.visiondescription, 10)}
          </SoftTypography>
        ),
        missiondescription: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {truncateText(e.missiondescription, 15)}
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
              component={Link}
              to={`/about-form/${e.id}`}
              variant="caption"
              cursor="pointer"
            >
              <Icon fontSize="medium" color="info">
                edit_note
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
                    status: "form",
                    call: deleteAboutData(e.id, getaboutdata),
                    message: `DELETE - Temple - ${e.title}`,
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

export default aboutView;
