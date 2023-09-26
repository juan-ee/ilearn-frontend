import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function NewReport() {
    const [formData, setFormData] = useState({
        companyName: '',
        industry: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission, e.g., send data to the server

        try {
            const response = await fetch('http://127.0.0.1:8000/reports', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "company_name": formData.companyName,
                    "industry": formData.industry,
                }),
            });

            if (response.ok) {
                // Request was successful, you can handle the response here
                alert('report saved !');
            } else {
                // Request failed, handle the error here
                alert('POST request failed');
            }
        } catch (error) {
            alert(`Error:${error}`);
        }

    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
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
                                value={formData.companyName}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formIndustry">
                            <Form.Label>Industry</Form.Label>
                            <Form.Control
                                as="select"
                                name="industry"
                                value={formData.industry}
                                onChange={handleChange}
                            >
                                <option>Select an industry</option>
                                <option>Automobil</option>
                                <option>Real State</option>
                                <option>Pharmaceutic</option>
                            </Form.Control>
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
