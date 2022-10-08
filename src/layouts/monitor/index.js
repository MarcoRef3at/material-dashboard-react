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
import DropDown from 'examples/Items/SelectItem';
import { getLogs } from 'api/logs';
import logsTableColumns from './data/logsTableColumns';
import { useEffect, useState } from 'react'
import { getCrons } from 'api/crons'

function Monitor() {
  const { columns } = logsTableColumns();
  const [limit, setLimit] = useState(10)
  const [count, setCount] = useState(0)
  const [rows, setRows] = useState([])
  let crons = localStorage.getItem('crons')
  if (crons) crons = JSON.parse(crons)
  const [options, setOptions] = useState(crons ? [...crons] : []);
  const [selected, setSelected] = useState(crons ? crons[0] : null)


  useEffect(async () => {
    if (!crons) {
      crons = ((await getCrons()).data.Items)
      // console.log('crons:', crons)
      setOptions([...crons])
      setSelected(crons[0])
      localStorage.setItem('crons', JSON.stringify(crons))
    }

  }, [])
  useEffect(async () => {
    if (selected)
      logsTableData(selected.uuid, limit, setCount).then(data => {
        console.log('data:', data)
      setRows(data)
    })
  }, [selected, limit])

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
                    <DropDown options={options} selected={selected} setSelected={setSelected} />
                  </MDBox>
                </MDBox>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={true}
                  entriesPerPage={limit}
                  setLimit={setLimit}
                  limit={limit}
                  count={count}
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
