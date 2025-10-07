import { UseFormSetValue } from 'react-hook-form';
import { categoryDataType } from 'constants/categoryData';
import { FormDataType } from 'types/Product';

type Props = {
  categoryData: categoryDataType[];
  setValue: UseFormSetValue<FormDataType>;
  onClickCategory: () => void;
};

export default function CategoryList({
  categoryData,
  setValue,
  onClickCategory,
}: Props) {
  const handleClickCategory = (categoryEN: string) => {
    setValue('category', categoryEN);
    onClickCategory();
  };

  return (
    <ul className="flex w-full flex-col text-[16px] font-semibold leading-[55px] text-blue_gray-900">
      {categoryData.map((item) => {
        return (
          <li
            key={item.category}
            className="flex h-[55px] w-full items-center pl-[16px] active:bg-gray-50 active:font-bold active:text-blue-600_P"
            onClick={() => handleClickCategory(item.categoryEN)}
          >
            {item.category}
          </li>
        );
      })}
    </ul>
  );
}
