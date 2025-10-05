'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import RegisterCategorySelector from 'app/register/_components/registerForm/category/RegisterCategorySelector';
import RegisterPriceInfo from 'app/register/_components/registerForm/price/RegisterPriceInfo';
import RegisterImageForm from 'app/register/_components/registerForm/RegisterImageForm';
import RegisterInput from 'app/register/_components/registerForm/RegisterInput';
import RegisterTradeInfo from 'app/register/_components/registerForm/trade/RegisterTradeInfo';
import { FormDataType } from 'types/Product';
import { registerApi } from '../../_api/registerApi';
import { convertFormDataToApiRequest } from '../../_utils/formDataConverter';

export default function RegisterForm() {
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormDataType>({
    defaultValues: {
      images: [],
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: FormDataType) => {
    if (isSubmitting) return;

    if (!data.images || data.images.length === 0) {
      alert('이미지를 하나 이상 선택해주세요.');
      return;
    }

    setIsSubmitting(true);

    try {
      const requestData = convertFormDataToApiRequest(data, data.images);

      await registerApi.createProductPost(requestData);

      alert('상품이 성공적으로 등록되었습니다!');
    } catch (error) {
      console.error('상품 등록 실패:', error);
      alert('상품 등록에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className="flex flex-col gap-[30px] bg-gray-50 p-[16px] first-letter:bg-gray-50"
      onSubmit={handleSubmit(onSubmit)}
    >
      <RegisterImageForm setValue={setValue} />
      <RegisterInput
        type="textarea"
        placeholder="글 제목을 입력해주세요."
        register={register}
        name="title"
        required={true}
        label="제목"
      />
      {/* TODO: useForm의 메소드들을 따로 보내지말고 useFormContext()를 사용해서 보내도록 수정예정 */}
      <RegisterCategorySelector setValue={setValue} watch={watch} />
      <RegisterPriceInfo
        register={register}
        setValue={setValue}
        watch={watch}
      />
      <RegisterInput
        type="textarea"
        placeholder={`상품에 대한 자세한 설명을 적어주세요.\n자세히 작성할수록 판매 확률이 올라갑니다!`}
        register={register}
        name="desc"
        required={true}
        label="상품 설명"
      />
      <RegisterTradeInfo
        register={register}
        setValue={setValue}
        watch={watch}
      />
      <button
        type="submit"
        disabled={!isValid || isSubmitting}
        className="mt-4 h-[50px] w-full rounded-[10px] bg-blue-600_P p-2 text-white disabled:bg-blue_gray-500"
      >
        {isSubmitting ? '등록 중...' : '등록하기'}
      </button>
    </form>
  );
}
