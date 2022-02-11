import React from 'react';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';
import { Row, Col, Button } from 'react-bootstrap';

import styles from './DeleteUser.module.scss';

import { deleteUser as deleteUserRedux } from '../../../redux/usersRedux';
import clsx from 'clsx';

const Component = ({setDeletePopup, setFocusedUser, focusedUser, onDeleteRef}) => {
  const dispatch = useDispatch();

  const deleteUser = () => {
    setDeletePopup(false);
    setFocusedUser();
    onDeleteRef.current.style.opacity = '100%';
    dispatch(deleteUserRedux(focusedUser));
  };

  const closeDeletePopup = () => {
    setDeletePopup(false);
    setFocusedUser({});
    onDeleteRef.current.style.opacity = '100%';
  };

  return (
    <Row>
      <Col md={4} className={clsx(styles.popup, styles.boxShadow)}>
        <Row className={styles.borderBottom}>
          <b>Delete</b>
        </Row>
        <Row className={styles.borderBottom}>
          <p>Are you sure you want to delete {focusedUser.name}?</p>
        </Row>
        <Row className={styles.buttonsWrapper}>
          <Col md={4}>
            <Button variant="secondary" className={styles.btn} onClick={() => closeDeletePopup()}>Cancel</Button>
          </Col>
          <Col md={4}>
            <Button variant="danger" className={styles.btn} onClick={() => deleteUser()}>Delete</Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

Component.propTypes = {
  className: PropTypes.string,
  setDeletePopup: PropTypes.func,
  setFocusedUser: PropTypes.func,
  focusedUser: PropTypes.object,
  onDeleteRef: PropTypes.any,
};

export {
  Component as DeleteUser,
  Component as DeleteUserComponent,
};
