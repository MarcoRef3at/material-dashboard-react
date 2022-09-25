// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import logsTableData from "layouts/monitor/data/logsTableData";
import MultipleSelectCheckmarks from 'examples/Items/SelectItem';
import { getLogs } from 'api/logs';
import logsTableColumns from './data/logsTableColumns';
import { useEffect, useState } from 'react'

function Monitor() {
  const { columns } = logsTableColumns();
  const [rows, setRows] = useState([])
  // const { columns: pColumns, rows: pRows } = projectsTableData();


  useEffect(() => {
    logsTableData().then(data => {
      console.log('useEffectdata:', data)
      setRows(data)
    })
    console.log('rows:', rows)
  }, [])

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDBox display="flex" justifyContent="space-between" alignItems="center" >
                  <MDTypography variant="h6" color="white">
                    Logs Table
                  </MDTypography>
                  <MDBox>
                    <MultipleSelectCheckmarks />
                  </MDBox>
                </MDBox>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={true}
                  entriesPerPage={2}
                  showTotalEntries={true}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Monitor;
