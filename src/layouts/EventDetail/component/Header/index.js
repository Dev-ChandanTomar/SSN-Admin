import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import breakpoints from "assets/theme/base/breakpoints";
import defaultImage from "assets/images/curved-images/curved0.jpg";
import { useSoftUIController } from "context";
import { Icon } from "@mui/material";

function TempleDetailHeader({ backgroundImage, title, location }) {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  const [controller] = useSoftUIController();
  const { user } = controller;

  useEffect(() => {
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    window.addEventListener("resize", handleTabsOrientation);

    handleTabsOrientation();

    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  return (
    <SoftBox position="relative"  >
      <SoftBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="18.75rem"
        borderRadius="xl"
        sx={{
          backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.info.main, 0.6),
              rgba(gradients.info.state, 0.6)
            )}, url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
        }}
      />
      <Card
        sx={{
          backdropFilter: `saturate(200%) blur(30px)`,
          backgroundColor: ({ functions: { rgba }, palette: { white } }) => rgba(white.main, 0.8),
          boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
          position: "relative",
          mt: -8,
          // mx: 3,
          py: 2,
          px: 2,
        }}
        style={{marginBottom:"20px"}}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Icon>pin_drop</Icon>
          </Grid>
          <Grid item>
            <SoftBox height="100%" mt={0.5} lineHeight={1}>
              <SoftTypography variant="h6" fontWeight="medium">
                {title}
              </SoftTypography>
              <SoftTypography variant="button" color="text" fontWeight="medium">
                {location.city}, {location.state} ,{location.country}
              </SoftTypography>
            </SoftBox>
          </Grid>
        </Grid>
      </Card>
    </SoftBox>
  );
}

TempleDetailHeader.propTypes = {
  backgroundImage: PropTypes.string,
  title: PropTypes.string,
  location: PropTypes.shape({
    city: PropTypes.string,
    state: PropTypes.string,
    country: PropTypes.string,
  }),
};

TempleDetailHeader.defaultProps = {
  backgroundImage: defaultImage,
  title: "",
  location: {
    city: "",
    state: "",
    country: "",
  },
};

export default TempleDetailHeader;
