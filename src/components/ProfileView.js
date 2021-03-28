import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import DEFAULT_IMG from 'assets/default_profile.png';

const ProfileView = ({ userObj, refreshUser }) => {
  const history = useHistory();
  const attachment = userObj.photoURL;

  const onClick = useCallback(
    async (event) => {
      history.push('/profileEdit');
    },
    [history],
  );

  return (
    <div className="profileForm">
      <div className="profilePhoto__attachment">
        {attachment ? (
          <img
            src={attachment}
            style={{
              backgroundImage: attachment,
            }}
          />
        ) : (
          <img src={DEFAULT_IMG} />
        )}
      </div>
      <div className="profileName_container" style={{ marginTop: 20 }}>
        <label>{userObj.displayName}</label>
      </div>
      <button
        onClick={onClick}
        className="profileEdit_btn"
        style={{ marginTop: 20 }}>
        Edit Profile
      </button>
    </div>
  );
};

export default ProfileView;
