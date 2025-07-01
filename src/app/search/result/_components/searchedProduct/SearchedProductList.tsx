import SearchedProduct from 'app/search/result/_components/searchedProduct/SearchedProduct';

const SearchResultList = () => {
  return (
    <ul className="h-[calc(100vh-100px)] w-full overflow-y-auto overflow-x-hidden bg-gray-50 p-[16px]">
      <SearchedProduct product={{}} />
      <SearchedProduct product={{}} />
      <SearchedProduct product={{}} />
    </ul>
  );
};

export default SearchResultList;
