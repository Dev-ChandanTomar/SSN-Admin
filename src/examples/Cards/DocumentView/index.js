// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function DocumentView({ image, label }) {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "transparent",
        boxShadow: "none",
        overflow: "visible",
        width: "100%",
      }}
    >
      <Box position="relative" height={100} width="100.25%" shadow="xl" borderRadius="xl">
        <CardMedia
          src={`data:image/*;base64,${image}`}
          component="img"
          title={label}
          sx={{
            maxWidth: "100%",
            height: "100%",
            margin: 0,
            // boxShadow: ({ boxShadows: { md } }) => md,
            objectFit: "fill",
            objectPosition: "center",
          }}
        />
      </Box>
    </Card>
  );
}

// Typechecking props for the DocumentView
DocumentView.propTypes = {
  image: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default DocumentView;
