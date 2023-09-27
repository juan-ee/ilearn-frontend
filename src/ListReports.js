import React, {useState, useEffect} from 'react';
import Container from "react-bootstrap/Container";
import './ListReports.css';

function ListReports() {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Define the API endpoint URL
        const apiUrl = 'http://127.0.0.1:8000/reports'; // Replace with your API endpoint

        // Fetch data from the API
        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setReports(data); // Update state with the fetched data
                setLoading(false); // Set loading to false
            })
            .catch((error) => {
                console.error('Fetch error:', error);
                setLoading(false); // Set loading to false in case of an error
            });
    }, []); // The empty dependency array ensures the effect runs only once


    return (
        <Container className="mt-5">
            <h2>List Reports</h2>

            <form>
                <label>
                    Search:
                    <input type="text" name="searchText"></input>
                </label>
                <input type="submit" value="Submit"></input>
            </form>

            <table class="ReportsTable">
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
                                <td key={index}>{report.company_name}</td>
                                <td> TODO logo</td>
                                <td key={index}>{report.industry}</td>
                                <td> TODO PDF link</td>
                            </tr>
                        ))}
                </tbody>
                )
            }

            </table>

            
        </Container>
    );
}

export default ListReports;
