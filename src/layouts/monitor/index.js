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

let pageKeys = [0];

function Monitor() {
  const { columns } = logsTableColumns();
  const [limit, setLimit] = useState(10)
  const [count, setCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [rows, setRows] = useState([])
  let crons = localStorage.getItem('crons')
  if (crons && crons != "undefined") {
    crons = JSON.parse(crons)
  } else {
    crons = null
  }
  const [options, setOptions] = useState(crons ? [...crons] : []);
  const [selected, setSelected] = useState(crons ? crons[0] : null)

  const setPage = (pageNum) => {
    setCurrentPage(pageNum)
    logsTableData({ cronUUID: selected.uuid, limit, pageAfterUUID: pageKeys[pageNum-1].cronUUID, pageAfterTime: pageKeys[pageNum-1].requestTime }, setCount).then(data => {
      if (pageKeys[pageNum] == undefined && pageNum <= count/limit){
        pageKeys.push(data.pageKey)
      }
      setRows(data.rows)
    })
  }

  useEffect(async () => {
    if (!crons) {
      crons = ((await getCrons()).data.Items)
      setOptions([...crons])
      setSelected(crons[0])
      localStorage.setItem('crons', JSON.stringify(crons))
    }

  }, [])
  useEffect(async () => {
    if (selected)
      logsTableData({ cronUUID: selected.uuid, limit }, setCount).then(data => {
        setRows(data.rows)
        if (pageKeys[1] == undefined)
          pageKeys.push(data.pageKey)
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
                  setPage={setPage}
                  showPageNum={pageKeys.length}
                  currentPage={currentPage}
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
