import React from 'react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'



export default function MDDropDown({ values, label, value, onChange, sx }) {
    return (
        <FormControl sx={sx} >
            <InputLabel id="demo-simple-select-label">{label}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                sx={{ height: '100%' }}
                value={value || values[0].toLowerCase()}
                label={label}
                onChange={onChange}
            >
                {values.map((method, i) =>
                    <MenuItem value={method.toLowerCase()} key={i}>{method}</MenuItem>
                )}
            </Select>
        </FormControl>
    )
}
