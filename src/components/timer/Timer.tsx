interface Props {
  formattedTime: string;
}

const Timer = ({ formattedTime }: Props) => {
  return (
    <div className="absolute right-[16px] top-[14px] text-[16px] leading-[22.4px] text-blue_gray-500">
      {formattedTime}
    </div>
  );
};

export default Timer;