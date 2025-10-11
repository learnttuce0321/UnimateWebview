import { useEffect } from 'react';
import { Toast, useToast } from 'components/toast';
import { ApiResponseError } from 'modules/fetch/fetchClient';

interface Props {
  error: ApiResponseError;
}
const LikedProductListError = ({ error }: Props) => {
  const { toast, showToast, hideToast } = useToast();

  useEffect(() => {
    showToast(error.message, 'error');
  }, []);

  return (
    <Toast
      message={toast.message}
      type={toast.type}
      duration={toast.duration}
      isVisible={toast.isVisible}
      onClose={hideToast}
    />
  );
};

export default LikedProductListError;
