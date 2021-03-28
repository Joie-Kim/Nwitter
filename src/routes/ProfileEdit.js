import React from 'react';

import ProfileFrom from 'components/ProfileForm';

const ProfileEdit = ({ userObj, refreshUser }) => {
  return (
    <div className="container">
      <ProfileFrom userObj={userObj} refreshUser={refreshUser} />
    </div>
  );
};

export default ProfileEdit;
