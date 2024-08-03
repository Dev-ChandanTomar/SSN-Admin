/* eslint-disable react/prop-types */
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { toast } from "react-toastify";
import { Icon, Tooltip } from "@mui/material";
import SoftAvatar from "components/SoftAvatar";
import EventForm from "../form";
import { setDialog } from "context";
import ApiClient from "Services/ApiClient";
import { updateEvent } from "Services/endpointes";
import { delteEvent } from "Services/endpointes";
import { Link } from "react-router-dom";

const avatars = (members) =>
  members.map(([image, name]) => (
    <Tooltip key={name} title={name} placeholder="bottom">
      <SoftAvatar
        src={image}
        alt={name}
        size="xs"
        sx={{
          border: ({ borders: { borderWidth }, palette: { white } }) =>
            `${borderWidth[2]} solid ${white.main}`,
          cursor: "pointer",
          position: "relative",

          "&:not(:first-of-type)": {
            ml: -1.25,
          },

          "&:hover, &:focus": {
            zIndex: "10",
          },
        }}
      />
    </Tooltip>
  ));
function Author({ name, id }) {
  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="button" fontWeight="medium">
          {name}
        </SoftTypography>
        <SoftTypography variant="caption" color="secondary">
          {id}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

const editEvents = (id, getAllEvents) => async (formData) => {
  try {
    formData.append("id", id);
    console.log(id, formData, formData.get("id"));
    const response = await ApiClient.putData(`${updateEvent}/${id}`, formData);
    toast.success(response.message);
    getAllEvents();
  } catch (error) {
    console.error("Error editing:", error);
    toast.error(error.response?.data?.message ?? "Failed to edit. Please try again later.");
  }
};

const deleteEvents = (id, getAllEvents) => async () => {
  try {
    console.log(id);
    const response = await ApiClient.deleteData(delteEvent, id);
    toast.success(response?.message);
    getAllEvents();
  } catch (error) {
    console.error("Error deleting:", error);
    toast.error(error.response?.data?.message ?? "Failed to delete. Please try again later.");
  }
};
const truncateText = (text, letterLimit) => {
  if (text.length <= letterLimit) return text;
  return text.slice(0, letterLimit) + " ...";
};

const eventView = {
  columns: [
    { name: "title", align: "left" },
    { name: "description", align: "left" },
    { name: "city", align: "center" },
    { name: "state", align: "center" },
    { name: "country", align: "center" },
    { name: "zipcode", align: "center" },
    { name: "startDate", align: "center" },
    { name: "endDate", align: "center" },
    { name: "organizer", align: "center" },
    { name: "actions", align: "center" },
  ],

  rows: (data, dispatch, getAllEvents) => {
    return data.map((e) => {
      const dateObject = new Date(e.createdAt);
      const options = { day: "2-digit", month: "2-digit", year: "2-digit" };
      const formattedDate = dateObject.toLocaleDateString("en-GB", options);

      return {
        eventImage: (
          <SoftBox display="flex" py={1}>
            {avatars([
              [
                `${process.env.REACT_APP_API_BASE_URL}/uploads/events/${e.eventImage.image}`,
                e.eventImage.image,
              ],
            ])}
          </SoftBox>
        ),
        title: <Author name={e.title} id={e.id} />,
        description: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {truncateText(e.description, 10)}
          </SoftTypography>
        ),

        city: <Author name={truncateText(e.locationCity, 5)} />,
        state: <Author name={e.locationState} />,
        country: <Author name={e.locationCountry} />,
        zipcode: <Author name={e.locationZipcode} />,
        startDate: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {new Date(e.startDate).toLocaleDateString()}
          </SoftTypography>
        ),
        endDate: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {new Date(e.endDate).toLocaleDateString()}
          </SoftTypography>
        ),

        category: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {e.category}
          </SoftTypography>
        ),
        organizer: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {truncateText(e.organizer, 5)}
          </SoftTypography>
        ),
        actions: (
          <SoftBox
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap="10px"
            px={1}
            py={0.5}
          >
            <SoftTypography
              component={Link}
              to={`/event-details/${e.id}`}
              variant="caption"
              color="warning"
              fontWeight="medium"
              cursor="pointer"
            >
              <Icon fontSize="small" color="info">
                visibility
              </Icon>
            </SoftTypography>
            <SoftTypography
              component="a"
              href="#"
              variant="caption"
              color="warning"
              fontWeight="medium"
              cursor="pointer"
              onClick={() => {
                setDialog(dispatch, [
                  {
                    status: "form",
                    call: editEvents(e.id, getAllEvents),
                    message: `UPDATE EVENTS : ${e.title}`,
                    action: "Update",
                    children: <EventForm data={e} type={e.type} />,
                  },
                ]);
              }}
            >
              <Icon fontSize="small" color="info">
                edit
              </Icon>
            </SoftTypography>
            <SoftTypography
              component="a"
              href="#"
              variant="caption"
              color="error"
              cursor="pointer"
              fontWeight="medium"
              onClick={() => {
                setDialog(dispatch, [
                  {
                    status: "form",
                    call: deleteEvents(e.id, getAllEvents),
                    message: `DELETE - Events - ${e.title}`,
                    action: "Delete",
                  },
                ]);
              }}
            >
              <Icon fontSize="small" color="error">
                delete
              </Icon>
            </SoftTypography>
          </SoftBox>
        ),
      };
    });
  },
};

export default eventView;
