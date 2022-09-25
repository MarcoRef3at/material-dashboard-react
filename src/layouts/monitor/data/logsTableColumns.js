export default function columns() {
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
  };
}
