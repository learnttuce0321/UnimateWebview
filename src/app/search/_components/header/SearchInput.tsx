'use client';

import { FormEvent, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const SearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const q = formData.get('q');

    router.replace(`/search/result?q=${q}`);
  };
  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="box-border w-[calc(100%-24px)] h-[40px] relative"
    >
      <input
        type="text"
        name="q"
        placeholder="어떤 물건을 찾으시나요?"
        className="w-full h-full px-[16px] py-[12px] pr-[46px] bg-gray-100 rounded-[40px] overflow-x-auto"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        defaultValue={initialQuery}
      />
      {isFocused ? (
        <button className="absolute right-[16px] top-1/2 -translate-y-1/2">
          <img
            src="/images/svg/search/icon-system-close-circle.svg"
            alt="검색 닫기 아이콘"
          />
        </button>
      ) : (
        <button className="absolute right-[16px] top-1/2 -translate-y-1/2">
          <img
            src="/images/svg/search/icon-system-search.svg"
            alt="검색 아이콘"
          />
        </button>
      )}
    </form>
  );
};

export default SearchInput;
