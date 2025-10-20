import navigationScheme from 'utils/navigationScheme';

interface Props {
  productId: number;
}

const EditSalesProductMenu = ({ productId }: Props) => {
  const { openWeb } = navigationScheme();

  return (
    <button
      className="flex h-[30px] w-full items-center px-[16px] text-blue_gray-600"
      onClick={() => openWeb(`/register?productId=${productId}`)}
    >
      수정하기
    </button>
  );
};

export default EditSalesProductMenu;
