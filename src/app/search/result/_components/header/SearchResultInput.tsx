'use client';

import { useRouter } from 'next/navigation';

interface Props {
  q: string;
}

const SearchResultInput = ({ q }: Props) => {
  const router = useRouter();
  const handleClick = () => {
    console.log('here');
    router.replace(`/search?q=${q}`);
  };

  return (
    <button
      type="button"
      className="box-border w-[calc(100%-24px)] h-[40px] relative"
      onClick={handleClick}
    >
      <input
        type="text"
        name="q"
        placeholder="어떤 물건을 찾으시나요?"
        className="w-full h-full px-[16px] py-[12px] pr-[46px] bg-gray-100 rounded-[40px] overflow-x-auto"
        readOnly
        defaultValue={q}
      />
      <img
        src="/images/svg/search/icon-system-search.svg"
        alt="검색 아이콘"
        className="absolute right-[16px] top-1/2 -translate-y-1/2"
      />
    </button>
  );
};

export default SearchResultInput;
