const SelectedFavoriteCitiesList = () => {
  return (
    <div>
      <h3 className="font-bold text-[14px] h-[17px] mb-[16px]">
        나의 관심 도시
      </h3>
      <div className="px-[16px] py-[10px] flex justify-between items-center text-blue-600_P border-blue-600_P border-[1px] rounded-[10px] border-solid bg-blue_gray-50">
        <span>San Francisco</span>
        <img
          src="/images/svg/favorite/icon-system-close-small.svg"
          alt="삭제"
          width="24"
          height="24"
        />
      </div>
    </div>
  );
};

export default SelectedFavoriteCitiesList;
