import { Button, Form } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from 'react-router-dom';
import "./css/HomePage.css";
import gif from "./AGNB.gif";

function NewReport(props) {
  const [companyName, setCompanyName] = useState("");
  const [pdf, setPdf] = useState(null);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to the server

    const formData = new FormData();
    formData.append("company_name", companyName);
    formData.append("pdf", pdf);
    formData.append("image", image);

    try {
      const response = await fetch("http://127.0.0.1:8000/reports", {
        method: "POST",
        body: formData, // Automatically sets content-type to 'multipart/form-data'
      });
      if (response.ok) {
        // Request was successful, you can handle the response here
        document.getElementById("loadingModal").style.display = "block";

        setTimeout(function() {
          navigate('/list-reports');
        }, 2000);

        //alert("report saved !");
      } else {
        // Request failed, handle the error here
        alert("POST request failed");
      }
    } catch (error) {
      console.error("Error uploading data:", error);
    }
  };

  return (
    // Modal for the new report
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">New Report</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* 
         Form for the company name
     */}
        <Form onSubmit={handleSubmit} className="mt-3">
          <Form.Group controlId="formCompanyName">
            <Form.Label>Company Name</Form.Label>
            <Form.Control
              type="text"
              name="companyName"
              placeholder="Enter company name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </Form.Group>
          {/* 
         Form for the company logo
     */}
          <Form.Group controlId="formCompanyLogo" className="mt-3">
            <Form.Label>Company Logo</Form.Label>
            <Form.Control
              type="file"
              name="logo"
              placeholder="Upload company logo"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Form.Group>
          {/* 
         Form for the company report
     */}
          <Form.Group controlId="formDataFile" className="mt-3">
            <Form.Label>Data File</Form.Label>
            <Form.Control
              type="file"
              name="dataFile"
              placeholder="Upload data file"
              accept=".pdf"
              onChange={(e) => setPdf(e.target.files[0])}
            />
          </Form.Group>
          {/* 
         button to submit the previous form
     */}
          <Button className="mt-5" variant="success" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

function HomePage() {
  const [modalShow, setModalShow] = React.useState(false);

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Define the API endpoint URL
    const apiUrl = "http://127.0.0.1:8000/last-4-reports"; // Replace with your API endpoint

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
    <div class="pdt">
      <div class="container mb-5">
        <div class="row position-relative">
          <div class="col-12 col-lg-8 mx-auto text-center mb-5">
            <h2 class="display-4 fw-bold mb-5">
              Finish what you started today before you forget to do it.
            </h2>
            <p class="lead text-muted mb-5">
              Correct annotation helps your customers find their way around new
              features. Getting familiar with the project is the first step
              towards development.
            </p>
            <div>
              {/* 
         Button for showing the Modal 
     */}
              <Button
                variant="success"
                size="lg"
                onClick={() => setModalShow(true)}
              >
                New Report
              </Button>

              <NewReport show={modalShow} onHide={() => setModalShow(false)} />
              <Button variant="success ms-5" size="lg" href="/list-reports">
                Search Reports
              </Button>
            </div>
          </div>

          <div id="loadingModal" class="LoadingModal">
            <img class="LoadingModal-content" src={gif} alt="missing image"></img>
          </div>
          
          <div class="container pt">
            <div class="d-flex flex-row mb-3">
              <div class="me-5">Latest Reports</div>
            </div>

            {loading ? (
              <p>Loading...</p>
            ) : (
              <div class="row">
                {reports.length && reports.map((report, index) => (
                  <div class="col-12 col-md-6 col-lg-4 mb-4">
                    <div class="d-flex justify-content-center align-items-center py-5 bg-light rounded">
                      <div class="text-center">
                        <img
                          class="mx-auto mb-5 img-fluid"
                          src="bootstrap5-plain-assets/images/blue-400-avatar.png"
                          alt=""
                        ></img>
                        <h4 class="fw-bold" key={index}>{report.company_name}</h4>
                        <p class="text-muted" key={index}>{report.industry}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

              {/* <div class="row">
                <div class="col-12 col-md-6 col-lg-4 mb-4">
                  <div class="d-flex justify-content-center align-items-center py-5 bg-light rounded">
                    <div class="text-center">
                      <img
                        class="mx-auto mb-5 img-fluid"
                        src="bootstrap5-plain-assets/images/blue-400-avatar.png"
                        alt=""
                      ></img>
                      <h4 class="fw-bold">Danny Bailey</h4>
                      <p class="text-muted">CEO &amp; Founder</p>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-md-6 col-lg-4 mb-4">
                  <div class="d-flex justify-content-center align-items-center py-5 bg-light rounded">
                    <div class="text-center">
                      <img
                        class="mx-auto mb-5 img-fluid"
                        src="bootstrap5-plain-assets/images/blue-400-avatar.png"
                        alt=""
                      ></img>
                      <h4 class="fw-bold">Danny Bailey</h4>
                      <p class="text-muted">CEO &amp; Founder</p>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-md-6 col-lg-4 mb-4">
                  <div class="d-flex justify-content-center align-items-center py-5 bg-light rounded">
                    <div class="text-center">
                      <img
                        class="mx-auto mb-5 img-fluid"
                        src="bootstrap5-plain-assets/images/blue-400-avatar.png"
                        alt=""
                      ></img>
                      <h4 class="fw-bold">Danny Bailey</h4>
                      <p class="text-muted">CEO &amp; Founder</p>
                    </div>
                  </div>
                </div>
              </div> */}

            
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
