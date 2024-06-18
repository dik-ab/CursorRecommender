// src/components/Layout.tsx
import React, { ReactNode } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Flex>
      <Sidebar />
      <Box ml={{ base: 0, md: 60 }} p="4" w="full">
        {children}
      </Box>
    </Flex>
  );
};

export default Layout;
