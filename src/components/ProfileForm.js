import React, { useState } from 'react';

const ProfileForm = ({ userObj, refreshUser }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
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
    <form onSubmit={onSubmit} className="profileForm">
      <input
        type="text"
        onChange={onChange}
        placeholder="Diaplay Name"
        value={newDisplayName}
        autoFocus
        className="formInput"
      />
      <input
        type="submit"
        value="Update Profile"
        onClick={onSubmit}
        className="formBtn"
        style={{ marginTop: 10 }}
      />
    </form>
  );
};

export default ProfileForm;
