import { Card, TextField, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import PropTypes from "prop-types";

const TempleForm = ({ data }) => {
  const formatDate = (date) => {
    const d = new Date(date);
    const month = `${d.getMonth() + 1}`.padStart(2, "0");
    const day = `${d.getDate()}`.padStart(2, "0");
    const year = d.getFullYear();
    return [year, month, day].join("-");
  };

  const formattedEstablishedDate = data?.establishedDate ? formatDate(data.establishedDate) : "";

  console.log("dataaaaa", data);
  return (
    <Card sx={{ py: 2, boxShadow: "none", border: "none" }}>
      <TextField
        autoFocus
        required
        margin="dense"
        id="title"
        name="title"
        defaultValue={data?.title}
        label="Title"
        type="text"
        fullWidth
        variant="standard"
        sx={{ marginBottom: "20px" }}
      />
      <TextField
        autoFocus
        required
        margin="dense"
        id="description"
        name="description"
        defaultValue={data?.description}
        label="Description"
        type="text"
        fullWidth
        variant="standard"
      />
      <TextField
        autoFocus
        required
        margin="dense"
        id="shortdescription"
        name="shortdescription"
        defaultValue={data?.shortDescription}
        label="Short Description"
        type="text"
        fullWidth
        variant="standard"
      />
      <TextField
        autoFocus
        required
        margin="dense"
        id="city"
        name="city"
        defaultValue={data?.city}
        label="city"
        type="text"
        fullWidth
        variant="standard"
      />
      <TextField
        autoFocus
        required
        margin="dense"
        id="location"
        name="location"
        defaultValue={data?.location}
        label="Location"
        type="text"
        fullWidth
        variant="standard"
      />
      <TextField
        autoFocus
        required
        margin="dense"
        id="establishedDate"
        name="establishedDate"
        defaultValue={data?.establishedDate}
        label="Established Date"
        type="text"
        fullWidth
        variant="standard"
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        autoFocus
        required
        margin="dense"
        id="state"
        name="state"
        defaultValue={data?.state}
        label="State"
        type="text"
        fullWidth
        variant="standard"
      />
      <TextField
        autoFocus
        required
        margin="dense"
        id="country"
        name="country"
        defaultValue={data?.country}
        label="Country"
        type="text"
        fullWidth
        variant="standard"
      />

      <TextField
        autoFocus
        required
        margin="dense"
        id="help"
        name="help"
        defaultValue={data?.help}
        label="Help"
        type="text"
        fullWidth
        variant="standard"
      />
      <FormControl fullWidth>
        <InputLabel
          id="status-label"
          sx={{ transform: "translate(0, 1.5px) scale(0.75)", marginLeft: "10px" }}
        >
          Category
        </InputLabel>
        <Select
          labelId="status-label"
          id="category"
          name="category"
          defaultValue={data.category}
          sx={{
            "& .MuiSelect-root": {
              padding: "10px",
            },
          }}
        >
          <MenuItem value={"temp-slide"}>Home Slider</MenuItem>
          <MenuItem value={"famous"}>Famous Session</MenuItem>
          <MenuItem value={"all"}>All</MenuItem>
        </Select>
      </FormControl>
    </Card>
  );
};

export default TempleForm;

TempleForm.defaultProps = {
  data: {},
  type: "new",
};

TempleForm.propTypes = {
  data: PropTypes.any,
  type: PropTypes.string,
};
