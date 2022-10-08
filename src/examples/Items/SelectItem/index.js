import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { getCrons } from 'api/crons'
import { useEffect, useState } from 'react'

export default function DropDown({ options, selected, setSelected }) {
  const [open, setOpen] = useState(false);

  const loading = open && options.length === 0;




  return (
    <Autocomplete
      id="asynchronous-demo"
      sx={{ width: 300 }}
      value={selected}
      onChange={(event, newValue) => {
        setSelected(newValue);
      }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => {
        return (option.name === value.name)
      }}
      getOptionLabel={(option) => option.name}
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Asynchronous"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}