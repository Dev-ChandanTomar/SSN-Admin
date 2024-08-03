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
import { InputLabel, Card, Icon } from "@mui/material";
import { useSoftUIController } from "context";
import axios from "axios";
import { updatePhotosGallery, createPhotosGallery } from "Services/endpointes";
import { DropzoneArea } from "material-ui-dropzone";

class UploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          const data = new FormData();
          data.append("upload", file);

          axios
            .post("http://localhost:8080/api/v1/upload", data)
            .then((response) => {
              resolve({
                default: response.data.url,
              });
            })
            .catch((error) => {
              reject(error);
            });
        })
    );
  }

  abort() {}
}

function PhotoGalleryForm() {
  const form = useRef(null);
  const { id } = useParams();
  const isNewPhotoGallery = id === "new-photogallery";
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [controller, dispatch] = useSoftUIController();
  const { photogallery } = controller;
  const [formData, setFormData] = useState({
    title: "",
    mainImage: "",
    date: "",
  });
  function CustomUploadAdapterPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return new UploadAdapter(loader);
    };
  }

  const photoGalleryData = isNewPhotoGallery ? {} : photogallery.find((e) => e.id === id) || {};

  const handleFileChange = (files) => {
    setSelectedFile(files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formErrors.date) {
      toast.warn("Please correct the errors in the form.");
      return;
    }
    const formData = new FormData(form.current);

    setLoading(dispatch, true);

    try {
      let response;
      formData.append("mainImage", selectedFile);
      if (isNewPhotoGallery) {
        response = await ApiClient.createData(createPhotosGallery, formData);
        setDialog(dispatch, [response]);
   
        navigate("/photogallery");
      } else {
        formData.append("id", id);
        response = await ApiClient.putData(updatePhotosGallery, formData);
        setDialog(dispatch, [response]);
        console.log("e",response)
        navigate("/photogallery");
      }

      setDialog(dispatch, [response]);
    } catch (error) {
      toast.warn(error.response?.data?.message);
      setLoading(dispatch, false);
    }
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

  const [formErrors, setFormErrors] = useState({ date: "" });

  const handleDateChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "date") {
      const datePattern = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])\/\d{4}$/;
      setFormErrors({
        date: datePattern.test(value) ? "" : "Invalid date format. Use dd/mm/yyyy.",
      });
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar endpoint={"createphotogallery"} />
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
                <h3>{isNewPhotoGallery ? "Add Photo-Gallery" : "Edit Photo-Gallery"}</h3>

                <SoftBox mt={4} mb={1} width="18%" display="flex" justifyContent="space-between">
                  <SoftButton variant="gradient" color="warning" mr={2} onClick={handleSubmit}>
                    {isNewPhotoGallery ? "Create" : "Update"}
                  </SoftButton>
                  <Link to={"/photogallery"}>
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
                      defaultValue={photoGalleryData.title || ""}
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

                    {/* Banner Image Upload */}
                    <DropzoneArea
                      acceptedFiles={["image/*"]}
                      dropzoneText={"Click here to upload image"}
                      onChange={handleFileChange}
                      fullWidth
                      showPreviews={true}
                      showPreviewsInDropzone={false}
                      maxFileSize={5000000}
                      filesLimit={1}
                      name="mainImage"
                    />
                  </SoftBox>

                  <SoftBox mb={2} width="100%">
                    <InputLabel sx={{ fontSize: "1.0rem", fontWeight: 500, marginBottom: "8px" }}>
                      Date
                    </InputLabel>
                    <SoftInput
                      name="date"
                      placeholder="dd/mm/yyyy"
                      onChange={handleDateChange}
                      fullWidth
                      defaultValue={photoGalleryData.date || ""}
                    />
                    {formErrors.date && (
                      <p style={{ color: "red", fontSize: "0.8rem" }}>{formErrors.date}</p>
                    )}
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
                      <SoftButton variant="gradient" color="warning" onClick={handleSubmit}>
                        {isNewPhotoGallery ? "Create" : "Update"}
                      </SoftButton>
                      <Link to={"/photogallery"}>
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

export default PhotoGalleryForm;
