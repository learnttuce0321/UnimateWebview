import { UseFormSetValue } from 'react-hook-form';
import CategoryList from 'app/register/_components/registerForm/category/CategoryList';
import RegisterCategoryHeader from 'app/register/_components/registerForm/category/RegisterCategoryHeader';
import { categoryData } from 'constants/categoryData';
import { FormDataType } from 'types/Product';

type Props = {
  setValue: UseFormSetValue<FormDataType>;
  onClickCategory: () => void;
};

export default function CategoryModal({ setValue, onClickCategory }: Props) {
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
