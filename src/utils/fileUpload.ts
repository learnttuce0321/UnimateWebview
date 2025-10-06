export const uploadFileToS3 = async (
  fileUrl: string,
  presignedUrl: string
): Promise<void> => {
  try {
    console.log('Uploading file:', fileUrl, 'to:', presignedUrl);

    const response = await fetch(fileUrl);

    if (!response.ok) {
      throw new Error(`Failed to read local file: ${response.statusText}`);
    }

    const blob = await response.blob();
    console.log('File blob size:', blob.size, 'type:', blob.type);

    const uploadResponse = await fetch(presignedUrl, {
      method: 'PUT',
      body: blob,
      headers: {
        'Content-Type': blob.type || 'image/jpeg',
      },
    });

    if (!uploadResponse.ok) {
      throw new Error(`File upload failed: ${uploadResponse.statusText}`);
    }

    console.log('File upload successful');
  } catch (error) {
    console.error('File upload error:', error);
    throw error;
  }
};

export interface ImageUploadResult {
  localUrl: string;
  fileName: string;
  imageKey: string;
  success: boolean;
  error?: string;
}

export const uploadImageWithPresignedUrl = async (
  fileUrl: string,
  fileName: string,
  getPresignedUrl: (
    fileName: string
  ) => Promise<{ presignedUrl: string; key: string }>
): Promise<ImageUploadResult> => {
  try {
    const { presignedUrl, key } = await getPresignedUrl(fileName);

    await uploadFileToS3(fileUrl, presignedUrl);

    return {
      localUrl: fileUrl,
      fileName,
      imageKey: key,
      success: true,
    };
  } catch (error) {
    return {
      localUrl: fileUrl,
      fileName,
      imageKey: '',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};
