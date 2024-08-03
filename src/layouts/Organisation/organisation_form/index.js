import React, { useRef, useState, useEffect, useCallback } from "react";
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
import { makeStyles } from "@material-ui/core/styles";
import Dropzone from "react-dropzone";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { TextField, InputLabel, TextareaAutosize, Card, Icon } from "@mui/material";
import { useSoftUIController } from "context";
import { createOrganisation } from "Services/endpointes";
import { updateOrganisation } from "Services/endpointes";

class CustomUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  async upload() {
    const file = await this.loader.file;
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await ApiClient.createData(`/upload`, formData);
      return {
        default: response.url,
      };
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  }

  abort() {}
}
const CustomIcon = () => {
  return (
    <SoftBox>
      <Icon fontSize="medium">arrow_drop_down</Icon>
    </SoftBox>
  ); // Ensure this is a valid JSX element
};
function OrganisationForm() {
  const form = useRef(null);
  const { id } = useParams();
  const isNewOrganisation = id === "new-organisation";
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedSub1File, setSub1SelectedFile] = useState([]);
  const [selectedSub2File, setSub2SelectedFile] = useState([]);
  const [selectedSub3File, setSub3SelectedFile] = useState(null);
  const [controller, dispatch] = useSoftUIController();
  const { organisation } = controller;
  const organisationData = isNewOrganisation ? {} : organisation.find((e) => e.id === id) || {};
  const [editorData, setEditorData] = useState("");
  const handleFileChange = (e) => {
    // setSelectedFile(files[0]);
    setSelectedFile(e.target.files[0]);
  };

  const onDrop = useCallback((acceptedFiles) => {
    setSub1SelectedFile((prevFiles) => [...prevFiles, ...acceptedFiles]);
    const imagePreviews = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setSub2SelectedFile((prevFiles) => [...prevFiles, ...imagePreviews]);
  }, []);

  const handleRemoveImage = (index) => {
    setSub2SelectedFile((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setSub1SelectedFile((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleSub2FileChange = (e) => {
    // setSelectedFile(files[0]);
    setSub2SelectedFile(e.target.files[0]);
  };

  const handleSub3FileChange = (e) => {
    // setSelectedFile(files[0]);
    setSub3SelectedFile(e.target.files[0]);
  };

  const submitHandler = async (e, route) => {
    e.preventDefault();
    const formdata = new FormData(form.current);

    formdata.append("description", editorData);
    if (selectedFile) {
      formdata.append("mainImage", selectedFile);
      console.log("mainimg", selectedFile);
    }
    if (selectedSub1File && selectedSub1File.length > 0) {
      selectedSub1File.forEach((file, index) => {
        formdata.append(`subImages[${index}]`, file);
      });
    }
    const formDataObject = {};
    formdata.forEach((value, key) => {
      formDataObject[key] = value;
    });

    console.log("Form Data:", formDataObject);
    setLoading(dispatch, true);

    try {
      let response;

      if (isNewOrganisation) {
        response = await ApiClient.createData(route, formdata);
      } else {
        formdata.append("id", id);
        response = await ApiClient.putData(route, formdata);
        console.log("qqq", response);
      }

      setDialog(dispatch, [response]);
      navigate("/organisation");
    } catch (error) {
      toast.warn(error.response?.data?.message);
      setLoading(dispatch, false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleFileImageChange = (newFiles) => {
    // Assuming filesLimit={1}, so we take the first file
    setFile([...file, ...newFiles]);
  };

  const clearFile = () => {
    setFile([]);
  };

  useEffect(() => {
    return () => {
      selectedSub2File.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [selectedSub2File]);

  const useStyles = makeStyles((theme) => ({
    dropzone: {
      height: "200px", // Custom height
      "& .MuiDropzoneArea-root": {
        height: "100%", // Ensure the inner dropzone area takes the full height
      },
    },
  }));
  function CustomUploadAdapterPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return new CustomUploadAdapter(loader);
    };
  }

  const [organisationDataForm, setOrganisationData] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrganisationData({
      ...organisationDataForm,
      [name]: value,
    });

    if (name === "email") {
      validateEmail(value);
    } else if (name === "phone") {
      validatePhone(value);
    }
  };

  const validateEmail = (email) => {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  const validatePhone = (phone) => {
    // Basic phone validation regex (example: allows only 10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      setPhoneError("Invalid phone number");
    } else {
      setPhoneError("");
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar endpoint={"organisation"} />
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
                <h3>{isNewOrganisation ? "Add Organisation" : "Edit Organisation"}</h3>

                <SoftBox mt={4} mb={1} width="18%" display="flex" justifyContent="space-between">
                  <SoftButton
                    variant="gradient"
                    color="warning"
                    mr={2}
                    onClick={(e) =>
                      submitHandler(e, isNewOrganisation ? createOrganisation : updateOrganisation)
                    }
                  >
                    {isNewOrganisation ? "Create" : "Update"}
                  </SoftButton>
                  <Link to={"/organisation"}>
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
                      Organisation Name
                    </InputLabel>
                    <SoftInput
                      name="title"
                      placeholder=" Organisation Name"
                      fullWidth
                      defaultValue={organisationData.title || ""}
                    />
                  </SoftBox>
                  <SoftBox mb={2} width="100%">
                    <InputLabel sx={{ fontSize: "1.0rem", fontWeight: 500, marginBottom: "8px" }}>
                      Upload Main Images
                    </InputLabel>

                    <TextField
                      variant="outlined"
                      fullWidth
                      type="file"
                      onChange={handleFileChange}
                      InputProps={{
                        inputProps: { accept: "image/*" },
                      }}
                    />
                    {organisationData.mainImage ? organisationData.mainImage : null}
                  </SoftBox>

                  <SoftBox mb={2} width="100%">
                    <InputLabel sx={{ fontSize: "1.0rem", fontWeight: 500, marginBottom: "8px" }}>
                      Upload Sub Images
                    </InputLabel>

                    <div
                      style={{
                        border: "2px dashed #cccccc",
                        borderRadius: "4px",
                        padding: "20px",
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                    >
                      <Dropzone onDrop={onDrop} multiple>
                        {({ getRootProps, getInputProps }) => (
                          <section>
                            <div {...getRootProps()}>
                              <input {...getInputProps()} />
                              <p>
                                Drag &apos;n&apos; drop some files here, or click to select files
                              </p>
                            </div>
                          </section>
                        )}
                      </Dropzone>
                    </div>

                    <ul
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        listStyleType: "none",
                        padding: 0,
                        marginTop: "20px",
                      }}
                    >
                      {selectedSub2File.map((file, index) => (
                        <li key={index} style={{ position: "relative", margin: "10px" }}>
                          <img
                            src={file.preview}
                            alt={`Preview ${index}`}
                            style={{ width: "150px", height: "150px", objectFit: "cover" }}
                          />
                          <button
                            onClick={() => handleRemoveImage(index)}
                            style={{
                              position: "absolute",
                              top: "5px",
                              right: "5px",
                              backgroundColor: "red",
                              color: "white",
                              border: "none",
                              borderRadius: "50%",
                              cursor: "pointer",
                            }}
                          >
                            &times;
                          </button>
                          <p>{file.file.name}</p>
                        </li>
                      ))}
                    </ul>
                  </SoftBox>

                  <SoftBox mb={2} width="100%">
                    <div>
                      <InputLabel sx={{ fontSize: "1.0rem", fontWeight: 500, marginBottom: "8px" }}>
                        Description
                      </InputLabel>
                      <CKEditor
                        editor={ClassicEditor}
                        config={{
                          extraPlugins: [CustomUploadAdapterPlugin],
                        }}
                        data={organisationData.description || ""}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          setEditorData(data);
                        }}
                      />
                    </div>
                  </SoftBox>
                  <SoftBox mb={2} width="100%">
                    <InputLabel sx={{ fontSize: "1.0rem", fontWeight: 500, marginBottom: "8px" }}>
                      Phone Number
                    </InputLabel>
                    <SoftInput
                      name="phone"
                      placeholder="Phone Number"
                      value={organisationData.phone}
                      onChange={handleChange}
                      error={!!phoneError}
                      helperText={phoneError}
                      fullWidth
                    />
                  </SoftBox>

                  <SoftBox mb={2} width="100%">
                    <InputLabel sx={{ fontSize: "1.0rem", fontWeight: 500, marginBottom: "8px" }}>
                      Email Address
                    </InputLabel>
                    <SoftInput
                      name="email"
                      placeholder="Email Address"
                      value={organisationData.email}
                      onChange={handleChange}
                      error={!!emailError}
                      helperText={emailError}
                      fullWidth
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
                        onClick={(e) =>
                          submitHandler(
                            e,
                            isNewOrganisation ? createOrganisation : updateOrganisation
                          )
                        }
                      >
                        {isNewOrganisation ? "Create" : "Update"}
                      </SoftButton>
                      <Link to={"/organisation"}>
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

export default OrganisationForm;
