import React, { useState } from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { Icon } from "@mui/material";
import { setDialog } from "context";
import { PropTypes } from "prop-types";
import { toast } from "react-toastify";
import ApiClient from "Services/ApiClient";
import Button from "@mui/material/Button";
import { updateComment } from "Services/endpointes";
import { deleteComment } from "Services/endpointes";

function CommentItem({ isApproved, id }) {
  const [approvedd, setApproved] = useState(isApproved);
  const [color, setcolor] = useState(false);

  const editComment = async (id, approved) => {
    try {
      const payload = { id, approved };
      const response = await ApiClient.putData(updateComment, payload);
      toast.success(response.message);
    } catch (error) {
      console.error("Error updating comment:", error);
      toast.error(
        error.response?.data?.message ?? "Failed to update comment. Please try again later."
      );
    }
  };

  const handleToggle = () => {
    setApproved(!approvedd);
    editComment(id, !approvedd);
    setcolor(true);
  };

  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <Button
        onClick={handleToggle}
        color={"white"}
        variant="gradient"
        size="small"
        style={{
          marginLeft: "10px",
          background: approvedd
            ? "linear-gradient(90deg, rgb(52, 232, 158) 0%, rgb(15, 52, 67) 100%)"
            : "linear-gradient(90deg, #FFEB3B 0%, #F44336 100%)",
          color: "white",
        }}
      >
        {approvedd ? "Approved " : "Pending"}
      </Button>
    </SoftBox>
  );
}

CommentItem.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  isApproved: PropTypes.any.isRequired,
};

const editComment = (id, getAllComments) => async (formData) => {
  try {
    formData.append("id", id);
    const response = await ApiClient.putData(updateComment, formData);
    toast.success(response.message);
    getAllComments();
  } catch (error) {
    console.error("Error updating comment:", error);
    toast.error(
      error.response?.data?.message ?? "Failed to update comment. Please try again later."
    );
  }
};

const deleteCommentItem = (id, getAllComments) => async () => {
  try {
    const response = await ApiClient.deleteData(deleteComment, id);
    toast.success(response.message);
    getAllComments();
  } catch (error) {
    console.error("Error deleting comment:", error);
    toast.error(
      error.response?.data?.message ?? "Failed to delete comment. Please try again later."
    );
  }
};

const truncateText = (text, letterLimit) => {
  if (text.length <= letterLimit) return text;
  return text.slice(0, letterLimit) + " ...";
};

const commentsView = {
  columns: [
    { name: "templename", align: "left" },
    { name: "name", align: "center" },
    { name: "email", align: "center" },
    { name: "content", align: "center" },
    { name: "isApproved", align: "center" },
    { name: "actions", align: "center" },
  ],

  rows: (data, dispatch, getAllComments) => {
    return data?.map((comment) => {
      console.log(comment);
      return {
        templename: comment.templeName,
        name: (
          <SoftTypography variant="button" fontWeight="medium">
            {comment.name}
          </SoftTypography>
        ),
        email: (
          <SoftTypography variant="button" fontWeight="medium">
            {comment.email}
          </SoftTypography>
        ),
        content: (
          <SoftTypography variant="button" fontWeight="medium">
            {truncateText(comment.message, 10)}
          </SoftTypography>
        ),
        isApproved: (
          <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
            <CommentItem content={comment.message} isApproved={comment.approved} id={comment.id} />
          </SoftBox>
        ),
        actions: (
          <SoftBox
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap="4px"
            px={1}
            py={0.5}
          >
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
                    call: deleteCommentItem(comment.id, getAllComments),
                    action: "Delete",
                    message: `DELETE - Comment`,
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

export default commentsView;
