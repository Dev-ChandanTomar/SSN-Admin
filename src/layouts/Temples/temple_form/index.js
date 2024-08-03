import React, { useRef, useState, useCallback  } from "react";
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
import { makeStyles } from '@material-ui/core/styles';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useDropzone } from 'react-dropzone';
import Dropzone from 'react-dropzone'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Grid,
} from "@mui/material";
// import { makeStyles } from "@material-ui/core/styles";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  TextareaAutosize,
  Card,
  Icon,
} from "@mui/material";
import { useSoftUIController } from "context";
import { updateTemple } from "Services/endpointes";
import { createProduct } from "Services/endpointes";
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
function TempleFormData() {
  const form = useRef(null);
  const { id } = useParams();
  const isNewTemple = id === "new-temple";
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedBannerFile, setBannerSelectedFile] = useState(null);
  const [selectedSub1File, setSub1SelectedFile] = useState([]);
  const [selectedSub2File, setSub2SelectedFile] = useState(null);
  const [selectedSub3File, setSub3SelectedFile] = useState(null);
  const [controller, dispatch] = useSoftUIController();
  const { products } = controller;
  const templeData = isNewTemple ? {} : products.find((e) => e.id === id) || {};
  const [editorData, setEditorData] = useState("");
  const handleFileChange = (e) => {
    // setSelectedFile(files[0]);
    setSelectedFile(e.target.files[0]);
    console.log("selectedFile", selectedFile);
  };

  const handleBannerFileChange = (e) => {
    // setSelectedFile(files[0]);
    setBannerSelectedFile(e.target.files[0]);
    console.log("selectedBannerFile", selectedBannerFile);
  };

  // const handleSub1FileChange = (e) => {
  //   // setSelectedFile(files[0]);
  //   setSub1SelectedFile(e.target.files[0]);
 
  // };
  // const handleSub1FileChange = (e) => {
  //   const files = Array.from(e.target.files);
  //   setSub1SelectedFile(files);
  // };
  // const handleSub1FileChange = (e) => {
  //   // setSelectedFile(files[0]);
  //   setSub1SelectedFile(e.target.files[0]);
  // };

  const onDrop = useCallback((acceptedFiles) => {
    setSub1SelectedFile((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);
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
    if (selectedBannerFile) {
      formdata.append("bannerImage", selectedBannerFile);
      console.log("mainimg", selectedFile);
    }

    // if (selectedSub1File) {
    //   //formdata.append("sub1", selectedSub1File);
    //   selectedSub1File.forEach((file, index) => {
    //     formdata.append(`subImages[${index}]`, file);
    //   });

    // }

    if (selectedSub1File && selectedSub1File.length > 0) {
      selectedSub1File.forEach((file, index) => {
        formdata.append(`subImages[${index}]`, file);
      });
    }

    // if (selectedSub2File) {
    //   formdata.append("sub2", selectedSub2File);
     
    // }
    
    // if (selectedSub3File) {
    //   formdata.append("sub3", selectedSub3File);
    // }
      
    // if (selectedSub2File) {
    //   formdata.append("sub2", selectedSub2File);
    // }

    // if (selectedSub3File) {
    //   formdata.append("sub3", selectedSub3File);
    // }

    const formDataObject = {};
    formdata.forEach((value, key) => {
        formDataObject[key] = value;
    });

    console.log('Form Data:', formDataObject);
    setLoading(dispatch, true);

    try {
      let response;

      if (isNewTemple) {
        response = await ApiClient.createData(route, formdata);
        
      } else {
        formdata.append("id", id);
        response = await ApiClient.putData(route, formdata);
      }

      setDialog(dispatch, [response]);
      navigate("/temples");
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

  const handleFileImageChange = (newFiles) => {
    // Assuming filesLimit={1}, so we take the first file
    setFile([...file, ...newFiles]);
  };

  const clearFile = () => {
    setFile([]);
  };

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
  return (
    <DashboardLayout>
      <DashboardNavbar endpoint={"createmember"} />
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
                <h3>{isNewTemple ? "Add Temple" : "Edit Temple"}</h3>

                <SoftBox mt={4} mb={1} width="18%" display="flex" justifyContent="space-between">
                  <SoftButton
                    variant="gradient"
                    color="warning"
                    mr={2}
                    onClick={(e) => submitHandler(e, isNewTemple ? createProduct : updateTemple)}
                  >
                    {isNewTemple ? "Create" : "Update"}
                  </SoftButton>
                  <Link to={"/temples"}>
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
                      Temple Name
                    </InputLabel>
                    <SoftInput
                      name="title"
                      placeholder="Temple Name"
                      fullWidth
                      defaultValue={templeData.title || ""}
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
                          inputProps: { accept: 'image/*' },
                        }}
                      />
                  </SoftBox>

                  <SoftBox mb={2} width="100%">
                      <InputLabel sx={{ fontSize: "1.0rem", fontWeight: 500,marginBottom: "8px" }}>
                        Upload Banner Images
                      </InputLabel>
                    

                    <TextField
                        variant="outlined"
                        fullWidth
                        type="file"
                        onChange={handleBannerFileChange}
                        InputProps={{
                          inputProps: { accept: 'image/*' },
                        }}
                      />
                  </SoftBox>

                  <SoftBox mb={2} width="100%">
                      <InputLabel sx={{ fontSize: "1.0rem", fontWeight: 500,marginBottom: "8px" }}>
                        Upload Sub Images
                      </InputLabel>
                    
{/* 
                    <TextField
                        variant="outlined"
                        fullWidth
                        type="file"
                        onChange={handleSub1FileChange}
                        InputProps={{
                          inputProps: { accept: 'image/*' ,multiple: true },
                        }}
                      /> */}
                      <div
                          style={{
                            border: '2px dashed #cccccc',
                            borderRadius: '4px',
                            padding: '20px',
                            textAlign: 'center',
                            cursor: 'pointer',
                          }}
                        >
                          <Dropzone onDrop={onDrop} multiple>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
              </div>
            </section>
          )}
        </Dropzone>
                        </div>
                        <ul>
                          {selectedSub1File?.map((file, index) => (
                            <li key={index}>{file.name}</li>
                          ))}
                        </ul>
                  </SoftBox>

                  {/* <SoftBox mb={2} width="100%">
                      <InputLabel sx={{ fontSize: "1.0rem", fontWeight: 500,marginBottom: "8px" }}>
                        Upload Sub2 Images
                      </InputLabel>
                    

                    <TextField
                        variant="outlined"
                        fullWidth
                        type="file"
                        onChange={handleSub2FileChange}
                        InputProps={{
                          inputProps: { accept: 'image/*' },
                        }}
                      />
                  </SoftBox> */}

                  {/* <SoftBox mb={2} width="100%">
                      <InputLabel sx={{ fontSize: "1.0rem", fontWeight: 500,marginBottom: "8px" }}>
                        Upload Sub3 Images
                      </InputLabel>
                    

                    <TextField
                        variant="outlined"
                        fullWidth
                        type="file"
                        onChange={handleSub3FileChange}
                        InputProps={{
                          inputProps: { accept: 'image/*' },
                        }}
                      />
                  </SoftBox> */}

           

                 

               


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
                        data={templeData.description || ""}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          setEditorData(data);
                        }}
                      />
                    </div>
                  </SoftBox>
                  <SoftBox mb={2} width="100%">
                    <InputLabel sx={{ fontSize: "1.0rem", fontWeight: 500, marginBottom: "8px" }}>
                      Short Description
                    </InputLabel>
                    <TextareaAutosize
                      name="shortdescription"
                      placeholder="Short Description"
                      defaultValue={templeData.shortDescription || ""}
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
                      Established Date
                    </InputLabel>
                    <SoftInput
                      name="establishedDate"
                      type="text"
                      placeholder="Established Date"
                      defaultValue={templeData.establishedDate || ""}
                      fullWidth
                    />
                  </SoftBox>

                  <SoftBox mb={2} width="100%">
                    <InputLabel sx={{ fontSize: "1.0rem", fontWeight: 500, marginBottom: "8px" }}>
                      City
                    </InputLabel>
                    <SoftInput
                      name="city"
                      placeholder="City"
                      defaultValue={templeData.city || ""}
                      fullWidth
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
                      defaultValue={templeData.state || ""}
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
                      defaultValue={templeData.country || ""}
                    />
                  </SoftBox>
                  <SoftBox mb={2} width="100%">
                    <InputLabel sx={{ fontSize: "1.0rem", fontWeight: 500, marginBottom: "8px" }}>
                      Location
                    </InputLabel>
                    <SoftInput
                      name="location"
                      placeholder="Iframe Location"
                      fullWidth
                      defaultValue={templeData.location || ""}
                    />
                  </SoftBox>
                  <SoftBox mb={2} width="100%">
                    <InputLabel sx={{ fontSize: "1.0rem", fontWeight: 500, marginBottom: "8px" }}>
                      Temple Website help URL
                    </InputLabel>
                    <SoftInput
                      name="help"
                      placeholder="Help"
                      fullWidth
                      defaultValue={templeData.help || ""}
                    />
                  </SoftBox>
                  <SoftBox width="100%">
                    <InputLabel
                      labelId="category"
                      sx={{
                        fontSize: "1.0rem",
                        fontWeight: 500,
                        marginBottom: "8px",
                        width: "100%",
                      }}
                    >
                      Category
                    </InputLabel>
                    <Select
                      id="category"
                      name="category"
                      defaultValue={templeData.category || "all"}
                      IconComponent={CustomIcon}
                      sx={{
                        width: "100%",
                        color: "black",
                      }}
                    >
                      <MenuItem value={"temp-slide"}>Home Slider</MenuItem>
                      <MenuItem value={"famous"}>Famous Session</MenuItem>
                      <MenuItem value={"all"}>Regular</MenuItem>
                    </Select>
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
                          submitHandler(e, isNewTemple ? createProduct : updateTemple)
                        }
                      >
                        {isNewTemple ? "Create" : "Update"}
                      </SoftButton>
                      <Link to={"/temples"}>
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

export default TempleFormData;