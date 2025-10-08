'use client';

interface Props {
  selectedReason: string;
  setSelectedReason: React.Dispatch<React.SetStateAction<string>>;
  otherReason: string;
  setOtherReason: React.Dispatch<React.SetStateAction<string>>;
}

const REPORT_REASONS = [
  '허위 매물',
  '사기성 게시글',
  '부적절한 내용',
  '스팸성 게시글',
  '중복 게시글',
  '기타',
] as const;

const ReportModalContent = ({
  selectedReason,
  setSelectedReason,
  otherReason,
  setOtherReason,
}: Props) => {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="mb-2 text-lg font-semibold text-gray-900">신고하기</h3>
        <p className="text-sm text-gray-600">신고 사유를 선택해주세요</p>
      </div>

      <div className="space-y-2">
        {REPORT_REASONS.map((reason) => (
          <label key={reason} className="flex items-center">
            <input
              type="radio"
              name="reportReason"
              value={reason}
              checked={selectedReason === reason}
              onChange={(e) => setSelectedReason(e.target.value)}
              className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">{reason}</span>
          </label>
        ))}
      </div>

      {selectedReason === '기타' && (
        <div className="mt-3">
          <textarea
            value={otherReason}
            onChange={(e) => setOtherReason(e.target.value)}
            placeholder="신고 사유를 입력해주세요"
            className="w-full resize-none rounded-md border border-gray-300 p-3 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
        </div>
      )}
    </div>
  );
};

export default ReportModalContent;
