import React from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { Icon } from "@mui/material";
import { setDialog } from "context";
import { Link } from "react-router-dom";
import ApiClient from "Services/ApiClient";
import { deletePhotosGalleryById } from "Services/endpointes";

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

const deletePhotoGalleryData = (id, getPhotoGalleryData) => async () => {
  try {
    console.log(id);
    const response = await ApiClient.deleteData(deletePhotosGalleryById, id);
    toast.success(response?.message);
    getPhotoGalleryData();
  } catch (error) {
    console.error("Error deleting:", error);
    toast.error(error.response?.data?.message ?? "Failed to delete. Please try again later.");
  }
};

const photoGalleryView = {
  columns: [
    { name: "title", align: "left" },
    { name: "date", align: "left" },
    { name: "actions", align: "center" },
  ],

  rows: (data, dispatch, getPhotoGalleryData) => {
    return data?.map((e) => {
      return {
        title: <Author name={e.title} id={e._id} />,
        date: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {e.date}
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
              to={`/add-Photo/${e.id}`}
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
                    call: deletePhotoGalleryData(e.id, getPhotoGalleryData),
                    message: `DELETE - PhotoGallery - ${e.title}`,
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

export default photoGalleryView;
