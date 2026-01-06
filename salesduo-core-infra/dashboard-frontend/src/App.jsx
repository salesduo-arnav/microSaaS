import React, { useState, useEffect } from 'react';

function App() {
  const [email, setEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 1. Check if there is a redirect param in the URL (e.g., ?redirect=http://content.lvh.me)
  const queryParams = new URLSearchParams(window.location.search);
  const redirectUrl = queryParams.get('redirect');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://api.lvh.me/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
        credentials: 'include'
      });
      
      if (res.ok) {
        // 2. LOGIC CHANGE: Check for redirect before showing dashboard
        if (redirectUrl) {
          // If we have a destination, go there immediately
          window.location.href = redirectUrl;
        } else {
          // Otherwise, stay here and show the dashboard
          setIsLoggedIn(true);
        }
      } else {
        alert('Login failed');
      }
    } catch (err) {
      console.error(err);
      alert('Network error. Is the API running?');
    }
  };

  if (isLoggedIn) {
    return (
      <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
        <h1>Main Dashboard (app.lvh.me)</h1>
        <p>Welcome, <b>{email}</b>. You are now authenticated.</p>
        <hr />
        <h3>Your Apps:</h3>
        <ul>
          <li>
            <a href="http://content.lvh.me">Go to Content App &rarr;</a>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px', fontFamily: 'sans-serif' }}>
      <div style={{ border: '1px solid #ccc', padding: '2rem', borderRadius: '8px', maxWidth: '400px' }}>
        <h2>Sign In</h2>
        
        {/* Show a helpful message if they were redirected */}
        {redirectUrl && (
            <div style={{backgroundColor: '#eef', padding: '10px', marginBottom: '15px', borderRadius: '4px', fontSize: '0.9rem'}}>
                ℹ️ You need to log in to access that page.
            </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1rem' }}>
            <label>Email Address:</label><br/>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="user@example.com"
              required 
              style={{ padding: '8px', width: '100%' }}
            />
          </div>
          <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer', width: '100%' }}>
            {redirectUrl ? 'Login & Continue' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;