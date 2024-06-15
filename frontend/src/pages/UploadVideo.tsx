import React from 'react';
import UploadVideo from '../components/UploadVideo';
import { useUploadVideo } from '../hooks/useUploadVideo';

const UploadVideoPage: React.FC = () => {
  const { handleFileChange, handleUpload, message } = useUploadVideo();

  return (
    <UploadVideo
      onFileChange={handleFileChange}
      onUpload={handleUpload}
      message={message}
    />
  );
}

export default UploadVideoPage;