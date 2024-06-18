// src/components/NavItem.tsx
import React from 'react';
import { Flex, Icon, Link } from '@chakra-ui/react';

interface NavItemProps {
  icon: React.ElementType;
  children: React.ReactNode;
  path: string;
}

const NavItem: React.FC<NavItemProps> = ({ icon, children, path }) => {
  return (
    <Link
      href={path}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

export default NavItem;
