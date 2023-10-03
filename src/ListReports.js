import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import "./css/ListReports.css";

function ListReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

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
            
          />
          <button id="searchQuerySubmit" type="submit" name="searchQuerySubmit">
            <svg style={{width:'24px', height:'24px'}} viewBox="0 0 24 24">
              <path
                fill="#666666"
                d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
              />
            </svg>
          </button>
        </div>
      </div>
      </form>
      <div className="container-filter industry-filter">
        <div class="all industry__item active-industry btn btn-primary">
            <span class="industry__item  mixitup-control-active" data-filter="all">Industry </span><i class="bi bi-caret-down-fill"></i>
        </div>
          <div class="hide_industry" id="h_industry">
                <span class="industry__item" data-filter='.auto'>Auto</span>
                <span class="industry__item" data-filter='.pharma'>Pharma</span>
                <span class="industry__item" data-filter='.retail'>Retail</span>
          </div>
      </div>

      <table className="ReportsTable table align-middle mb-0 bg-white ">
        <thead>
          <tr>
            <th>Company</th>
            <th>Logo</th>
            <th>Industry</th>
            <th>PDF</th>
          </tr>
        </thead>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <tbody>
            {reports.map((report, index) => (
              <tr>
                <td class="fw-bold fw-normal mb-1" key={index}>{report.company_name}</td>
                <td key={index}><img src={report.icon_path}></img></td>
                <td key={index}>{report.industry}</td>
                <td key={index}>{report.rating_ecovadis}</td>
                <td key={index}>{report.rating_cdp}</td>
                <td key={index}>{report.rating_sustainalitycs}</td>
                <td key={index}>{report.rating_msci}</td>
                <td key={index}>{report.rating_sp_dow_jones}</td>
                <td key={index}> <a href={report.pdf}>report {report.company_name}</a></td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </Container>
  );
}

export default ListReports;
