export const uploadVideoToS3 = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('http://localhost:8000/upload-video/', {
    method: 'POST',
    body: formData,
  });

  return response;
}
