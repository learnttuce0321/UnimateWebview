import { UseFormSetValue } from 'react-hook-form';
import CategoryList from 'app/inapp/register/_components/registerForm/category/CategoryList';
import RegisterCategoryHeader from 'app/inapp/register/_components/registerForm/category/RegisterCategoryHeader';
import { FormDataType } from 'app/inapp/register/_type/registerType';
import { categoryTestData } from 'app/testDatas/categoryTestData';

type Props = {
  setValue: UseFormSetValue<FormDataType>;
  onClickCategory: () => void;
};

export default function CategoryModal({ setValue, onClickCategory }: Props) {
  const categoryData = categoryTestData;

  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full bg-white">
      <RegisterCategoryHeader onClickCategory={onClickCategory} />
      <CategoryList
        categoryData={categoryData}
        setValue={setValue}
        onClickCategory={onClickCategory}
      />
    </div>
  );
}
