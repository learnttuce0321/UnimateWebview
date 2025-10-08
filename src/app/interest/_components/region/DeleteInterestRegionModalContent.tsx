interface Props {
  regionName: string;
}

const DeleteInterestRegionModalContent = ({ regionName }: Props) => {
  return (
    <p className="text-[16px] font-medium leading-[22.4px] text-gray-900">
      <span className="text-blue-600_P">{regionName}</span>
      을(를) 관심도시에서 해제하시겠습니까?
    </p>
  );
};

export default DeleteInterestRegionModalContent;
