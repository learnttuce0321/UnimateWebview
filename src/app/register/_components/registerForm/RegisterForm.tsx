'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import RegisterCategorySelector from 'app/register/_components/registerForm/category/RegisterCategorySelector';
import RegisterPriceInfo from 'app/register/_components/registerForm/price/RegisterPriceInfo';
import RegisterImageForm from 'app/register/_components/registerForm/RegisterImageForm';
import RegisterInput from 'app/register/_components/registerForm/RegisterInput';
import RegisterTradeInfo from 'app/register/_components/registerForm/trade/RegisterTradeInfo';
import { useMutationUpdateProduct } from 'hooks/products/useMutationUpdateProduct';
import { useQueryProductDetail } from 'hooks/products/useQueryProductDetail';
import { FormDataType } from 'types/Product';
import { registerApi } from '../../_api/registerApi';
import { convertFormDataToApiRequest } from '../../_utils/formDataConverter';
import { convertProductDetailToFormData } from '../../_utils/productDataConverter';
import navigationScheme from 'utils/navigationScheme';

export default function RegisterForm() {
  const searchParams = useSearchParams();
  const productId = searchParams.get('productId');
  const isEditMode = !!productId;
  const { openWeb, closeWeb } = navigationScheme();

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<FormDataType>({
    defaultValues: {
      images: [],
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const updateMutation = useMutationUpdateProduct();
  const hasLoadedData = useRef(false);

  const watchedValues = watch();

  // 모든 필수 필드가 채워졌는지 확인
  const isFormComplete =
    watchedValues.images &&
    watchedValues.images.length > 0 &&
    watchedValues.title &&
    watchedValues.title.trim() !== '' &&
    watchedValues.category &&
    watchedValues.category.trim() !== '' &&
    watchedValues.priceInfo &&
    (watchedValues.priceInfo.isForGiveaway ||
      watchedValues.priceInfo.price > 0) &&
    watchedValues.desc &&
    watchedValues.desc.trim() !== '' &&
    watchedValues.tradeInfo &&
    watchedValues.tradeInfo.tradeLocation &&
    watchedValues.tradeInfo.tradeLocation.trim() !== '';

  // 수정 모드일 때 상품 상세 정보 조회
  const {
    data: productDetail,
    isLoading: isLoadingProduct,
    error: productError,
  } = useQueryProductDetail(isEditMode && productId ? productId : '');

  // 수정 모드일 때 API 데이터로 폼 초기화
  useEffect(() => {
    if (isEditMode && productDetail && !hasLoadedData.current) {
      hasLoadedData.current = true;

      try {
        const formData = convertProductDetailToFormData(productDetail);
        reset(formData);
      } catch (error) {
        console.error('상품 데이터 로드 실패:', error);
        openWeb(`/`);
      }
    }
  }, [isEditMode, productDetail, reset]);

  // 에러 처리
  useEffect(() => {
    if (isEditMode && productError) {
      console.error('상품 조회 실패:', productError);
      closeWeb();
    }
  }, [isEditMode, productError]);

  const onSubmit = async (data: FormDataType) => {
    if (isSubmitting) return;

    if (!data.images || data.images.length === 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const requestData = convertFormDataToApiRequest(data, data.images);

      if (isEditMode && productId) {
        // 수정 모드: PATCH API 사용
        await updateMutation.mutateAsync({
          productId: Number(productId),
          requestData,
        });
        openWeb(`/product/${productId}`);
        return;
      } else {
        // 등록 모드: POST API 사용
        await registerApi.createProductPost(requestData);
        setIsSubmitting(false);
        console.log('게시글 등록 ');
        openWeb('/');
      }
    } catch (error) {
      console.error(isEditMode ? '상품 수정 실패:' : '상품 등록 실패:', error);

      setIsSubmitting(false);
    }
  };

  // 수정 모드 로딩 중일 때
  if (isEditMode && isLoadingProduct) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">상품 정보를 불러오는 중...</div>
      </div>
    );
  }

  return (
    <form
      className="flex flex-col gap-[30px] bg-gray-50 p-[16px] first-letter:bg-gray-50"
      onSubmit={handleSubmit(onSubmit)}
    >
      <RegisterImageForm
        setValue={setValue}
        initialImages={
          isEditMode && productDetail ? productDetail.imageUrls : []
        }
      />
      <RegisterInput
        type="textarea"
        placeholder="글 제목을 입력해주세요."
        register={register}
        name="title"
        required={true}
        label="제목"
      />
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
        disabled={!isFormComplete || isSubmitting}
        className="mt-4 h-[50px] w-full rounded-[10px] bg-blue-600_P p-2 text-white disabled:bg-blue_gray-500"
      >
        {isSubmitting
          ? isEditMode
            ? '수정 중...'
            : '등록 중...'
          : isEditMode
            ? '수정하기'
            : '등록하기'}
      </button>
    </form>
  );
}
