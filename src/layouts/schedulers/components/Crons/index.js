import { useState, useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React examples
import DataTable from "examples/Tables/DataTable";

// Data
import MDButton from '../../../../components/MDButton/index'
import schedulersTableData from "layouts/tables/data/schedulersTableData";
import MDModal from 'examples/Modal';

import Typography from '@mui/material/Typography';
import AddEditModal from './AddEditModal';
import { getCrons, deleteCron, createCron } from 'api/crons'
import MDBadge from 'components/MDBadge'

import cronTime from "cron-time-generator";

function Crons() {
  let { columns } = schedulersTableData();
  const [rows, setRows] = useState([])
  const [menu, setMenu] = useState(null);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(null)
  const [api, setApi] = useState(null)
  const [requestType, setRequestType] = useState('get')
  const [body, setBody] = useState(null)
  const [headers, setHeaders] = useState(null)
  const [count, setCount] = useState(1)
  const [interval, setInterval] = useState('seconds')
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSave = async () => {
    try {
      let cronTime
      if (interval == 'second') {
        cronTime = `*/${count} * * * * *`
      } else if (interval == 'minutes') {
        cronTime = cronTime.every(count).minutes()
      } else if (interval == 'hours') {
        cronTime = cronTime.every(count).hours()
      } else if (interval == 'days') {
        cronTime = cronTime.every(count).days()
      }

      await createCron(name, api, requestType, cronTime, body, headers)

      // setOpen(false)
    } catch (error) {
      console.log('save error:', error)
    }

  };

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);
  const removeCron = async (uuid) => {
    try {
      await deleteCron(uuid)
    } catch (error) {
      console.log('Delete Cron error:', error)
    }
  }

  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      {/* <MDAvatar src={image} name={name} size="sm" /> */}
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        {/*  <MDTypography variant="caption">{email}</MDTypography> */}
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  const setTable = () => {
    getCrons().then(crons => {
      let data = []
      console.log('crons:', crons.data)
      crons.data.Items.map(cron => {
        let row =
        {
          api: <Author name="Cron Name" email={cron.api} />,
          requestType: <Job title={cron.requestType} description="Every Second" />,
          status: (
            <MDBox ml={-1}>
              <MDBadge badgeContent="active" color="success" variant="gradient" size="sm" />
            </MDBox>
          ),
          body: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {JSON.stringify(cron.body)}
            </MDTypography>
          ),
          action: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              <Icon fontSize='medium'>edit</Icon>
              <Icon color="error" fontSize='medium' onClick={() => removeCron(cron.uuid)}>delete</Icon>
            </MDTypography>
          ),
        }
        data.push(row)
      })
      setRows(data)
    })
  }
  useEffect(() => {
    setTable()
  }, [])

  return (
    <Card>
      <MDModal open={open} handleClose={handleClose}>
        <AddEditModal
          handleClose={handleClose}
          handleSave={handleSave}
          name={name}
          setName={setName}
          api={api}
          setApi={setApi}
          requestType={requestType}
          setRequestType={setRequestType}
          count={count}
          setCount={setCount}
          interval={interval}
          setInterval={setInterval}
          body={body}
          setBody={setBody}
          headers={headers}
          setHeaders={setHeaders}
        />
      </MDModal>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <MDBox>
          <MDTypography variant="h6" gutterBottom>
            Crons
          </MDTypography>
          <MDBox display="flex" alignItems="center" lineHeight={0}>
            {/* <Icon
              sx={{
                fontWeight: "bold",
                color: ({ palette: { info } }) => info.main,
                mt: -0.5,
              }}
            >
              done
            </Icon> */}
            <MDTypography variant="button" fontWeight="regular" color="text">
              &nbsp;<strong>3/5</strong> crons
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox color="text" px={2}>
          <MDButton variant="gradient" color="dark" onClick={handleOpen}>
            <Icon sx={{ fontWeight: "bold" }}>add</Icon>
            &nbsp;add new scheduler
          </MDButton>
        </MDBox>
      </MDBox>
      <MDBox>
        <DataTable
          table={{ columns, rows }}
          showTotalEntries={false}
          isSorted={false}
          noEndBorder
          entriesPerPage={false}
        />
      </MDBox>
    </Card>
  );
}

export default Crons;
