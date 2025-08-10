import Image from 'next/image';

const CountryLabel = () => {
  return (
    <div className="mb-[10px] flex gap-[10px]">
      <Image src="/" alt="미국 국기" width="45" height="25" />
      <h2 className="text-[32px] font-bold text-blue_gray-900">미국</h2>
    </div>
  );
};

export default CountryLabel;
