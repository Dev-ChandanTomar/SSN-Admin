import { useEffect, useState } from "react";
import { Grid, Card, Typography, CardContent, CardMedia } from "@mui/material";
import ApiClient from "Services/ApiClient";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { Link, useParams } from "react-router-dom";
import { useSoftUIController } from "context";
import { toast } from "react-toastify";
import TempleDetailHeader from "./component/Header";
import SoftButton from "components/SoftButton";
import { setDialog } from "context";
import { getAllUsersName, getUserById } from "Services/endpointes";
import EventForm from "layouts/Events/form";
import { updateEvent } from "Services/endpointes";

const EventDetails = () => {
  const { id } = useParams();
  const [controller, dispatch] = useSoftUIController();
  const { events } = controller;
  const [users, setUsers] = useState([]);
  const [organizerName, setOrganizerName] = useState("");
  const EventData = events.find((e) => e.id == id);

  const editEvents = (id) => async (formData) => {
    try {
      formData.append("id", id);
      const response = await ApiClient.putData(`${updateEvent}/${id}`, formData);
      toast.success(response.message);
      console.log("hh");
    } catch (error) {
      console.error("Error editing:", error);
      toast.error(error.response?.data?.message ?? "Failed to edit. Please try again later.");
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await ApiClient.getData(getAllUsersName);
        setUsers(response.data);
        console.log(response.data);
        console.log(users, "userrrrrrr");
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchOrganizerName = async () => {
      if (EventData && EventData.organizer) {
        try {
          const response = await ApiClient.getData(`${getUserById}/${EventData.organizer}`);
          setOrganizerName(response.data);
          console.log("hha");
        } catch (error) {
          console.error("Error fetching organizer:", error);
        }
      }
    };

    fetchOrganizerName();
    console.log(organizerName);
  }, [EventData]);

  console.log("ddd", EventData);
  return (
    <DashboardLayout>
      <TempleDetailHeader
        backgroundImage={EventData.eventImage}
        title={EventData.title}
        location={{
          city: EventData.locationCity,
          state: EventData.locationState,
          country: EventData.locationCountry,
        }}
      />
      <SoftBox mb={3}>
        <Card>
          <SoftBox pt={2} px={2}>
            <SoftBox mb={0.5}>
              {EventData ? (
                <SoftTypography variant="h6" fontWeight="medium">
                  {EventData.title}
                </SoftTypography>
              ) : (
                <SoftTypography variant="h6" fontWeight="medium">
                  Loading...
                </SoftTypography>
              )}
            </SoftBox>
            <SoftBox mb={1}>
              <SoftTypography
                target="_blank"
                component={Link}
                to={EventData.help}
                fontWeight="regular"
                color="text"
                cursor="pointer"
              >
                {EventData.help}
              </SoftTypography>
            </SoftBox>
            <SoftBox mb={1}>
              <SoftTypography variant="body2" fontWeight="regular">
                Organizert: {EventData?.organizer || "Loading..."}
              </SoftTypography>
            </SoftBox>
          </SoftBox>
          <SoftBox p={2}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} xl={12}>
                {/* <DefaultProjectCard
                  image={EventData.mainImage}
                  label={EventData.shortDescription}
                  category={EventData.category}
                  description={EventData.description}
                  authors={[
                    { image: EventData.sub1, name: EventData.sub1 },
                    { image: EventData.sub2, name: EventData.sub2 },
                    { image: EventData.sub3, name: EventData.sub3 },
                  ]}
                /> */}
             
                      {/* Image */}
                      {EventData.eventImage && (
                        <CardMedia
                          component="img"
                          height="140"
                          image={`${process.env.REACT_APP_API_BASE_URL}/events/${EventData.eventImage.image}`} // Adjust the path to where your images are stored
                          alt={EventData.title}
                        />
                      )}
                      <CardContent>
                        {/* Title */}
                        <Typography gutterBottom variant="h5" component="div">
                          {EventData.title}
                        </Typography>
                        {/* Description */}
                        <Typography variant="body2" color="text.secondary">
                          {EventData.description}
                        </Typography>
                        {/* Additional Data */}
                        <Typography variant="body2" color="text.primary" mt={2}>
                          <strong>city:</strong> {EventData.locationCity}
                        </Typography>
                        {/* <Typography variant="body2" color="text.primary">
                          <strong>StartDate:</strong> {EventData.startDate}
                        </Typography> */}
                        <Typography variant="body2" color="text.primary">
                          <strong>State:</strong> {EventData.locationState}
                        </Typography>
                        <Typography variant="body2" color="text.primary">
                          <strong>Country:</strong> {EventData.locationCountry }
                        </Typography>
                        <Typography variant="body2" color="text.primary">
                          <strong>Category:</strong> {EventData.category}
                        </Typography>
                      </CardContent>
               
              </Grid>
              {/* <SoftBox display="flex" justifyContent="space-between" width="100%">
                <SoftBox>
                  <SoftButton
                    variant="outlined"
                    size="small"
                    onClick={() => {
                      setDialog(dispatch, [
                        {
                          status: "form",
                          call: editEvents(EventData.id),
                          message: `UPDATE-event - ${EventData.title}`,
                          action: "Update",
                          children: <EventForm data={EventData} />,
                        },
                      ]);
                    }}
                  >
                    Update Details
                  </SoftButton>
                </SoftBox>
              </SoftBox> */}
            </Grid>
          </SoftBox>
        </Card>
      </SoftBox>
    </DashboardLayout>
  );
};

export default EventDetails;
