import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function NewReport() {
    const [companyName, setCompanyName] = useState('');
    const [industry, setIndustry] = useState('');
    const [pdf, setPdf] = useState(null);
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission, e.g., send data to the server

        const formData = new FormData();
        formData.append('company_name', companyName);
        formData.append('industry', industry);
        formData.append('pdf', pdf);
        formData.append('image', image);

        try {
            const response = await fetch('http://127.0.0.1:8000/reports', {
                method: 'POST',
                body: formData, // Automatically sets content-type to 'multipart/form-data'
            });
            if (response.ok) {
                // Request was successful, you can handle the response here
                alert('report saved !');
            } else {
                // Request failed, handle the error here
                alert('POST request failed');
            }
        } catch (error) {
            console.error('Error uploading data:', error);
        }

    };


    return (<Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md="6">
                    <h2>Simple Form</h2>
                    <Form onSubmit={handleSubmit}>
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

                        <Form.Group controlId="formCompanyLogo">
                            <Form.Label>Company Logo</Form.Label>
                            <Form.Control
                                type="file"
                                name="logo"
                                placeholder="Upload company logo"
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                        </Form.Group>

                        <Form.Group controlId="formIndustry">
                            <Form.Label>Industry</Form.Label>
                            <Form.Control
                                as="select"
                                name="industry"
                                value={industry}
                                onChange={(e) => setIndustry(e.target.value)}
                            >
                                <option>Select an industry</option>
                                <option>Automobil</option>
                                <option>Real State</option>
                                <option>Pharmaceutic</option>
                            </Form.Control>
                        </Form.Group>


                        <Form.Group controlId="formDataFile">
                            <Form.Label>Data File</Form.Label>
                            <Form.Control
                                type="file"
                                name="dataFile"
                                placeholder="Upload data file"
                                accept=".pdf"
                                onChange={(e) => setPdf(e.target.files[0])}
                            />
                        </Form.Group>

                        <Button className="mt-3" variant="primary" type="submit">
                            Submit
                        </Button>

                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default NewReport;
