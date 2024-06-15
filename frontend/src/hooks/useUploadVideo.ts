import { useState } from 'react';
import { uploadVideoToS3 } from '../services/uploadVideo';

export const useUploadVideo = () => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
    console.log(selectedFile)
  };

  const handleUpload = async () => {
    if (file) {
      console.log(file)
      try {
        const response = await uploadVideoToS3(file);
        if (response.ok) {
          setMessage(`File ${file.name} uploaded successfully!`);
        } else {
          setMessage('Failed to upload file.');
        }
      } catch (error) {
        setMessage('Failed to upload file.');
      }
    } else {
      setMessage('Please select a file to upload.');
    }
  };

  return { handleFileChange, handleUpload, message };
}
