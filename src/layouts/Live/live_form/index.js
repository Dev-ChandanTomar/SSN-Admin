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
import { InputLabel, Card } from "@mui/material";
import { useSoftUIController } from "context";
import axios from "axios";
import { createLive } from "Services/endpointes";
import { updateLive } from "Services/endpointes";

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

function LiveUrlForm() {
  const form = useRef(null);
  const { id } = useParams();
  const isNewLiveUrl = id === "new-liveurl";
  const navigate = useNavigate();

  const [controller, dispatch] = useSoftUIController();
  const { liveurl } = controller;
  const [formData, setFormData] = useState({
    title: "",
    src: "",
  });
  const [formErrors, setFormErrors] = useState({ src: "" });

  function CustomUploadAdapterPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return new UploadAdapter(loader);
    };
  }

  const liveUrlData = isNewLiveUrl ? {} : liveurl.find((e) => e.id === id) || {};

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate URL format
    if (name === "src") {
      const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
      if (!urlRegex.test(value)) {
        setFormErrors({ src: "Please enter a valid URL." });
      } else {
        setFormErrors({ src: "" });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formErrors.src) {
      toast.warn("Please correct the errors in the form.");
      return;
    }

    const formData = new FormData(form.current);

    setLoading(dispatch, true);

    try {
      let response;

      if (isNewLiveUrl) {
        response = await ApiClient.createData(createLive, formData);

        console.log("rrr", response);
        setDialog(dispatch, [response?.data]);
        navigate("/live");
      } else {
        formData.append("id", id);
        response = await ApiClient.putData(updateLive, formData);
        console.log("rrr", response);
        setDialog(dispatch, [response.data]);
        navigate("/live");
      }

      setDialog(dispatch, [response]);
    } catch (error) {
      toast.warn(error.response?.data?.message);
      setLoading(dispatch, false);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar endpoint={"createliveurl"} />
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
                <h3>{isNewLiveUrl ? "Add Live" : "Edit Live"}</h3>

                <SoftBox mt={4} mb={1} width="18%" display="flex" justifyContent="space-between">
                  <SoftButton variant="gradient" color="warning" mr={2} onClick={handleSubmit}>
                    {isNewLiveUrl ? "Create" : "Update"}
                  </SoftButton>
                  <Link to={"/live"}>
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
                      defaultValue={liveUrlData.title || ""}
                      onChange={handleChange}
                    />
                  </SoftBox>

                  <SoftBox mb={2} width="100%">
                    <InputLabel sx={{ fontSize: "1.0rem", fontWeight: 500, marginBottom: "8px" }}>
                      Src
                    </InputLabel>
                    <SoftInput
                      name="src"
                      placeholder="iframe of live youtube..."
                      defaultValue={liveUrlData.src || ""}
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
                      onChange={handleChange}
                    />
                    {formErrors.src && (
                      <p style={{ color: "red", fontSize: "0.8rem" }}>{formErrors.src}</p>
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
                        {isNewLiveUrl ? "Create" : "Update"}
                      </SoftButton>
                      <Link to={"/live"}>
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

export default LiveUrlForm;
