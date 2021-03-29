import React, { useCallback, useState } from 'react';
import { authService, dbService } from 'lib/fbase';

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState('');

  const onChange = useCallback((event) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'email') {
      setEmail(value);
    } else {
      setPassword(value);
    }
  }, []);
  const onSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        let data;
        if (newAccount) {
          // create account
          data = await authService.createUserWithEmailAndPassword(
            email,
            password,
          );
          const userObj = {
            uid: data.user.uid,
            displayName: data.user.displayName,
            photoURL: data.user.photoURL,
          };
          await dbService.collection(`users`).add(userObj);
        } else {
          // sign in
          data = await authService.signInWithEmailAndPassword(email, password);
        }
      } catch (e) {
        console.log(e);
        setError(e.message);
      }
    },
    [newAccount, email, password],
  );
  const toggleNewAccount = useCallback(() => {
    setNewAccount((prev) => !prev);
  }, []);

  return (
    <>
      <form onSubmit={onSubmit} className="container">
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
          className="authInput"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
          className="authInput"
        />
        <input
          type="submit"
          className="authInput authSubmit"
          value={newAccount ? 'Create Account' : 'Log In'}
        />
        {error && <span className="authError">{error}</span>}
      </form>
      <span onClick={toggleNewAccount} className="authSwitch">
        {newAccount ? 'Log In' : 'Create Account'}
      </span>
    </>
  );
};

export default AuthForm;
