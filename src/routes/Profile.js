import React from 'react';
import { useHistory } from 'react-router-dom';
import { authService } from 'lib/fbase';

import ProfileView from 'components/ProfileView';

const Profile = ({ userObj, refreshUser }) => {
  const history = useHistory();

  const onLogOutClick = () => {
    authService.signOut();
    history.push('/');
  };

  return (
    <div className="container">
      <ProfileView userObj={userObj} refreshUser={refreshUser} />
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
    </div>
  );
};

export default Profile;
