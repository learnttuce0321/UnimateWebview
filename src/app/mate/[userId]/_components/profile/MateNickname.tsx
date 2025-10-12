interface Props {
  nickname: string;
}

const MateNickname = ({ nickname }: Props) => {
  return (
    <p className="text-[20px] font-bold leading-[20px] text-blue_gray-900">
      {nickname}
    </p>
  );
};

export default MateNickname;
