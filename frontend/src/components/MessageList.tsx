import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { Message } from '../types/message';

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <Box overflowY="auto" maxH="400px">
      {messages.map((message, index) => (
        <Flex key={index} justify={message.sender === 'user' ? 'flex-end' : 'flex-start'}>
          <Text
            bg={message.sender === 'user' ? 'blue.500' : 'gray.300'}
            color={message.sender === 'user' ? 'white' : 'black'}
            p={3}
            borderRadius="md"
            maxW="80%"
            mb={2}
          >
            {message.text}
          </Text>
        </Flex>
      ))}
    </Box>
  );
};

export default MessageList;
