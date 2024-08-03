import { Card, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import PropTypes from "prop-types";

const UserTransactionForm = ({ data }) => {
  return (
    <Card sx={{ py: 2,boxShadow: 'none', border: 'none' }}>
      <TextField
        autoFocus
        required
        margin="dense"
        id="amount"
        name="amount"
        defaultValue={data.amount}
        label="Amount"
        type="text"
        fullWidth
        variant="standard"
      />
      <TextField
        autoFocus
        required
        margin="dense"
        id="type"
        name="type"
        defaultValue={data.type}
        label="Type"
        type="text"
        fullWidth
        variant="standard"
      />
      <TextField
        autoFocus
        required
        margin="dense"
        id="userId"
        name="userId"
        defaultValue={data.userId}
        label="User ID"
        type="text"
        fullWidth
        variant="standard"
      />
      <TextField
        autoFocus
        margin="dense"
        id="tnxId"
        name="tnxId"
        defaultValue={data.tnxId}
        label="Transaction ID"
        type="text"
        fullWidth
        variant="standard"
      />
      <TextField
        autoFocus
        required
        margin="dense"
        id="invoiceNo"
        name="invoiceNo"
        defaultValue={data.invoiceNo}
        label="Invoice No"
        type="text"
        fullWidth
        variant="standard"
      />
      <FormControl fullWidth>
        <InputLabel
          id="status-label"
          sx={{ transform: "translate(0, 1.5px) scale(0.75)", marginLeft: "10px",marginTop:"29px", fontSize:"18px"}}
        >
          Status
        </InputLabel>
        <Select
          labelId="status-label"
          id="status"
          name="status"
          defaultValue={data.status}
          sx={{
            "& .MuiSelect-root": {
              padding: "10px",
            },
            "& .MuiSelect-select": {
              padding: "10px 0",
            },
          }}
          variant="standard"
        >
          <MenuItem value={true}>Active</MenuItem>
          <MenuItem value={false}>Inactive</MenuItem>
        </Select>
      </FormControl>
      <TextField
        autoFocus
        required
        margin="dense"
        id="paymentMethod"
        name="paymentMethod"
        value={data.paymentMethod}
        label="Payment Method"
        type="text"
        fullWidth
        variant="standard"
      />
    </Card>
  );
};

export default UserTransactionForm;

UserTransactionForm.defaultProps = {
  data: {},
  type: "new",
};

UserTransactionForm.propTypes = {
  data: PropTypes.any,
  type: PropTypes.string,
};
