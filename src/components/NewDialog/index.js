import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useSoftUIController } from "context";
import { PropTypes } from "prop-types";

export default function NewFormDialog({ open, setOpen, data }) {
  const [controller, dispatch] = useSoftUIController();
  const { dialog } = controller;

  const handleClose = () => {
    setOpen(false);
  };
  console.log(data, "from dialog");
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: async (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            data.call(formData);
            handleClose()
          },
        }}
      >
        <DialogTitle>{data?.message}</DialogTitle>
        {data?.type && <DialogTitle>{data?.type}</DialogTitle>}

        <DialogContent>{data?.children}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">{data?.action}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

NewFormDialog.defaultProps = {
  open: false,
  setOpen: () => {},
  data: [] ?? "",
};

NewFormDialog.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  data: PropTypes.any,
};
