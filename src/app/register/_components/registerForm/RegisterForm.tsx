'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams, useRouter } from 'next/navigation';
import RegisterCategorySelector from 'app/register/_components/registerForm/category/RegisterCategorySelector';
import RegisterPriceInfo from 'app/register/_components/registerForm/price/RegisterPriceInfo';
import RegisterImageForm from 'app/register/_components/registerForm/RegisterImageForm';
import RegisterInput from 'app/register/_components/registerForm/RegisterInput';
import RegisterTradeInfo from 'app/register/_components/registerForm/trade/RegisterTradeInfo';
import { useMutationUpdateProduct } from 'hooks/products/useMutationUpdateProduct';
import { FormDataType } from 'types/Product';
import { ProductDetail } from 'types/Product';
import { registerApi } from '../../_api/registerApi';
import { convertFormDataToApiRequest } from '../../_utils/formDataConverter';
import { convertProductDetailToFormData } from '../../_utils/productDataConverter';

export default function RegisterForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isEditMode = searchParams.get('mode') === 'edit';

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
  const [editProductId, setEditProductId] = useState<number | null>(null);
  const updateMutation = useMutationUpdateProduct();
  const hasLoadedData = useRef(false);

  // 수정 모드일 때 localStorage에서 데이터 로드
  useEffect(() => {
    if (isEditMode && !hasLoadedData.current) {
      hasLoadedData.current = true;

      const editData = localStorage.getItem('editProductData');
      if (editData) {
        try {
          const productDetail: ProductDetail = JSON.parse(editData);
          const formData = convertProductDetailToFormData(productDetail);

          setEditProductId(productDetail.id);
          reset(formData);

          // localStorage 정리
          localStorage.removeItem('editProductData');
        } catch (error) {
          console.error('수정 데이터 로드 실패:', error);
          alert('수정 데이터를 불러올 수 없습니다.');
          router.push('/');
        }
      } else {
        alert('수정할 상품 정보를 찾을 수 없습니다.');
        router.push('/');
      }
    }
  }, [isEditMode, reset, router]);

  const onSubmit = async (data: FormDataType) => {
    if (isSubmitting) return;

    if (!data.images || data.images.length === 0) {
      alert('이미지를 하나 이상 선택해주세요.');
      return;
    }

    setIsSubmitting(true);

    try {
      const requestData = convertFormDataToApiRequest(data, data.images);

      if (isEditMode && editProductId) {
        // 수정 모드: PATCH API 사용
        await updateMutation.mutateAsync({
          productId: editProductId,
          requestData,
        });
        alert('상품이 성공적으로 수정되었습니다!');
        router.push(`/product/${editProductId}`);
      } else {
        // 등록 모드: POST API 사용
        await registerApi.createProductPost(requestData);
        alert('상품이 성공적으로 등록되었습니다!');
        router.push('/');
      }
    } catch (error) {
      console.error(isEditMode ? '상품 수정 실패:' : '상품 등록 실패:', error);
      alert(
        isEditMode
          ? '상품 수정에 실패했습니다. 다시 시도해주세요.'
          : '상품 등록에 실패했습니다. 다시 시도해주세요.'
      );
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
