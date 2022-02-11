import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import clsx from 'clsx';

import styles from './Header.module.scss';

const Component = ({className}) => {

  return (
    <div className={clsx(className, styles.root)}>
      <Container>
        <Row className={styles.titleWrapper}>
          <Col xs lg="2" className={styles.titleWrapper}>
            <NavLink exact to={'/'} activeClassName='active' className={styles.link}>
              <p>Users list</p>
            </NavLink>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

Component.propTypes = {
  className: PropTypes.string,
};

export {
  Component as Header,
  Component as HeaderComponent,
};
