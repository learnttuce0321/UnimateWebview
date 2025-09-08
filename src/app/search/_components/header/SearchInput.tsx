'use client';

import { FormEvent, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRecentSearchStore } from 'app/search/_hooks/useRecentSearchKeyword';

interface Props {
  searchKeyword: string;
  onSearchKeywordChange: (keyword: string) => void;
}

const SearchInput = ({ searchKeyword, onSearchKeywordChange }: Props) => {
  const router = useRouter();
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const addRecentSearch = useRecentSearchStore(
    (state) => state.addRecentSearch
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const q = formData.get('q');
    addRecentSearch(q as string);

    router.push(`/search/result?q=${q}`);
  };

  const handleDeleteSearchKeyword = (e: any) => {
    e.preventDefault();
    onSearchKeywordChange('');
    inputRef.current?.focus();
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="relative box-border h-[40px] w-[calc(100%-24px)]"
    >
      <input
        ref={inputRef}
        type="text"
        name="q"
        placeholder="어떤 물건을 찾으시나요?"
        className="h-full w-full overflow-x-auto rounded-[40px] bg-gray-100 px-[16px] py-[12px] pr-[46px]"
        onFocus={() => setIsFocused(true)}
        value={searchKeyword}
        onChange={(e) => onSearchKeywordChange(e.target.value)}
        autoComplete="off"
      />
      {isFocused && searchKeyword ? (
        <button
          type="button"
          className="absolute right-[16px] top-1/2 -translate-y-1/2"
          onClick={handleDeleteSearchKeyword}
        >
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
