import { UseFormSetValue } from 'react-hook-form';
import { FormDataType } from '@/app/(inapp)/inapp/register/_type/registerType';
import { categoryTestDataType } from '@/testDatas/categoryTestData';

type Props = {
  categoryData: categoryTestDataType[];
  setValue: UseFormSetValue<FormDataType>;
  onClickCategory: () => void;
};

export default function CategoryList({
  categoryData,
  setValue,
  onClickCategory,
}: Props) {
  const handleClickCategory = (categoryName: string) => {
    setValue('category', categoryName);
    onClickCategory();
  };

  return (
    <ul className="flex flex-col w-full  font-semibold text-[16px] leading-[55px] text-blue_gray-900">
      {categoryData.map((item) => {
        return (
          <li
            key={item.category}
            className="flex w-full pl-[16px] items-center h-[55px] active:bg-gray-50 active:font-bold active:text-blue-600_P"
            onClick={() => handleClickCategory(item.category)}
          >
            {item.category}
          </li>
        );
      })}
    </ul>
  );
}
