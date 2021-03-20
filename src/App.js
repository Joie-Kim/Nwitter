import React, { useEffect, useState } from 'react';
import AppRouter from 'routes';
import { authService, storageService } from 'lib/fbase';

function App() {
  const [isInit, setIsInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const [url, setUrl] = useState('');

  const getAttachmentUrl = (uid) => {
    const attachmentRef = storageService.ref().child(`${uid}/profile_pic`);
    attachmentRef
      .getDownloadURL()
      .then((url) => {
        setUrl(url);
      })
      .catch(() => {
        setUrl('');
      });
  };

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      getAttachmentUrl(user.uid);

      if (user) {
        setUserObj({
          uid: user.uid,
          displayName: user.displayName,
          attachmentUrl: url,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setUserObj(null);
      }
      setIsInit(true);
    });
  }, [url]);

  // firebase의 user에 변경사항이 있을 때, 다시 정보를 불러옴
  const refreshUser = async () => {
    const user = authService.currentUser;

    getAttachmentUrl(user.uid);

    setUserObj({
      uid: user.uid,
      displayName: user.displayName,
      attachmentUrl: url,
      updateProfile: (args) => user.updateProfile(args),
    });
  };

  // isLoggedIn 대신에 Boolean(userObj) 사용
  // 상태값 하나가 줄어들어서 render 줄어듦
  return (
    <>
      {isInit ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
        />
      ) : (
        'Initializing ...'
      )}
    </>
  );
}

export default App;
