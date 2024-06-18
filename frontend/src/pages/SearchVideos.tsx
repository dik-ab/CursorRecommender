import React from 'react';
import { Box, VStack } from '@chakra-ui/react';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';
import useSearchVideos from '../hooks/useSearchVideos';

const SearchVideos: React.FC = () => {

  const { messages, sendMessage } = useSearchVideos();

  return (
    <Box p={5} maxW="600px" mx="auto">
      <VStack spacing={4} align="stretch" bg="gray.50" p={5} borderRadius="md" boxShadow="md">
        <MessageList messages={messages} />
        <MessageInput onSendMessage={sendMessage} />
      </VStack>
    </Box>
  );
};

export default SearchVideos;
