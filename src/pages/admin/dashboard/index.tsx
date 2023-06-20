import Sidebar from '@/components/Sidebar';
import Header from '@/components/header';
import React from 'react';

// import { Container } from './styles';

const dashboard: React.FC = () => {
  return (
  <div>
    <Header />
    <Sidebar />
  </div>
    );
}

export default dashboard;