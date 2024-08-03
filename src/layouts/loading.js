import { CircularProgress, Stack } from "@mui/material";

const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
        position: "fixed",
        height: "100dvh",
        width: "100%",
        top: 0,
        background: "#2c292999",
        zIndex: 11111111,
      }}
    >
      <Stack sx={{ color: "darkgrey.500" }} spacing={2} direction="row">
        <CircularProgress color="warning" />
        <h4 style={{ fontWeight: 600, fontSize: "18px" }}>Sanatan-SewaNyas</h4>
      </Stack>
    </div>
  );
};

export default Loading;
