// claude code를 사용해서 만든 예제 코드입니다.
// 사용한 프롬포트: 현재 프로젝트의 Zustand 스토어를 사용해서 우리 프로젝트에서 사용할 수 있는 예제 코드를 만들어줘. 예제 코드는 최대한 간결하게 만들어줘.
'use client';

import { useAppStore } from 'providers/ZustandProvider';
import {
  selectError,
  selectFavoriteCities,
  selectIsLoading,
  selectProducts,
  selectSelectedCity,
} from 'stores/selectors';

export const BasicUsageExample = () => {
  // 상태 선택
  const favoriteCities = useAppStore(selectFavoriteCities);
  const selectedCity = useAppStore(selectSelectedCity);
  const products = useAppStore(selectProducts);
  const isLoading = useAppStore(selectIsLoading);
  const error = useAppStore(selectError);

  // 액션 선택
  const addFavoriteCity = useAppStore((state) => state.addFavoriteCity);
  const setSelectedCity = useAppStore((state) => state.setSelectedCity);
  const setProducts = useAppStore((state) => state.setProducts);

  const handleAddCity = () => {
    addFavoriteCity({
      id: 'seoul',
      name: '서울',
      country: '대한민국',
    });
  };

  const handleSelectCity = (cityId: string) => {
    setSelectedCity(cityId);
  };

  return (
    <div>
      <h2>Zustand 사용 예제</h2>

      {/* 로딩 상태 */}
      {isLoading && <div>로딩 중...</div>}

      {/* 에러 상태 */}
      {error && <div>에러: {error}</div>}

      {/* 선택된 도시 */}
      <div>
        <h3>선택된 도시</h3>
        <p>{selectedCity ? selectedCity.name : '선택된 도시 없음'}</p>
      </div>

      {/* 관심 도시 목록 */}
      <div>
        <h3>관심 도시 목록</h3>
        <button onClick={handleAddCity}>서울 추가</button>
        <ul>
          {favoriteCities.map((city) => (
            <li key={city.id}>
              <button onClick={() => handleSelectCity(city.id)}>
                {city.name} ({city.country})
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* 상품 개수 */}
      <div>
        <h3>상품 개수</h3>
        <p>총 {products.length}개의 상품</p>
      </div>
    </div>
  );
};

// 컴포넌트 분리 예제
export const CitySelector = () => {
  const favoriteCities = useAppStore(selectFavoriteCities);
  const selectedCityId = useAppStore((state) => state.selectedCityId);
  const setSelectedCity = useAppStore((state) => state.setSelectedCity);

  return (
    <select
      value={selectedCityId || ''}
      onChange={(e) => setSelectedCity(e.target.value || null)}
      title="모든 도시"
    >
      <option value="">모든 도시</option>
      {favoriteCities.map((city) => (
        <option key={city.id} value={city.id}>
          {city.name}
        </option>
      ))}
    </select>
  );
};
