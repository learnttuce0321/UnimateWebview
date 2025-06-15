import SearchedProduct from 'app/search/result/_components/searchedProduct/SearchedProduct';

const SearchResultList = () => {
  return (
    <ul className="w-full h-[calc(100vh-100px)] p-[16px] bg-gray-50 overflow-y-auto overflow-x-hidden">
      <SearchedProduct product={{}} />
    </ul>
  );
};

export default SearchResultList;
