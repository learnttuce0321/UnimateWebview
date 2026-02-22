'use client';

import { UserUniversity } from 'types/User';
import navigationScheme from 'utils/navigationScheme';

interface Props {
  university: UserUniversity | undefined;
}

const ProfileUniversity = ({ university }: Props) => {
  const { openWeb } = navigationScheme();

  return (
    <>
      {university?.name ? (
        <div className="flex items-center">
          <img
            src="/images/svg/my-page/checkbox-select.svg"
            width={14}
            height={14}
            alt="인증마크"
            className="mr-[8px]"
          />
          <p className="text-[14px] text-blue_gray-600">{university.name}</p>
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

export default ProfileUniversity;
