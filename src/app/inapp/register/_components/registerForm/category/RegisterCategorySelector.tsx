import { useState } from 'react';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import CategoryModal from 'app/inapp/register/_components/registerForm/category/CategoryModal';
import { FormDataType } from 'app/inapp/register/_type/registerType';

type Props = {
  setValue: UseFormSetValue<FormDataType>;
  watch: UseFormWatch<FormDataType>;
};

export default function RegisterCategorySelector({ setValue, watch }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const selectedCategory = watch('category');

  const handleClickCategory = () => {
    setModalOpen((prev) => !prev);
  };

  return (
    <>
      <div className="flex flex-col gap-[16px] justify-start">
        <span className="text-gray-900 font-bold text-[14px]">카테고리</span>
        <div
          className="relative flex items-center justify-between h-[50px] border-[1px] bg-white border-gray-200 border-solid py-[14px] px-[16px] rounded font-medium text-blue_gray-600"
          onClick={handleClickCategory}
        >
          {selectedCategory ? (
            <div className="flex items-center">
              <p className="text-blue_gray-900">{selectedCategory}</p>
            </div>
          ) : (
            '카테고리를 선택해주세요.'
          )}
          {!selectedCategory && (
            <img
              src="/images/svg/register/icon-arrow-right.svg"
              alt="카테고리 입력하기"
            />
          )}
        </div>
      </div>

      {/* 카테고리 선택 Modal */}
      {modalOpen && (
        <CategoryModal
          onClickCategory={handleClickCategory}
          setValue={setValue}
        />
      )}
    </>
  );
}
