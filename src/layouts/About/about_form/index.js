import React, { useRef, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import ApiClient from "Services/ApiClient";
import { setDialog, setLoading } from "context";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import SoftBox from "components/SoftBox";
import SoftInput from "components/SoftInput";
import { toast } from "react-toastify";
import SoftButton from "components/SoftButton";
import Footer from "examples/Footer";
import { Button, Typography, Grid, Icon } from "@mui/material";
import { InputLabel, TextareaAutosize, Card } from "@mui/material";
import { useSoftUIController } from "context";
import { createAbout } from "Services/endpointes";
import { updateAbout } from "Services/endpointes";
import { DropzoneArea } from "material-ui-dropzone";

function AboutFormData() {
  const form = useRef(null);
  const { id } = useParams();
  const isNewAbout = id === "new-about";
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [controller, dispatch] = useSoftUIController();
  const { AboutSsn } = controller;
  const aboutData = isNewAbout ? {} : AboutSsn.find((e) => e.id === id) || {};
  const [formErrors, setFormErrors] = useState({ src: "" });
  const handleFileChange = (files) => {
    setSelectedFile(files[0]);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (formErrors.src) {
      toast.warn("Please correct the errors in the form.");
      return;
    }

    const formData = new FormData(form.current);
    formData.append("aboutImage", selectedFile);
    setLoading(dispatch, true);

    try {
      let response;

      if (isNewAbout) {
        response = await ApiClient.createData(createAbout, formData);
        setDialog(dispatch, [response]);
        navigate("/about");
      } else {
        formData.append("id", id);
        response = await ApiClient.putData(updateAbout, formData);
        setDialog(dispatch, [response]);
        navigate("/about");
      }

      setDialog(dispatch, [response]);
    } catch (error) {
      toast.warn(error.response?.data?.message);
      setLoading(dispatch, false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFileImageChange = (newFiles) => {
    setFile([...file, ...newFiles]);
  };

  const clearFile = () => {
    setFile([]);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar endpoint={"createabout"} />
      <SoftBox py={3} display="flex" justifyContent="center" width="100%">
        <SoftBox
          mb={3}
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          width="100%"
        >
          <Card style={{ width: "100%" }}>
            <SoftBox
              pt={2}
              pb={3}
              px={3}
              display="flex"
              flexDirection="column"
              alignItems="center"
              width="100%"
            >
              <SoftBox
                mb={2}
                width="100%"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <h3>{isNewAbout ? "Add About" : "Edit About"}</h3>

                <SoftBox mt={4} mb={1} width="18%" display="flex" justifyContent="space-between">
                  <SoftButton
                    variant="gradient"
                    color="warning"
                    mr={2}
                    onClick={(e) => submitHandler(e, isNewAbout ? createAbout : updateAbout)}
                  >
                    {isNewAbout ? "Create" : "Update"}
                  </SoftButton>
                  <Link to={"/about"}>
                    <SoftButton variant="gradient" color="warning">
                      Exit
                    </SoftButton>
                  </Link>
                </SoftBox>
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
                  width="100%"
                >
                  <SoftBox mb={2} width="100%">
                    <InputLabel sx={{ fontSize: "1.0rem", fontWeight: 500, marginBottom: "8px" }}>
                      Title
                    </InputLabel>
                    <SoftInput
                      name="title"
                      placeholder="Title"
                      fullWidth
                      defaultValue={aboutData.title || ""}
                    />
                  </SoftBox>

                  <SoftBox mb={2} width="100%">
                    <InputLabel sx={{ fontSize: "1.0rem", fontWeight: 500, marginBottom: "8px" }}>
                      Description
                    </InputLabel>
                    <TextareaAutosize
                      name="description"
                      placeholder="Description"
                      defaultValue={aboutData.description || ""}
                      minRows={4}
                      style={{
                        width: "100%",
                        padding: "10px",
                        border: "1px solid rgba(0, 0, 0, 0.23)",
                        borderRadius: "4px",
                        fontSize: "16px",
                        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                        color: "rgba(0, 0, 0, 0.87)",
                      }}
                    />
                  </SoftBox>
                  <SoftBox mb={2} width="100%">
                    <SoftBox
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      py={3}
                    >
                      <InputLabel sx={{ fontSize: "1.0rem", fontWeight: 500, marginBottom: "8px" }}>
                        Upload Images
                      </InputLabel>
                     
                    </SoftBox>

                    <DropzoneArea
                      acceptedFiles={["image/*"]}
                      dropzoneText={"Click here to upload image"}
                      onChange={handleFileChange}
                      fullWidth
                      value={"upload"}
                      showPreviews={true}
                      showPreviewsInDropzone={false}
                      maxFileSize={5000000}
                      filesLimit={1}
                      name="image"
                    />

                    {file.length > 0 && (
                      <Grid container spacing={2}>
                        {file.map((file, index) => (
                          <Grid item xs={4} key={index}>
                            <Typography>Preview {index + 1}:</Typography>
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Preview ${index + 1}`}
                              style={{ maxWidth: "100px" }}
                            />
                          </Grid>
                        ))}
                        <Grid item xs={12}>
                          <Button variant="outlined" color="secondary" onClick={clearFile}>
                            Clear All Previews
                          </Button>
                        </Grid>
                      </Grid>
                    )}
                  </SoftBox>
                  <SoftBox mb={2} width="100%">
                    <InputLabel sx={{ fontSize: "1.0rem", fontWeight: 500, marginBottom: "8px" }}>
                      Vision Description
                    </InputLabel>
                    <TextareaAutosize
                      name="visiondescription"
                      placeholder="Vision Description"
                      defaultValue={aboutData.visiondescription || ""}
                      minRows={4}
                      style={{
                        width: "100%",
                        padding: "10px",
                        border: "1px solid rgba(0, 0, 0, 0.23)",
                        borderRadius: "4px",
                        fontSize: "16px",
                        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                        color: "rgba(0, 0, 0, 0.87)",
                      }}
                    />
                  </SoftBox>
                  <SoftBox mb={2} width="100%">
                    <InputLabel sx={{ fontSize: "1.0rem", fontWeight: 500, marginBottom: "8px" }}>
                      Mision Description
                    </InputLabel>
                    <TextareaAutosize
                      name="missiondescription"
                      placeholder="Mission Description"
                      defaultValue={aboutData.missiondescription || ""}
                      minRows={4}
                      style={{
                        width: "100%",
                        padding: "10px",
                        border: "1px solid rgba(0, 0, 0, 0.23)",
                        borderRadius: "4px",
                        fontSize: "16px",
                        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                        color: "rgba(0, 0, 0, 0.87)",
                      }}
                    />
                  </SoftBox>

                  <SoftBox
                    mb={2}
                    width="100%"
                    display="flex"
                    justifyContent="end"
                    alignItems="center"
                  >
                    <SoftBox
                      mt={4}
                      mb={1}
                      width="18%"
                      display="flex"
                      justifyContent="space-between"
                    >
                      <SoftButton
                        variant="gradient"
                        color="warning"
                        onClick={(e) => submitHandler(e, isNewAbout ? createAbout : updateAbout)}
                      >
                        {isNewAbout ? "Create" : "Update"}
                      </SoftButton>
                      <Link to={"/about"}>
                        <SoftButton variant="gradient" color="warning">
                          Exit
                        </SoftButton>
                      </Link>
                    </SoftBox>
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

export default AboutFormData;
