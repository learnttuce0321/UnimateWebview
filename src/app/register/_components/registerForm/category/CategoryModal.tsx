import { UseFormSetValue } from 'react-hook-form';
import { FormDataType } from '@/app/register/_type/registerType';
import { categoryTestData } from '@/testDatas/categoryTestData';
import CategoryList from './CategoryList';
import RegisterCategoryHeader from './RegisterCategoryHeader';

type Props = {
  setValue: UseFormSetValue<FormDataType>;
  onClickCategory: () => void;
};

export default function CategoryModal({ setValue, onClickCategory }: Props) {
  const categoryData = categoryTestData;

  return (
    <div className="fixed bg-white z-50 top-0 left-0 w-full h-full">
      <RegisterCategoryHeader onClickCategory={onClickCategory} />
      <CategoryList
        categoryData={categoryData}
        setValue={setValue}
        onClickCategory={onClickCategory}
      />
    </div>
  );
}
