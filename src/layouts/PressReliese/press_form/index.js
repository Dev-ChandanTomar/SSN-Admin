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
import { InputLabel, Card } from "@mui/material";
import { useSoftUIController } from "context";
import { createPressReliese, updatePressReliese } from "Services/endpointes";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Footer from "examples/Footer";

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

function PressRelieseForm() {
  const form = useRef(null);
  const { id } = useParams();
  const isNewPressReliese = id === "new-pressreliese";
  const navigate = useNavigate();

  const [controller, dispatch] = useSoftUIController();
  const { pressreliese } = controller;
  const [editorData, setEditorData] = useState("");

  function CustomUploadAdapterPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return new CustomUploadAdapter(loader);
    };
  }

  const pressRelieseData = isNewPressReliese ? {} : pressreliese.find((e) => e.id === id) || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);

    formData.append("content", editorData);

    setLoading(dispatch, true);

    try {
      if (isNewPressReliese) {
        const response = await ApiClient.createData(createPressReliese, formData);
        setDialog(dispatch, [response]);
        navigate("/pressreliese");
      } else {
        formData.append("id", id);
        const response = await ApiClient.putData(updatePressReliese, formData);
        setDialog(dispatch, [response]);
        navigate("/pressreliese");
      }

      setDialog(dispatch, [response]);
      navigate("/pressreliese");
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
  const formattedDate = new Date(pressRelieseData.date).toLocaleDateString("en-GB", {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
  });
  return (
    <DashboardLayout>
      <DashboardNavbar endpoint={"createpressreliese"} />
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
                <h3>{isNewPressReliese ? "Add Press-Reliese" : "Edit Press-Reliese"}</h3>

                <SoftBox mt={4} mb={1} width="18%" display="flex" justifyContent="space-between">
                  <SoftButton variant="gradient" color="warning" mr={2} onClick={handleSubmit}>
                    {isNewPressReliese ? "Create" : "Update"}
                  </SoftButton>
                  <Link to={"/pressreliese"}>
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
                      defaultValue={pressRelieseData.title || ""}
                    />
                  </SoftBox>

                  <SoftBox mb={2} width="100%">
                    <div>
                      <InputLabel sx={{ fontSize: "1.0rem", fontWeight: 500, marginBottom: "8px" }}>
                        Discription
                      </InputLabel>
                      <CKEditor
                        editor={ClassicEditor}
                        config={{
                          extraPlugins: [CustomUploadAdapterPlugin],
                        }}
                        data={pressRelieseData.content || ""}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          setEditorData(data);
                        }}
                      />
                    </div>
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
                        {isNewPressReliese ? "Create" : "Update"}
                      </SoftButton>
                      <Link to={"/pressreliese"}>
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

export default PressRelieseForm;
