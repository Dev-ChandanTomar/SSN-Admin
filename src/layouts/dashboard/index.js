import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import typography from "assets/theme/base/typography";
import Icon from "@material-ui/core/Icon";
import { useSoftUIController } from "context";
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import Footer from "examples/Footer";
import { useEffect,useState } from "react";
import ApiClient from "Services/ApiClient";
import { setTransactions } from "context";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";
import SoftTypography from "components/SoftTypography";
import gradientLineChartData from "./data/gradientLineChartData";
import { NavLink } from "react-router-dom";
import SoftButton from "components/SoftButton";
import Table from "examples/Tables/Table";
import DashboardTemple from "./data/temple";
import BuildByDevelopers from "./components/BuildByDevelopers";
function Dashboard() {
  const [controller, dispatch] = useSoftUIController();
  const { users, user, transactions, products } = controller;
  const { size } = typography;
  const { chart, items } = reportsBarChartData;
  const [chartData, setChartData] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Number of Events",
        color: "warning",
        data: [],
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ApiClient.getData("/get-all-events");
        setTransactions(dispatch, response.data);
        console.log("ss",response.data)
        processEvents(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  // const processEvents = (events) => {
  //   const eventCounts = countEventsByMonth(events);

  //   // Update the chart data
  //   const data = chartData;
  //   data.datasets[0].data = data.labels.map(month => eventCounts[month] || 0);
  //   setChartData({ ...data });
  // };
  const processEvents = (events) => {
    const eventCounts = countEventsByMonth(events);

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const labels = Object.keys(eventCounts).map(key => {
      const [year, month] = key.split('-');
      return `${monthNames[month - 1]} ${year}`;
    });

    const data = Object.values(eventCounts);

    // Update the chart data
    setChartData({
      labels,
      datasets: [
        {
          label: "Number of Events",
          color: "warning",
          data,
        },
      ],
    });
  };

  const countEventsByMonth = (events) => {
    const eventCounts = {};

    events.forEach(event => {
      const start = new Date(event.startDate);
      const end = new Date(event.endDate);

      let current = new Date(start);
      while (current <= end) {
        const key = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}`;

        if (!eventCounts[key]) {
          eventCounts[key] = 0;
        }
        eventCounts[key] += 1;

        current.setMonth(current.getMonth() + 1);
        current.setDate(1); // Move to the start of the next month
      }
    });
 console.log("e",eventCounts)
    return eventCounts;
  };
  const miniStatisticsData = [
    {
      title: { text: "Users" },
      count: users?.length ?? 0,
      percentage: { color: "warning" },
      icon: { color: "info", component: "groups" },
    },
    {
      title: { text: "Temples" },
      count: user?.templeCount ?? 0,
      percentage: { color: "warning" },
      icon: { color: "info", component: "temple_hindu" },
    },
    {
      title: { text: "Events" },
      count: user?.eventCount ?? 0,
      percentage: { color: "error" },

      icon: { color: "info", component: "event" },
    },
    {
      title: { text: "Donation" },
      count: transactions?.length ?? 0,
      percentage: { color: "error" },

      icon: { color: "info", component: "volunteer_activism" },
    },
  ];

  let memoizedRows = DashboardTemple.rows(products, dispatch, user);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={2} justifyContent="center">
            {miniStatisticsData.map((data, index) => (
              <Grid key={index} item xs={12} sm={6} xl={3}>
                <MiniStatisticsCard {...data} />
              </Grid>
            ))}
          </Grid>
        </SoftBox>
        <SoftBox>
          <Grid container spacing={4} style={{ height: "min-content", overflow: "hidden" }}>
            <Grid item xs={12} md={12} lg={6}>
              <Card>
                <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                  <SoftBox>
                    <SoftTypography variant="h6" gutterBottom>
                      Temples
                    </SoftTypography>
                    <SoftBox display="flex" alignItems="center" lineHeight={0}>
                      <Icon
                        sx={{
                          fontWeight: "bold",
                          color: ({ palette: { info } }) => info.main,
                          mt: -0.5,
                        }}
                      >
                        temple_hindu
                      </Icon>
                      <SoftTypography variant="button" fontWeight="regular" color="text">
                        &nbsp;<strong> {user?.templeCount ?? 0} Temples </strong>
                      </SoftTypography>
                    </SoftBox>
                  </SoftBox>
                  <NavLink to="/temples">
                    {" "}
                    <SoftButton variant="gradient" color="warning" ml={2}>
                      &nbsp;View More
                    </SoftButton>
                  </NavLink>
                </SoftBox>
                <Table columns={DashboardTemple.columns} rows={memoizedRows} />
              </Card>
            </Grid>

            <Grid item xs={12} md={12} lg={6}>
              <BuildByDevelopers />

              <Grid item xs={12} lg={12} mt={4}>
                <GradientLineChart
                  title="Event Per Month"
                  description={
                    <SoftBox display="flex" alignItems="center">
                      <SoftBox fontSize={size.lg} color="warning" mb={0.3} mr={0.5} lineHeight={0}>
                        <Icon className="font-bold">arrow_upward</Icon>
                      </SoftBox>
                      <SoftTypography variant="button" color="text" fontWeight="medium">
                        4% more{" "}
                        <SoftTypography variant="button" color="text" fontWeight="regular">
                          in 2023
                        </SoftTypography>
                      </SoftTypography>
                    </SoftBox>
                  }
                  height={"280px"}
                  chart={chartData}
                />
              </Grid>
            </Grid>
          </Grid>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
