/**
 * 숫자에 자동으로 콤마를 찍어주는 함수
 */
export const formatNumber = (value: string | number): string => {
  let _value: string = typeof value === 'number' ? String(value) : value;
  const number = _value.replace(/[^0-9]/g, '');
  return number.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
