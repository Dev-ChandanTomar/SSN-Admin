import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
function MiniStatisticsCard({ bgColor, title, count, percentage, icon, direction }) {
  return (
    <Card>
      <SoftBox bgColor={bgColor} variant="gradient">
        <SoftBox p={2}>
          <Grid container alignItems="center">
            {direction === "left" || 1 ? (
              <Grid item>
                <SoftBox
                  variant="gradient"
                  bgColor={"warning"}
                  color={"white"}
                  width="3rem"
                  height="3rem"
                  borderRadius="md"
                  marginRight="1rem"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  shadow="md"
                >
                  <Icon fontSize="small" color="inherit">
                    {icon.component}
                  </Icon>
                </SoftBox>
              </Grid>
            ) : null}
            <Grid item xs={8}>
              <SoftBox ml={direction === "left" ? 2 : 0} lineHeight={1}>
                <SoftTypography
                  variant="button"
                  color={bgColor === "white" ? "text" : "white"}
                  opacity={bgColor === "white" ? 1 : 0.7}
                  textTransform="capitalize"
                  fontWeight={title.fontWeight}
                >
                  {title.text}
                </SoftTypography>
                <SoftTypography variant="h5" fontWeight="bold">
                  {count}{" "}
                  <SoftTypography variant="button" color={percentage.color} fontWeight="bold">
                    {percentage.text}
                  </SoftTypography>
                </SoftTypography>
              </SoftBox>
            </Grid>
          </Grid>
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

MiniStatisticsCard.defaultProps = {
  bgColor: "white",
  title: {
    fontWeight: "medium",
    text: "",
  },
  percentage: {
    color: "warning",
    text: "",
  },
  direction: "right",
};
MiniStatisticsCard.propTypes = {
  bgColor: PropTypes.oneOf([
    "white",
    "primary",
    "secondary",
    "info",
    "warning",
    "warning",
    "error",
    "dark",
  ]),
  title: PropTypes.shape({
    fontWeight: PropTypes.oneOf(["light", "regular", "medium", "bold"]),
    text: PropTypes.string,
  }),
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  percentage: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "warning",
      "warning",
      "error",
      "dark",
      "white",
    ]),
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),

  icon: PropTypes.shape({
    color: PropTypes.oneOf(["primary", "secondary", "info", "warning", "warning", "error", "dark"]),
    component: PropTypes.node.isRequired,
  }).isRequired,
  direction: PropTypes.oneOf(["right", "left"]),
  children: PropTypes.node,
};

export default MiniStatisticsCard;
