import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { authService, dbService } from 'fbase';

const Profile = ({ userObj, refreshUser }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const onLogOutClick = () => {
    authService.signOut();
    history.push('/');
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
    }
    refreshUser();
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          type="text"
          onChange={onChange}
          placeholder="Diaplay Name"
          value={newDisplayName}
          autoFocus
          className="formInput"
        />
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
    </div>
  );
};

export default Profile;
