import React from 'react';
// Import from SDK
import { SalesDuoProvider, useSalesDuo } from '@salesduo/js-sdk/client';

function AppContent() {
  const { user, isLoading } = useSalesDuo();

  if (isLoading) return <div style={{padding: 20}}>Loading Session...</div>;

  if (!user) {
    return (
        <div style={{padding: 20}}>
            <h2>Access Denied</h2>
            <p>Please log in via the <a href="http://app.lvh.me">Main Dashboard</a>.</p>
        </div>
    );
  }

  return (
    <div style={{padding: 20}}>
      <h1>Template Micro App (JS)</h1>
      <div style={{border: '1px solid #ccc', padding: '10px', borderRadius: '5px'}}>
        <h3>User Context from Core Platform</h3>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Org ID:</strong> {user.orgId}</p>
        <p><strong>Plan:</strong> {user.plan}</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <SalesDuoProvider>
      <AppContent />
    </SalesDuoProvider>
  );
}