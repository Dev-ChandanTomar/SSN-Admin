import React from "react";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

function Congratulations() {
    return (

        <Card style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <SoftBox display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                <img src="logo.png" alt="Company Logo" style={{ maxWidth: "500px", marginBottom: "100px" }} />

                <SoftBox mt={2}>
                    <SoftTypography variant="h2" mt={0}>
                        Congratulations
                    </SoftTypography>
                    <SoftTypography variant="h3" mt={5}>
                        Have a great earning ahead
                    </SoftTypography>

                </SoftBox>
            </SoftBox>
        </Card>

    );
}

export default Congratulations;
