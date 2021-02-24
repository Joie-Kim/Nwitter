import React, { useState } from 'react';
import { dbService } from 'fbase';

const Nweet = ({ nweetObj, isOwner }) => {
  const [isEditting, setIsEditting] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm('Are you sure you want to delete this nweet?');
    if (ok) {
      // delete nweet
      await dbService.doc(`nweets/${nweetObj.id}`).delete();
    }
  };
  const toggleEditting = () => setIsEditting((prev) => !prev);
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewNweet(value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    dbService.doc(`nweets/${nweetObj.id}`).update({
      text: newNweet,
    });
    setIsEditting(false);
  };

  return (
    <div>
      {isEditting ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              typ="text"
              placeholder="Edit your nweet"
              value={newNweet}
              onChange={onChange}
              required
            />
            <input type="submit" value="Update Nweet" />
          </form>
          <button>Cancle</button>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete</button>
              <button onClick={toggleEditting}>Edit</button>
            </>
          )}{' '}
        </>
      )}
    </div>
  );
};

export default Nweet;
