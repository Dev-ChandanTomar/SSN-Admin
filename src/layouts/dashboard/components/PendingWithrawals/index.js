import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useSoftUIController } from "context";
import { setDialog } from "context";
import { Grid, Typography } from "@mui/material";
import { startLoading } from "context";
import ApiClient from "Services/ApiClient";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import { updateTransactions } from "Services/endpointes";
import { rejectWithdrawl } from "Services/endpointes";

function PendingWithdrawal() {
  const [controller, dispatch] = useSoftUIController();
  const { withdrawRequest } = controller;
  const updateRequest = async (id) => {
    startLoading(dispatch, true);
    try {
      const response = await ApiClient.putData(updateTransactions, {
        id: id,
        status: true,
      });
      if (response.status === 200) {
        setDialog(dispatch, [response]);
      } else {
        setDialog(dispatch, [response]);
      }
    } catch (error) {
      setDialog(dispatch, [error?.response?.data]);
    }
  };
  const rejectWithdrawls = async (id) => {
    startLoading(dispatch, true);
    try {
      const response = await ApiClient.deleteData(rejectWithdrawl, id);
      if (response.status === 200) {
        setDialog(dispatch, [response]);
      } else {
        setDialog(dispatch, [response]);
      }
    } catch (error) {
      setDialog(dispatch, [error?.response?.data]);
    }
  };
  return (
    <Card>
      <SoftBox display="flex" justifyContent="space-between" alignItems="center" padding="1rem">
        <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          Withdraw Requests
        </SoftTypography>
      </SoftBox>
      <SoftBox px={2}>
        {withdrawRequest?.length > 0 ? (
          <Box
            style={{
              display: "flex",
              overflow: "scroll",
              width: "100%",
              gap: "10px",
              alignItems: "center",
            }}
          >
            {withdrawRequest.map((item) => {
              return (
                <>
                  <SoftBox key={item.userId}>
                    <CardMedia
                      sx={{ height: 100 }}
                      image={`${item.image ? item.image : "/avtar.png"}`}
                      title={item.userId}
                    />

                    <CardContent>
                      <SoftTypography
                        component="div"
                        variant="button"
                        color="text"
                        fontWeight="regular"
                        textAlign="center"
                      >
                        {item.userId}
                      </SoftTypography>
                      <Button
                        size="small"
                        textAlign="center"
                        onClick={() => {
                          setDialog(dispatch, [
                            {
                              status: "form",
                              message: "Confirm transaction",
                              action: "Confirm",
                              call: () => {
                                updateRequest(item.id);
                              },
                              children: (
                                <Box>
                                  <Box
                                    display="flex"
                                    justifyContent={"space-between"}
                                    py={1}
                                    pr={2}
                                  >
                                    <Typography
                                      variant="button"
                                      fontWeight="bold"
                                      textTransform="capitalize"
                                    >
                                      Invoice:
                                    </Typography>
                                    <Typography variant="button" fontWeight="regular" color="text">
                                      {item.invoiceNo}
                                    </Typography>
                                  </Box>
                                  <Box
                                    display="flex"
                                    py={1}
                                    pr={2}
                                    justifyContent={"space-between"}
                                  >
                                    <Typography
                                      variant="button"
                                      fontWeight="bold"
                                      textTransform="capitalize"
                                    >
                                      User:
                                    </Typography>
                                    <Typography variant="button" fontWeight="regular" color="text">
                                      {item.userId}
                                    </Typography>
                                  </Box>
                                  <Box
                                    display="flex"
                                    py={1}
                                    pr={2}
                                    justifyContent={"space-between"}
                                  >
                                    <Typography
                                      variant="button"
                                      fontWeight="bold"
                                      textTransform="capitalize"
                                    >
                                      Payment Method:
                                    </Typography>
                                    <Typography variant="button" fontWeight="regular" color="text">
                                      {item.paymentMethod}
                                    </Typography>
                                  </Box>
                                  <Box
                                    display="flex"
                                    py={1}
                                    pr={2}
                                    justifyContent={"space-between"}
                                  >
                                    <Typography
                                      variant="button"
                                      fontWeight="bold"
                                      textTransform="capitalize"
                                    >
                                      Type:
                                    </Typography>
                                    <Typography variant="button" fontWeight="regular" color="text">
                                      {item.type}
                                    </Typography>
                                  </Box>
                                  <Box
                                    display="flex"
                                    py={1}
                                    pr={2}
                                    justifyContent={"space-between"}
                                  >
                                    <Typography
                                      variant="button"
                                      fontWeight="bold"
                                      textTransform="capitalize"
                                    >
                                      Request Date
                                    </Typography>
                                    <Typography variant="button" fontWeight="regular" color="text">
                                      {(() => {
                                        const dateObject = new Date(item.createdAt);
                                        const options = {
                                          day: "2-digit",
                                          month: "2-digit",
                                          year: "2-digit",
                                        };
                                        const formattedDate = dateObject.toLocaleDateString(
                                          "en-GB",
                                          options
                                        );
                                        return formattedDate;
                                      })()}
                                    </Typography>
                                  </Box>
                                  <Box
                                    display="flex"
                                    py={1}
                                    pr={2}
                                    justifyContent={"space-between"}
                                  >
                                    <Typography
                                      variant="button"
                                      fontWeight="bold"
                                      textTransform="capitalize"
                                    >
                                      Amount:
                                    </Typography>
                                    <Typography
                                      fontWeight="bold"
                                      p={(1.1, 0.5)}
                                      borderRadius={"5px"}
                                      backgroundColor="green"
                                      color="white"
                                    >
                                      {item.amount}
                                    </Typography>
                                  </Box>
                                  <Box
                                    display="flex"
                                    py={1}
                                    pr={2}
                                    justifyContent={"space-between"}
                                  >
                                    <Button
                                      size="small"
                                      textAlign="center"
                                      onClick={() => {
                                        setDialog(dispatch, [
                                          {
                                            message:
                                              "Are you Sure you want to reject this Withdrawl",
                                            status: "form",
                                            call: () => rejectWithdrawls(item.id),
                                            action: "conffirm",
                                          },
                                        ]);
                                      }}
                                    >
                                      Reject
                                    </Button>
                                  </Box>
                                </Box>
                              ),
                            },
                          ]);
                        }}
                      >
                        Verify
                      </Button>
                    </CardContent>
                  </SoftBox>
                </>
              );
            })}
          </Box>
        ) : (
          <SoftBox mt={4}>
            <SoftBox mb={1.5}>
              <Grid container spacing={3}>
                <Grid item lg={12}>
                  <Grid item container spacing={3}>
                    <Grid item xs={12} xl={12}>
                      <DefaultInfoCard icon="cloud" title={`No Pending Withdraw Request`} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </SoftBox>
          </SoftBox>
        )}
      </SoftBox>
    </Card>
  );
}

export default PendingWithdrawal;
