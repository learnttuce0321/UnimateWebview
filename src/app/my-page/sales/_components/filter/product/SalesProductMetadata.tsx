import { formatTimeAgo } from 'utils/formatTime';

interface Props {
  createdAt: string;
  universityName: string | null;
}

const SalesProductMetadata = ({ createdAt, universityName }: Props) => {
  return (
    <p className="mb-[6px] flex h-[12px] text-[12px] leading-[12px] text-blue_gray-600">
      <span className="mr-[5px]">{formatTimeAgo(createdAt)}</span>
      {universityName && (
        <>
          <span className="mr-[5px]"> · </span>
          <img
            src="/images/svg/my-page/badge-verified.svg"
            alt="대학 인증 뱃지"
            width="12"
            height="12px"
          />
          <span>{universityName}</span>
        </>
      )}
    </p>
  );
};
export default SalesProductMetadata;
