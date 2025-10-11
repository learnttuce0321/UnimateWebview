'use client';

import { useAppStore } from 'providers/ZustandProvider';
import navigationScheme from 'utils/navigationScheme';

const ProfileMetaData = () => {
  const userUniversity = useAppStore((state) => state.userProfile.university);

  const { openWeb } = navigationScheme();

  return (
    <>
      <div className="flex items-center">
        <img
          src="/images/svg/my-page/star-on.svg"
          width={14}
          height={14}
          alt="평점"
          className="mr-[8px]"
        />
        <p className="text-[14px] text-blue_gray-600">3.0 (5)</p>
      </div>

      {userUniversity.name ? (
        <div className="flex items-center">
          <img
            src="/images/svg/my-page/checkbox-select.svg"
            width={14}
            height={14}
            alt="인증마크"
            className="mr-[8px]"
          />
          <p className="text-[14px] text-blue_gray-600">
            {userUniversity.name}
          </p>
        </div>
      ) : (
        <button
          className="flex items-center"
          onClick={() => openWeb('/my-page/setting/verify')}
        >
          <p className="text-[14px] leading-[14px] text-blue_gray-500">
            학교 인증하기
          </p>
          <img
            src="/images/svg/my-page/icon-arrow-chevron-right.svg"
            width={14}
            height={14}
            alt="인증마크"
          />
        </button>
      )}
    </>
  );
};

export default ProfileMetaData;
