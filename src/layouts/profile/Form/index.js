import { Card, TextField } from "@mui/material";
import PropTypes from "prop-types";

const InfoEdit = ({ data }) => {
  return (
    <Card sx={{ py: 2,boxShadow: 'none', border: 'none' }}>
      <TextField
        autoFocus
        required
        margin="dense"
        id="fullName"
        name="fullName"
       
        defaultValue={data.fullName}
        label="full Name"
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
        type="text"
        fullWidth
        variant="standard"
      />
      <TextField
        autoFocus
        required
        margin="dense"
        id="DOb"
        name="dob"
        value={data.dob}
        defaultValue={data.dob}
        label="DOB"
        type="date"
        fullWidth
        variant="standard"
      />
      <TextField
        autoFocus
        required
        margin="dense"
        id="phone"
        name="phone"
        defaultValue={data.phone}
        label="Phone"
        type="text"
        fullWidth
        variant="standard"
        inputProps={{
          minLength: 10,
          pattern: "[0-9]+",
          title: "Please enter at least 10 digits",
        }}
      />
    </Card>
  );
};

InfoEdit.defaultProps = {
  data: {},
};

InfoEdit.propTypes = {
  data: PropTypes.shape({
    fullName: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    dob: PropTypes.string,
  }),
};

export default InfoEdit;
