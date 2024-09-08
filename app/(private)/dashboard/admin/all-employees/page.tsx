import EmployeeList from '@/app/components/EmployeeList';
import React from 'react';

export default function AllEmployees() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Panel de Administración</h1>
      
      <EmployeeList />
    </div>
  );
}