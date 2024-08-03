import React, { useRef, useState } from "react";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import { FormControl, FormLabel, InputLabel, MenuItem, Select, Box } from "@mui/material";
import ApiClient from "Services/ApiClient";
import { setDialog } from "context";
import { useSoftUIController } from "context";
import { setLoading } from "context";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { registerAdmin } from "Services/endpointes";
import Footer from "examples/Footer";

function AddStaff() {
  const [agreement, setAgreement] = useState(true);
  const form = useRef(null);

  const [roleOptions, setRoleOptions] = useState([]);
  const [controller, dispatch] = useSoftUIController();

  const handleSetAgreement = () => setAgreement((prevAgreement) => !prevAgreement);

  const submitHandler = async (e, route) => {
    e.preventDefault();
    const formdata = new FormData(form.current);
    setLoading(dispatch, true);
    try {
      const response = await ApiClient.createData(route, formdata);
      setDialog(dispatch, [response]);
      // navigate("/");
    } catch (error) {
      toast.warn(error.response?.data?.message);
      setLoading(dispatch, false);
    }
  };

  const [type, setType] = React.useState("");

  const handleChange = (event) => {
    setType(event.target.value);
  };
  return (
    <DashboardLayout>
      <DashboardNavbar endpoint={"createmember"} />
      <SoftBox py={3} display="flex" justifyContent="center">
        <SoftBox
          mb={3}
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Card style={{ width: "77.5vw" }}>
            <SoftBox pt={2} pb={3} px={3} display="flex" flexDirection="column" alignItems="center">
              <SoftBox mb={2} width="100%" textAlign="center">
                <h3>ADD ADMINISTRATOR</h3>
              </SoftBox>
              <SoftBox width="100%">
                <SoftBox
                  component="form"
                  role="form"
                  encType="multipart/form-data"
                  method="POST"
                  ref={form}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                >
                  <SoftBox mb={2} width="100%">
                    <SoftInput name="name" placeholder="Name" />
                  </SoftBox>
                  <SoftBox mb={2} width="100%">
                    <SoftInput name="email" type="email" placeholder="Email" />
                  </SoftBox>
                  <SoftBox mb={2} width="100%">
                    <SoftInput name="password" type="password" placeholder="Password" />
                    <SoftTypography color="text" fontWeight="light" fontSize="14px">
                      Password must be alphanumeric and must contain at least one special character.
                      <span style={{ color: "red" }}> *</span>
                    </SoftTypography>
                  </SoftBox>
                  <SoftBox mb={2} width="100%">
                    <SoftInput name="designation" placeholder="Designation" />
                  </SoftBox>
                  <SoftBox mb={2} width="100%">
                    <SoftInput name="location" placeholder="Location" />
                  </SoftBox>
                  <SoftBox mb={2} width="100%">
                    <SoftInput name="state" placeholder="State" />
                  </SoftBox>
                  <SoftBox mb={2} width="100%">
                    <SoftInput name="city" placeholder="City" />
                  </SoftBox>
                  <SoftBox mb={2} width="100%">
                    <SoftInput name="country" placeholder="Country" />
                  </SoftBox>
                  <Box mb={2} width="100%">
                    <FormControl fullWidth>
                      <Select
                        labelId="status-label"
                        id="type"
                        name="type"
                        value={type}
                        onChange={handleChange}
                        displayEmpty
                        sx={{
                          "& .MuiSelect-root": {
                            padding: "10px",
                          },
                          "& .MuiSelect-select": {
                            color: "grey",
                          },
                          "& .MuiSelect-select:empty:before": {
                            content: '"Type"',
                            color: "rgba(0, 0, 0, 0.6)",
                          },
                        }}
                      >
                        <MenuItem disabled value="">
                          <em>Type</em>
                        </MenuItem>
                        <MenuItem value="member">Member</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  <SoftBox mb={2} width="100%">
                    <SoftInput
                      name="phone"
                      type="text"
                      placeholder="Phone"
                      onChange={(e) => {
                        e.target.value =
                          e.target.value.length > 10
                            ? e.target.value.substr(0, 10)
                            : e.target.value;
                      }}
                      maxLength={10}
                      onKeyPress={(e) => {
                        if (isNaN(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    />
                    <SoftTypography color="text" fontWeight="light" fontSize="14px">
                      Please enter a valid mobile number.<span style={{ color: "red" }}> *</span>
                    </SoftTypography>
                  </SoftBox>
                  <SoftBox mb={2} width="100%">
                    <FormLabel>Upload Photo</FormLabel>
                    <SoftInput name="photo" type="file" />
                  </SoftBox>
                  <SoftBox mt={4} mb={1} width="100%">
                    <SoftButton
                      variant="gradient"
                      color="warning"
                      fullWidth
                      onClick={(e) => submitHandler(e, registerAdmin)}
                    >
                      Register
                    </SoftButton>
                  </SoftBox>
                </SoftBox>
              </SoftBox>
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default AddStaff;
