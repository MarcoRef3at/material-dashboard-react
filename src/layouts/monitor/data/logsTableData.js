// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";

import { getLogs } from 'api/logs';

export default function data(pageKey, setCount, pageNum = 1) {
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
        {title.toUpperCase()}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  const statusColor = (code) => {
    if (code >= 200 && code < 300) {
      return 'success'
    } else if (code >= 400 && code < 500) {
      return 'error'
    } else {
      return 'info'
    }
  }

  return (getLogs(pageKey).then(logs => {
    let data = []
    setCount(logs.data.Total)
    logs.data.Items.map(log => {
      let requestDate = ((new Date(log.requestTime)).toString()).substring(0, 15);
      let requestTime = ((new Date(log.requestTime)).toString()).substring(15, 24);
      let responseDate = (new Date(log.responseTime)).toString().substring(0, 15);
      let responseTime = (new Date(log.responseTime)).toString().substring(15, 24);
      let row =
      {
        api: <Author name={log.name} email={log.requestURL} />,
        requestType: <Time isCentered={false} title={log.requestType} description="Every Second" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent={log.responseStatus} color={statusColor(log.responseStatus)} variant="gradient" size="sm" />
          </MDBox>
        ),
        retryCount: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {log.retryCount}
          </MDTypography>
        ),
        requestTime: (
          <Time title={requestDate} description={requestTime} />
        ),
        responseTime: (
          <Time title={responseDate} description={responseTime} />
        ),
        totalTime: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {log.totalTime}
          </MDTypography>
        ),

      }
      data.push(row)
    })
    return ({ rows: data, pageKey: logs.data.LastEvaluatedKey })
  }).catch(err => {
    alert(err)
  })
  );
}
