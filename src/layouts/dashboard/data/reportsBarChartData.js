const reportsBarChartData = {
  chart: {
    labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: { label: "Sales", data: [450, 200, 100, 220, 500, 100, 400, 230, 500] },
  },

  items: [
    [
      {
        icon: { color: "primary", component: "groups2" },
        label: "Total ",
        progress: { content: "0", percentage: 60 },
      },
      {
        icon: { color: "info", component: "touch_app" },
        label: "Active",
        progress: { content: "0", percentage: 90 },
      },
      {
        icon: { color: "warning", component: "person_off" },
        label: "Inactive",
        progress: { content: "0", percentage: 30 },
      },
      {
        icon: { color: "secondary", component: "verified" },
        label: "Verified",
        progress: { content: "0", percentage: 50 },
      },
    ],
    [
      {
        icon: { color: "primary", component: "shopping_cart" },
        label: "Total",
        progress: { content: "0", percentage: 60 },
      },
      {
        icon: { color: "info", component: "touch_app" },
        label: "Active",
        progress: { content: "0", percentage: 50 },
      },
      {
        icon: { color: "secondary", component: "cloud" },
        label: "Storage",
        progress: { content: "0", percentage: 30 },
      },
      {
        icon: { color: "error", component: "pending" },
        label: "Pending",
        progress: { content: "0", percentage: 50 },
      },
    ],
    [
      {
        icon: { color: "info", component: "library_books" },
        label: "Active",
        progress: { content: "0", percentage: 60 },
      },
      {
        icon: { color: "primary", component: "touch_app" },
        label: "ROR",
        progress: { content: "0", percentage: 90 },
      },
      {
        icon: { color: "secondary", component: "currency_rupee" },
        label: "Total ",
        progress: { content: "0", percentage: 30 },
      },
    ],
    [
      {
        icon: { color: "primary", component: "library_books" },
        label: "Total Paid",
        progress: { content: "0", percentage: 60 },
      },
      {
        icon: { color: "info", component: "currency_rupee" },
        label: "Amount",
        progress: { content: "0", percentage: 90 },
      },
      {
        icon: { color: "secondary", component: "payment" },
        label: "TDS ",
        progress: { content: "0", percentage: 30 },
      },
      {
        icon: { color: "warning", component: "local_convenience_store" },
        label: "Convenience",
        progress: { content: "0", percentage: 50 },
      },
    ],
  ],
};

export default reportsBarChartData;
