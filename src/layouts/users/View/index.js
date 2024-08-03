import { Card, Tab, Tabs } from "@mui/material";
import Box from "@mui/material/Box";
import DocumentView from "examples/Cards/DocumentView";
import { PropTypes } from "prop-types";
import Typography from "@mui/material/Typography";
import PhoneIcon from "@mui/icons-material/Phone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import { useEffect } from "react";
import ApiClient from "Services/ApiClient";
import { getUserById } from "Services/endpointes";
import { setUserDetails } from "context";
import { useSoftUIController } from "context";
import { setLoading } from "context";
import { toast } from "react-toastify";
import { setUserTab } from "context";

const UserView = ({ data }) => {
  const [controller, dispatch] = useSoftUIController();
  const { userAddress, userKyc, userTab } = controller;

  const fetchData = async () => {
    setLoading(dispatch, true);
    try {
      const response = await ApiClient.getData(getUserById + `?userId=${data.userId}`);

      if (response?.status === 200) {
        setUserDetails(dispatch, response.data);
        toast.success(response?.message);
      }
      setLoading(dispatch, false);
    } catch (error) {
      setLoading(dispatch, false);
      console.log(error);
      toast.error(error.response?.data?.message ?? "Oops! Something went wrong, please try later");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const options = { day: "2-digit", month: "2-digit", year: "2-digit" };
  return (
    <>
      <Card>
        <Box p={2}>
          <Tabs
            value={userTab}
            onChange={(e, val) => setUserTab(dispatch, val)}
            aria-label="icon label tabs example"
          >
            <Tab icon={<PhoneIcon />} label="Profile" />
            <Tab icon={<FavoriteIcon />} label="Address" />
            <Tab icon={<PersonPinIcon />} label="Kyc" />
          </Tabs>

          {userTab === 0 ? (
            <Box>
              <Box display="flex" justifyContent={"space-between"} py={1} pr={2}>
                <Typography variant="button" fontWeight="bold" textTransform="capitalize">
                  Name:
                </Typography>
                <Typography variant="button" fontWeight="regular" color="text">
                  {data?.initial} {data.fullName}
                </Typography>
              </Box>
              <Box display="flex" py={1} pr={2} justifyContent={"space-between"}>
                <Typography variant="button" fontWeight="bold" textTransform="capitalize">
                  id:
                </Typography>
                <Typography variant="button" fontWeight="regular" color="text">
                  {data.userId}
                </Typography>
              </Box>
              <Box display="flex" py={1} pr={2} justifyContent={"space-between"}>
                <Typography variant="button" fontWeight="bold" textTransform="capitalize">
                  email:
                </Typography>
                <Typography variant="button" fontWeight="regular" color="text">
                  {data.email}
                </Typography>
              </Box>
              <Box display="flex" py={1} pr={2} justifyContent={"space-between"}>
                <Typography variant="button" fontWeight="bold" textTransform="capitalize">
                  type:
                </Typography>
                <Typography variant="button" fontWeight="regular" color="text">
                  {data.type}
                </Typography>
              </Box>
              <Box display="flex" py={1} pr={2} justifyContent={"space-between"}>
                <Typography variant="button" fontWeight="bold" textTransform="capitalize">
                  DOB
                </Typography>
                <Typography variant="button" fontWeight="regular" color="text">
                  {data.dob}
                </Typography>
              </Box>
              <Box display="flex" py={1} pr={2} justifyContent={"space-between"}>
                <Typography variant="button" fontWeight="bold" textTransform="capitalize">
                  attempt:
                </Typography>
                <Typography variant="button" fontWeight="regular" color="text">
                  {data.attempt}
                </Typography>
              </Box>
              <Box display="flex" py={1} pr={2} justifyContent={"space-between"}>
                <Typography variant="button" fontWeight="bold" textTransform="capitalize">
                  sponsor:
                </Typography>
                <Typography variant="button" fontWeight="regular" color="text">
                  {data.sponsorId}
                </Typography>
              </Box>
              <Box display="flex" py={1} pr={2} justifyContent={"space-between"}>
                <Typography variant="button" fontWeight="bold" textTransform="capitalize">
                  level:
                </Typography>
                <Typography variant="button" fontWeight="regular" color="text">
                  {data.level == 0 ? "root" : data.level}
                </Typography>
              </Box>
              <Box display="flex" py={1} pr={2} justifyContent={"space-between"}>
                <Typography variant="button" fontWeight="bold" textTransform="capitalize">
                  placement level:
                </Typography>
                <Typography variant="button" fontWeight="regular" color="text">
                  {data.placementLevel == 0 ? "root" : data.placementLevel}
                </Typography>
              </Box>
              <Box display="flex" py={1} pr={2} justifyContent={"space-between"}>
                <Typography variant="button" fontWeight="bold" textTransform="capitalize">
                  Own storage:
                </Typography>
                <Typography variant="button" fontWeight="regular" color="text">
                  {data.storage?.own}
                </Typography>
              </Box>
              <Box display="flex" py={1} pr={2} justifyContent={"space-between"}>
                <Typography variant="button" fontWeight="bold" textTransform="capitalize">
                  Business:
                </Typography>
                <Typography variant="button" fontWeight="regular" color="text">
                  {data.storage?.member}
                </Typography>
              </Box>
              <Box display="flex" py={1} pr={2} justifyContent={"space-between"}>
                <Typography variant="button" fontWeight="bold" textTransform="capitalize">
                  earning:
                </Typography>
                <Typography variant="button" fontWeight="regular" color="text">
                  {data.totalEarn}
                </Typography>
              </Box>
              <Box display="flex" py={1} pr={2} justifyContent={"space-between"}>
                <Typography variant="button" fontWeight="bold" textTransform="capitalize">
                  Total Withdraw:
                </Typography>
                <Typography variant="button" fontWeight="regular" color="text">
                  {data.totalWithdraw}
                </Typography>
              </Box>
              <Box display="flex" py={1} pr={2} justifyContent={"space-between"}>
                <Typography variant="button" fontWeight="bold" textTransform="capitalize">
                  created date:
                </Typography>
                <Typography variant="button" fontWeight="regular" color="text">
                  {new Date(data.createdAt).toLocaleDateString("en-GB", options)}
                </Typography>
              </Box>
              <Box display="flex" py={1} pr={2} justifyContent={"space-between"}>
                <Typography variant="button" fontWeight="bold" textTransform="capitalize">
                  Updated date:
                </Typography>
                <Typography variant="button" fontWeight="regular" color="text">
                  {new Date(data.updatedAt).toLocaleDateString("en-GB", options)}
                </Typography>
              </Box>
            </Box>
          ) : userTab == 1 ? (
            <Box>
              <Box display="flex" justifyContent={"space-between"} py={1} pr={2}>
                <Typography variant="button" fontWeight="bold" textTransform="capitalize">
                  Street:
                </Typography>
                <Typography variant="button" fontWeight="regular" color="text">
                  {userAddress.street1}
                </Typography>
              </Box>
              <Box display="flex" justifyContent={"space-between"} py={1} pr={2}>
                <Typography variant="button" fontWeight="bold" textTransform="capitalize">
                  Street 2:
                </Typography>
                <Typography variant="button" fontWeight="regular" color="text">
                  {userAddress.street2}
                </Typography>
              </Box>
              <Box display="flex" py={1} pr={2} justifyContent={"space-between"}>
                <Typography variant="button" fontWeight="bold" textTransform="capitalize">
                  pin code:
                </Typography>
                <Typography variant="button" fontWeight="regular" color="text">
                  {userAddress.postalCode}
                </Typography>
              </Box>
              <Box display="flex" py={1} pr={2} justifyContent={"space-between"}>
                <Typography variant="button" fontWeight="bold" textTransform="capitalize">
                  city:
                </Typography>
                <Typography variant="button" fontWeight="regular" color="text">
                  {userAddress.city}
                </Typography>
              </Box>
              <Box display="flex" py={1} pr={2} justifyContent={"space-between"}>
                <Typography variant="button" fontWeight="bold" textTransform="capitalize">
                  state:
                </Typography>
                <Typography variant="button" fontWeight="regular" color="text">
                  {userAddress.state}
                </Typography>
              </Box>
              <Box display="flex" py={1} pr={2} justifyContent={"space-between"}>
                <Typography variant="button" fontWeight="bold" textTransform="capitalize">
                  Created At:
                </Typography>
                <Typography variant="button" fontWeight="regular" color="text">
                  {userAddress.createdAt}
                </Typography>
              </Box>
              <Box display="flex" py={1} pr={2} justifyContent={"space-between"}>
                <Typography variant="button" fontWeight="bold" textTransform="capitalize">
                  Updated At:
                </Typography>
                <Typography variant="button" fontWeight="regular" color="text">
                  {userAddress.updatedAt}
                </Typography>
              </Box>
            </Box>
          ) : (
            <Box>
              <Box display="flex" justifyContent={"space-between"} py={1} pr={2}>
                <Typography variant="button" fontWeight="bold" textTransform="capitalize">
                  Bank:
                </Typography>
                <Typography variant="button" fontWeight="regular" color="text">
                  {userKyc.bankName}
                </Typography>
              </Box>
              <Box display="flex" py={1} pr={2} justifyContent={"space-between"}>
                <Typography variant="button" fontWeight="bold" textTransform="capitalize">
                  Account No.:
                </Typography>
                <Typography variant="button" fontWeight="regular" color="text">
                  {userKyc.accountNo}
                </Typography>
              </Box>
              <Box display="flex" py={1} pr={2} justifyContent={"space-between"}>
                <Typography variant="button" fontWeight="bold" textTransform="capitalize">
                  ifsc:
                </Typography>
                <Typography variant="button" fontWeight="regular" color="text">
                  {userKyc.IFSC}
                </Typography>
              </Box>
              <Box display="flex" py={1} pr={2} justifyContent={"space-between"}>
                <Typography variant="button" fontWeight="bold" textTransform="capitalize">
                  holder:
                </Typography>
                <Typography variant="button" fontWeight="regular" color="text">
                  {userKyc.holder}
                </Typography>
              </Box>
              <Box display="flex" py={1} pr={2} justifyContent={"space-between"}>
                <Typography variant="button" fontWeight="bold" textTransform="capitalize">
                  nominee:
                </Typography>
                <Typography variant="button" fontWeight="regular" color="text">
                  {userKyc.nomineeName}
                </Typography>
              </Box>
              <Box display="flex" justifyContent={"space-between"} py={1} pr={2}>
                <Typography variant="button" fontWeight="bold" textTransform="capitalize">
                  aadhar number:
                </Typography>
                <Typography variant="button" fontWeight="regular" color="text">
                  {userKyc.aadharNo}
                </Typography>
              </Box>
              <Box display="flex" justifyContent={"space-between"} py={1} pr={2}>
                <Typography variant="button" fontWeight="bold" textTransform="capitalize">
                  pan:
                </Typography>
                <Typography variant="button" fontWeight="regular" color="text">
                  {userKyc.panNo}
                </Typography>
              </Box>
              <Box display={"grid"} gap={".50em"}>
                <DocumentView
                  style={{ height: "100%", width: "100" }}
                  image={userKyc.panFile}
                  label={userKyc.panNo}
                />
                <DocumentView
                  style={{ height: "100%", width: "100" }}
                  image={userKyc.aadharFront}
                  label={userKyc.aadharNo}
                />
                <DocumentView
                  style={{ height: "100%", width: "100" }}
                  image={userKyc.aadharBack}
                  label={userKyc.aadharNo}
                />
                <DocumentView
                  style={{ height: "100%", width: "100" }}
                  image={userKyc.sign}
                  label={"User Signature"}
                />
              </Box>
            </Box>
          )}
        </Box>
      </Card>
    </>
  );
};

export default UserView;

UserView.defaultProps = {
  data: [],
  type: "new",
};

UserView.propTypes = {
  data: PropTypes.any,
  type: PropTypes.string,
};
