import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button, Form } from 'react-bootstrap';
import clsx from 'clsx';
import styles from './AddUser.module.scss';
import { addUser } from '../../../redux/usersRedux';

const Component = ({onAddRef, onDeleteRef}) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const users = useSelector((state) => state.users.data);

  const validateEmail = (email) => {
    const validRegex = /\S+@\S+\.\S+/;
    if (email.match(validRegex)) return true;
    else return false;
  };

  const handleAddUser = (event) => {
    event.preventDefault();

    if (name && validateEmail(email)) {
      const newUser = {};
      newUser.name = name;
      newUser.email = email;
      newUser.id = uuidv4();

      setEmail('');
      setName('');
      dispatch(addUser(newUser, users));

      onAddRef.current.style.display = 'none';
      onDeleteRef.current.style.display = 'block';
    }
    else alert('Please provide all details');
  };

  const closeAddUser = () => {
    onAddRef.current.style.display = 'none';
    onDeleteRef.current.style.display = 'block';
  };

  return (
    <Row className={styles.newUser}>
      <Row>
        <p><b>Form</b></p>
      </Row>

      <Row>
        <Form onSubmit={event => handleAddUser(event)}>
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalName">
            <Form.Label column sm={2}>
                Name
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" required placeholder="Name" value={name} onChange={(event) => setName(event.target.value)}/>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
                Email
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="email" required placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className={styles.justifyEnd}>
            <Col sm={2}>
              <Button className={clsx(styles.btn, styles.btnColor)} variant="outline-danger" onClick={() => closeAddUser()}>Cancel</Button>
            </Col>
            <Col sm={2}>
              <Button className={styles.btn} variant="success" type="submit">Submit</Button>
            </Col>
          </Form.Group>
        </Form>
      </Row>
    </Row>
  );
};

Component.propTypes = {
  className: PropTypes.string,
  onAddRef: PropTypes.any,
  onDeleteRef: PropTypes.any,
};

export {
  Component as AddUser,
  Component as AddUserComponent,
};
