import React, { useEffect, useState } from 'react';
import AppRouter from 'components/Router';
import { authService } from 'fbase';

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        //setIsLoggedIn(true);
        setUserObj(user);
      } /* else {
        setIsLoggedIn(false);
      }*/
      setInit(true);
    });
  }, []);

  // isLoggedIn 대신에 Boolean(userObj) 사용
  // 상태값 하나가 줄어들어서 render 줄어듦
  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} />
      ) : (
        'Initializing ...'
      )}
      <footer>&copy; nwitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
