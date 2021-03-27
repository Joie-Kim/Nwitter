import React from 'react';

import EMPTY_IMG from 'assets/empty_heart.png';
import FULL_IMG from 'assets/full_heart.png';

const Like = ({ userObj, nweetObj }) => {
  const onClick = () => {};
  return (
    <div className="like">
      <span onClick={onClick}>
        <img src={FULL_IMG} />
        <label>50</label>
      </span>
    </div>
  );
};

export default Like;
