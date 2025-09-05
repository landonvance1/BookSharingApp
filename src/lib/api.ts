import { API_BASE_URL } from './constants';
import * as SecureStore from 'expo-secure-store';

const getAuthHeaders = async (): Promise<Record<string, string>> => {
  const token = await SecureStore.getItemAsync('auth_token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const api = {
  get: async (endpoint: string) => {
    const authHeaders = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        ...authHeaders,
      },
    });
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    return response.json();
  },
  
  post: async (endpoint: string, data: any) => {
    const authHeaders = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    return response.json();
  },
  
  put: async (endpoint: string, data?: any) => {
    const authHeaders = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders,
      },
      ...(data && { body: JSON.stringify(data) }),
    });
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    return response.json();
  },
  
  delete: async (endpoint: string, data?: any) => {
    const authHeaders = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders,
      },
      ...(data && { body: JSON.stringify(data) }),
    });
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    // DELETE requests may return no content
    const text = await response.text();
    return text ? JSON.parse(text) : null;
  },
};