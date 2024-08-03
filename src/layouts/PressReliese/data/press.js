import React from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { Icon } from "@mui/material";
import { setDialog } from "context";
import { Link } from "react-router-dom";
import ApiClient from "Services/ApiClient";
import { deletePressRelieseById } from "Services/endpointes";

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

const deletePressReliesedata = (id, getPressRelieseData) => async () => {
  try {
    console.log(id);
    const response = await ApiClient.deleteData(deletePressRelieseById, id);
    toast.success(response?.message);
    getPressRelieseData();
  } catch (error) {
    console.error("Error deleting:", error);
    toast.error(error.response?.data?.message ?? "Failed to delete. Please try again later.");
  }
};

const pressreleaseView = {
  columns: [
    { name: "title", align: "left" },
    { name: "date", align: "center" },
    { name: "view", align: "center" },
    { name: "actions", align: "center" },
  ],

  rows: (data, dispatch, getPressRelieseData) => {
    return data?.map((e) => {
      const formattedDate = new Date(e.createdAt).toLocaleDateString("en-GB", {
        month: "2-digit",
        day: "2-digit",
        year: "2-digit",
      });

      return {
        title: <Author name={e.title} id={e._id} />,

        date: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {formattedDate}
          </SoftTypography>
        ),

        view: (
          <SoftBox display="flex" alignItems="center" justifyContent="center">
            <SoftTypography
              component={Link}
              to={`/pressreliese-details/${e.title}`}
              variant="caption"
              color="warning"
              fontWeight="medium"
              cursor="pointer"
            >
              <Icon fontSize="small" color="info">
                visibility
              </Icon>
            </SoftTypography>
          </SoftBox>
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
              to={`/add-Reliese/${e.id}`}
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
                    call: deletePressReliesedata(e.id, getPressRelieseData),
                    message: `DELETE - PressReliese - ${e.title}`,
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

export default pressreleaseView;
