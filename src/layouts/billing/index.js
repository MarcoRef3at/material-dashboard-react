import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
// Data
import reportsBarChartData from "layouts/billing/data/reportsBarChartData";

// billing components
import MDTypography from "components/MDTypography";
import { stripeRedirect, getPlans } from 'api/payments';
// react-router components
import { useEffect, useState } from "react";

function Billing() {

  const [plans, setPlans] = useState([])
  const handleClick = async (id) => {
    try {
      const currentURL = window.location.href
      let redirection = await stripeRedirect(id, currentURL)
      window.location.replace(redirection.data.redirect)


    } catch (error) {
      console.log('stripe error:', error)
    }
  }

  useEffect(() => {
    getPlans().then(plans => {
      let Plans = (plans.data.Items)
      Plans = Plans.sort((a, b) => (a.price) - (b.price));
      setPlans(Plans)
    }).catch(error => {
      // TODO: handle any type of errors with pop notification
      console.log('getPlans error:', error.response.data || error)
    })


  }, [])

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
            {plans.map(plan => {
              return <Grid item xs={12} md={6} lg={4} key={`${plan.uuid}`}>
                <MDBox mb={3}>
                  <ReportsBarChart
                    type={plan.name}
                    color={plan.bgColor || "info"}
                    badgeColor={plan.color || "success"}
                    title="You will get"
                    description={<>
                      <strong>{plan.limit}</strong> Schedulers
                    </>}
                    date="campaign sent 2 days ago"
                    headerTitle={`\$${plan.price}/mo`}
                    handleClick={() => handleClick(plan.uuid)}
                    chart={reportsBarChartData}
                  />

                </MDBox>
              </Grid>
            })}
          </Grid>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default Billing;
