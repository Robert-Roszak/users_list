import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../../redux/usersRedux';
import { Container, Row, Table, Button, Col, Spinner } from 'react-bootstrap';

import clsx from 'clsx';

import styles from './Users.module.scss';
import { AddUser } from '../../features/AddUser/AddUser';
import { EditUser } from '../../features/EditUser/EditUser';
import { DeleteUser } from '../../features/DeleteUser/DeleteUser';

const Component = ({className}) => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState();
  const [deletePopup, setDeletePopup] = useState(false);
  const [focusedUser, setFocusedUser] = useState({});
  const [editingMode, setEditing] = useState(false);
  const onDeleteRef = useRef(null);
  const onAddRef = useRef(null);

  useEffect(() => {
    dispatch(fetchUsers());
  },[dispatch]);

  const usersData = useSelector((state) => state.users);

  useEffect(() => {
    setUsers(usersData.data);
  },[usersData]);

  const openEditUser = (user) => {
    setEditing(true);
    setFocusedUser(user);
  };

  const openDeletePopup = (user) => {
    setDeletePopup(true);
    setFocusedUser(user);
    onDeleteRef.current.style.opacity = '50%';
  };

  const openAddComponent = () => {
    onAddRef.current.style.display = 'block';
    onDeleteRef.current.style.display = 'none';
  };

  if (users) {
    if (users.length === 0) {
      return (
        <Row className={clsx(styles.noUsers, 'justify-content-md-center')}>
          <p><b>All users have been deleted, please refresh the page</b></p>
        </Row>
      );
    }

    else return (
      <Container className={clsx(styles.root, 'boxShadow')}>
        <Row ref={onDeleteRef} className={styles.visible}>
          <Row className="justify-content-md-center">
            <Col xs lg={10}>
              <p><b>User list</b></p>
            </Col>
            <Col xs lg={2} style={{textAlign: 'end'}}>
              <Button className={styles.btn} variant="primary" onClick={() => openAddComponent()} >Add new</Button>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Table striped bordered hover size='sm'>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>City</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {
                  users.map(user => {
                    if (editingMode && user.id === focusedUser.id) {
                      return <EditUser key={user.id} user={user} setFocusedUser={setFocusedUser} setEditing={setEditing}/>;
                    }
                    else return (
                      <tr key={user.id}>
                        <td>{user.id}.</td>
                        <td>{user.name}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>
                          {user.address !== undefined ? user.address.city : 'Unknown'}
                        </td>
                        <td>
                          <Button variant="warning" onClick={() => openEditUser(user)}>Edit</Button>
                        </td>
                        <td>
                          <Button variant="danger" onClick={() => openDeletePopup(user)}>Delete</Button>
                        </td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </Table>
          </Row>
        </Row>
        {
          deletePopup ?
            <DeleteUser
              setDeletePopup={setDeletePopup}
              setFocusedUser={setFocusedUser}
              focusedUser={focusedUser}
              onDeleteRef={onDeleteRef} />
            :
            ''
        }

        <Row className={styles.addUserWrapper} ref={onAddRef}>
          <AddUser onAddRef={onAddRef} onDeleteRef={onDeleteRef}/>
        </Row>
      </Container>
    );
  }

  else return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );

};

Component.propTypes = {
  className: PropTypes.string,
};

export {
  Component as Users,
  Component as UsersComponent,
};
