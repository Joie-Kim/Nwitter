import React, { useCallback, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { dbService, storageService } from 'lib/fbase';
import { useHistory } from 'react-router-dom';

import DEFAULT_IMG from 'assets/default_profile.png';

const ProfileForm = ({ userObj, refreshUser }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const [newAttachment, setNewAttachment] = useState(userObj.photoURL);

  const onSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      // 프로필 이름이 공백일 경우, 업데이트 할 수 없음
      if (newDisplayName === '') {
        return;
      }
      // 프로필 이름 저장
      if (userObj.displayName !== newDisplayName) {
        await userObj.updateProfile({
          displayName: newDisplayName,
        });
        await dbService
          .collection(`users`)
          .where('uid', '==', userObj.uid)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              doc.ref.update({ displayName: newDisplayName });
            });
          });
      }

      // 프로필 이미지 저장
      if (newAttachment !== userObj.photoURL) {
        let attachmentUrl;

        if (newAttachment) {
          const attachmentRef = storageService
            .ref()
            .child(`${userObj.uid}/profile_pic`);
          const response = await attachmentRef.putString(
            newAttachment,
            'data_url',
          );
          attachmentUrl = await response.ref.getDownloadURL();
        } else {
          await storageService.refFromURL(userObj.photoURL).delete();
          attachmentUrl = null;
        }

        await userObj.updateProfile({
          photoURL: attachmentUrl,
        });
        await dbService
          .collection(`users`)
          .where('uid', '==', userObj.uid)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              doc.ref.update({ photoURL: attachmentUrl });
            });
          });
      }

      // 프로필 정보 다시 받아오기
      refreshUser();
      history.push('/profile');
    },
    [history, newAttachment, newDisplayName, refreshUser, userObj],
  );

  const onChange = useCallback((event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  }, []);

  const onFileChange = useCallback((event) => {
    const {
      target: { files },
    } = event;
    const file = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setNewAttachment(result);
    };
    if (Boolean(file)) {
      reader.readAsDataURL(file);
    }
  }, []);

  const onClearAttachment = useCallback(async () => {
    const ok = window.confirm('Are you sure you want to set default picture?');
    if (ok) {
      setNewAttachment(null);
    }
  }, []);

  return (
    <form onSubmit={onSubmit} className="profileForm">
      <div className="profilePhoto__attachment">
        {newAttachment ? (
          <>
            <img src={newAttachment} />
            <div className="profilePhoto__label" onClick={onClearAttachment}>
              <span>Remove</span>
              <FontAwesomeIcon icon={faTimes} />
            </div>
          </>
        ) : (
          <img src={DEFAULT_IMG} />
        )}
      </div>
      <input
        type="text"
        onChange={onChange}
        placeholder="Diaplay Name"
        value={newDisplayName}
        autoFocus
        className="formInput"
        style={{ marginTop: 20 }}
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
        style={newDisplayName === '' ? { opacity: 0.5, cursor: 'default' } : {}}
      />
    </form>
  );
};

export default ProfileForm;
