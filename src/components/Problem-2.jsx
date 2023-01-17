import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useEffect } from 'react';

const Problem2 = () => {

    const [allContacts, setAllContacts] = useState([]);
    const [showContacts, setShowContacts] = useState([]);

    const [modalTitle, setModalTitle] = useState('');
    const [show, setShow] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [contactDetails, setcontactDetails] = useState({});

    const handleCloseDetail = () => setShowDetail(false);
    const handleShowDetail = () => setShowDetail(true);

    const handleClose = () => {
        setModalTitle('');
        setShow(false);
    };
    const handleShow = () => setShow(true);

    useEffect(() => {
        const url = 'https://contact.mediusware.com/api/contacts/';
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setAllContacts(data.results)
                console.log(data.results);
            })

    }, [])

    const showAllContacts = () => {
        setShowContacts(allContacts);
        setModalTitle('All Contacts');
        handleShow();
    }

    const showUSContacts = () => {
        const usContacts = allContacts.filter(contact => contact.country.name === 'United States');
        setShowContacts(usContacts);
        setModalTitle('US Contacts');
        handleShow();
    }

    const handleChange = (e) => {
        if (e.target.checked) {
            const evenContacts = showContacts.filter(contact => contact.id % 2 === 0);
            setShowContacts(evenContacts);
        }
        else {
            if (modalTitle === 'US Contacts') {
                const usContacts = allContacts.filter(contact => contact.country.name === 'United States');
                setShowContacts(usContacts);
            }
            else {

                setShowContacts(allContacts);
            }
        }
    }

    const detailContact = (id) => {

        const detailOfContact = allContacts.find(contact => contact.id === id);
        setcontactDetails(detailOfContact);
        handleShowDetail();
    };

    return (

        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-2</h4>

                <div className="d-flex justify-content-center gap-3">
                    <button className="btn btn-lg btn-outline-primary" type="button" onClick={showAllContacts} >All Contacts</button>
                    <button className="btn btn-lg btn-outline-warning" type="button" onClick={showUSContacts} >US Contacts</button>

                </div>

            </div>

            {
                showContacts.length > 0 &&
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title >{modalTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {
                            showContacts.map(contact => <div key={contact.id} className='d-flex cursor-pointer' onClick={() => detailContact(contact.id)}>
                                <p className='me-3'>{contact.id}.</p>
                                <p className='me-5'>{contact.phone}</p>
                                <p>{contact?.country?.name}</p>
                            </div>
                            )

                        }
                    </Modal.Body>
                    <Modal.Footer className='flex justify-content-between align-items-center'>
                        <Form>
                            {['checkbox',].map((type) => (
                                <div key={`default-${type}`} className="mb-3">
                                    <Form.Check
                                        type={type}
                                        id={`default-${type}`}
                                        label='Only Even'
                                        onChange={e => handleChange(e)}
                                    />

                                </div>
                            ))}
                        </Form>
                        <Button style={{ backgroundColor: '#46139f', border: '1px solid #46139f' }} onClick={showAllContacts}>
                            All Contacts
                        </Button>
                        <Button style={{ backgroundColor: '#ff7f50', border: '1px solid #ff7f50' }} onClick={showUSContacts}>
                            US Contacts
                        </Button>
                        <Button style={{ backgroundColor: '#46139f', border: '1px solid #46139f' }} onClick={handleClose}>
                            Close
                        </Button>

                    </Modal.Footer>
                </Modal>
            }

            {
                showDetail &&

                <Modal show={showDetail} onHide={handleCloseDetail}>
                    <Modal.Header closeButton>
                        <Modal.Title>Detail</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p className='me-3'>ID: {contactDetails.id}</p>
                        <p className='me-3'>Phone: {contactDetails.phone}</p>
                        <p className='me-3'>Country: {contactDetails?.country?.name}</p>
                    </Modal.Body>
                    <Modal.Footer className='flex justify-content-between align-items-center'>
                        <Button variant="secondary" onClick={handleCloseDetail}>
                            Close
                        </Button>

                    </Modal.Footer>
                </Modal>
            }

        </div>
    );
};

export default Problem2;