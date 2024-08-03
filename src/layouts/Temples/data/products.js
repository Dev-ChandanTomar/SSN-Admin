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
import { deleteTemple } from "Services/endpointes";
import { updateTemple } from "Services/endpointes";
import { uploadImage } from "Services/endpointes";
import { Link } from "react-router-dom";

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

const editTemple = (id, getAllTemples) => async (formData) => {
  try {
    formData.append("id", id);
    console.log(id, formData, formData.get("id"));
    const response = await ApiClient.putData(updateTemple, formData);
    toast.success(response.message);
    getAllTemples();
  } catch (error) {
    console.error("Error editing:", error);
    toast.error(error.response?.data?.message ?? "Failed to edit. Please try again later.");
  }
};
const uploadImages = (id, getAllTemples) => async (formData) => {
  try {
    formData.append("id", id);
    console.log(id, formData, formData.get("id"));
    const response = await ApiClient.createData(`${uploadImage}/${id}`, formData);
    toast.success(response.message);
    getAllTemples();
  } catch (error) {
    console.error("Error editing:", error);
    toast.error(error.response?.data?.message ?? "Failed to edit. Please try again later.");
  }
};

const deleteTemples = (id, getAllTemples) => async () => {
  try {
    console.log(id);
    const response = await ApiClient.deleteData(deleteTemple, id);
    toast.success(response?.message);
    getAllTemples();
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

const templesView = {
  columns: [
    { name: "templename", align: "left" },
    { name: "description", align: "left" },
    { name: "shortDescription", align: "left" },
    { name: "city", align: "center" },
    { name: "establishedDate", align: "center" },
    { name: "state", align: "center" },
    { name: "category", align: "center" },
    { name: "view", align: "center" },
    { name: "actions", align: "center" },
  ],

  rows: (data, dispatch, getAllTemples) => {
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
              [`${process.env.REACT_APP_API_BASE_URL}/temples/${e.bannerImage}`, e.bannerImage],
              [`${process.env.REACT_APP_API_BASE_URL}/temples/${e.mainImage}`, e.mainImage],
              [`${process.env.REACT_APP_API_BASE_URL}/temples/${e.sub1}`, e.sub1],
              [`${process.env.REACT_APP_API_BASE_URL}/temples/${e.sub2}`, e.sub2],
              [`${process.env.REACT_APP_API_BASE_URL}/temples/${e.sub3}`, e.sub3],
            ])}
          </SoftBox>
        ),
        templename: <Author name={e.title} id={e._id} />,
        description: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {truncateText(e.description, 10)}
          </SoftTypography>
        ),
        shortDescription: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {truncateText(e.shortDescription, 10)}
          </SoftTypography>
        ),
        city: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {e.city}
          </SoftTypography>
        ),

        establishedDate: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {new Date(e.establishedDate).toLocaleDateString()}
          </SoftTypography>
        ),
        state: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {e.state}
          </SoftTypography>
        ),
        country: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {e.country}
          </SoftTypography>
        ),
        category: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {e.category}
          </SoftTypography>
        ),
        help: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {truncateText(e.help, 5)}
          </SoftTypography>
        ),
        status: <Status status={e.status} />,
        view: (
          <SoftBox
            display="flex"
            alignItems="center"
            justifyContent="center"
            // gap="10px"
            // px={1}
            // py={0.5}
          >
            <SoftTypography
              component={Link}
              to={`/temple-details/${e.title}`}
              variant="caption"
              color="warning"
              fontWeight="medium"
              cursor="pointer"
              // onClick={() => {
              //   setDialog(dispatch, [
              //     {
              //       status: "form",
              //       call: uploadImages(e.id, getAllTemples),
              //       message: `UPDATE-Temple - ${e.id}`,
              //       action: "Update",
              //       children: <TempImageForm data={e} type={e.type} />,
              //     },
              //   ]);
              // }}
            >
              <Icon fontSize="small" color="info">
                visibility
              </Icon>
            </SoftTypography>
            {/* <SoftTypography
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
                    call: uploadImages(e.id, getAllTemples),
                    message: `UPDATE-Temple - ${e.id}`,
                    action: "Update",
                    children: <TempImageForm data={e} type={e.type} />,
                  },
                ]);
              }}
            >
              <Icon fontSize="small" color="info">
                visibility
              </Icon>
            </SoftTypography> */}
          </SoftBox>
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
              to={`/temple-form/${e.id}`}
              variant="caption"
              cursor="pointer"
              // onClick={() => {
              //   setDialog(dispatch, [
              //     {
              //       status: "form",
              //       call: editTemple(e.id, getAllTemples),
              //       message: `UPDATE-Temple - ${e._id}`,
              //       action: "Update",
              //       children: <TempleForm data={e} type={e.type} />,
              //     },
              //   ]);
              // }}
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
                    call: deleteTemples(e.id, getAllTemples),
                    message: `DELETE - Temple - ${e.title}`,
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

export default templesView;
