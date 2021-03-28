import React, { useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitter,
  faGoogle,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';
import { firebaseInstance, authService, dbService } from 'lib/fbase';
import AuthForm from 'components/AuthForm';

const Auth = () => {
  const onSocialClick = useCallback(async (event) => {
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
    const userObj = {
      uid: data.user.uid,
      displayName: data.user.displayName,
      photoURL: data.user.photoURL,
    };
    await dbService.collection(`users`).add(userObj);
  }, []);

  return (
    <div className="authContainer">
      <FontAwesomeIcon
        icon={faTwitter}
        color={'#04AAFF'}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <AuthForm />
      <div className="authBtns">
        <button onClick={onSocialClick} name="google" className="authBtn">
          Continue with Google <FontAwesomeIcon icon={faGoogle} />
        </button>
        <button onClick={onSocialClick} name="github" className="authBtn">
          Continue with Github <FontAwesomeIcon icon={faGithub} />
        </button>
      </div>
    </div>
  );
};

export default Auth;
