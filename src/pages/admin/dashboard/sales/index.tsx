import Sidebar from '@/components/Sidebar';
import Table from '@/components/TableSales';
import React from 'react';

// import { Container } from './styles';

const sales: React.FC = () => {
  return (
    <div>
          <Sidebar />
        <Table />
    </div>
  );
}

export default sales;