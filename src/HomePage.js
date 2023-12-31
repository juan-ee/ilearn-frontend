import { Button, Form } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
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

        setTimeout(function () {
          navigate("/list-reports");
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
          <div class="col-12 col-lg-8 mx-auto text-center ">
            <h2 class="display-4 fw-bold mb6">
              <strong className="green-text">EcoSlide</strong> your AI for a
              green and simple Report
            </h2>
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
                        <div className="mt6">
              <h3 className="mb-4">How It Works</h3>
              <div class="steps-main bg px-2">
                <div class="tabs">
                  <div
                    aria-label="Basic example"
                    role="group"
                    class="btn-group"
                  >
                    <div  class=" btn mx-4 ">
                      <i class="bi bi-1-circle-fill"></i>
                      <div>
                        <strong>Register</strong> <p>an account</p>
                      </div>
                    </div>
                    <div  class="btn mx-4" >
                      <i class="bi bi-2-circle-fill"></i>
                      <div>
                      <strong>Select & upload</strong> <p>the sustainability reports</p>
                      </div>
                    </div>
                    <div  class="btn mx-4 " >
                      <i class="bi bi-3-circle-fill"></i>
                      <div>
                      <strong>Our AI</strong> <p>will process the information</p>
                      </div>
                    </div>
                    <div  class="btn mx-4 " >
                      <i class="bi bi-4-circle-fill"></i>
                      <div>
                      <strong>Access</strong> <p>your reports anytime (:</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="loadingModal" class="LoadingModal">
            <img
              class="LoadingModal-content"
              src={gif}
              alt="missing image"
            ></img>
          </div>

          <div class="container pt">
            <div class="d-flex flex-row mb-3">
              <div class="me-5 fonts"><strong>Latest Reports</strong></div>
            </div>

            {loading ? (
              <p>Loading...</p>
            ) : (
              <div class="row">
                {reports.length &&
                  reports.map((report, index) => (
                    <div class="col-12 col-md-6 col-lg-4 mb-4 ht">
                      <div class="d-flex justify-content-center align-items-center py-5 bg-light rounded">
                        <div class="text-center">
                          <img
                            class="mx-auto mb-2 img-fluid"
                            src={"http://localhost:8000/" + report.logo_path}
                            alt=""
                          ></img>
                          <h4 class="fw-bold" key={index}>
                            {report.company_name}
                          </h4>
                          <p class="text-muted" key={index}>
                            {report.industry}
                          </p>
                          <div className="flx1">
                            <a
                              className="btn btn-success"
                              href={"http://localhost:8000/" + report.pptx_path}
                            >
                              <i class="bi bi-file-earmark-arrow-down-fill"></i>{" "}
                              Powerpoint
                            </a>
                            <a
                              className="btn btn-outline-success"
                              href={"http://localhost:8000/" + report.pdf_path}
                            >
                              <i class="bi bi-file-earmark-arrow-down"></i>{" "}
                              Original
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
