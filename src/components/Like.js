import React, { useEffect, useState } from 'react';

import EMPTY_IMG from 'assets/empty_heart.png';
import FULL_IMG from 'assets/full_heart.png';
import { dbService } from 'lib/fbase';

const Like = ({ nweetObj, userObj }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [likeId, setLikeId] = useState('');

  const onClick = async () => {
    let numOfLike = nweetObj.like;

    if (isClicked) {
      numOfLike -= 1;
      if (numOfLike < 0) {
        numOfLike = 0;
      }

      await dbService
        .collection(`likeTo`)
        .where('nweetId', '==', nweetObj.id)
        .where('userId', '==', userObj.uid)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.delete();
          });
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      numOfLike += 1;

      await dbService.collection('likeTo').add({
        nweetId: nweetObj.id,
        userId: userObj.uid,
        isLiked: true,
      });
    }

    setIsClicked(!isClicked);

    await dbService.doc(`nweets/${nweetObj.id}`).update({
      like: numOfLike,
    });
  };

  const getIsLiked = async () => {
    await dbService
      .collection(`likeTo`)
      .where('nweetId', '==', nweetObj.id)
      .where('userId', '==', userObj.uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setIsClicked(doc.data().isLiked);
        });
      })
      .catch((e) => {
        console.log(e);
        setIsClicked(false);
      });
  };

  useEffect(() => {
    getIsLiked();
  }, []);

  return (
    <div className="like">
      <span onClick={onClick}>
        {isClicked ? <img src={FULL_IMG} /> : <img src={EMPTY_IMG} />}
        <label>{nweetObj.like}</label>
      </span>
    </div>
  );
};

export default Like;
