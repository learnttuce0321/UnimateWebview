'use client';

import { useAppStore } from 'providers/ZustandProvider';
import ProfileReviewStats from './ProfileReviewStats';
import ProfileUniversity from './ProfileUniversity';

const ProfileMetaData = () => {
  const userUniversity = useAppStore((state) => state.userProfile.university);
  const reviewStats = useAppStore((state) => state.userProfile.reviewStats);

  return (
    <>
      <ProfileReviewStats reviewStats={reviewStats} />
      <ProfileUniversity university={userUniversity} />
    </>
  );
};

export default ProfileMetaData;
