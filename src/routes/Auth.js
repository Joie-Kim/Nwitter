import React from 'react';
import { firebaseInstance, authService } from 'fbase';
import AuthForm from 'components/AuthForm';

const Auth = () => {
  const onSocialClick = async (event) => {
    let {
      target: { name },
    } = event;
    let provider;

    if (name === 'google') {
      // google socail login
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === 'github') {
      // github social login
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
    console.log(data);
  };

  return (
    <div>
      <AuthForm />
      <div>
        <button name="google" onClick={onSocialClick}>
          Continue with Google
        </button>
        <button name="github" onClick={onSocialClick}>
          Continue with Github
        </button>
      </div>
    </div>
  );
};

export default Auth;
