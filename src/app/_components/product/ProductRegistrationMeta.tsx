import { formatTimeAgo } from '../../../utils/formatTime';

interface Props {
  createdAt: string;
  universityName: string | null;
}

const ProductRegistrationMeta = ({ createdAt, universityName }: Props) => {
  return (
    <p className="flex h-[12px] text-[12px] leading-[12px] text-blue_gray-600">
      <span className="flex">
        {formatTimeAgo(createdAt)}
        {universityName && (
          <>
            ·
            <img
              src="/images/svg/home/badge-verified.svg"
              alt="대학 인증 뱃지"
              width="12"
              height="12px"
            />
            <span>{universityName}</span>
          </>
        )}
      </span>
    </p>
  );
};

export default ProductRegistrationMeta;
