// react-router-dom components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Tooltip from "@mui/material/Tooltip";

// Next Work Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import SoftAvatar from "components/SoftAvatar";

function DefaultProjectCard({ image, label, title, description, category, authors }) {
  console.log("ww",authors)
  const renderAuthors = authors.map(( image, name ) => (
    <SoftBox key={name} title={name} placement="bottom">
      <CardMedia
         src={`${process.env.REACT_APP_API_BASE_URL}/temples/${image.image}`}
        
        component="img"
        //src={`${process.env.REACT_APP_BASE_URL}/temples/${media}`}
        alt={name}
        size="xs"
        sx={({ borders: { borderWidth }, palette: { white } }) => ({
          border: `${borderWidth[2]} solid ${white.main}`,
          cursor: "pointer",
          position: "relative",
          height: '200px', // Adjust height as needed
          width: '300px',
          ml: -1.25,

          "&:hover, &:focus": {
            zIndex: "10",
          },
        })}
      />
    </SoftBox>
  ));

  const formatContentWithImages = (content) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;

    const images = tempDiv.querySelectorAll("img");
    images.forEach((img) => {
      img.style.maxWidth = "50%";
      img.style.height = "auto";
    });

    return tempDiv.innerHTML;
  };
  
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "transparent",
        boxShadow: "none",
        overflow: "visible",
      }}
    >
      <SoftBox position="relative" width="100.25%" borderRadius="xl">
        <h3 className="mb-2">Main Image</h3>
        <CardMedia
          src={`${process.env.REACT_APP_API_BASE_URL}/temples/${image}`}
          component="img"
          title={title}
          sx={{
            maxWidth: "100%",
            margin: 0,
            height:"60vh",
            boxShadow: ({ boxShadows: { md } }) => md,
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </SoftBox>
      <SoftBox pt={3} px={0.5}>
        <SoftBox mb={1} display="flex"  flexDirection="column"  width="100%">
        
          <SoftTypography
            variant="button"
            fontWeight="regular"
            textTransform="capitalize"
            // textGradient
          >
            <h3 className="mb-2">Short Description</h3>
            {label}
          </SoftTypography>
    
          <SoftTypography
            variant="button"
            fontWeight="regular"
            textTransform="capitalize"
            // textGradient
          >
            <h3 className="mb-2">Categories</h3>
            {category}
          </SoftTypography>
        </SoftBox>
        {/* <SoftBox mb={1}>
          {action.type === "internal" ? (
            <SoftTypography
              // component={Link}
              // to={action.route}
              variant="button"
              textTransform="capitalize"
            >
              {title}
            </SoftTypography>
          ) : (
            <SoftTypography
              component="a"
              target="_blank"
              rel="noreferrer"
              variant="h5"
              textTransform="capitalize"
            >
              {title}
            </SoftTypography>
          )}
        </SoftBox> */}
        <SoftBox mb={3} lineHeight={0}>
        <h3 className="mb-2">Description</h3>
          <SoftTypography variant="button" fontWeight="regular" color="text">
            {/* {description} */}
            <div   dangerouslySetInnerHTML={{
                      __html: formatContentWithImages(description),
                    }}/>
          </SoftTypography>
        </SoftBox>
        <h3 className="mb-2">Sub Images</h3>
        <SoftBox display="flex" justifyContent="space-between" alignItems="center">
        
          <SoftBox display="flex" >{renderAuthors}</SoftBox>
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

// Setting default values for the props of DefaultProjectCard
DefaultProjectCard.defaultProps = {
  authors: [],
};

// Typechecking props for the DefaultProjectCard
DefaultProjectCard.propTypes = {
  image: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  action: PropTypes.shape({
    type: PropTypes.oneOf(["external", "internal"]),
    message: PropTypes.string.isRequired,
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "warning",
      "warning",
      "error",
      "light",
      "dark",
      "white",
    ]).isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  authors: PropTypes.arrayOf(PropTypes.object),
};

export default DefaultProjectCard;
