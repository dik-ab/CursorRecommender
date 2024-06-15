import React from 'react';
import { Box, Button, Heading, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <Box textAlign="center" mt="10">
      <Heading>Welcome to Video Uploader</Heading>
      <Button mt="5" colorScheme="teal">
        <Link as={RouterLink} to="/upload-video">
          Go to Upload Page
        </Link>
      </Button>
    </Box>
  );
}

export default Home;