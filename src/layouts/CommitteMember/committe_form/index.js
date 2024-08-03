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
import Footer from "examples/Footer";
import { createCommitteMembers } from "Services/endpointes";
import { updateCommitteMembers } from "Services/endpointes";

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

function CommitteMemberForm() {
  const form = useRef(null);
  const { id } = useParams();
  const isNewCommitteMember = id === "new-committemember";
  const navigate = useNavigate();

  const [controller, dispatch] = useSoftUIController();
  const { committemember } = controller;
  const [editorData, setEditorData] = useState("");

  function CustomUploadAdapterPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return new CustomUploadAdapter(loader);
    };
  }

  const committeMemberData = isNewCommitteMember
    ? {}
    : committemember.find((e) => e.id === id) || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);

    formData.append("content", editorData);

    setLoading(dispatch, true);

    try {
      if (isNewCommitteMember) {
        const response = await ApiClient.createData(createCommitteMembers, formData);
        setDialog(dispatch, [response]);
        navigate("/committemember");
      } else {
        formData.append("id", id);
        const response = await ApiClient.putData(updateCommitteMembers, formData);
        setDialog(dispatch, [response]);
        navigate("/committemember");
      }

      setDialog(dispatch, [response]);
      navigate("/committemember");
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
  const formattedDate = new Date(committeMemberData.date).toLocaleDateString("en-GB", {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
  });
  console.log(committeMemberData, "committeMemberData");
  return (
    <DashboardLayout>
      <DashboardNavbar endpoint={"createcommittemember"} />
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
                <h3>{isNewCommitteMember ? "Add Committe-Member" : "Edit Committe-Member"}</h3>

                <SoftBox mt={4} mb={1} width="18%" display="flex" justifyContent="space-between">
                  <SoftButton variant="gradient" color="warning" mr={2} onClick={handleSubmit}>
                    {isNewCommitteMember ? "Create" : "Update"}
                  </SoftButton>
                  <Link to={"/committemember"}>
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
                      Name
                    </InputLabel>
                    <SoftInput
                      name="name"
                      placeholder="Name"
                      fullWidth
                      defaultValue={committeMemberData.name || ""}
                    />
                  </SoftBox>
                  <SoftBox mb={2} width="100%">
                    <InputLabel sx={{ fontSize: "1.0rem", fontWeight: 500, marginBottom: "8px" }}>
                      Father-Name
                    </InputLabel>
                    <SoftInput
                      name="fathername"
                      placeholder="Father Name"
                      fullWidth
                      defaultValue={committeMemberData.fathername || ""}
                    />
                  </SoftBox>
                  <SoftBox mb={2} width="100%">
                    <InputLabel sx={{ fontSize: "1.0rem", fontWeight: 500, marginBottom: "8px" }}>
                      Mother-Name
                    </InputLabel>
                    <SoftInput
                      name="mothername"
                      placeholder="Mother-Name"
                      fullWidth
                      defaultValue={committeMemberData.mothername || ""}
                    />
                  </SoftBox>
                  <SoftBox mb={2} width="100%">
                    <InputLabel sx={{ fontSize: "1.0rem", fontWeight: 500, marginBottom: "8px" }}>
                      Email
                    </InputLabel>
                    <SoftInput
                      name="email"
                      placeholder="Email"
                      fullWidth
                      defaultValue={committeMemberData.email || ""}
                    />
                  </SoftBox>
                  <SoftBox mb={2} width="100%">
                    <InputLabel sx={{ fontSize: "1.0rem", fontWeight: 500, marginBottom: "8px" }}>
                      Phone
                    </InputLabel>
                    <SoftInput
                      name="phone"
                      placeholder="Phone"
                      fullWidth
                      defaultValue={committeMemberData.phone || ""}
                    />
                  </SoftBox>
                  <SoftBox mb={2} width="100%">
                    <InputLabel sx={{ fontSize: "1.0rem", fontWeight: 500, marginBottom: "8px" }}>
                      Adhare Number
                    </InputLabel>
                    <SoftInput
                      name="adhare"
                      placeholder="Adhare Number"
                      fullWidth
                      defaultValue={committeMemberData.adhare || ""}
                    />
                  </SoftBox>
                  <SoftBox mb={2} width="100%">
                    <InputLabel sx={{ fontSize: "1.0rem", fontWeight: 500, marginBottom: "8px" }}>
                      Address
                    </InputLabel>
                    <SoftInput
                      name="address"
                      placeholder="Address"
                      fullWidth
                      defaultValue={committeMemberData.address || ""}
                    />
                  </SoftBox>
                  <SoftBox mb={2} width="100%">
                    <InputLabel sx={{ fontSize: "1.0rem", fontWeight: 500, marginBottom: "8px" }}>
                      City
                    </InputLabel>
                    <SoftInput
                      name="city"
                      placeholder="City"
                      fullWidth
                      defaultValue={committeMemberData.city || ""}
                    />
                  </SoftBox>
                  <SoftBox mb={2} width="100%">
                    <InputLabel sx={{ fontSize: "1.0rem", fontWeight: 500, marginBottom: "8px" }}>
                      State
                    </InputLabel>
                    <SoftInput
                      name="state"
                      placeholder="State"
                      fullWidth
                      defaultValue={committeMemberData.state || ""}
                    />
                  </SoftBox>
                  <SoftBox mb={2} width="100%">
                    <InputLabel sx={{ fontSize: "1.0rem", fontWeight: 500, marginBottom: "8px" }}>
                      Country
                    </InputLabel>
                    <SoftInput
                      name="country"
                      placeholder="Country"
                      fullWidth
                      defaultValue={committeMemberData.country || ""}
                    />
                  </SoftBox>
                  <SoftBox mb={2} width="100%">
                    <InputLabel sx={{ fontSize: "1.0rem", fontWeight: 500, marginBottom: "8px" }}>
                      Purpose
                    </InputLabel>
                    <SoftInput
                      name="purpose"
                      placeholder="Purpose"
                      fullWidth
                      defaultValue={committeMemberData.purpose || ""}
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
                      <SoftButton variant="gradient" color="warning" onClick={handleSubmit}>
                        {isNewCommitteMember ? "Create" : "Update"}
                      </SoftButton>
                      <Link to={"/committemember"}>
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

export default CommitteMemberForm;
