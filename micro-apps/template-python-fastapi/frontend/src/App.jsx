import React, { useEffect, useState } from 'react';
import { SalesDuoProvider, useSalesDuo } from '@salesduo/js-sdk/client';

function AppContent() {
  const { user, isLoading } = useSalesDuo();
  const [backendData, setBackendData] = useState(null);

  useEffect(() => {
    // Fetch data from the FastAPI Backend
    // Note: We use the relative path '/api/...' which Nginx routes to Python
    if (user) {
      fetch('/api/dashboard-data')
        .then(res => res.json())
        .then(data => setBackendData(data))
        .catch(err => console.error("API Error:", err));
    }
  }, [user]);

  if (isLoading) return <div>Loading Session...</div>;
  if (!user) return <div>Access Denied</div>;

  return (
    <div style={{padding: 20}}>
      <h1>Python FastAPI + React</h1>
      <div style={{border: '1px solid #ccc', padding: '15px', borderRadius: '5px', marginBottom: '20px'}}>
        <h3>User Info (from JS SDK)</h3>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
      </div>

      <div style={{border: '1px solid #007bff', padding: '15px', borderRadius: '5px'}}>
        <h3>Backend Data (from FastAPI)</h3>
        {backendData ? (
          <pre>{JSON.stringify(backendData, null, 2)}</pre>
        ) : (
          <p>Loading data from Python...</p>
        )}
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