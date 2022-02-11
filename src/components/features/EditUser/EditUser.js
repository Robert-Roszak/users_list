import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { useDispatch} from 'react-redux';
import { Button } from 'react-bootstrap';

import { editUser } from '../../../redux/usersRedux';

const Component = ({user, setFocusedUser, setEditing}) => {
  const dispatch = useDispatch();
  const name = useRef(null);
  const username = useRef(null);
  const email = useRef(null);
  const city = useRef(null);

  const validateEmail = (email) => {
    const validRegex = /\S+@\S+\.\S+/;
    if (email.match(validRegex)) return true;
    else return false;
  };

  const saveEditUser = (userId) => {
    if (name.current.value && validateEmail(email.current.value)) {
      let editedUser = {
        address: {},
      };
      editedUser.id = userId;
      editedUser.name = name.current.value;
      editedUser.username = username.current.value;
      editedUser.email = email.current.value;
      editedUser.address.city = city.current.value;
      dispatch(editUser(editedUser));
      setEditing(false);
      setFocusedUser('');
    }
    else alert('Please provide all details');
  };

  const closeEditUser = () => {
    setEditing(false);
    setFocusedUser('');
  };

  return (
    <tr key={user.id}>
      <td>{user.id}</td>
      <td><input ref={name} required type='text' defaultValue={user.name} /></td>
      <td><input ref={username} type='text' defaultValue={user.username}/></td>
      <td><input ref={email} type='email' defaultValue={user.email} /></td>
      <td>
        {user.address !== undefined ?
          <input ref={city} type='text' defaultValue={user.address.city} />
          :
          <input ref={city} type='text'/>
        }
      </td>
      <td>
        <Button variant="warning" onClick={() => saveEditUser(user.id)}>Save</Button>
      </td>
      <td>
        <Button variant="danger" onClick={() => closeEditUser()}>Cancel</Button>
      </td>
    </tr>
  );
};

Component.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object,
  setFocusedUser: PropTypes.func,
  setEditing: PropTypes.func,
};

export {
  Component as EditUser,
  Component as EditUserComponent,
};
