import React, { useCallback, useEffect, useState } from 'react';
import AppRouter from 'routes';
import { authService } from 'lib/fbase';

function App() {
  const [isInit, setIsInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  // firebase의 user 정보를 가져옴
  const getUserInfo = useCallback(() => {
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
  const refreshUser = useCallback(async () => {
    const user = authService.currentUser;
    setUserObj({
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      updateProfile: (args) => user.updateProfile(args),
    });
    setUserObj(user);
  }, []);

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

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
