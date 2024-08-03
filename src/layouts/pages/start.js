import React from "react";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import { Icon } from "@mui/material";

function Start() {
    return (
        <Card style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <SoftBox display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                <img src="logo.png" alt="Company Logo" style={{ maxWidth: "500px", marginTop: "-200px", marginBottom: "100px" }} />

                <SoftBox mt={2}>
                    <SoftButton variant="gradient" color="dark">
                        <Icon sx={{ fontWeight: "bold" }}>playcirclefilledwhite_icon</Icon>
                        &nbsp;Start Now
                    </SoftButton>
                </SoftBox>
            </SoftBox>
        </Card>
    );
}

export default Start;
