/* eslint-disable react/prop-types */
// Next Work Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftBadge from "components/SoftBadge";
import { Icon, Tooltip } from "@mui/material";
import { setDialog } from "context";
import ApiClient from "Services/ApiClient";
import { toast } from "react-toastify";
import SoftAvatar from "components/SoftAvatar";
import { Link } from "react-router-dom";
import { deleteOrganisation } from "Services/endpointes";

const avatars = (members) =>
  members.map(([image, name]) => (
    <Tooltip key={name} title={name} placeholder="bottom">
      <SoftAvatar
        src={image}
        alt={name} // updated to use the name variable instead of a hardcoded string
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

function Status({ status }) {
  if (!status) {
    return (
      <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
        <SoftBadge variant="gradient" badgeContent="Inactive" color="warning" size="xs" container />
      </SoftBox>
    );
  } else {
    return (
      <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
        <SoftBox display="flex" flexDirection="column">
          <SoftBadge variant="gradient" badgeContent="Active" color="success" size="xs" container />
        </SoftBox>
      </SoftBox>
    );
  }
}

const deleteOrganisations = (id, getAllOrganisations) => async () => {
  try {
    console.log(id);
    const response = await ApiClient.deleteData(deleteOrganisation, id);
    toast.success(response?.message);
    getAllOrganisations();
  } catch (error) {
    console.error("Error deleting:", error);
    toast.error(error.response?.data?.message ?? "Failed to delete. Please try again later.");
  }
};

// import the truncateText function at the top
const truncateText = (text, letterLimit) => {
  if (text.length <= letterLimit) return text;
  return text.slice(0, letterLimit) + " ...";
};

const organisationView = {
  columns: [
    { name: "title", align: "left" },
    { name: "description", align: "left" },
    { name: "phone", align: "left" },
    { name: "email", align: "center" },
    { name: "actions", align: "center" },
  ],

  rows: (data, dispatch, getAllOrganisations) => {
    return data.map((e) => {
      const formattedDate = new Date(e.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      });

      return {
        images: (
          <SoftBox display="flex" py={1}>
            {avatars([
              [`${process.env.REACT_APP_API_BASE_URL}/temples/${e.mainImage}`, e.mainImage],
              [`${process.env.REACT_APP_API_BASE_URL}/temples/${e.sub1}`, e.sub1],
              [`${process.env.REACT_APP_API_BASE_URL}/temples/${e.sub2}`, e.sub2],
              [`${process.env.REACT_APP_API_BASE_URL}/temples/${e.sub3}`, e.sub3],
            ])}
          </SoftBox>
        ),
        title: <Author name={e.title} id={e._id} />,
        description: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {truncateText(e.description, 10)}
          </SoftTypography>
        ),
        phone: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {e.phone}
          </SoftTypography>
        ),
        email: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {e.email}
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
              to={`/organisation-form/${e.id}`}
              variant="caption"
              cursor="pointer"
            >
              <Icon fontSize="medium" color="info">
                edit_note
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
                    call: deleteOrganisations(e.id, getAllOrganisations),
                    message: `DELETE - Organisation - ${e.title}`,
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

export default organisationView;
