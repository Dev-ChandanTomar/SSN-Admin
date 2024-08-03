import { Card, TextField } from "@mui/material";
import { PropTypes } from "prop-types";

const UsersForm = ({ data }) => {
  console.log(data);
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Assuming data.createdAt is a valid date string or a Date object
  const formattedDate = formatDate(data.createdAt);
  return (
    <Card sx={{ py: 2,boxShadow: 'none', border: 'none' }}>
      <TextField
        autoFocus
        margin="dense"
        id="city"
        name="city"
        defaultValue={data.city}
        label="city"
        type="text"
        fullWidth
        variant="standard"
      />
      <TextField
        autoFocus
        margin="dense"
        id="name"
        name="name"
        defaultValue={data.name}
        label="name"
        type="text"
        fullWidth
        variant="standard"
      />
      <TextField
        autoFocus
        margin="dense"
        id="attempt"
        name="email"
        defaultValue={data.email}
        label="Email"
        type="text"
        fullWidth
        variant="standard"
      />
      <TextField
        autoFocus
        margin="dense"
        id="phone"
        name="phone"
        defaultValue={data.phone}
        label="Phone Number"
        type="text"
        fullWidth
        variant="standard"
      />
      <TextField
        autoFocus
        margin="dense"
        id="designation"
        name="designation"
        defaultValue={data.designation}
        label="designation"
        type="text"
        fullWidth
        variant="standard"
      />
      <TextField
        autoFocus
        margin="dense"
        id="ountryy"
        name="country"
        defaultValue={data.country}
        label="country"
        type="text"
        fullWidth
        variant="standard"
      />
      <TextField
        autoFocus
        margin="dense"
        id="state"
        name="state"
        defaultValue={data.state}
        label="state"
        type="text"
        fullWidth
        variant="standard"
      />
      <TextField
        autoFocus
        margin="dense"
        id="location"
        name="location"
        defaultValue={data.location}
        label="location"
        type="text"
        fullWidth
        variant="standard"
      />
      <TextField
        autoFocus
        margin="dense"
        id="type"
        name="type"
        defaultValue={data.type}
        label="type"
        type="text"
        fullWidth
        variant="standard"
      />
    </Card>
  );
};
export default UsersForm;

UsersForm.defaultProps = {
  data: {},
  type: "new",
};

UsersForm.propTypes = {
  data: PropTypes.any,
  type: PropTypes.string,
};
