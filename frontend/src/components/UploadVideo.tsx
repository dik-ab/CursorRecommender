import React from 'react';
import { Box, Button, Input, Text, VStack } from '@chakra-ui/react';

interface UploadVideoProps {
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onUpload: () => void;
  message: string;
}

const UploadVideo: React.FC<UploadVideoProps> = ({ onFileChange, onUpload, message }) => {
  return (
    <Box p="5">
      <VStack spacing="5" align="stretch">
        <Text fontSize="2xl">Upload a Video</Text>
        <Input type="file" accept="video/*" onChange={onFileChange} />
        <Button colorScheme="teal" onClick={onUpload}>
          Upload
        </Button>
        {message && <Text>{message}</Text>}
      </VStack>
    </Box>
  );
}

export default UploadVideo;
