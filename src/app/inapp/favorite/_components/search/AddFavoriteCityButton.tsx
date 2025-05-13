interface Props {
  selectedCitiesId: number | null;
}

const AddFavoriteCityButton = ({ selectedCitiesId }: Props) => {
  return (
    <div className="fixed bottom-[0px] px-[16px] left-[0px] h-[70px] py-[10px] w-screen shadow-[0px_-1px_10px_rgba(0,0,0,0.08)]">
      <button
        className={`w-full text-white font-bold text-[18px] leading-[50px] rounded-[10px] ${selectedCitiesId ? 'bg-blue-600_P' : 'bg-blue_gray-500'}`}
      >
        등록하기
      </button>
    </div>
  );
};

export default AddFavoriteCityButton;
