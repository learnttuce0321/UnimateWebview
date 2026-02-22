'use client';

import React, { useState, useEffect } from 'react';
import BottomSheetContent from 'components/bottomSheet/BottomSheetContent';
import BottomSheetDimmed from 'components/bottomSheet/BottomSheetDimmed';
import ReportDetailInput from './ReportDetailInput';
import ReportReasonSelection from './ReportReasonSelection';

interface ReportBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (reason: string, details: string) => void;
}

type Step = 'reason-selection' | 'detail-input';

const ReportBottomSheet = ({
  isOpen,
  onClose,
  onSubmit,
}: ReportBottomSheetProps) => {
  const [step, setStep] = useState<Step>('reason-selection');
  const [selectedReason, setSelectedReason] = useState<any>(null);

  // 바텀시트가 닫힐 때 상태 초기화
  useEffect(() => {
    if (!isOpen) {
      setStep('reason-selection');
      setSelectedReason(null);
    }
  }, [isOpen]);

  const handleReasonNext = (reason: any) => {
    setSelectedReason(reason);
    setStep('detail-input');
  };

  const handleBack = () => {
    setStep('reason-selection');
  };

  const handleSubmit = (data: { reason: any; detail: string }) => {
    // API 호출 로직 추가 가능
    console.log('신고 데이터:', data);

    if (onSubmit) {
      onSubmit(data.reason.id, data.detail);
    }

    onClose();
  };

  const renderContent = () => {
    switch (step) {
      case 'reason-selection':
        return (
          <ReportReasonSelection
            closeSheet={onClose}
            onNext={handleReasonNext}
          />
        );
      case 'detail-input':
        return (
          <ReportDetailInput
            closeSheet={onClose}
            selectedReason={selectedReason}
            onBack={handleBack}
            onSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* 오버레이 */}
      <BottomSheetDimmed closeSheet={onClose} />
      {/* 바텀 시트 */}
      <BottomSheetContent closeSheet={onClose}>
        {renderContent()}
      </BottomSheetContent>
    </>
  );
};

export default ReportBottomSheet;
