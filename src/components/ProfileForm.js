import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

const ProfileForm = ({ userObj, refreshUser }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const [attachment, setAttachment] = useState('');
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
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const file = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    if (Boolean(file)) {
      reader.readAsDataURL(file);
    }
  };
  const onClearAttachment = () => setAttachment('');
  return (
    <form onSubmit={onSubmit} className="profileForm">
      {attachment && (
        <div className="profilePhoto__attachment">
          <img
            src={attachment}
            style={{
              backgroundImage: attachment,
            }}
          />
          <div
            className="profilePhoto__label"
            onClick={onClearAttachment}
            style={{ marginBottom: 20 }}>
            <span>Remove</span>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}
      <input
        type="text"
        onChange={onChange}
        placeholder="Diaplay Name"
        value={newDisplayName}
        autoFocus
        className="formInput"
      />
      <label
        for="attach-file"
        className="profilePhoto__label"
        style={{ marginTop: 10 }}>
        <span>Add photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>
      <input
        id="attach-file"
        type="file"
        accept="image/*"
        onChange={onFileChange}
        style={{
          opacity: 0,
        }}
      />

      <input
        type="submit"
        value="Update Profile"
        onClick={onSubmit}
        className="formBtn"
      />
    </form>
  );
};

export default ProfileForm;
