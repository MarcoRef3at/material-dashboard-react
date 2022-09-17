/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import Icon from "@mui/material/Icon";

export default function data() {
  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      {/* <MDAvatar src={image} name={name} size="sm" /> */}
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Time = ({ title, description, isCentered = true }) => (
    <MDBox lineHeight={1} textAlign={isCentered ? "center" : "left"}>
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "api", accessor: "api", width: "30%", align: "left" },
      { Header: "request type", accessor: "requestType", align: "left" },
      { Header: "response status", accessor: "status", align: "center" },
      { Header: "retry count", accessor: "retryCount", align: "center" },
      { Header: "request time", accessor: "requestTime", align: "center" },
      { Header: "response time", accessor: "responseTime", align: "center" },
      { Header: "total time", accessor: "totalTime", align: "center" },
    ],

    rows: [
      {
        api: <Author image={team2} name="Postman Post" email="https://postman-echo.com/post?cron=1sec" />,
        requestType: <Time isCentered={false} title="Post" description="Every Second" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="200" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        retryCount: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            0
          </MDTypography>
        ),
        requestTime: (
          <Time title=" September 14, 2022" description="13:55:11" />
        ),
        responseTime: (
          <Time title=" September 14, 2022" description="13:55:13" />
        ),
        totalTime: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            2 S
          </MDTypography>
        ),
      },
      {
        api: <Author image={team2} name="Postman Post" email="https://postman-echo.com/post?cron=1sec" />,
        requestType: <Time isCentered={false} title="Post" description="Every Second" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="400" color="error" variant="gradient" size="sm" />
          </MDBox>
        ),
        retryCount: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            3
          </MDTypography>
        ),
        requestTime: (
          <Time title=" September 14, 2022" description="13:55:11" />
        ),
        responseTime: (
          <Time title=" September 14, 2022" description="13:56:10" />
        ),
        totalTime: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            60 S
          </MDTypography>
        ),
      },
      {
        api: <Author image={team2} name="Postman Post" email="https://postman-echo.com/post?cron=1sec" />,
        requestType: <Time isCentered={false} title="Post" description="Every Second" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="200" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        retryCount: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            0
          </MDTypography>
        ),
        requestTime: (
          <Time title=" September 14, 2022" description="13:55:11" />
        ),
        responseTime: (
          <Time title=" September 14, 2022" description="13:55:13" />
        ),
        totalTime: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            2 S
          </MDTypography>
        ),
      },

    ],
  };
}
