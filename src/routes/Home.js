import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { dbService, storageService } from 'fbase';
import Nweet from 'components/Nweet';

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState('');
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState();

  /*
  const getNweets = async () => {
    const dbNweets = await dbService.collection('nweets').get();
    dbNweets.forEach((document) => {
      const nweetObject = {
        ...document.data(),
        id: document.id,
      };
      setNweets((prev) => [nweetObject, ...prev]);
    });
  };
  */
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

  useEffect(() => {
    //getNweets();

    dbService.collection('nweets').onSnapshot((snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArray);
    });
  }, []);

  return (
    <div>
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
      <div>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.createorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
