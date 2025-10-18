interface Props {
  handlePopupClose: () => void;
}

const MateProfileMoreMenus = ({ handlePopupClose }: Props) => {
  return (
    <div className="flex w-[128px] flex-col rounded-[10px] bg-white py-[8px] text-[14px] leading-[14px] shadow-[0_0_10px_0_rgba(0,0,0,0.2)]">
      <p className="flex h-[30px] w-full items-center px-[16px] text-blue_gray-600">
        신고하기
      </p>
      <p className="flex h-[30px] w-full items-center px-[16px] text-blue_gray-600">
        수정하기
      </p>
    </div>
  );
};

export default MateProfileMoreMenus;
