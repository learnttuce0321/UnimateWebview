'use client';

import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';
import { categoryTestData } from '../../../../testDatas/categoryTestData';
import { FormDataType } from '../../_type/registerType';
import RegisterInput from './RegisterInput';
import RegisterCategorySelector from './category/RegisterCategorySelector';
import RegisterPriceInfo from './price/RegisterPriceInfo';
import RegisterTradeInfo from './trade/RegisterTradeInfo';

// RegisterImageForm을 클라이언트 전용으로 불러오기 (SSR mismatch 에러)
const RegisterImageForm = dynamic(() => import('./RegisterImageForm'), {
  ssr: false,
});

export default function RegisterForm() {
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormDataType>();

  const getServerCategory = (displayCategory: string): string => {
    const categoryItem = categoryTestData.find(
      (item) => item.category === displayCategory
    );
    return categoryItem?.serverCategory || 'OTHER_GOODS';
  };

  // TODO
  // API 만 연결함 대충
  // request 툴 만들어지면 수정만 하면 될듯
  const submitProductPost = async (data: FormDataType) => {
    try {
      // 이미지는 우선 예시용 이미지 업로드
      const imageUrls =
        Array.isArray(data.images) && data.images.length > 0
          ? data.images.slice(0, 10)
          : ['https://example.com/default-image.jpg'];

      const requestBody = {
        title: data.title,
        imageUrls,
        category: getServerCategory(data.category),
        price: Number(data.priceInfo?.price) || 0,
        currencyType: data.priceInfo?.isDollar ? 'USD' : 'KRW',
        description: data.desc,
        tradeType: data.tradeInfo?.isRemote ? 'REMOTE' : 'DIRECT',
        tradeTypeDescription: data.tradeInfo?.tradeLocation || '',
        regionId: '3651000',
      };

      const response = await fetch(
        'https://dev-api.uni-mate.co.kr/api/v1/product-posts',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInByb3ZpZGVyIjoiS0FLQU8iLCJ0eXBlIjoiQUNDRVNTIiwiaWF0IjoxNzQ2OTY1NzQ1LCJleHAiOjE3NDk1NTc3NDV9.ARlNELfX283BKEmgaz6jZCTgVo_yUPdL4-s5fWutn38',
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        console.log('상품 등록 성공!');
        // TODO: 성공 시 페이지 이동 또는 성공 메시지 표시
      } else {
        console.error('상품 등록 실패:', response.status);
      }
    } catch (error) {
      console.error('API 호출 오류:', error);
    }
  };

  const onSubmit = (data: FormDataType) => {
    console.log('onSubmit 실행!!');
    console.log('form data >>', data);
    submitProductPost(data);
  };

  return (
    <form
      className="flex flex-col gap-[30px] bg-gray-50 first-letter:bg-gray-50 p-[16px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <RegisterImageForm />
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
        disabled={!isValid}
        className="mt-4 w-full h-[50px] bg-blue-600_P text-white p-2 rounded-[10px] disabled:bg-blue_gray-500"
      >
        등록하기
      </button>
    </form>
  );
}
