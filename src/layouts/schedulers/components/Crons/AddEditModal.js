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
export default function AddEditModal({ handleSave, handleClose }) {
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
                    <MDInput label="Scheduler Name" fullWidth />
                </MDBox>
                <MDBox mb={2} sx={{ display: 'flex', flexDirection: 'row' }}>
                    <MDDropDown values={methods} label="Methods" />
                    <MDInput label="Target HTTP URL" sx={{ flexGrow: 1 }} />
                </MDBox>
                <MDBox mb={2} sx={{ display: 'flex', flexDirection: 'row' }}>
                    <MDInput type="number" label="Run every" />
                    <MDDropDown values={intervals} label="Interval" />
                </MDBox>

                <MDBox mt={4} mb={1} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TextField
                        id="filled-multiline-static"
                        label="Body"
                        multiline
                        rows={4}
                        // defaultValue="Default Value"
                        variant="filled"
                    />
                    <TextField
                        id="filled-multiline-static"
                        label="Headers"
                        multiline
                        rows={4}
                        // defaultValue="Default Value"
                        variant="filled"
                    />

                </MDBox>


                <MDBox mt={4} mb={1} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }} onClick={handleClose}>
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
