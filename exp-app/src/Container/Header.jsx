import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navbar, Container, Button, Modal, Form, Dropdown, ListGroup } from 'react-bootstrap';

export const Header = () => {
    const [showForm, setShowForm] = useState(false);
    const [experience, setExperience] = useState({ title: '', companyName: '', location: '', checkbox: false });
    const [experiences, setExperiences] = useState([]);
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const response = await axios.get("https://countriesnow.space/api/v0.1/countries");
                setLocations(response.data.data.map((country) => country.country));
            } catch (error) {
                console.log(error);
            }
        };
        fetchLocation();
    }, []);
    

    const handleShowForm = () => setShowForm(true);
    const handleCloseForm = () => setShowForm(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setExperiences((prevExperiences) => [...prevExperiences, experience]);
        setExperience({ title: '', companyName: '', location: '', checkbox: false });
        console.log(experiences)
        console.log(experience)
        handleCloseForm();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExperience((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleLocationSelect = (location) => {
        setExperience((prev) => ({ ...prev, location }));
    };

    return (
        <>
            <Navbar bg="light" variant="light" expand="lg" className='navbar navbar-expand-lg bg-body-tertiary fixed-top'>
                <Container>
                    <Navbar.Brand href="#home">Experience Portal</Navbar.Brand>
                    <Button variant="primary" onClick={handleShowForm}>
                        Add Experience
                    </Button>
                </Container>
            </Navbar>

            <Modal show={showForm} onHide={handleCloseForm}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Experience</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formExperienceTitle">
                            <Form.Label><strong>Title</strong></Form.Label>
                            <Form.Control
                                type="text"
                                className='my-2'
                                placeholder="Enter your job title"
                                name="title"
                                value={experience.title}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formExperienceCompany">
                            <Form.Label><strong>Company Name</strong></Form.Label>
                            <Form.Control
                                type="text"
                                className='my-2'
                                placeholder="Enter company name"
                                name="companyName"
                                value={experience.companyName}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formExperienceCheckbox">
                            <Form.Check
                                type="checkbox"
                                className='my-2'
                                id="checkbox"
                                label={<strong>Is Current Job?</strong>}
                                name="checkbox"
                                checked={experience.checkbox}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formExperienceLocation">
                            <Form.Label className='my-2'
                             ><strong>Job Location</strong></Form.Label>
                            <Dropdown>
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                    {experience.location || 'Select Location'}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {locations.map((location, index) => (
                                        <Dropdown.Item
                                            key={index}
                                            onClick={() => handleLocationSelect(location)}
                                        >
                                            {location}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Form.Group>

                        <Button variant="primary" type="submit" className="mt-3">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <Container className="mt-0">
                <h3>Experiences</h3>
                <ListGroup>
                    {experiences.map((experience, i) => (
                        <ListGroup.Item key={i}>
                            <strong>Title:</strong> {experience.title} <br />
                            <strong>Company:</strong> {experience.companyName} <br />
                            <strong>Location:</strong> {experience.location} <br />
                            <strong>Current Job:</strong> {experience.checkbox}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Container>

        </>
    );
};
