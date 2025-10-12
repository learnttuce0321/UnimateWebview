import { UserReviewStats, UserUniversity } from 'types/User';
import MateReviewStats from './MateReviewStats';
import MateUniversity from './MateUniversity';

interface Props {
  university: UserUniversity;
  reviewStats: UserReviewStats;
}

const MateMetaData = ({ university, reviewStats }: Props) => {
  return (
    <section>
      <MateReviewStats reviewStats={reviewStats} />
      <MateUniversity university={university} />
    </section>
  );
};

export default MateMetaData;
