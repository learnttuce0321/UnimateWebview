interface Props {
  selectedRegionName: string;
}

const AddInterestRegionModalContent = ({ selectedRegionName }: Props) => {
  return (
    <p className="text-[16px] font-medium leading-[22.4px] text-gray-900">
      <span className="text-blue-600_P">{selectedRegionName}</span>
      을(를) 관심도시에 추가하시겠습니까?
    </p>
  );
};

export default AddInterestRegionModalContent;
