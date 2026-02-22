import { UserReviewStats } from 'types/User';

interface Props {
  reviewStats: UserReviewStats;
}

const ProfileReviewStats = ({ reviewStats }: Props) => {
  const { isReviewReflected, reviewCount, averageRating } = reviewStats;

  return (
    <div className="flex items-center gap-[8px]">
      {isReviewReflected ? (
        <>
          <img
            src="/images/svg/my-page/star-on.svg"
            width={14}
            height={14}
            alt=""
          />
          <span className="mr-[4px] text-[14px] font-medium leading-[14px] text-blue_gray-500">
            {averageRating?.toFixed(1)}
          </span>
          <span className="text-[14px] font-medium leading-[14px] text-blue_gray-500">
            ({reviewCount})
          </span>
        </>
      ) : (
        <>
          <img
            src="/images/svg/my-page/star-on.svg"
            width={14}
            height={14}
            alt=""
          />
          <span className="text-[14px] font-medium leading-[14px] text-blue_gray-500">
            후기 반영중
          </span>
        </>
      )}
    </div>
  );
};

export default ProfileReviewStats;
