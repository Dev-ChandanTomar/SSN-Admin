import { useEffect, useState } from "react";
import {
  Card,
  TextField,
  Button,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import PropTypes from "prop-types";
import ApiClient from "Services/ApiClient";
import { getAllUsersName } from "Services/endpointes";
import SoftBox from "components/SoftBox";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

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
const EventForm = ({ data, type }) => {

  console.log("data",JSON.stringify(data))
  

  const [eventImage, setEventImage] = useState(data?.eventImage || "");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [users, setUsers] = useState([]);
  const [organizer, setOrganizer] = useState(data?.organizer || "");
  // const [editorData, setEditorData] = useState(data?.description|| "");
  const [editorData, setEditorData] = useState(data?.discription || "");
  useEffect(() => {
    console.log("Data received:", data);

    if (data?.startDate) {
      const formattedDate = new Date(data.startDate).toISOString().split("T")[0];
      console.log("Formatted date:", formattedDate);
      setStartDate(formattedDate);
    }

    if (data?.endDate) {
      const formattedDate = new Date(data.endDate).toISOString().split("T")[0];
      console.log("Formatted date:", formattedDate);
      setEndDate(formattedDate);
    }
  }, [data]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await ApiClient.getData(getAllUsersName);
        setUsers(response.data);
        console.log("users", response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

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

  const handleOrganizerChange = (event) => {
    setOrganizer(event.target.value);
  };

  function CustomUploadAdapterPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return new CustomUploadAdapter(loader);
    };
  }

  return (
    <Card sx={{ py: 2, boxShadow: "none", border: "none" }}>
      <TextField
        autoFocus
        required
        margin="dense"
        id="title"
        name="title"
        defaultValue={data?.title}
        label="Title"
        type="text"
        fullWidth
        variant="standard"
        sx={{ marginBottom: "20px" }}
      />
      {/* <SoftBox mb={2} width="100%">
        <div>
          <InputLabel sx={{ fontSize: "1.0rem", fontWeight: 500, marginBottom: "8px" }}>
            Discription
          </InputLabel>
          <CKEditor
            editor={ClassicEditor}
            config={{
              extraPlugins: [CustomUploadAdapterPlugin],
            }}
            data={data?.description || ""}
            onChange={(event, editor) => {
              const data = editor.getData();
              setEditorData(data);
            }}
            
          />
     
        </div>
      </SoftBox> */}
      <TextField
        autoFocus
        required
        margin="dense"
        id="description"
        name="description"
        defaultValue={data?.description}
        label="description"
        type="text"
        fullWidth
        variant="standard"
        sx={{ marginBottom: "20px" }}
      />
      <TextField
        autoFocus
        required
        margin="dense"
        id="city"
        name="city"
        defaultValue={data?.locationCity}
        label="City"
        type="text"
        fullWidth
        variant="standard"
      />
      <TextField
        autoFocus
        required
        margin="dense"
        id="state"
        name="state"
        defaultValue={data?.locationState}
        label="State"
        type="text"
        fullWidth
        variant="standard"
      />
      <TextField
        autoFocus
        required
        margin="dense"
        id="country"
        name="country"
        defaultValue={data?.locationCountry}
        label="Country"
        type="text"
        fullWidth
        variant="standard"
      />
      <TextField
        autoFocus
        required
        margin="dense"
        id="zipcode"
        name="zipcode"
        defaultValue={data?.locationZipcode}
        label="Zipcode"
        type="text"
        fullWidth
        variant="standard"
      />
      <TextField
        autoFocus
        required
        margin="dense"
        id="startDate"
        name="startDate"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        label="Start Date"
        type="date"
        fullWidth
        variant="standard"
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        autoFocus
        required
        margin="dense"
        id="endDate"
        name="endDate"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        label="End Date"
        type="date"
        fullWidth
        variant="standard"
        InputLabelProps={{ shrink: true }}
      />
      <FormControl fullWidth variant="standard" margin="dense">
        <InputLabel id="organizer-label">Organizer</InputLabel>
        <Select
          labelId="organizer-label"
          id="organizer"
          name="organizer"
          value={organizer}
          onChange={handleOrganizerChange}
          label="Organizer"
        >
          {users?.map((user) => (
            <MenuItem key={user._id} value={user._id}>
              {user.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        autoFocus
        required
        margin="dense"
        id="category"
        name="category"
        defaultValue={data?.category}
        label="Category"
        type="text"
        fullWidth
        variant="standard"
      />
      <Box>
        <Box>
          <Button variant="contained" component="label" sx={{ mt: 1 }}>
            Upload Event Image
            <input
              name="eventImage"
              type="file"
              hidden
              onChange={(e) => handleImageChange(e, setEventImage)}
            />
          </Button>
          <Box sx={{ mt: 1 }} width={"100%"}>
            {eventImage && <img src={eventImage} alt="Main" width="100" />}
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default EventForm;

EventForm.defaultProps = {
  data: {},
  type: "new",
};

EventForm.propTypes = {
  data: PropTypes.any,
  type: PropTypes.string,
};
