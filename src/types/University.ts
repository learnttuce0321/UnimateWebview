export interface University {
  id: number;
  name: string;
  country: string;
}

export interface SearchUniversityResponse {
  content: University[];
  hasNext: boolean;
}
