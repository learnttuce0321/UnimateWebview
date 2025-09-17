'use client';

import React, { useState } from 'react';
import Modal from 'components/modal/Modal';

interface ProductStatusModalProps {
  isOpen: boolean;
  currentStatus: string;
  onClose: () => void;
  onStatusChange: (status: string) => void;
}

const STATUS_OPTIONS = [
  { value: 'FOR_SALE', label: '판매중' },
  { value: 'RESERVED', label: '예약중' },
  { value: 'SOLD_OUT', label: '판매완료' },
];

const ProductStatusModal = ({ 
  isOpen, 
  currentStatus, 
  onClose, 
  onStatusChange 
}: ProductStatusModalProps) => {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);

  const handleSubmit = () => {
    if (selectedStatus !== currentStatus) {
      onStatusChange(selectedStatus);
    }
    onClose();
  };

  return (
    <Modal
      isOpened={isOpen}
      onConfirm={handleSubmit}
      onCancel={onClose}
      onOverlayClick={onClose}
      confirmText="변경하기"
      cancelText="취소"
    >
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">상태 변경</h3>
          <p className="text-sm text-gray-600">
            변경할 상태를 선택해주세요
          </p>
        </div>
        
        <div className="space-y-2">
          {STATUS_OPTIONS.map((option) => (
            <label key={option.value} className="flex items-center">
              <input
                type="radio"
                name="productStatus"
                value={option.value}
                checked={selectedStatus === option.value}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="mr-3 w-4 h-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default ProductStatusModal;