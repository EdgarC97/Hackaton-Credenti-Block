"use client"
import React, { useState, useEffect } from 'react';

// Definimos la interfaz para el tipo Employee
interface Employee {
  _id: string;
  name: string;
  email: string;
  address: string;
}

const EmployeeList = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('/api/employee');
        if (!response.ok) {
          throw new Error('Failed to fetch employees');
        }
        const data = await response.json();
        setEmployees(data.employees);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center py-4 text-red-500">Error: {error}</div>;

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-2xl font-bold mb-4 text-purple-600">My Employees</h2>
      {employees.length === 0 ? (
        <p className="text-gray-500">No employees found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {employees.map((employee) => (
            <div key={employee._id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="bg-purple-500 text-white px-4 py-2 font-semibold">
                {employee.name}
              </div>
              <div className="p-4">
                <p className="text-gray-600"><span className="font-semibold">Email:</span> {employee.email}</p>
                <p className="text-gray-600"><span className="font-semibold">Address:</span> {employee.address}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeList;