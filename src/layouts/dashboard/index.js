import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import MDTypography from "components/MDTypography";
import { stripeRedirect } from 'api/payments';
// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useRef, useEffect, useState, useMemo } from "react";
function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const handleClick = async (id) => {
    try {
      let redirection = await stripeRedirect(id)
      window.location.replace(redirection.data.redirect)


    } catch (error) {
      console.log('stripe error:', error)
    }
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>

          <Grid item xs={12} md={12} lg={12}>
            <MDTypography variant="h2" fontWeight="medium" color="dark" mt={1} align="center">
              Affordable plans for every developer.
            </MDTypography>
            <MDTypography variant="h6" fontWeight="medium" color="text" mt={1} align="center">
              All paid plans come with a 7-day free trial. Cancel anytime.
            </MDTypography>
          </Grid>
        </Grid> 
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  type="Developer"
                  color="info"
                  title="You will get"
                  description={<>
                    <strong>5</strong> Schedulers
                  </>}
                  date="campaign sent 2 days ago"
                  headerTitle="$16/mo"
                  handleClick={handleClick}
                  chart={reportsBarChartData}
                />

              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  type="Startup"
                  color="success"
                  badgeColor="info"
                  title="You will get"
                  description={<>
                    <strong>10</strong> Schedulers
                  </>}
                  date="campaign sent 2 days ago"
                  headerTitle="$49/mo"
                  handleClick={handleClick}
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  type="Business"
                  color="dark"
                  title="You will get"
                  description={<>
                    <strong>20</strong> Schedulers
                  </>}
                  date="campaign sent 2 days ago"
                  headerTitle="$99/mo"
                  handleClick={handleClick}
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        {/* <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox> */}
      </MDBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Dashboard;
