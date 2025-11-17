'use client';

import { useMutationGetProfileImagePresignedUrl } from 'hooks/users/useMutationGetProfileImagePresignedUrl';
import { ApiResponseError } from 'modules/fetch/fetchClient';
import { extractFileNameFromUrl, selectImagesFromDevice } from 'utils/bridge';
import { uploadFileToS3 } from 'utils/fileUpload';

interface Props {
  userProfile: string;
  setUserProfile: React.Dispatch<React.SetStateAction<string>>;
  handleError: (error: ApiResponseError) => void;
}

const MyProfileImage = ({
  userProfile,
  setUserProfile,
  handleError,
}: Props) => {
  const { mutateAsync } = useMutationGetProfileImagePresignedUrl();

  const handleUpdateUserProfile = async () => {
    const selectedImageUrls = await selectImagesFromDevice([], 1);

    if (!selectedImageUrls || selectedImageUrls.length === 0) {
      return;
    }

    const selectedImageUrl = selectedImageUrls[0];
    const fileName = extractFileNameFromUrl(selectedImageUrl);

    try {
      const { presignedUrl } = await mutateAsync({ fileName });
      await uploadFileToS3(selectedImageUrl, presignedUrl);
      setUserProfile(selectedImageUrl);
    } catch (error: any) {
      handleError(error as ApiResponseError);
    }
  };

  return (
    <div className="relative">
      <img
        src={userProfile}
        width={116}
        height={116}
        alt="유저 프로필"
        className="h-[116px] w-[116px] rounded-full object-cover"
      />
      <button
        className="absolute bottom-0 right-0"
        onClick={handleUpdateUserProfile}
      >
        <img
          src="/images/svg/my-page/icon-system-camera-button.svg"
          width={32}
          height={32}
          alt="프로필 등록"
        />
      </button>
    </div>
  );
};

export default MyProfileImage;
