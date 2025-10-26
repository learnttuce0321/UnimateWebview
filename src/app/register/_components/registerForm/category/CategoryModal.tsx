import { useEffect } from 'react';
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
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full flex-col bg-white">
      <RegisterCategoryHeader onClickCategory={onClickCategory} />
      <div className="flex-1 overflow-y-auto">
        <CategoryList
          categoryData={categoryData}
          setValue={setValue}
          onClickCategory={onClickCategory}
        />
      </div>
    </div>
  );
}
