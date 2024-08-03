import { Card, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { PropTypes } from "prop-types";

const CommentForm = ({ data }) => {
  return (
    <Card>
      <TextField
        autoFocus
        required
        margin="dense"
        id="name"
        name="name"
        defaultValue={data.name}
        label="Full Name"
        type="text"
        fullWidth
        variant="standard"
      />
      <TextField
        autoFocus
        required
        margin="dense"
        id="email"
        name="email"
        defaultValue={data.email}
        label="Email"
        type="email"
        fullWidth
        variant="standard"
      />
      <TextField
        autoFocus
        required
        margin="dense"
        id="message"
        name="message"
        defaultValue={data.message}
        label="Message"
        type="text"
        fullWidth
        multiline
        rows={4}
        variant="standard"
        sx={{ marginBottom: "20px" }}
      />
      <FormControl fullWidth>
        <InputLabel
          id="status-label"
          sx={{ transform: "translate(0, 1.5px) scale(0.75)", marginLeft: "10px" }}
        >
          Status
        </InputLabel>
        <Select
          labelId="status-label"
          id="approved"
          name="approved"
          defaultValue={data.approved}
          sx={{
            "& .MuiSelect-root": {
              padding: "10px",
            },
          }}
        >
          <MenuItem value={true}>Approved</MenuItem>
          <MenuItem value={false}>Pending</MenuItem>
        </Select>
      </FormControl>
    </Card>
  );
};

export default CommentForm;

CommentForm.defaultProps = {
  data: {},
  type: "new",
};

CommentForm.propTypes = {
  data: PropTypes.any,
  type: PropTypes.string,
};
