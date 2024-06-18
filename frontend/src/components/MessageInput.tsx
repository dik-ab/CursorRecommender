import React, { useState } from 'react';
import { Flex, Input, Button } from '@chakra-ui/react';

interface MessageInputProps {
  onSendMessage: (messageText: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;
    onSendMessage(inputValue);
    setInputValue('');
  };

  return (
    <Flex as="form" onSubmit={handleSendMessage} mt={4}>
      <Input
        placeholder="どんなビデオを探していますか？"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        mr={2}
      />
      <Button type="submit" colorScheme="blue">
        Send
      </Button>
    </Flex>
  );
};

export default MessageInput;
