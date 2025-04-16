// lib/auth.js
export const storeTokens = (access, refresh) => {
  localStorage.setItem('access_token', access);
  localStorage.setItem('refresh_token', refresh);
};

export const getAccessToken = () => localStorage.getItem('access_token');
export const getRefreshToken = () => localStorage.getItem('refresh_token');

export const clearTokens = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};

export const refreshAccessToken = async () => {
  const refresh = getRefreshToken();
  if (!refresh) throw new Error('No refresh token available');
  const res = await fetch('http://localhost:5000/api/auth/refresh', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh }),
  });
  if (!res.ok) throw new Error('Failed to refresh token');
  const data = await res.json();
  storeTokens(data.access, refresh);
  return data.access;
};

export const fetchWithAuth = async (url, options = {}) => {
  let accessToken = getAccessToken();
  const headers = {
    ...options.headers,
    'Content-Type': 'application/json',
  };

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  try {
    let res = await fetch(url, { ...options, headers });
    if (res.status === 401 && accessToken) {
      // Token expired, try refreshing
      accessToken = await refreshAccessToken();
      headers['Authorization'] = `Bearer ${accessToken}`;
      res = await fetch(url, { ...options, headers });
    }
    return res;
  } catch (err) {
    console.error('Fetch error:', err);
    throw err;
  }
};