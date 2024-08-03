import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import PropTypes from "prop-types";

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

Author.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

const DashboardTemple = {
  columns: [
    { name: "templename", align: "left" },

    { name: "city", align: "center" },
    { name: "state", align: "center" },
  ],

  rows: (data, dispatch) => {
    return data?.map((e) => {
      const dateObject = new Date(e.createdAt);

      const options = { day: "2-digit", month: "2-digit", year: "2-digit" };
      const formattedDate = dateObject.toLocaleDateString("en-GB", options);

      return {
        templename: <Author name={e.title} id={e._id} />,
        city: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {e.city}
          </SoftTypography>
        ),
        state: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {e.state}
          </SoftTypography>
        ),
      };
    });
  },
};
export default DashboardTemple;
