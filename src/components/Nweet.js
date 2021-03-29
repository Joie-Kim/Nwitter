import React, { useCallback, useEffect, useState } from 'react';
import { dbService, storageService } from 'lib/fbase';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

import Like from 'components/Like';

import DEFAULT_IMG from 'assets/default_profile.png';

const Nweet = ({ nweetObj, userObj, isOwner }) => {
  const [isEditting, setIsEditting] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const [creatorName, setCreatorName] = useState('');
  const [creatorImg, setCreatorImg] = useState('');

  const onDeleteClick = useCallback(async () => {
    const ok = window.confirm('Are you sure you want to delete this nweet?');
    if (ok) {
      // delete nweet
      await dbService.doc(`nweets/${nweetObj.id}`).delete();
      await storageService.refFromURL(nweetObj.attachmentUrl).delete();
    }
  }, [nweetObj.attachmentUrl, nweetObj.id]);

  const toggleEditing = useCallback(() => {
    setIsEditting((prev) => !prev);
  }, []);

  const onChange = useCallback((event) => {
    const {
      target: { value },
    } = event;
    setNewNweet(value);
  }, []);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      dbService.doc(`nweets/${nweetObj.id}`).update({
        text: newNweet,
      });
      setIsEditting(false);
    },
    [newNweet, nweetObj.id],
  );

  const getCreator = useCallback(async () => {
    console.log(nweetObj.creatorId);
    await dbService
      .collection(`users`)
      .where('uid', '==', nweetObj.creatorId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setCreatorName(doc.data().displayName);
          setCreatorImg(doc.data().photoURL);
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }, [nweetObj.creatorId]);

  useEffect(() => {
    getCreator();
  }, [getCreator]);

  return (
    <div className="nweet">
      <div className="creator">
        {creatorImg ? (
          <img src={creatorImg} className="creator_img" />
        ) : (
          <img src={DEFAULT_IMG} className="creator_img" />
        )}
        <label>{creatorName}</label>
      </div>
      {isEditting ? (
        <>
          <form onSubmit={onSubmit} className="container nweetEdit">
            <input
              typ="text"
              placeholder="Edit your nweet"
              value={newNweet}
              onChange={onChange}
              autoFocus
              required
              className="formInput"
            />
            <input type="submit" value="Update Nweet" className="formBtn" />
          </form>
          <span onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </span>
        </>
      ) : (
        <div
          className="content"
          style={
            nweetObj.attachmentUrl ? { minHeight: 160 } : { minHeight: 60 }
          }>
          <h4>{nweetObj.text}</h4>
          {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} />}
          {isOwner && (
            <div class="nweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
          <Like nweetObj={nweetObj} userObj={userObj} />
        </div>
      )}
    </div>
  );
};

export default Nweet;
