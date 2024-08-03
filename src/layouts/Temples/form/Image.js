import { useState } from "react";
import { Card, Button, Box } from "@mui/material";
import PropTypes from "prop-types";

const TempImageForm = ({ data, type }) => {
  const [bannerImage, setBannerImage] = useState(data?.bannerImage?.image || "");
  const [mainImage, setMainImage] = useState(data?.mainImage?.image || "");
  const [sub1, setSub1] = useState(data?.sub1?.image || "");
  const [sub2, setSub2] = useState(data?.sub2?.image || "");
  const [sub3, setSub3] = useState(data?.sub3?.image || "");
  const formatDate = (date) => {
    const d = new Date(date);
    const month = `${d.getMonth() + 1}`.padStart(2, "0");
    const day = `${d.getDate()}`.padStart(2, "0");
    const year = d.getFullYear();
    return [year, month, day].join("-");
  };
  const handleImageChange = (event, setImage) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const formattedEstablishedDate = data?.establishedDate ? formatDate(data.establishedDate) : "";

  console.log("dataaaaa", data);
  return (
    <Card sx={{ py: 2, boxShadow: "none", border: "none" }}>
      <Box>
        <Box
          width="100%"
          alignItems={"center"}
          justifyContent={"center"}
          display={"grid"}
          marginBottom={"1rem"}
        >
          <Button variant="contained" component="label">
            Upload Banner Image
            <input
              name="bannerImage"
              type="file"
              hidden
              onChange={(e) => handleImageChange(e, setBannerImage)}
            />
          </Button>
          <Box width={"100%"}>
            {bannerImage && <img src={bannerImage} alt="Banner" width="100" />}
          </Box>
        </Box>

        <Box
          width="100%"
          alignItems={"center"}
          justifyContent={"center"}
          display={"grid"}
          marginBottom={"1rem"}
        >
          <Button variant="contained" component="label">
            Upload Main Image
            <input
              name="mainImage"
              type="file"
              hidden
              onChange={(e) => handleImageChange(e, setMainImage)}
            />
          </Button>
          <Box width={"100%"}>{mainImage && <img src={mainImage} alt="Main" width="100" />}</Box>
        </Box>
        <Box
          width="100%"
          alignItems={"center"}
          justifyContent={"center"}
          display={"grid"}
          marginBottom={"1rem"}
        >
          <Button variant="contained" component="label">
            Upload Sub Image 1
            <input name="sub1" type="file" hidden onChange={(e) => handleImageChange(e, setSub1)} />
          </Button>
          {sub1 && <img src={sub1} alt="Sub1" width="100" />}
        </Box>
        <Box
          width="100%"
          alignItems={"center"}
          justifyContent={"center"}
          display={"grid"}
          marginBottom={"1rem"}
        >
          <Button variant="contained" component="label">
            Upload Sub Image 2
            <input name="sub2" type="file" hidden onChange={(e) => handleImageChange(e, setSub2)} />
          </Button>
          <Box width={"100%"}> {sub2 && <img src={sub2} alt="Sub2" width="100" />}</Box>
        </Box>
        <Box
          width="100%"
          alignItems={"center"}
          justifyContent={"center"}
          display={"grid"}
          marginBottom={"1rem"}
        >
          <Button variant="contained" component="label">
            Upload Sub Image 3
            <input type="file" name="sub3" hidden onChange={(e) => handleImageChange(e, setSub3)} />
          </Button>
          <Box width={"100%"}> {sub3 && <img src={sub3} alt="Sub3" width="100" />}</Box>
        </Box>
      </Box>
    </Card>
  );
};

export default TempImageForm;

TempImageForm.defaultProps = {
  data: {},
  type: "new",
};

TempImageForm.propTypes = {
  data: PropTypes.any,
  type: PropTypes.string,
};
