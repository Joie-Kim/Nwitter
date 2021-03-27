import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { storageService } from 'lib/fbase';
import { useHistory } from 'react-router-dom';

import DEFAULT_IMG from 'assets/default_profile.png';

const ProfileView = ({ userObj, refreshUser }) => {
  const history = useHistory();
  const [attachment, setAttachment] = useState(userObj.photoURL);

  const onClick = async (event) => {
    history.push('/profileEdit');
  };

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
