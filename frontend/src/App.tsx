// src/App.tsx
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes/routes';
import Layout from './components/Layout';

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <Layout>
        <Router>
          <Routes />
        </Router>
      </Layout>
    </ChakraProvider>
  );
}

export default App;
