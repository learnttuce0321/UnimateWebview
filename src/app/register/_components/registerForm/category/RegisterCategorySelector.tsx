import { useState } from 'react';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import CategoryModal from 'app/register/_components/registerForm/category/CategoryModal';
import { FormDataType } from 'app/register/_type/registerType';

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
      <div className="flex flex-col justify-start gap-[16px]">
        <span className="text-[14px] font-bold text-gray-900">카테고리</span>
        <div
          className="relative flex h-[50px] items-center justify-between rounded border-[1px] border-solid border-gray-200 bg-white px-[16px] py-[14px] font-medium text-blue_gray-600"
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
