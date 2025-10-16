import { useMutationBlockMate } from 'hooks/users/useMutationBlockMate';
import { useMutationUnblockMate } from 'hooks/users/useMutationUnblockMate';

interface Props {
  isBlocked: boolean;
}

const BlockMateButton = ({ isBlocked }: Props) => {
  const { mutate: mutateBlockMate } = useMutationBlockMate();
  const { mutate: mutateUnblockMate } = useMutationUnblockMate();

  const buttonText = isBlocked ? '차단 해제' : '차단하기';
  const buttonStyle = isBlocked
    ? 'bg-blue-gray-300 text-blue_gray-500'
    : 'bg-light_peach text-tomato_red';
  return (
    <button className={`text-[12px] font-medium leading-[12px] ${buttonStyle}`}>
      {buttonText}
    </button>
  );
};

export default BlockMateButton;
