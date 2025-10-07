'use client';

import { useState } from 'react';

const LikedProductLikeButton = () => {
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const handleLikeButtonClick = () => {
    setIsLiked((prev) => !prev);
  };
  return (
    <div>
      {isLiked ? (
        <img
          src="/images/svg/my-page/icon-toggle-favorite-on.svg"
          alt="좋아요"
          width={24}
          height={24}
        />
      ) : (
        <img
          src="/images/svg/my-page/icon-toggle-favorite-off.svg"
          alt=""
          width={24}
          height={24}
        />
      )}
    </div>
  );
};

export default LikedProductLikeButton;
