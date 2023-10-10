import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Collapse from "react-bootstrap/Collapse";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import "./css/ListReports.css";
import SortingComponent from "./SortingComponent";

function ListReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  // Make a set of unique categories...
  const industrySet = new Set(reports.map((r) => r.industry));
  // ... and a sorted array from the set.
  const industries = Array.from(industrySet).sort();

  useEffect(() => {
    // Define the API endpoint URL
    const apiUrl = "http://127.0.0.1:8000/reports"; // Replace with your API endpoint

    // Fetch data from the API
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setReports(data); // Update state with the fetched data
        setLoading(false); // Set loading to false
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setLoading(false); // Set loading to false in case of an error
      });

    SortingComponent();
  }, []); // The empty dependency array ensures the effect runs only once

  return (
    <Container className="mt-5">
      <h2>List Reports</h2>
      <form>
        <div className="wrapper">
          <div className="searchBar">
            <input
              id="searchQueryInput"
              type="text"
              name="searchQueryInput"
              placeholder="Search"
              onChange={(event) => setQuery(event.target.value)}
              value={query}
            />
            <button
              id="searchQuerySubmit"
              type="submit"
              name="searchQuerySubmit"
            >
              <svg
                style={{ width: "24px", height: "24px" }}
                viewBox="0 0 24 24"
              >
                <path
                  fill="#666666"
                  d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
                />
              </svg>
            </button>
          </div>
        </div>
      </form>
      <div className="container-filter">
        <p class="d-inline-flex gap-1">
          <a
            className="active-industry btn text-light btn-success "
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
          >
            <i class="bi bi-funnel"></i> &nbsp; Industry
          </a>
        </p>
        <Collapse in={open} className="show1">
          <div class="flx">
            {industries.map((industry, index) => (
              <p key={index} >{industry}</p>
            ))}
          </div>
        </Collapse>
      </div>

      <table className="ReportsTable table align-middle mb-0 bg-white ">
        <thead>
          <tr>
            <th class="sortable">
              <i class="bi bi-sort-alpha-up"></i>Company
            </th>
            <th>Logo</th>
            <th class="sortable">Industry</th>
            <OverlayTrigger overlay={<Tooltip>Explain the ratings</Tooltip>}>
              <th class="sortable">Ecovadis</th>
            </OverlayTrigger>
            <OverlayTrigger overlay={<Tooltip>Explain the ratings</Tooltip>}>
              <th class="sortable">CDP</th>
            </OverlayTrigger>
            <OverlayTrigger overlay={<Tooltip>Explain the ratings</Tooltip>}>
              <th class="sortable">Sustainalytics</th>
            </OverlayTrigger>
            <OverlayTrigger overlay={<Tooltip>Explain the ratings</Tooltip>}>
              <th class="sortable">MSCI</th>
            </OverlayTrigger>
            <OverlayTrigger overlay={<Tooltip>Explain the ratings</Tooltip>}>
              <th class="sortable">S&P Dow Jones</th>
            </OverlayTrigger>

            <th>PowerPoint</th>
            <th>Original Report</th>
          </tr>
        </thead>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <tbody>
            {reports.length &&
              reports
                .filter((report, index) => {
                  if (query === "") {
                    //if query is empty
                    return report;
                  } else if (
                    report.company_name
                      .toLowerCase()
                      .includes(query.toLowerCase())
                  ) {
                    //returns filtered array
                    return report;
                  }
                })
                .map((report, index) => (
                  <tr>
                    <td class="fw-bold fw-normal mb-1" key={index}>
                      {report.company_name}
                    </td>
                    <td key={index}>
                      <img
                        className="logo"
                        src={"http://localhost:8000/" + report.logo_path}
                      ></img>
                    </td>
                    <td key={index}>{report.industry}</td>
                    <td key={index}>{report.rating_ecovadis}</td>
                    <td key={index}>{report.rating_cdp}</td>
                    <td key={index}>{report.rating_sustainalitycs}</td>
                    <td key={index}>{report.rating_msci}</td>
                    <td key={index}>{report.rating_sp_dow_jones}</td>
                    <td key={index}>
                      {" "}
                      <a
                        className="btn btn-success"
                        href={"http://localhost:8000/" + report.pptx_path}
                      >
                        <i class="bi bi-file-earmark-arrow-down-fill"></i> Download
                      </a>
                    </td>
                    <td key={index}>
                      <a
                        className="btn btn-outline-success"
                        href={"http://localhost:8000/" + report.pdf_path}
                      >
                        <i class="bi bi-file-earmark-arrow-down"></i> Download
                      </a>
                    </td>
                  </tr>
                ))}
          </tbody>
        )}
      </table>
    </Container>
  );
}

export default ListReports;
