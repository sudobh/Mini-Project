import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Navibar from '../components/Navbar';
import Foot from '../components/Footer';

function Dashboard() {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const uid = localStorage.getItem("uid");
        if (token) {
            axios.get(`http://localhost:3001/api/user/${uid}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                setUserData(response.data);
            })
            .catch(error => {
                setError(error.response ? error.response.data : "Error fetching data");
            });
        } else {
            setError("No token found. Please log in.");
        }
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Navibar />
            <Container className="mt-5">
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Card>
                            <Card.Header>Dashboard</Card.Header>
                            <Card.Body>
                                <Card.Title>{userData.username}</Card.Title>
                                <Card.Text>
                                    <strong>Demat Account:</strong> {userData.demat}<br />
                                    <strong>Email:</strong> {userData.email}<br />
                                    <strong>User ID:</strong> {userData.id}<br />
                                    <strong>Account Created At:</strong> {new Date(userData.created_at).toLocaleString()}<br />
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Foot />
        </>
    );
}

export default Dashboard;