import { useMutation } from '@tanstack/react-query';
import fetchClient, { ApiResponseError } from 'modules/fetch/fetchClient';
import { API_REPORTS } from 'modules/keyFactory/product';

export type ReportReason =
  | 'BAD_MANNER'
  | 'SCAM_SUSPICION'
  | 'HATE_SPEECH'
  | 'SEXUAL_HARASSMENT'
  | 'ETC';

interface ReportProductParams {
  targetUserId: number;
  reason: ReportReason;
  detail: string;
}

interface ReportProductResponse {
  reportId: number;
  userBlocked: boolean;
}

export const useMutationReportProduct = () => {
  return useMutation<
    ReportProductResponse,
    ApiResponseError,
    ReportProductParams
  >({
    mutationFn: async (
      params: ReportProductParams
    ): Promise<ReportProductResponse> => {
      return await fetchClient.POST({
        url: API_REPORTS,
        body: params,
      });
    },
  });
};
