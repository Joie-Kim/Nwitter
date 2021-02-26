import React, { useState } from 'react';
import { dbService, storageService } from 'fbase';
import { v4 as uuidv4 } from 'uuid';

const NweetFactory = ({ userObj }) => {
  const [nweet, setNweet] = useState('');
  const [attachment, setAttachment] = useState();
  const onchange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = '';
    if (attachment !== '') {
      // 파일 업로드 한 경우에만 Url 받아옴
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, 'data_url');
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const nweetObj = {
      text: nweet,
      createdAt: Date.now(),
      createorId: userObj.uid,
      attachmentUrl,
    };
    dbService.collection('nweets').add(nweetObj);
    setNweet('');
    setAttachment('');
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
    reader.readAsDataURL(file);
  };
  const onClearAttachment = () => {
    setAttachment(null);
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        onChange={onchange}
        value={nweet}
        type="text"
        placeholder="what's on your mind?"
        maxLength={120}
      />
      <input type="file" accept="images/*" onChange={onFileChange} />
      <input type="submit" value="Nweet" />
      {attachment && (
        <div>
          <img src={attachment} width="50px" height="50px" />
          <button onClick={onClearAttachment}>Clear</button>
        </div>
      )}
    </form>
  );
};

export default NweetFactory;
