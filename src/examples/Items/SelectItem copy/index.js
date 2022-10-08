
import { forwardRef } from "react";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Link from "@mui/material/Link";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// custom styles for the NotificationItem
import menuItem from "examples/Items/NotificationItem/styles";




import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';



// const NotificationItem = forwardRef(({ icon, title, ...rest }, ref) => (
//   <MenuItem {...rest} ref={ref} sx={(theme) => menuItem(theme)}>
//     <MDBox component={Link} py={0.5} display="flex" alignItems="center" lineHeight={1}>
//       <MDTypography variant="body1" color="secondary" lineHeight={0.75}>
//         {icon}
//       </MDTypography>
//       <MDTypography variant="button" fontWeight="regular" sx={{ ml: 1 }}>
//         {title}
//       </MDTypography>
//     </MDBox>
//   </MenuItem>
// ));



const names = [
  'Postman Post',
  'Postman Get',
  'Google Ping',
];

export default function MultipleSelectCheckmarks({ name }) {
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    // <div>
    <FormControl sx={{ width: 300, }}>
      <InputLabel  >
        <MDTypography variant="h6" color="white" >
          Logs
        </MDTypography></InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
        sx={{ m: 1, height: 40, }}
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuItem}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={personName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    // </div>
  );
}
