interface Props {
  createdAt: string;
  isVerified: boolean;
  university: string;
}

const ProductRegistrationMeta = ({
  createdAt,
  isVerified,
  university,
}: Props) => {
  return (
    <p className="flex h-[12px] text-[12px] leading-[12px] text-blue_gray-600">
      <span className="flex">
        34분 전
        {/* ·
                <img
                  src="/images/svg/home/badge-verified.svg"
                  alt="대학 인증 뱃지"
                  width="12"
                  height="12px"
                />
                University of San Francisco */}
      </span>
    </p>
  );
};

export default ProductRegistrationMeta;
