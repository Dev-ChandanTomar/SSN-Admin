import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import curved6 from "assets/images/curved-images/curved14.jpg";
import { FormControl, FormLabel, MenuItem, Select } from "@mui/material";
import ApiClient from "Services/ApiClient";
import { setDialog } from "context";
import { useSoftUIController } from "context";
import { setLoading } from "context";
import { registerAdmin } from "Services/endpointes";
import { toast } from "react-toastify";
import CoverLayout from "../components/CoverLayout";

function SignUp() {
  const [agreement, setAgreement] = useState(true);
  const form = useRef(null);
  const [roleOptions, setRoleOptions] = useState([]);
  const [controller, dispatch] = useSoftUIController();
  const navigate = useNavigate();

  const handleSetAgreement = () => setAgreement((prevAgreement) => !prevAgreement);

  const submitHandler = async (e, route) => {
    e.preventDefault();
    const formdata = new FormData(form.current);
    setLoading(dispatch, true);
    try {
      const response = await ApiClient.createData(route, formdata);
      setDialog(dispatch, [response]);
      navigate("/");
    } catch (error) {
      toast.warn(error.response?.data?.message);
      setLoading(dispatch, false);
    }
  };

  useEffect(() => {
    // fetchRoleOptions();
  }, []);

  return (
    <CoverLayout title="Welcome!" description="TO NEXTWORK TECHNOLOGIES" image={curved6}>
      <SoftBox pt={2} pb={3} px={3}>
        <SoftBox
          component="form"
          role="form"
          encType="multipart/form-data"
          method="POST"
          ref={form}
        >
          <SoftBox mb={2}>
            <h3>Let us know about you!</h3>
          </SoftBox>
          {/* <SoftBox mb={2}>
            <FormControl
              sx={{
                display: "flex",
                gap: 5,
                justifyContent: "center",
                flexDirection: "row",
                alignContent: "center",
              }}
            >
              <FormLabel color="primary" sx={{ alignSelf: "center" }}>
                Initials
              </FormLabel>
              <Select
                labelId="initial"
                id="demo-simple-select"
                defaultValue="Mr."
                label="Initial"
                name="initial"
              >
                <MenuItem fullWidth value="Mr.">
                  Mr.
                </MenuItem>
                <MenuItem value="Mrs.">Mrs.</MenuItem>
                <MenuItem value="Miss">Miss</MenuItem>
                <MenuItem value="Ms.">Ms.</MenuItem>
                <MenuItem value="Dr.">Dr.</MenuItem>
         
              </Select>
            </FormControl>
          </SoftBox> */}
          <SoftBox mb={2}>
            <SoftInput name="name" placeholder="Name" />
          </SoftBox>
          <SoftBox mb={2}>
            <SoftInput name="email" type="email" placeholder="Email" />
          </SoftBox>
          <SoftBox mb={2}>
            <SoftInput name="password" type="password" placeholder="Password" />
            <SoftTypography color="text" fontWeight="light" fontSize="14px">
              Password must be alphanumeric and must contain at least one special character.
            </SoftTypography>
          </SoftBox>
          <SoftBox mb={2}>
            <SoftInput name="designation" placeholder="Designation" />
          </SoftBox>
          <SoftBox mb={2}>
            <SoftInput name="location" placeholder="Location" />
          </SoftBox>
          <SoftBox mb={2}>
            <SoftInput name="state" placeholder="State" />
          </SoftBox>
          <SoftBox mb={2}>
            <SoftInput name="city" placeholder="City" />
          </SoftBox>
          <SoftBox mb={2}>
            <SoftInput name="country" placeholder="Country" />
          </SoftBox>
          <SoftBox mb={2}>
            <SoftInput
              name="phone"
              type="text"
              placeholder="Phone"
              onChange={(e) => {
                e.target.value =
                  e.target.value.length > 10 ? e.target.value.substr(0, 10) : e.target.value;
              }}
              maxLength={10}
              onKeyPress={(e) => {
                if (isNaN(e.key)) {
                  e.preventDefault();
                }
              }}
            />
            <SoftTypography color="text" fontWeight="light" fontSize="14px">
              Please enter a valid mobile number
            </SoftTypography>
          </SoftBox>
          <SoftBox mb={2}>
            <FormLabel>Upload Photo</FormLabel>
            <SoftInput name="photo" type="file" />
          </SoftBox>
          {/* <SoftBox display="flex" alignItems="center">
            <Checkbox checked={agreement} onChange={handleSetAgreement} />
            <SoftTypography
              variant="button"
              fontWeight="regular"
              onClick={handleSetAgreement}
              sx={{ cursor: "pointer", userSelect: "none" }}
            >
              &nbsp;&nbsp;I agree to the&nbsp;
            </SoftTypography>
            <SoftTypography component="a" href="#" variant="button" fontWeight="bold" textGradient>
              Terms and Conditions
            </SoftTypography>
          </SoftBox> */}
          <SoftBox mt={4} mb={1}>
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
        <SoftBox mt={3} textAlign="center">
          <SoftTypography variant="button" color="text" fontWeight="regular">
            Already have an account?&nbsp;
            <SoftTypography
              component={Link}
              to="/"
              variant="button"
              color="warning"
              fontWeight="bold"
              textGradient
              cursor="pointer"
            >
              Sign in
            </SoftTypography>
          </SoftTypography>
        </SoftBox>
      </SoftBox>
    </CoverLayout>
  );
}

export default SignUp;
