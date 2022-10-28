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

//Material progress bar
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import LinearProgress from '@mui/material/LinearProgress';

// Data
import MDButton from '../../../../components/MDButton/index'
import schedulersTableData from "layouts/tables/data/schedulersTableData";
import MDModal from 'examples/Modal';

import Typography from '@mui/material/Typography';
import AddEditModal from './AddEditModal';
import { getCrons, deleteCron, createCron, updateCron } from 'api/crons'
import MDBadge from 'components/MDBadge'

import cron from "cron-time-generator";
import MDSnackbar from 'components/MDSnackbar'

function Crons() {
  let { columns } = schedulersTableData();
  const [rows, setRows] = useState([])
  const [menu, setMenu] = useState(null);
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState('add')
  const [uuid, setUuid] = useState("")
  const [name, setName] = useState("")
  const [api, setApi] = useState("")
  const [requestType, setRequestType] = useState('get')
  const [body, setBody] = useState("")
  const [headers, setHeaders] = useState("")
  const [count, setCount] = useState(1)
  const [interval, setInterval] = useState('seconds')
  const [errorSB, setErrorSB] = useState(false);
  const [error, setError] = useState("")
  const [cronLimit, setCronLimit] = useState(0)
  const [cronUsed, setCronUsed] = useState(0)
  const [progressBar, setProgressBar] = useState(false)

  const openErrorSB = (e) => {
    setError(e)
    setErrorSB(true)
  };
  const closeErrorSB = () => {
    setError("")
    setErrorSB(false)
  };
  const handleOpen = () => {
    setAction('add')
    setOpen(true)
  };
  const handleClose = () => {
    setUuid("")
    setName("")
    setApi("")
    setRequestType("get")
    setBody("")
    setHeaders("")
    setCount(1)
    setInterval("seconds")
    setErrorSB(false)
    setOpen(false)
  };

  const renderErrorSB = (
    <MDSnackbar
      color="error"
      icon="warning"
      title="Error"
      content={error}
      dateTime="11 mins ago"
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );

  const setTable = () => {
    setCronLimit(localStorage.getItem('cronLimit'))
    setCronUsed(localStorage.getItem('cronUsed'))
    getCrons().then(crons => {
      let data = []
      localStorage.setItem('crons', JSON.stringify(crons.data.Items))
      crons.data.Items.map(cron => {
        let row =
        {
          api: <Author name={cron.name} email={cron.api} />,
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
              <Icon fontSize='medium' onClick={() => editCron(cron.uuid, cron.name, cron.api, cron.requestType, cron.body, cron.headers, cron.cronTime)}>edit</Icon>
              <Icon color="error" fontSize='medium' onClick={() => removeCron(cron.uuid)}>delete</Icon>
            </MDTypography>
          ),
        }
        data.push(row)
      })
      setRows(data)
      setProgressBar(false)
    })
  }

  const handleSave = async () => {
    try {
      let cronTime
      if (interval === 'seconds') {
        cronTime = `*/${count} * * * * *`
      } else if (interval === 'minutes') {
        console.log('count:', count)
        cronTime = cron.every(count).minutes()
      } else if (interval === 'hours') {
        cronTime = cron.every(count).hours()
      } else if (interval === 'days') {
        cronTime = cron.every(count).days()
      }
      if (action === 'add') {
        await createCron(name, api, requestType, cronTime, body, headers)
      } else if (action === 'edit') {
        await updateCron(uuid, name, api, requestType, cronTime, body, headers)
      }
      setTable()
      handleClose()
    } catch (error) {
      console.log('error:', error)
      openErrorSB(error.response?.data ? error.response.data.error : error.message)
    }

  };

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);
  const editCron = async (uuid, name, api, requestType, body, headers) => {
    try {
      setAction('edit')
      setUuid(uuid)
      setName(name)
      setApi(api)
      setRequestType(requestType)
      setBody(body)
      setHeaders(headers)
      // TODO: handle inverted cron generation
      // setCount(1)
      // setInterval("seconds")
      setOpen(true)
      // await deleteCron(uuid)
      // setTable()
    } catch (error) {
      console.log('Delete Cron error:', error)
    }
  }
  const removeCron = async (uuid) => {
    try {
      await deleteCron(uuid)
      setTable()
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
        {title.toUpperCase()}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );




  useEffect(() => {
    setProgressBar(true)
    setTable()
  }, [])

  return (
    <Card>
      {renderErrorSB}
      <MDModal open={open} handleClose={handleClose}>
        <AddEditModal
          action={action}
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
              &nbsp;<strong>{cronUsed}/{cronLimit}</strong> crons
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox color="text" px={2}>
          <MDButton variant="gradient" color="dark" onClick={handleOpen} disabled={!(cronLimit - cronUsed > 0)}>
            <Icon sx={{ fontWeight: "bold" }}>add</Icon>
            &nbsp;add new scheduler
          </MDButton>
        </MDBox>
      </MDBox>
      <MDBox>
        <Box sx={{ width: '100%' }}>
          <Fade
            in={progressBar}
          >
            <LinearProgress color="info" sx={{ overflow: 'hidden' }} />
          </Fade>
        </Box>
        <DataTable
          table={{ columns, rows }}
          showTotalEntries={false}
          isSorted={true}
          noEndBorder
          entriesPerPage={false}
        />
      </MDBox>
    </Card>
  );
}

export default Crons;
