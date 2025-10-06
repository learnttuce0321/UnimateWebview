'use client';

import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
  q: string;
}

const SearchResultInput = ({ q }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = () => {
    const params = new URLSearchParams(searchParams);
    params.set('q', q);
    router.replace(`/search?${params.toString()}`);
  };

  return (
    <button
      type="button"
      className="relative box-border h-[40px] w-[calc(100%-24px)]"
      onClick={handleClick}
    >
      <input
        type="text"
        name="q"
        placeholder="어떤 물건을 찾으시나요?"
        className="h-full w-full overflow-x-auto rounded-[40px] bg-gray-100 px-[16px] py-[12px] pr-[46px]"
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
