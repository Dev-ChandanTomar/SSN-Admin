import React from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { Icon } from "@mui/material";
import { setDialog } from "context";
import { Link } from "react-router-dom";
import ApiClient from "Services/ApiClient";
import { deleteLiveById } from "Services/endpointes";

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

const deleteLiveUrlData = (id, getLiveUrlData) => async () => {
  try {
    console.log(id);
    const response = await ApiClient.deleteData(deleteLiveById, id);
    toast.success(response?.message);
    getLiveUrlData();
  } catch (error) {
    console.error("Error deleting:", error);
    toast.error(error.response?.data?.message ?? "Failed to delete. Please try again later.");
  }
};

const LiveUrlView = {
  columns: [
    { name: "title", align: "left" },
    { name: "src", align: "left" },
    { name: "actions", align: "center" },
  ],

  rows: (data, dispatch, getLiveUrlData) => {
    return data?.map((e) => {
      return {
        title: <Author name={e.title} id={e._id} />,
        src: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {truncateText(e.src, 40)}
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
              to={`/add-live/${e.id}`}
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
                    call: deleteLiveUrlData(e.id, getLiveUrlData),
                    message: `DELETE - Live - ${e.title}`,
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

export default LiveUrlView;
