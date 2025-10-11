import { UserReviewStats } from 'types/User';

interface Props {
  reviewStats: UserReviewStats;
}
const MateReviewStats = ({ reviewStats }: Props) => {
  const { isReviewReflected, reviewCount, averageRating } = reviewStats;

  return (
    <div className="mb-[15px] flex gap-[22px]">
      <p className="w-[96px] text-[14px] font-semibold leading-[14px] text-blue_gray-900">
        평균 거래후기
      </p>

      <div className="flex items-center gap-[8px]">
        {isReviewReflected ? (
          <>
            {Array.from({ length: Math.floor(averageRating) }).map(
              (_, index) => (
                <img
                  key={index}
                  src="/images/svg/mate/star-on.svg"
                  width={14}
                  height={14}
                  alt=""
                />
              )
            )}
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
              src="/images/svg/mate/star-on.svg"
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
    </div>
  );
};

export default MateReviewStats;
