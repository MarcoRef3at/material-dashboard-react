import React from 'react'
import MDBox from 'components/MDBox'
import MDInput from 'components/MDInput'
import MDTypography from 'components/MDTypography'
import MDButton from 'components/MDButton'
import { useState } from 'react'
import MDDropDown from '../../../../examples/DropDown/index'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
const methods = ['Get', 'Post', 'Patch', 'Delete']
const intervals = ['Seconds', 'Minutes', 'Hours', 'Days']
export default function AddEditModal({
    action,
    handleSave,
    handleClose,
    name,
    setName,
    api,
    setApi,
    requestType,
    setRequestType,
    count,
    setCount,
    interval,
    setInterval,
    body,
    setBody,
    headers,
    setHeaders }) {
        const [bodyError, setBodyError] = useState(false)
        const [headerError, setHeaderError] = useState(false)
        const checkBodyText = (data) => {
            setBody(data)
            try {
                let a = JSON.parse(data)
                setBodyError(false)
            } catch(e) {
                setBodyError(true)
            }
        }
        const checkHeaderText = (data) => {
            setHeaders(data)
            try {
                let a = JSON.parse(data)
                setHeaderError(false)
            } catch(e) {
                setHeaderError(true)
            }
        }
    return (
        <MDBox pt={4} pb={3} px={3}>
            <MDTypography
                fontWeight="bold"
                color="dark"
                sx={{ cursor: "pointer", userSelect: "none", ml: -3, mb: 3, mt: -5 }}
            >
                Let's create your scheduler
            </MDTypography>
            <MDBox component="form" role="form">
                <MDBox mb={2}>
                    <MDInput
                        label="Scheduler Name"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </MDBox>
                <MDBox mb={2} sx={{ display: 'flex', flexDirection: 'row' }}>
                    <MDDropDown values={methods} label="Methods" value={requestType} sx={{flex: 1}}
                        onChange={(e) => setRequestType(e.target.value)}
                    />
                    <MDInput label="Target HTTP URL" sx={{ flexGrow: 1 , flex: '2'}}
                        value={api}
                        onChange={(e) => setApi(e.target.value)} />
                </MDBox>
                <MDBox mb={2} sx={{ display: 'flex', flexDirection: 'row' }}>
                    <MDInput
                        type="number"
                        label="Run every"
                        value={count}
                        onChange={(e) => e.target.value ? e.target.value > 100 ? setCount(100) : setCount(e.target.value) : setCount(1)}
                        InputProps={{ inputProps: { min: 1, max: 100 } }}
                    />
                    <MDDropDown values={intervals} label="Interval" value={interval} sx={{flex: 1}}
                        onChange={(e) => setInterval(e.target.value)} />
                </MDBox>

                <MDBox mt={4} mb={1} sx={{ display: 'flex', flexDirection: 'column' }}>
                    <TextField
                        error={bodyError}
                        id="filled-multiline-static"
                        label="Body"
                        sx={{ marginBottom: '20px' }}
                        multiline
                        rows={4}
                        // defaultValue="Default Value"
                        variant="filled"
                        value={body}
                        helperText={bodyError ? "This is not JSON format" : ""}
                        onChange={(e) => checkBodyText(e.target.value)} />
                    <TextField
                        error={headerError}
                        id="filled-multiline-static"
                        label="Headers"
                        multiline
                        rows={4}
                        // defaultValue="Default Value"
                        variant="filled"
                        value={headers}
                        helperText={headerError ? "This is not JSON format" : ""}
                        onChange={(e) => checkHeaderText(e.target.value)} />

                </MDBox>


                <MDBox mt={4} mb={1} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                    <MDButton variant="gradient" color="light" width="90%" onClick={handleClose}>
                        Cancel
                    </MDButton>
                    <MDButton variant="gradient" color="info" onClick={handleSave} >
                        save
                    </MDButton>
                </MDBox>

            </MDBox>
        </MDBox>
    )
}
