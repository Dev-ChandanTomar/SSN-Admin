import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

function BuildByDevelopers() {
  return (
    <Card>
      <SoftBox p={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <SoftBox display="flex" flexDirection="column" height="10%">
              <SoftBox pt={1} mb={0.5}>
                <SoftTypography variant="body2" color="text" fontWeight="medium">
                  Founder President of Sanatan SewaNyas
                </SoftTypography>
              </SoftBox>
              <SoftTypography variant="h5" fontWeight="bold" gutterBottom>
                Sri Shivom Mishra
              </SoftTypography>
              <SoftBox mb={2}>
                <SoftTypography variant="body2" color="text">
                  सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज। <br></br>अहं त्वां सर्वपापेभ्यो
                  मोक्षयिष्यामि मा शुच:॥
                </SoftTypography>
              </SoftBox>
            </SoftBox>
          </Grid>
          <Grid item xs={12} lg={3} sx={{ position: "relative", ml: "auto" }}>
            <SoftBox>
              <SoftBox component="img" src={"./shivom.png"} alt="logo" width="100%" pt={3} />
            </SoftBox>
          </Grid>
        </Grid>
      </SoftBox>
    </Card>
  );
}

export default BuildByDevelopers;
