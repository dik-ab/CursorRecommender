// src/App.tsx
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes/routes';

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <Router>
        <Routes />
      </Router>
    </ChakraProvider>
  );
}

export default App;
