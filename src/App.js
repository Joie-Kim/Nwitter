import React, { useEffect, useState } from 'react';
import AppRouter from 'routes';
import { authService, storageService } from 'lib/fbase';

function App() {
  const [isInit, setIsInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
          updateProfile: (args) => user.updateProfile(args),
        });
        setUserObj(user);
      } else {
        setUserObj(null);
      }
      setIsInit(true);
    });
  }, []);

  // firebase의 user에 변경사항이 있을 때, 다시 정보를 불러옴
  const refreshUser = async () => {
    const user = authService.currentUser;
    console.log(user);
    setUserObj({
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      updateProfile: (args) => user.updateProfile(args),
    });
    setUserObj(user);
    console.log(user.photoURL);
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
