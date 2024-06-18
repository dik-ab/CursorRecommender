// src/components/Sidebar.tsx
import React from 'react';
import { Box, Flex, Text, VStack, CloseButton, useColorModeValue } from '@chakra-ui/react';
import { AddIcon, SearchIcon } from '@chakra-ui/icons';
import NavItem from './NavItem';

interface LinkItemProps {
  name: string;
  icon: React.ElementType;
  path: string;
}

const LinkItems: Array<LinkItemProps> = [
  { name: 'Upload Video', icon: AddIcon, path: '/upload-video' },
  { name: 'Search Video', icon: SearchIcon, path: '/search-video' },
];

const Sidebar = () => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Video Recommender
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} />
      </Flex>
      <VStack spacing={4} align="stretch">
        {LinkItems.map((link) => (
          <NavItem key={link.name} icon={link.icon} path={link.path}>
            {link.name}
          </NavItem>
        ))}
      </VStack>
    </Box>
  );
};

export default Sidebar;
