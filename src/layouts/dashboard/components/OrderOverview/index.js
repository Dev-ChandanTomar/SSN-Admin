import { useEffect } from "react";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import TimelineItem from "examples/Timeline/TimelineItem";
import ApiClient from "Services/ApiClient";
import { startLoading } from "context";
import { useSoftUIController } from "context";
import { setLoading } from "context";
import { toast } from "react-toastify";

function OrdersOverview() {
  const [controller, dispatch] = useSoftUIController();
  const { notifications, user } = controller;
  const fetchNotifications = async () => {
    startLoading(dispatch, true);
    try {
      const response = await ApiClient.getDataWithPagination(getNotifications);
      setNotification(dispatch, response.data);
    } catch (error) {
      setLoading(dispatch, false);
      toast.info(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    notifications.length < 1 && fetchNotifications();
  }, []);

  return (
    <Card className="h-100">
      <SoftBox pt={3} px={3}>
        <SoftTypography variant="h6" fontWeight="medium">
          Notifications
        </SoftTypography>
        <SoftBox mt={1} mb={2}>
          <SoftTypography variant="button" color="text" fontWeight="regular">
            <SoftTypography display="inline" variant="body2" verticalAlign="middle">
              <Icon
                sx={{
                  fontWeight: "bold",
                  color: ({ palette: { success } }) => success.main,
                }}
              >
                arrow_upward
              </Icon>
            </SoftTypography>
            &nbsp;
            <SoftTypography variant="button" color="text" fontWeight="medium">
              {notifications?.length} Users Notifications
            </SoftTypography>
          </SoftTypography>
        </SoftBox>
      </SoftBox>
      <SoftBox p={2}>
        {notifications?.map((item, index) => {
          const dateObject = new Date(item.createdAt);

          const options = { day: "2-digit", month: "2-digit", year: "2-digit" };
          const formattedDate = dateObject.toLocaleDateString("en-GB", options);
          return (
            <TimelineItem
              key={index}
              color={item.color}
              icon={item.icon ? item.icon : "notifications"}
              title={item.userId}
              description={item.title}
              dateTime={formattedDate}
              badges={item.status}
            />
          );
        })}
      </SoftBox>
    </Card>
  );
}

export default OrdersOverview;
