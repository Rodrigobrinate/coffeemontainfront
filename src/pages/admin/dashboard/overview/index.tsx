import Sidebar from '@/components/Sidebar';
import Table from '@/components/TableSignature';
import Header from '@/components/header';
import React from 'react';

// import { Container } from './styles';

const overview: React.FC = () => {
    return (
        <div>
          <Sidebar />
          <Table />
        </div>
          );
}

export default overview;