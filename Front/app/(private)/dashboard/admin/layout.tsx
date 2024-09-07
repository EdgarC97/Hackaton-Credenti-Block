import React from 'react';
import SidebarAdmin from '@/Front/app/components/SidebarAdmin';

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarAdmin />
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        <div className="container mx-auto px-6 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}