import Constants from "expo-constants";
const devServerUri = 'http://' + Constants.expoConfig?.hostUri?.split(':').shift() + ':5155';

const API_BASE_URL = __DEV__ ? devServerUri : 'http://192.168.1.72:5155'; //todo replace with prod api url

export const api = {
  get: async (endpoint: string) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    return response.json();
  },
  
  post: async (endpoint: string, data: any) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    return response.json();
  },
};