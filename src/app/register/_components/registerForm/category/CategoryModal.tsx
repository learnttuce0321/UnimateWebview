import { UseFormSetValue } from 'react-hook-form';
import CategoryList from 'app/register/_components/registerForm/category/CategoryList';
import RegisterCategoryHeader from 'app/register/_components/registerForm/category/RegisterCategoryHeader';
import { categoryTestData } from 'app/testDatas/categoryTestData';
import { FormDataType } from 'types/Product';

type Props = {
  setValue: UseFormSetValue<FormDataType>;
  onClickCategory: () => void;
};

export default function CategoryModal({ setValue, onClickCategory }: Props) {
  const categoryData = categoryTestData;

  return (
    <div className="fixed left-0 top-0 z-50 h-full w-full bg-white">
      <RegisterCategoryHeader onClickCategory={onClickCategory} />
      <CategoryList
        categoryData={categoryData}
        setValue={setValue}
        onClickCategory={onClickCategory}
      />
    </div>
  );
}
